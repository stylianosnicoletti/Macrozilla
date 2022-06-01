import { Injectable } from "@angular/core";
import { Entry } from "../models/dailyEntry";
import { DailyTrackingService } from "./daily-tracking.service";

@Injectable({
  providedIn: "root",
})
export class TransferEntriesService {
  constructor(private _dailyTrackingService: DailyTrackingService) {}

  /**
   * Copy entries from on date to another.
   * @param entries Entries to be copied.
   * @param dateTo Date to.
   * @returns
   */
  async copyEntries(entries: Entry[], dateTo: string): Promise<any> {
    for (const entry of entries) {
      await this._dailyTrackingService.addEntryAndUpdateDailyEntryFields(dateTo, entry.Food);
    };
  }

    /**
   * Move entries from on date to another.
   * @param entries Entries to be copied.
   * @param dateFrom Date from.
   * @param dateTo Date to.
   * @returns
   */
     async moveEntries(entries: Entry[], dateFrom: string, dateTo: string): Promise<any> {
      for (const entry of entries) {
        await this._dailyTrackingService.addEntryAndUpdateDailyEntryFields(dateTo, entry.Food);
        await this._dailyTrackingService.deleteEntryAndUpdateDailyEntryFields(dateFrom, entry);
      };
    }
}
