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
    for (const x of entries) {
      await this._dailyTrackingService.addEntryAndUpdateDailyEntryFields(dateTo, x.Food);
    };
  }
}
