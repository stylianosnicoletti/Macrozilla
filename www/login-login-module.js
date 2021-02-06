(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "34Y5":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./login.page.html */ "V6Ie");
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.page.scss */ "r67e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/toast.service */ "2g2N");








let LoginPage = class LoginPage {
    constructor(toastService, authService, formBuilder, router) {
        this.toastService = toastService;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.errorMessage = '';
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
        };
    }
    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(5),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ])),
        });
    }
    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
            if (this.authService.afAuth.auth.currentUser.emailVerified) {
                this.router.navigate(["/tabs"]);
            }
            else {
                this.errorMessage = "Email not verified";
            }
        }, err => {
            this.errorMessage = err.message;
        });
    }
    goRegisterPage() {
        this.router.navigate(["/register"]);
    }
    goResetPasswordPage() {
        this.router.navigate(["/reset_password"]);
    }
    presentToast(value) {
        this.toastService.presentToast(value);
    }
};
LoginPage.ctorParameters = () => [
    { type: _services_toast_service__WEBPACK_IMPORTED_MODULE_7__["ToastService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
LoginPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_toast_service__WEBPACK_IMPORTED_MODULE_7__["ToastService"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
], LoginPage);



/***/ }),

/***/ "V6Ie":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.page.html ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>Log In</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"form-content\">\n  <form class=\"form\" [formGroup]=\"validations_form\" (ngSubmit)=\"tryLogin(validations_form.value)\"\n    (keyup.enter)=\"tryLogin(validations_form.value)\">\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\">Email</ion-label>\n      <ion-input type=\"text\" formControlName=\"email\"></ion-input>\n    </ion-item>\n    <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of validation_messages.email\">\n        <div class=\"error-message-email\"\n          *ngIf=\"validations_form.get('email').hasError(validation.type) && (validations_form.get('email').dirty || validations_form.get('email').touched)\">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n    <ion-item>\n      <ion-label position=\"floating\" color=\"primary\">Password</ion-label>\n      <ion-input type=\"password\" formControlName=\"password\"></ion-input>\n    </ion-item>\n    <div class=\"validation-errors\">\n      <ng-container *ngFor=\"let validation of validation_messages.password\">\n        <div class=\"error-message-password\"\n          *ngIf=\"validations_form.get('password').hasError(validation.type) && (validations_form.get('password').dirty || validations_form.get('password').touched)\">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n    <ion-button class=\"email-log-in-button\" expand=\"block\" type=\"submit\" [disabled]=\"!validations_form.valid\">Log In\n    </ion-button>\n\n    <p class=\"go-to-forgot-password\">\n      Forgot you password? <a (click)=\"goResetPasswordPage()\">Recover it.</a>\n    </p>\n    <!--  <ion-button class=\"google-log-in-button\" color=\"danger\" expand=\"block\" (click)=\"presentToast('Currently not available')\">\n        LOG IN WITH GOOGLE\n    </ion-button>-->\n    <ion-button class=\"register-button\" color=\"success\" expand=\"block\" (click)=\"goRegisterPage()\">\n      REGISTER\n    </ion-button>\n    <label class=\"error-message-login\">{{errorMessage}}</label>\n  </form>\n\n</ion-content>");

/***/ }),

/***/ "X3zk":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "34Y5");







const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "r67e":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".error-message-email {\n  color: var(--ion-color-danger);\n  padding-top: 10px;\n  padding-left: 15px;\n}\n\n.error-message-password {\n  color: var(--ion-color-danger);\n  padding-top: 10px;\n  padding-left: 15px;\n}\n\n.error-message-login {\n  color: var(--ion-color-danger);\n  text-align: center;\n  padding-left: 15px;\n}\n\n.go-to-forgot-password {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVDLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUFEOztBQUdBO0VBRUMsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBREQ7O0FBSUE7RUFFQyw4QkFBQTtFQUNBLGtCQUFBO0VBRUEsa0JBQUE7QUFIRDs7QUFNQTtFQUVFLGtCQUFBO0FBSkYiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yLW1lc3NhZ2UtZW1haWxcclxue1xyXG4gY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gcGFkZGluZy10b3A6IDEwcHg7XHJcbiBwYWRkaW5nLWxlZnQ6IDE1cHggO1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZS1wYXNzd29yZFxyXG57XHJcbiBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiBwYWRkaW5nLXRvcDogMTBweDtcclxuIHBhZGRpbmctbGVmdDogMTVweCA7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlLWxvZ2luXHJcbntcclxuIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiBwYWRkaW5nLWxlZnQ6IDE1cHggO1xyXG59XHJcblxyXG4uZ28tdG8tZm9yZ290LXBhc3N3b3JkXHJcbntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuIl19 */");

/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map