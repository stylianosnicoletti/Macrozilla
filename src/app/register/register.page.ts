import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'userName': [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 5 character long.' },
      { type: 'maxlength', message: 'Name must be at less than 50 character long.' },
      { type: 'pattern', message: 'Name must be only text.' }
    ],

  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      userName: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(50),
        Validators.required
      ]))
    });
  }

  async tryRegister(value) {
    await this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Account created. Please verify your email to login.";
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  async goToLoginPage() {
    await this.router.navigate(["/login"]);
  }

}