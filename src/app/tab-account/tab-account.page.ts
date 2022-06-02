import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Network } from '@capacitor/network';
import { User, Options } from '../models/user.model';
import { UnsubscribeService } from '../services/unsubscribe.service';

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
  transferEntriesEnabled: boolean;
  useOnlyPersonalDb: string;
  lastNetworkStatusIsConnected = true;


  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _alertController: AlertController,
    private _unsubscribeService: UnsubscribeService) {
  }
  async ionViewWillEnter() {

    //console.log("entering account page");

    Network.addListener('networkStatusChange', async status => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        //console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.initialiseItems();
      }
      else if(!status.connected) {
        //console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.presentNetworkAlert();
      }
    });
    
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    Network.removeAllListeners();
    //console.log("leaving acount page");
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
    this.transferEntriesEnabled = opt.TransferEntriesEnabled;
  }

  /**
   * Maps NgModels to User Options.
   * @param darkMode DarkMode Model.
   * @param useOnlyPersonalDb UseOnlyPersonalDb Model.
   * @returns User Options.
   */
  mapNgModelsToUserOptions(darkMode: boolean, useOnlyPersonalDb: String, transferEntriesEnabled: boolean): Options {
    return <Options>{
      DarkMode: darkMode,
      UseOnlyPersonalDb: useOnlyPersonalDb == "1" ? true : false,
      TransferEntriesEnabled: transferEntriesEnabled,
      
    };
  }

  /**
   * Updates User Options in Firestore.
   */
  async updateUserOptions(): Promise<void> {
    const user = <User>{
      Options: this.mapNgModelsToUserOptions(this.darkMode, this.useOnlyPersonalDb, this.transferEntriesEnabled)
    }
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
}
