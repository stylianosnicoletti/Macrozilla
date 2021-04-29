import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PopoverController } from '@ionic/angular';
//import { SettingsUserComponent } from './settings-user/settings-user.component';


@Component({
  selector: 'app-tab-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss']
})
export class TabAccountPage {

  currentPopover: any = null;
  emailAddress: string;
  userName: string;
  //profilePhoto: string;

  constructor(
    public popoverController: PopoverController,
    private _authService: AuthService) {
  }
  async ionViewWillEnter() {
    console.log("entering acount page");
    await this.initialiseItems();
    // this.authService.doUpdateDisplayName("Stelios");
  }

  ionViewWillLeave() {
    console.log("leaving acount page");
  }

  async initialiseItems() {
    this.emailAddress = await this._authService.afAuth.currentUser.then(u => u.email);
    //this.profilePhoto = this.authService.afAuth.auth.currentUser.photoURL;
    this.userName = await this._authService.afAuth.currentUser.then(u => u.displayName);
  }

  async logout() {
    await this._authService.doLogout();
    this.clearCookies();
  }

  clearCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
