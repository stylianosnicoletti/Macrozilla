(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-analytics-tab-analytics-module"],{

/***/ "5hTM":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-analytics/tab-analytics.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12 col-md-6 col-lg-4 col-xl-3>\n        <ion-card style=\"text-align: center;\">\n           <ion-card-header>\n        <ion-card-title>All Time Average Calories</ion-card-title>\n        <ion-card-title><strong>🔋{{allTimeAverageCalories}} kcal</strong></ion-card-title>\n      </ion-card-header>\n        </ion-card>\n      </ion-col>\n      <ion-col col-12 col-md-6 col-lg-4 col-xl-3>\n        <ion-card style=\"text-align: center;\">\n           <ion-card-header>\n        <ion-card-title>All Time Calories</ion-card-title>\n      </ion-card-header>\n          <ion-card-content>\n            <canvas #lineChartCaloriesAllTime></canvas>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col col-12 col-md-6 col-lg-4 col-xl-3>\n        <ion-card style=\"text-align: center;\">\n           <ion-card-header>\n        <ion-card-title>All Time Average Macro Ratio</ion-card-title>\n      </ion-card-header>\n          <ion-card-content>\n            <canvas #pieChartMacrosAllTime></canvas>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n<!--future development\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>Ranged Time Calories</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #barChartCaloriesSelectedTme></canvas>\n      </ion-card-content>\n      <ion-item>\n        <ion-range id=\"dual-range\" dual-knobs pin color=\"dark\">\n          <ion-icon slot=\"start\" size=\"small\" name=\"calendar-outline\"></ion-icon>\n          <ion-icon slot=\"end\" name=\"calendar-outline\"></ion-icon>\n        </ion-range>\n      </ion-item>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-header>\n        <ion-card-title>Ranged Time Calories</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #pieChartMacrosSelectedTime></canvas>\n        <ion-item>\n          <ion-range id=\"dual-range\" mindual-knobs pin color=\"dark\">\n            <ion-icon slot=\"start\" size=\"small\" name=\"calendar-outline\"></ion-icon>\n            <ion-icon slot=\"end\" name=\"calendar-outline\"></ion-icon>\n          </ion-range>\n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n\n  -->");

/***/ }),

/***/ "9cJo":
/*!*******************************************************!*\
  !*** ./src/app/tab-analytics/tab-analytics.module.ts ***!
  \*******************************************************/
/*! exports provided: TabAnalyticsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabAnalyticsPageModule", function() { return TabAnalyticsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab_analytics_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab-analytics.page */ "tuqd");







let TabAnalyticsPageModule = class TabAnalyticsPageModule {
};
TabAnalyticsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab_analytics_page__WEBPACK_IMPORTED_MODULE_6__["TabAnalyticsPage"] }])
        ],
        declarations: [_tab_analytics_page__WEBPACK_IMPORTED_MODULE_6__["TabAnalyticsPage"]]
    })
], TabAnalyticsPageModule);



/***/ }),

/***/ "Gaoh":
/*!*******************************************************!*\
  !*** ./src/app/tab-analytics/tab-analytics.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-card {\n  --opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYi1hbmFseXRpY3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUJBQUE7QUFDSiIsImZpbGUiOiJ0YWItYW5hbHl0aWNzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJkIHtcbiAgICAtLW9wYWNpdHk6IDEgIWltcG9ydGFudDtcbiB9Il19 */");

/***/ }),

/***/ "tuqd":
/*!*****************************************************!*\
  !*** ./src/app/tab-analytics/tab-analytics.page.ts ***!
  \*****************************************************/
/*! exports provided: TabAnalyticsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabAnalyticsPage", function() { return TabAnalyticsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab_analytics_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab-analytics.page.html */ "5hTM");
/* harmony import */ var _tab_analytics_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab-analytics.page.scss */ "Gaoh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_summary_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/summary.service */ "5KKm");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/screen-orientation/ngx */ "0QAI");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! chart.js */ "MO+k");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_8__);









