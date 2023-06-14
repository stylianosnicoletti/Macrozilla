import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MacrozillaConstants } from "../../../macrozilla-constants";
import { DailyTrackingService } from "../../../services/daily-tracking.service";
import { TransferEntriesService } from "../../../services/transfer-entries.service";
import { DailyEntry } from "../../../models/dailyEntry";
import { ToastService } from "../../../services/toast.service";
import { LoadingService } from "../../../services/loading.service";
import { UnsubscribeService } from "../../../services/unsubscribe.service";

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
  subscriptionsListFrom: Subscription[] = [];
  subscriptionsListTo: Subscription[] = [];
  isIndeterminate: boolean = false;
  masterCheck: boolean = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alertController: AlertController,
    private _datePipe: DatePipe,
    private _dailyTrackingService: DailyTrackingService,
    private _transferEntriesService: TransferEntriesService,
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _unsubscribeService: UnsubscribeService
  ) {}

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    //console.log("entering transfer");
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    //console.log("leaving transfer");
    this._unsubscribeService.unsubscribeData(this.subscriptionsListFrom);
    this._unsubscribeService.unsubscribeData(this.subscriptionsListTo);
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    this.enterGuard();
  }

  // Check if the route param key matches a date
  async enterGuard() {
    this.dateTo = this._activatedRoute.snapshot.params["date_selected"];  
    this.dateFrom = await this.removeOneDay(this.dateTo);
    //console.log(this.dateTo);
    if (!MacrozillaConstants.REGEX_DATE.test(this.dateTo)) {
      this._router.navigate(["/authorized_user/tabs/daily_entry"]);
    } 
    this.transformDateAndReadDailyEntry("FROM");
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
    await this._router.navigate(["/authorized_user/tabs/daily_entry"]);
  }

  /**
   * Transforms the date to a specifed format and read daily entry.
   * @param whichDate From or To.
   */
  async transformDateAndReadDailyEntry(whichDate: String) {
    if (whichDate == "FROM") {
      this._unsubscribeService.unsubscribeData(this.subscriptionsListFrom);
      this.dateFrom = await this._datePipe.transform(
        this.dateFrom,
        "yyyy-MM-dd"
      );
      this.subscriptionsListFrom.push(
        (
          await this._dailyTrackingService.readDailyEntry(this.dateFrom, true)
        ).subscribe((x) => {
          this.dailyEntryFrom = x;
          this.checkMaster();
          //console.log(this.dailyEntryFrom.Entries);
        })
      );
    }

    if (whichDate == "TO") {
      this.dateTo = await this._datePipe.transform(this.dateTo, "yyyy-MM-dd");
      this.subscriptionsListTo.push(
        (
          await this._dailyTrackingService.readDailyEntry(this.dateTo, true)
        ).subscribe((x) => {
          this.dailyEntryTo = x;
          //console.log(this.dailyEntryTo.Entries);
        })
      );
    }
  }

  /**
   *  Move checked entries. (From Date Entries -> To Date Entries)
   */
  async moveEntries(): Promise<void> {
    if (this.dateFrom == this.dateTo) {
      await this._toastService.presentToast(
        "Cannot move entries from same date!"
      );
    } else {
      if (this.dailyEntryFrom.Entries.length == 0) {
        await this._toastService.presentToast("No entries found to move!");
      } else {
        let checkedEntries = this.dailyEntryFrom?.Entries?.filter(
          (x) => x.IsChecked
        );

        if (checkedEntries.length > 0) {
          const alert = await this._alertController.create({
            header: "Do you want to proceed moving entries?",
            message: this.dateFrom + " ➡️ " + this.dateTo,
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
                  await this._router.navigate(["/authorized_user/tabs/daily_entry"]);
                  var loadingElement =
                    await this._loadingService.createAndPresentLoading(
                      "Moving.."
                    );
                  await this._transferEntriesService.moveEntries(
                    checkedEntries,
                    this.dateFrom,
                    this.dateTo
                  );
                  await this._loadingService.dismissLoading(loadingElement);
                  await this._toastService.presentToast(
                    "Entries Successfully Moved!"
                  );
                },
              },
            ],
          });
          await alert.present();
        } else {
          await this._toastService.presentToast(
            "Please check entries to move!"
          );
        }
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
        await this._router.navigate(["/authorized_user/tabs/daily_entry"]);
        var loadingElement = await this._loadingService.createAndPresentLoading(
          "Copying.."
        );
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
   * For Master CheckBox.
   */
  checkMaster() {
    setTimeout(()=>{
      this.dailyEntryFrom.Entries.forEach(entry => {
        entry.IsChecked = this.masterCheck;
      });
      this.checkEvent();
    });
  }

  /**
   * On check entry (event) logic.
   */
  checkEvent() {
    const totalItems = this.dailyEntryFrom.SizeOfEntries;
    let checked = 0;
    this.dailyEntryFrom.Entries.map(entry => {
      if (entry.IsChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  /**
   *  Remove one day from a "yyyy-MM-dd" formated date.
   */
    async removeOneDay(string): Promise<string> {
      const oneDayBack = new Date(this.dateTo);
      oneDayBack.setDate(oneDayBack.getDate()-1);
      return await this._datePipe.transform(
        oneDayBack,
        "yyyy-MM-dd"
      );
    }
  
}
