(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-account-tab-account-module"],{

/***/ "1++Z":
/*!***************************************************!*\
  !*** ./src/app/tab-account/tab-account.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".row {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYi1hY2NvdW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLG1CQUFBO0FBQUoiLCJmaWxlIjoidGFiLWFjY291bnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ucm93e1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH0iXX0= */");

/***/ }),

/***/ "dBrg":
/*!*************************************************!*\
  !*** ./src/app/tab-account/tab-account.page.ts ***!
  \*************************************************/
/*! exports provided: TabAccountPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabAccountPage", function() { return TabAccountPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab_account_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab-account.page.html */ "y4ig");
/* harmony import */ var _tab_account_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab-account.page.scss */ "1++Z");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "lGQG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






//import { SettingsUserComponent } from './settings-user/settings-user.component';
let TabAccountPage = class TabAccountPage {
    //profilePhoto: string;
    constructor(popoverController, _authService) {
        this.popoverController = popoverController;
        this._authService = _authService;
        this.currentPopover = null;
    }
    ionViewWillEnter() {
        console.log("entering acount page");
        this.initialiseItems();
        // this.authService.doUpdateDisplayName("Stelios");
    }
    ionViewWillLeave() {
        console.log("leaving acount page");
    }
    initialiseItems() {
        this.emailAddress = this._authService.afAuth.auth.currentUser.email;
        //this.profilePhoto = this.authService.afAuth.auth.currentUser.photoURL;
        this.userName = this._authService.afAuth.auth.currentUser.displayName;
    }
    logout() {
        this._authService.doLogout();
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
};
TabAccountPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
];
TabAccountPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab-account',
        template: _raw_loader_tab_account_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab_account_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
], TabAccountPage);



/***/ }),

/***/ "y4ig":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-account/tab-account.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("  <!--<ion-toolbar>\n  <ion-buttons slot=\"primary\">\n  <ion-button (click)=\"presentPopover($event)\">\n      <ion-icon slot=\"icon-only\" ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\"></ion-icon>\n    </ion-button>\n  </ion-buttons>\n</ion-toolbar>\n-->\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-3></ion-col>\n      <ion-col col-6 style=\"text-align: center;\">\n        <img style=\"text-align: center;\" expand=\"block\" src=\"assets/avatar.png\" button>\n      </ion-col>\n      <ion-col col-3></ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-card>\n    <ion-card-header>\n      <ion-card-subtitle>Name</ion-card-subtitle>\n      <ion-card-title>\n        <ion-row>\n          <ion-col>\n            {{userName}}\n          </ion-col>\n          <ion-col style=\"text-align: end;\">\n            <ion-icon name=\"create-outline\" button></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-card-title>\n      <ion-card-subtitle>Email</ion-card-subtitle>\n      <ion-card-title>{{emailAddress}}</ion-card-title>\n    </ion-card-header>\n  </ion-card>\n  <ion-button class=\"button\" color=\"danger\" expand=\"block\" (click)=\"logout()\">Log out</ion-button>\n</ion-content>");

/***/ }),

/***/ "yMg7":
/*!***************************************************!*\
  !*** ./src/app/tab-account/tab-account.module.ts ***!
  \***************************************************/
/*! exports provided: TabAccountPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabAccountPageModule", function() { return TabAccountPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab_account_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab-account.page */ "dBrg");







let TabAccountPageModule = class TabAccountPageModule {
};
TabAccountPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab_account_page__WEBPACK_IMPORTED_MODULE_6__["TabAccountPage"] }])
        ],
        declarations: [_tab_account_page__WEBPACK_IMPORTED_MODULE_6__["TabAccountPage"]]
    })
], TabAccountPageModule);



/***/ })

}]);
//# sourceMappingURL=tab-account-tab-account-module.js.map