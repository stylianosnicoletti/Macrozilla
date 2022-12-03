import { Component } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { UserService } from "../../../../services/user.service";
import { Subscription } from "rxjs";
import { User, Options } from "../../../../models/user.model";
import { UnsubscribeService } from "../../../../services/unsubscribe.service";

@Component({
  selector: "app-tab-account",
  templateUrl: "tab-account.page.html",
  styleUrls: ["tab-account.page.scss"],
})
export class TabAccountPage {
  currentPopover: any = null;
  userEmailAddress: string;
  userName: string;
  darkMode: boolean;
  transferEntriesEnabled: boolean;
  deletingAllDailyEntriesEnabled: boolean;
  useOnlyPersonalDb: string;
  subscriptionsList: Subscription[] = [];

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _unsubscribeService: UnsubscribeService
  ) {}
  async ionViewWillEnter() {
    //console.log("entering account page");
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    //console.log("leaving acount page");
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    this.userEmailAddress = await this._authService.afAuth.currentUser.then(
      (u) => u.email
    );
    this.userName = await this._authService.afAuth.currentUser.then(
      (u) => u.displayName
    );
    this.subscriptionsList.push(
      (await this._userService.getUserFields()).subscribe((x) =>
        this.mapUserOptionsToNgModels(x.Options)
      )
    );
  }

  /**
   * Maps User Option to NgModels.
   * @param opt User Option.
   */
  mapUserOptionsToNgModels(opt: Options): void {
    this.darkMode = opt.DarkMode;
    if (opt.UseOnlyPersonalDb) {
      this.useOnlyPersonalDb = "1";
    } else {
      this.useOnlyPersonalDb = "0";
    }
    this.transferEntriesEnabled = opt.TransferEntriesEnabled;
    this.deletingAllDailyEntriesEnabled = opt.DeletingAllDailyEntriesEnabled;
  }

  /**
   * Maps NgModels to User Options.
   * @param darkMode DarkMode Model.
   * @param useOnlyPersonalDb UseOnlyPersonalDb Model.
   * @returns User Options.
   */
  mapNgModelsToUserOptions(
    darkMode: boolean,
    useOnlyPersonalDb: String,
    transferEntriesEnabled: boolean,
    deletingAllDailyEntriesEnabled: boolean
  ): Options {
    return <Options>{
      DarkMode: darkMode,
      UseOnlyPersonalDb: useOnlyPersonalDb == "1" ? true : false,
      TransferEntriesEnabled: transferEntriesEnabled,
      DeletingAllDailyEntriesEnabled: deletingAllDailyEntriesEnabled,
    };
  }

  /**
   * Updates User Options in Firestore.
   */
  async updateUserOptions(): Promise<void> {
    const user = <User>{
      Options: this.mapNgModelsToUserOptions(
        this.darkMode,
        this.useOnlyPersonalDb,
        this.transferEntriesEnabled,
        this.deletingAllDailyEntriesEnabled
      ),
    };
    await this._userService.updateUserFieldOptions(user.Options);
  }

  /**
   * Logs out user.
   */
  async logout() {
    await this._authService.doLogout();
    this.clearCookies();
  }

  /**
   * Erases personal database.
   */
  async erasePersonalDb(): Promise<void> {
    //console.log("TODO: Erasing personal database!!");
  }

  /**
   * Erases all daily tracking records.
   */
  async eraseDailyTrackingRecords(): Promise<void> {
    //console.log("TODO: Erase all daily tracking records!!");
  }

  /**
   * Clears cookies.
   */
  clearCookies(): void {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
