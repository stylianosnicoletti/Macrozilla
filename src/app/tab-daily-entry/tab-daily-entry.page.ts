import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { LoadingService } from "../services/loading.service";
import { Network } from "@capacitor/network";
import { DailyEntry, Entry } from "../models/dailyEntry";
import { DailyTrackingService } from "../services/daily-tracking.service";
import { UnsubscribeService } from "../services/unsubscribe.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-tab-daily-entry",
  templateUrl: "tab-daily-entry.page.html",
  styleUrls: ["tab-daily-entry.page.scss"],
})
export class TabDailyEntryPage {
  date: string;
  dailyEntry: DailyEntry;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  lastNetworkStatusIsConnected = true;
  transferEntriesEnabled: boolean;
  deletingAllDailyEntriesEnabled: boolean;

  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _loadingService: LoadingService,
    private _dailyTrackingService: DailyTrackingService,
    private _alertController: AlertController,
    private _unsubscribeService: UnsubscribeService,
    private _userService: UserService
  ) {}

  async ngOnInit() {
    //console.log("ngOnInit Add Daily Entry");
    await (
      await this._userService.getUserFields()
    ).subscribe(async (x) => {
      this.transferEntriesEnabled = x.Options.TransferEntriesEnabled;
      this.deletingAllDailyEntriesEnabled =
        x.Options.DeletingAllDailyEntriesEnabled;
    });
  }

  async ionViewWillEnter() {
    //console.log("entering daily entries page");

    Network.addListener("networkStatusChange", async (status) => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        //console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.initialiseItems();
      } else if (!status.connected) {
        //console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.presentNetworkAlert();
      }
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    //console.log("leaving daily entries page");
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    Network.removeAllListeners();
  }

  async initialiseItems() {
    await this.transformDateAndReadDailyEntry(Date.now());
  }

  /**
   * Refresh action.
   */
  async doRefresh(event): Promise<void> {
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
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
      header: "No Data Connection",
      message: "Consider turning on mobile data or Wi-Fi.",
      buttons: ["OK"],
    });
    await alert.present();
  }

  /**
   * Transforms the date to a specifed format and read daily entry.
   * @param myDate Date.
   */
  async transformDateAndReadDailyEntry(myDate) {
    this.date = await this._datePipe.transform(myDate, "yyyy-MM-dd");
    this.subscriptionsList.push(
      (
        await this._dailyTrackingService.readDailyEntry(this.date, true)
      ).subscribe((x) => {
        this.dailyEntry = x;
      })
    );
  }

  /**
   * Parse selected date.
   */
  async parseDate(): Promise<void> {
    await this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    await this.transformDateAndReadDailyEntry(this.date);
  }

  /**
   * Delete Confirmation.
   * @param entryArg Selected entry for deletion.
   * @param slidingItem Sliding item.
   */
  async presentAlertConfirm(entryArg: Entry, slidingItem: any): Promise<void> {
    const alert = await this._alertController.create({
      header: "Do you want to proceed deleting?",
      message:
        entryArg.Food.Name +
        " (" +
        entryArg.Food.ServingAmount +
        entryArg.Food.ServingUnitShortCode +
        ")",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: "Yes",
          handler: async () => {
            var loadingElement =
              await this._loadingService.createAndPresentLoading("Deleting..");
            await this._dailyTrackingService.deleteEntryAndUpdateDailyEntryFields(
              this.date,
              entryArg
            ); //, this.dailyEntry.Entries.length);
            slidingItem.close();
            await this._loadingService.dismissLoading(loadingElement);
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Add New Entry
   */
  async addNewEntry(): Promise<void> {
    await this._router.navigate(["/add_entry_search/" + this.date]);
  }

  /**
   * transfer Entries
   */
  async transferEntries(): Promise<void> {
    await this._router.navigate(["/transfer_entries/" + this.date]);
  }

  /**
   * transfer Entries
   */
  async deleteAllDailyEntries(): Promise<void> {
    const alert = await this._alertController.create({
      header:
        "Proceed deleting all (" + this.dailyEntry.SizeOfEntries + ") entries?",
      message: "For " + this.dailyEntry.Date,
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: async () => {
            var loadingElement =
              await this._loadingService.createAndPresentLoading("Deleting..");
            // Remove whole Daily Entry on last Entry deletion
            this._dailyTrackingService.deleteDailyEntry(this.date);
            // Decrement size of collection
            await this._userService.DailyEntriesSizeDecrement();
            await this._loadingService.dismissLoading(loadingElement);
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Edit Entry. Route to EditEntryInputFormPage.
   */
  async editEntry(entryArg: Entry, slidingItem: any): Promise<void> {
    slidingItem.close();
    await this._router.navigate([
      "/edit_entry_input_form/" + this.date + "/" + entryArg.DocumentId,
    ]);
  }
}
