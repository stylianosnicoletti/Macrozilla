(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs-tabs-module"],{

/***/ "AHrv":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tabs/tabs.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<ion-tabs>\n  <!-- The ion-tab-button tab=\"daily_entry\"> takes the routes from tabs-routing.module.ts -->\n  <ion-tab-bar slot=\"bottom\">\n    <ion-tab-button tab=\"daily_entry\">\n      <ion-icon name=\"calendar-outline\"></ion-icon>\n      <ion-label>Daily Entry</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"foods_database\">\n      <ion-icon name=\"file-tray-stacked-outline\"></ion-icon>\n      <ion-label>Foods Database</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"analytics\">\n      <ion-icon name=\"bar-chart-outline\"></ion-icon>\n      <ion-label>Analytics</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"account\">\n      <ion-icon name=\"person-outline\"></ion-icon>\n      <ion-label>Account</ion-label>\n    </ion-tab-button>\n  </ion-tab-bar>\n</ion-tabs>");

/***/ }),

/***/ "MJr+":
/*!***********************************!*\
  !*** ./src/app/tabs/tabs.page.ts ***!
  \***********************************/
/*! exports provided: TabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPage", function() { return TabsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tabs.page.html */ "AHrv");
/* harmony import */ var _tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs.page.scss */ "PkIa");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let TabsPage = class TabsPage {
    constructor() { }
};
TabsPage.ctorParameters = () => [];
TabsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tabs',
        template: _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], TabsPage);



/***/ }),

/***/ "PkIa":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJzLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "hO9l":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/*! exports provided: TabsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs-routing.module */ "kB8F");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs.page */ "MJr+");







let TabsPageModule = class TabsPageModule {
};
TabsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabsPageRoutingModule"]
        ],
        declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_6__["TabsPage"]]
    })
], TabsPageModule);



/***/ }),

/***/ "kB8F":
/*!*********************************************!*\
  !*** ./src/app/tabs/tabs-routing.module.ts ***!
  \*********************************************/
/*! exports provided: TabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageRoutingModule", function() { return TabsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs.page */ "MJr+");
/* harmony import */ var _guards_can_enter_tabs_page_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../guards/can-enter-tabs-page.guard */ "7Mea");





const routes = [
    {
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_3__["TabsPage"],
        // Remember to enter the guard that checks if user is authenticated to enter the tabs
        canActivate: [_guards_can_enter_tabs_page_guard__WEBPACK_IMPORTED_MODULE_4__["CanEnterTabsPageGuard"]],
        children: [
            {
                path: 'daily_entry',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() | tab-daily-entry-tab-daily-entry-module */[__webpack_require__.e("common"), __webpack_require__.e("tab-daily-entry-tab-daily-entry-module")]).then(__webpack_require__.bind(null, /*! ../tab-daily-entry/tab-daily-entry.module */ "f/0e")).then(m => m.TabDailyEntryPageModule)
                    }
                ]
            },
            {
                path: 'foods_database',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() | tab-foods-database-tab-foods-database-module */[__webpack_require__.e("common"), __webpack_require__.e("tab-foods-database-tab-foods-database-module")]).then(__webpack_require__.bind(null, /*! ../tab-foods-database/tab-foods-database.module */ "7a9s")).then(m => m.TabFoodsDatabasePageModule)
                    }
                ]
            },
            {
                path: 'analytics',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() | tab-analytics-tab-analytics-module */[__webpack_require__.e("common"), __webpack_require__.e("tab-analytics-tab-analytics-module")]).then(__webpack_require__.bind(null, /*! ../tab-analytics/tab-analytics.module */ "9cJo")).then(m => m.TabAnalyticsPageModule)
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.all(/*! import() | tab-account-tab-account-module */[__webpack_require__.e("common"), __webpack_require__.e("tab-account-tab-account-module")]).then(__webpack_require__.bind(null, /*! ../tab-account/tab-account.module */ "yMg7")).then(m => m.TabAccountPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/daily_entry',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], TabsPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=tabs-tabs-module.js.map