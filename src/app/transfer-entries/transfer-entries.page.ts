import { Component, Renderer2 } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Network } from "@capacitor/network";
import { AlertController } from "@ionic/angular";
import { UserService } from "../services/user.service";
import { MacrozillaConstants } from "../macrozilla-constants";
import { DailyTrackingService } from "../services/daily-tracking.service";
import { TransferEntriesService } from "../services/transfer-entries.service";
import { DailyEntry } from "../models/dailyEntry";
import { ToastService } from "../services/toast.service";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: "app-transfer-entries",
  templateUrl: "./transfer-entries.page.html",
  styleUrls: ["./transfer-entries.page.scss"],
})
export class TransferEntriesPage {
  dateTo: string;
  dateFrom: string;
  dailyEntryTo: DailyEntry;
  dailyEntryFrom: DailyEntry;
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
    private _dailyTrackingService: DailyTrackingService,
    private _transferEntriesService: TransferEntriesService,
    private _toastService: ToastService,
    private _loadingService: LoadingService
  ) {}

  async ngOnInit() {
    //console.log("ngOnInit Add New Daily Entry Search");
    await (
      await this._userService.getUserFields()
    ).subscribe(async (x) => {
      this._renderer.setAttribute(
        document.body,
        "color-theme",
        this.mapThemeModeToBodyName(x.Options.DarkMode)
      );
    });
  }

  async ionViewWillEnter() {
    //console.log("entering add entry search page");

    Network.addListener("networkStatusChange", async (status) => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        //console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        await this.initialiseItems();
      } else if (!status.connected) {
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
    this.dateTo = this._activatedRoute.snapshot.params["date_selected"];
    this.dateFrom = this.dateTo;
    console.log(this.dateTo);
    if (!MacrozillaConstants.REGEX_DATE.test(this.dateTo)) {
      this._router.navigate(["/tabs/daily_entry"]);
    }
    this.transformDateAndReadDailyEntry("TO");
  }

  // No network alert
  async presentNetworkAlert() {
    const alert = await this._alertController.create({
      header: "No Data Connection",
      message: "Consider turning on mobile data or Wi-Fi.",
      buttons: ["OK"],
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
   * @param whichDate From or To.
   */
  async transformDateAndReadDailyEntry(whichDate: String) {
    if (whichDate == "FROM") {
      this.dateFrom = await this._datePipe.transform(
        this.dateFrom,
        "yyyy-MM-dd"
      );
      this.subscriptionsList.push(
        (
          await this._dailyTrackingService.readDailyEntry(this.dateFrom, true)
        ).subscribe((x) => {
          this.dailyEntryFrom = x;
          this.dailyEntryFrom.Entries.forEach((x) => (x.IsChecked = true));
          console.log(this.dailyEntryFrom.Entries);
        })
      );
    }

    if (whichDate == "TO") {
      this.dateTo = await this._datePipe.transform(this.dateTo, "yyyy-MM-dd");
      this.subscriptionsList.push(
        (
          await this._dailyTrackingService.readDailyEntry(this.dateTo, true)
        ).subscribe((x) => {
          this.dailyEntryTo = x;
          console.log(this.dailyEntryTo.Entries);
        })
      );
    }
  }

  /**
   *  Move checked entries. (From Date Entries -> To Date Entries)
   */
  async moveEntries(): Promise<void> {
    if (this.dailyEntryFrom.Entries.length == 0) {
      await this._toastService.presentToast("No entries found to move!");
    } else {
      let checkedEntries = this.dailyEntryFrom?.Entries?.filter(
        (x) => x.IsChecked
      );

      if (checkedEntries.length > 0) {
        var loadingElement = await this._loadingService.createAndPresentLoading('Moving..');
        await this._router.navigate(["/tabs/daily_entry"]);
       // await this._transferEntriesService.moveEntries(
        //  checkedEntries,
        //  this.dateFrom,
        //  this.dateTo
       // );
        await this._loadingService.dismissLoading(loadingElement);  
        await this._toastService.presentToast("Entries Successfully Moved!");
      } else {
        await this._toastService.presentToast("Please check entries to move!");
      }
    }
  }

  /**
   *  Copy checked entries. (From Date Entries -> To Date Entries)
   */
  async copyEntries(): Promise<void> {
    if (this.dailyEntryFrom.Entries.length == 0) {
      await this._toastService.presentToast("No entries found to copy!");
    } else {
      let checkedEntries = this.dailyEntryFrom?.Entries?.filter(
        (x) => x.IsChecked
      );

      if (checkedEntries.length > 0) {
        var loadingElement = await this._loadingService.createAndPresentLoading('Copying..');
        await this._router.navigate(["/tabs/daily_entry"]);
        await this._transferEntriesService.copyEntries(
          checkedEntries,
          this.dateTo
        );
        await this._loadingService.dismissLoading(loadingElement);  
        await this._toastService.presentToast("Entries Successfully Copied!");
      } else {
        await this._toastService.presentToast("Please check entries to copy!");
      }
    }
  }

  /**
   * Maps darkMode boolean to body name.
   * @param darkMode User prefered theme option.
   * @returns Body name.
   */
  mapThemeModeToBodyName(darkMode: boolean): string {
    if (darkMode) {
      return "dark";
    }
    return "light";
  }
}
