import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { Network } from '@ionic-native/network/ngx'
import { DailyEntry, Entry } from '../models/dailyEntry';
import { DailyTrackingService } from '../services/daily-tracking.service';
import { UnsubscribeService } from '../services/unsubscribe.service';

@Component({
  selector: 'app-tab-daily-entry',
  templateUrl: 'tab-daily-entry.page.html',
  styleUrls: ['tab-daily-entry.page.scss']
})
export class TabDailyEntryPage {

  date: string;
  dailyEntry: DailyEntry;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _loadingService: LoadingService,
    private _dailyTrackingService: DailyTrackingService,
    private _alertController: AlertController,
    private _network: Network,
    private _unsubscribeService: UnsubscribeService) {
  }

  async ionViewWillEnter() {
    console.log("entering daily entries page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this._unsubscribeService.unsubscribeData(this.subscriptionsList);
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
      if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this._unsubscribeService.unsubscribeData(this.subscriptionsList);
      await this.initialiseItems();
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving daily entries page");
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    this.unsubscribeNetwork();
  }

  unsubscribeNetwork() {
    if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    if (!this.disconnectSubscription.closed) this.disconnectSubscription.unsubscribe();
  }

  async initialiseItems() {
    await this.transformDateAndReadDailyEntry(Date.now());
  }

  /**
   * Refresh action.
   */
  async doRefresh(event): Promise<void> {
    await this.initialiseItems();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * No network alert.
   */
  async presentNetworkAlert(): Promise<void> {
    const alert = await this._alertController.create({
      header: 'No Data Connection',
      message: 'Consider turning on mobile data or Wi-Fi.',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Transforms the date to a specifed format and read daily entry.
   * @param myDate Date.
   */
  async transformDateAndReadDailyEntry(myDate) {
    this.date = await this._datePipe.transform(myDate, 'yyyy-MM-dd');
    this.subscriptionsList.push((await this._dailyTrackingService.readDailyEntry(this.date, true)).subscribe(x => {
      this.dailyEntry = x
    }));
  }

  /**
   * Parse selected date.
   */
  async parseDate(): Promise<void> {
    await this.transformDateAndReadDailyEntry(this.date);
  }

  /**
   * Delete Confirmation.
   * @param entryArg Selected entry for deletion.
   * @param slidingItem Sliding item.
   */
  async presentAlertConfirm(entryArg: Entry, slidingItem: any): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Do you want to proceed deleting?',
      message: entryArg.Food.Name + ' (' + entryArg.Food.ServingAmount + entryArg.Food.ServingUnitShortCode + ')',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Yes',
          handler: async () => {
            await this._dailyTrackingService.deleteEntryAndUpdateDailyEntryFields(this.date, entryArg, this.dailyEntry.Entries.length);
            slidingItem.close();
            await this._loadingService.presentLoading('Deleting..', 500);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Add New Entry
   */
  async addNewEntry(): Promise<void> {
    await this._router.navigate(["/add_entry/" + this.date]);
  }

}