let TabAnalyticsPage = class TabAnalyticsPage {
    constructor(_summaryService, _alertController, _network, _screenOrientation) {
        this._summaryService = _summaryService;
        this._alertController = _alertController;
        this._network = _network;
        this._screenOrientation = _screenOrientation;
        this.bars = [];
        this.subscriptionsList = [];
    }
    ionViewWillEnter() {
        console.log("entering analytics page");
        this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
            this.unsubscribeData();
            this.presentNetworkAlert();
            console.log('network was disconnected :-(');
        });
        this.connectSubscription = this._network.onConnect().subscribe(() => {
            this.unsubscribeData();
            this.initialiseItems();
            console.log('network connected!');
        });
        this.screenOrientationSubscription = this._screenOrientation.onChange().subscribe(() => {
            console.log("Orientation Changed");
            this.ionViewWillLeave();
            //need to find a better way
            //now am enabling portrain onluy from android manifest
            //location.reload();
        });
        this.initialiseItems();
    }
    ionViewWillLeave() {
        console.log("leaving analytics page");
        this.unsubscribeData();
        this.unsubscribeNetwork();
        this.unsubscribeOrientation();
    }
    unsubscribeNetwork() {
        if (!this.connectSubscription.closed)
            this.connectSubscription.unsubscribe();
        if (!this.disconnectSubscription.closed)
            this.disconnectSubscription.unsubscribe();
    }
    unsubscribeOrientation() {
        if (!this.screenOrientationSubscription.closed)
            this.screenOrientationSubscription.unsubscribe();
    }
    unsubscribeData() {
        this.subscriptionsList.forEach(item => {
            if (!item.closed)
                item.unsubscribe();
        });
        this.subscriptionsList = [];
    }
    initialiseItems() {
        this.prepareAllTimeCharts();
    }
    // No network alert
    presentNetworkAlert() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this._alertController.create({
                header: 'No Data Connection',
                message: 'Consider turning on mobile data or Wi-Fi.',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    averageOfArray(array) {
        return this.sumOfArray(array) / array.length;
    }
    sumOfArray(array) {
        return array.reduce((previous, current) => current += previous);
    }
    precise_round(num, decimals) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
    prepareAllTimeCharts() {
        this.subscriptionsList.push(this._summaryService.getAllSummaries().subscribe(r => {
            this.allTimeDates = [];
            this.allTimeCalories = [];
            this.allTimeProteinCalories = 0;
            this.allTimeCarbsCalories = 0;
            this.allTimeSaturatedCalories = 0;
            this.allTimeUnsaturatedCalories = 0;
            this.allTimeCaloriesCalculatedFromMacros = 0;
            r.forEach(a => {
                this.allTimeDates.push(a.key);
                this.allTimeCalories.push(this.precise_round(a.totalCalories, 0));
                this.allTimeCaloriesCalculatedFromMacros += (a.totalGramsCarbohydrates * 4 + a.totalGramsFats * 9 + a.totalGramsProtein * 4);
                this.allTimeProteinCalories += a.totalGramsProtein * 4;
                this.allTimeCarbsCalories += a.totalGramsCarbohydrates * 4;
                this.allTimeSaturatedCalories += a.totalGramsSaturated * 9;
                this.allTimeUnsaturatedCalories += ((a.totalGramsFats * 9) - (a.totalGramsSaturated * 9));
            });
            this.allTimeAverageCalories = this.precise_round(this.averageOfArray(this.allTimeCalories), 0);
            this.createAllTimeCharts();
        }));
    }
    createAllTimeCharts() {
        this.bars.push(new chart_js__WEBPACK_IMPORTED_MODULE_8__(this.lineChartCaloriesAllTime.nativeElement, {
            type: 'line',
            data: {
                // Labels: Dates
                labels: this.allTimeDates,
                datasets: [{
                        // Data : Calories
                        data: this.allTimeCalories,
                        backgroundColor: '#7FB3D5',
                        borderWidth: 1,
                    }
                ]
            },
            options: {
                legend: null,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: null
                            }
                        }]
                }
            }
        }));
        this.bars.push(new chart_js__WEBPACK_IMPORTED_MODULE_8__(this.pieChartMacrosAllTime.nativeElement, {
            type: 'doughnut',
            data: {
                labels: [(this.allTimeProteinCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Protein',
                    (this.allTimeUnsaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Unsaturated Fat',
                    (this.allTimeSaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Saturated Fat',
                    (this.allTimeCarbsCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Carbohydrates'],
                datasets: [{
                        // Percentages of macros
                        data: [(this.allTimeProteinCalories / this.allTimeCaloriesCalculatedFromMacros),
                            (this.allTimeUnsaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
                            (this.allTimeSaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
                            (this.allTimeCarbsCalories / this.allTimeCaloriesCalculatedFromMacros)],
                        backgroundColor: ['#00bdaa', '#400082', '#fe346e', '#f1e7b6'],
                        borderColor: ['#00bdaa', '#400082', '#fe346e', '#f1e7b6'],
                        borderWidth: 1
                    }]
            },
            options: {
                tooltips: { enabled: false },
                hover: { mode: null },
                legend: {
                    position: 'right'
                },
                scales: {
                    yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }]
                }
            }
        }));
    }
};
TabAnalyticsPage.ctorParameters = () => [
    { type: _services_summary_service__WEBPACK_IMPORTED_MODULE_4__["SummaryService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_6__["Network"] },
    { type: _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_7__["ScreenOrientation"] }
];
TabAnalyticsPage.propDecorators = {
    lineChartCaloriesAllTime: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['lineChartCaloriesAllTime',] }],
    pieChartMacrosAllTime: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['pieChartMacrosAllTime',] }]
};
TabAnalyticsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab-analytics',
        template: _raw_loader_tab_analytics_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab_analytics_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_summary_service__WEBPACK_IMPORTED_MODULE_4__["SummaryService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_6__["Network"],
        _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_7__["ScreenOrientation"]])
], TabAnalyticsPage);



/***/ })

}]);
//# sourceMappingURL=tab-analytics-tab-analytics-module.js.map