import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DailyEntryFood, Summary } from '../types';

import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { Network } from '@ionic-native/network/ngx'

@Component({
  selector: 'app-tab-daily-entry',
  templateUrl: 'tab-daily-entry.page.html',
  styleUrls: ['tab-daily-entry.page.scss']
})
export class TabDailyEntryPage {

  date: string;
  existingSummary: Summary;
  entrySummary: Summary;
  foodEntry: DailyEntryFood;
  numberOfEntriesByDate: Number;
  summaryDay: Summary;
  dailyEntriesList: DailyEntryFood[];
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _loadingService: LoadingService,
    private _alertController: AlertController,
    private _network: Network) {
  }

  async ionViewWillEnter() {
    console.log("entering daily entries page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this.unsubscribeData();
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
      if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    });

    this.connectSubscription = this._network.onConnect().subscribe(async() => {
      this.unsubscribeData();
      await this.initialiseItems();
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving daily entries page");
    this.unsubscribeData();
    this.unsubscribeNetwork();
  }

  unsubscribeNetwork() {
    if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    if (!this.disconnectSubscription.closed) this.disconnectSubscription.unsubscribe();
  }

  unsubscribeData() {
    this.subscriptionsList.forEach(item => {
      if (!item.closed) item.unsubscribe();
    })
    this.subscriptionsList = [];
  }

  async initialiseItems() {
    await this.transformDate(Date.now());
  }

  async doRefresh(event) {
    await this.initialiseItems();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // No network alert
  async presentNetworkAlert() {
    const alert = await this._alertController.create({
      header: 'No Data Connection',
      message: 'Consider turning on mobile data or Wi-Fi.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Transforms a the date to a specifed format and observe summary for that date
  async transformDate(myDate) {
    this.date = this._datePipe.transform(myDate, 'yyyy-MM-dd');
    //this.subscriptionsList.push((await this._foodEntryService.getAllFoodEntriesByDate(this.date)).subscribe(x => this.dailyEntriesList = x));
    //this.subscriptionsList.push((await this._summaryService.getSummaryObservable(this.date)).subscribe(x => this.summaryDay = x));
  }

  // Parse selected date
  async parseDate() {
    await this.transformDate(this.date);
  }

  // Delete Confirmation
  async presentAlertConfirm(entryArg: DailyEntryFood, slidingItem: any) {
    //this.numberOfEntriesByDate = await this._foodEntryService.getNumberOfFoodEntriesByDate(this.date);
    this.entrySummary = this.createEntrySummary(entryArg);
    //this.existingSummary = await this._summaryService.getSummary(this.date);
    const alert = await this._alertController.create({
      header: 'Do you want to proceed deleting?',
      message: entryArg.food.name + ' Qty: ' + entryArg.qty,
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
            if (this.numberOfEntriesByDate > 1) {
              //await this._foodEntryService.deleteFoodEntry(entryArg.key, this.date);
              // Decrement summary on entry deletion 
              //this._summaryService.decrementExisitngSummary(this.existingSummary, this.entrySummary, this.date);
            } else {
              // Remove summary on last entry deletion 
              //await this._foodEntryService.deleteFoodEntry(entryArg.key, this.date);
              //await this._summaryService.removeSummary(this.date);
            }
            slidingItem.close();
            await this._loadingService.presentLoading('Deleting..', 500);
          }
        }

      ]
    });
    await alert.present();
  }

  // Prepare summary of food entry selected 
  createEntrySummary(foodEntryArg): Summary {
    return {
      key:null,
      totalGramsProtein: foodEntryArg.food.protein * foodEntryArg.qty,
      totalGramsFats: foodEntryArg.food.fats * foodEntryArg.qty,
      totalGramsSaturated: foodEntryArg.food.saturated * foodEntryArg.qty,
      totalGramsCarbohydrates: foodEntryArg.food.carbohydrates * foodEntryArg.qty,
      totalCalories: foodEntryArg.food.calories * foodEntryArg.qty,
    };
  }

  // Add New Entry
  async addNewEntry() {
    await this._router.navigate(["/add_entry/" + this.date]);
  }

}

