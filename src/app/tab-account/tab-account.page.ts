import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { User, Options } from '../models/user.model';

@Component({
  selector: 'app-tab-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss']
})
export class TabAccountPage {

  currentPopover: any = null;
  userEmailAddress: string;
  userName: string;
  darkMode: boolean;
  useOnlyPersonalDb: string;


  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _alertController: AlertController,
    private _network: Network) {
  }
  async ionViewWillEnter() {

    console.log("entering account page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this.unsubscribeData();
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
      if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this.unsubscribeData();
      await this.initialiseItems();
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    this.unsubscribeData();
    console.log("leaving acount page");
  }

  /**
  * Initialises items.
  */
  async initialiseItems(): Promise<void> {
    this.userEmailAddress = await this._authService.afAuth.currentUser.then(u => u.email);
    this.userName = await this._authService.afAuth.currentUser.then(u => u.displayName);
    this.subscriptionsList.push((await this._userService.getUserFields()).subscribe(x => this.mapUserOptionsToNgModels(x.Options)));
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
  }

  /**
   * Maps NgModels to User Options.
   * @param darkMode DarkMode Model.
   * @param useOnlyPersonalDb UseOnlyPersonalDb Model.
   * @returns User Options.
   */
  mapNgModelsToUserOptions(darkMode: boolean, useOnlyPersonalDb: String): Options {
    return <Options>{
      DarkMode: darkMode,
      UseOnlyPersonalDb: useOnlyPersonalDb == "1" ? true : false,
    };
  }

  /**
   * Updates User Options in Firestore.
   */
  async updateUserOptions(): Promise<void> {
    console.log("Use Only Personal Db: " + this.useOnlyPersonalDb);
    console.log("DarkMode: " + this.darkMode);
    const user = <User>{
      Options: this.mapNgModelsToUserOptions(this.darkMode, this.useOnlyPersonalDb)
    }
    console.log("Updating Firestore");
    await this._userService.updateUserFields(user);
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
    console.log("TODO: Erasing personal database!!");
  }


  /**
  * Erases all daily tracking records.
  */
  async eraseDailyTrackingRecords(): Promise<void> {
    console.log("TODO: Erase all daily tracking records!!");
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

  /**
  * Present Network alert when there is no connection.
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
  * Unsubscribes all subscriptions initiated in this tab.
  */
  unsubscribeData(): void {
    this.subscriptionsList.forEach(item => {
      if (!item.closed) item.unsubscribe();
    })
    this.subscriptionsList = [];
  }
}
