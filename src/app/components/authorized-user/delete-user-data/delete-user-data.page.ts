import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-delete-user-data',
  templateUrl: './delete-user-data.page.html',
  styleUrls: ['./delete-user-data.page.scss'],
})
export class DeleteUserDataPage {

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
    this.initialiseItems();
  }

  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
  }

  /**
  * Do before enter page.
  */
  ionViewWillEnter() {
    //console.log("entering delete-user-data");
    this.initialiseItems();
  }

  /**
  * Do before leave page.
  */
  async ionViewWillLeave() {
    //console.log("Leaving delete-user-data");
  }

  /**
  * Initialises Items.
  */
  initialiseItems(): void {
  }

  /**
   * Routes back to "account" tab.
   */
  async goToAccontTab(): Promise<void> {
    await this._router.navigate(["/tabs/account"]);
  }

  /**
   * Delete user data and logout.
   */
  async tryDeleteUserDataAndLogout() {
    await this._authService.doDeleteAccount()
      .then(async res => {
        this.errorMessage = "";
        this.successMessage = "Account and data deleted!";
        this.clearCookiesAndSession();
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  /**
   * Clears cookies and session.
   */
  clearCookiesAndSession(): void {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
  }

}

