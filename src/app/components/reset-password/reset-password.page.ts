import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  async tryPasswordReset(value) {
    await this.authService.doPasswordReset(value)
      .then(async res => {
        this.errorMessage = "";
        this.successMessage = "Reset password link sent to email address";
        await this.goToLoginPage();
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  async goToLoginPage() {
    await this.router.navigate(["/login"]);
  }

  async presentToast(value) {
    await this.toastService.presentToast(value);
  }


}