import { Component, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { MacrozillaConstants } from '../macrozilla-constants';
import { DailyTrackingService } from '../services/daily-tracking.service';
import { DailyEntry, Entry } from '../models/dailyEntry';

@Component({
  selector: 'app-transfer-entries',
  templateUrl: './transfer-entries.page.html',
  styleUrls: ['./transfer-entries.page.scss'],
})

export class TransferEntriesPage {

  date: string;
  dateToTransfer: string;
  dailyEntryToTransfer: DailyEntry;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  lastNetworkStatusIsConnected = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _alertController: AlertController,
    private _renderer: Renderer2,
    private _datePipe: DatePipe,
    private _dailyTrackingService: DailyTrackingService) {
  }

  async ngOnInit() {
    //console.log("ngOnInit Add New Daily Entry Search");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    //console.log("entering add entry search page");

    Network.addListener('networkStatusChange', async status => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        //console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        await this.initialiseItems();     
      }
      else if(!status.connected) {
        //console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
        await this.goToDailyEntryTab();
        
      }
    });
    
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    //console.log("leaving add entry search page");
    Network.removeAllListeners();
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    this.enterGuard();
  }

  async doRefresh(event) {
    await this.initialiseItems();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // Check if the route param key matches a date
  enterGuard() {
    this.date = this._activatedRoute.snapshot.params['date_selected'];
    this.dateToTransfer = this.date;
    console.log(this.date);
    if (!MacrozillaConstants.REGEX_DATE.test(this.date)) this._router.navigate(["/tabs/daily_entry"]);
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

  /**
   *  Navigate back to daily entry tab
   */
  async goToDailyEntryTab(): Promise<void> {
    await this._router.navigate(["/tabs/daily_entry"]);
  }

    /**
   * Transforms the date to a specifed format and read daily entry.
   * @param myDate Date.
   */
     async transformDateAndReadDailyEntry(myDate) {
      this.dateToTransfer = await this._datePipe.transform(myDate, 'yyyy-MM-dd');
      this.subscriptionsList.push((await this._dailyTrackingService.readDailyEntry(this.dateToTransfer, true)).subscribe(x => {
        this.dailyEntryToTransfer = x
        console.log(this.dailyEntryToTransfer.Entries);
      }));
    }
  
    /**
     * Parse selected date.
     */
    async parseDate(): Promise<void> {
      await this.transformDateAndReadDailyEntry(this.dateToTransfer);
    }


  /**
   * Maps darkMode boolean to body name.
   * @param darkMode User prefered theme option.
   * @returns Body name.
   */
  mapThemeModeToBodyName(darkMode: boolean): string {
    if (darkMode) {
      return 'dark';
    }
    return 'light';
  }
}
