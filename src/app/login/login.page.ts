import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private _toastService: ToastService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this._formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  /**
   * Will be triggered, if you come back to a page.
   */
  ionViewWillEnter() {
    console.log("Entering login page");
    // Android hardware back button actions 
    App.addListener('backButton', data => {
      App.exitApp();
    });
  }

  ionViewWillLeave() {
    console.log("leaving login page");
    App.removeAllListeners();
  }

  async tryLogin(value) {
    await this._authService.doLogin(value)
      .then(async () => {
        if((await this._authService.afAuth.currentUser.then(u => u.emailVerified))) {
          this._router.navigate(["/tabs"]);
        }
        else {
          this.errorMessage = "Email not verified";
        }
      }, err => {
        this.errorMessage = err.message;
      })
  }

  async goRegisterPage() {
    await this._router.navigate(["/register"]);
  }

  async goResetPasswordPage() {
    await this._router.navigate(["/reset_password"]);
  }

  async presentToast(value) {
    await this._toastService.presentToast(value);
  }
}