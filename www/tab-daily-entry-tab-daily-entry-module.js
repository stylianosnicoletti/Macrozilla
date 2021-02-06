(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-daily-entry-tab-daily-entry-module"],{

/***/ "SeF5":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-daily-entry/tab-daily-entry.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-item>\n  <ion-label> Select Date</ion-label>\n  <ion-datetime displayFormat=\"DD/MM/YYYY\" [(ngModel)]=\"date\" (ionChange)=\"parseDate()\" value={{date}}>\n  </ion-datetime>\n</ion-item>\n\n<ion-card>\n  <ion-card-header>\n    <ion-card-title>\n      <strong>🔋{{ summaryDay?.totalCalories  | number:'1.0-0' }} kcal</strong></ion-card-title>\n  </ion-card-header>\n\n  <ion-card-content>\n    <strong>\n      🥩\n      {{ summaryDay?.totalGramsProtein *4 / (summaryDay?.totalGramsProtein*4 + summaryDay?.totalGramsCarbohydrates*4 +summaryDay?.totalGramsFats*9) * 100 | number:'1.0-0'}}%\n      🍞\n      {{ summaryDay?.totalGramsCarbohydrates *4 / (summaryDay?.totalGramsProtein *4 + summaryDay?.totalGramsCarbohydrates*4 +summaryDay?.totalGramsFats*9) * 100 | number:'1.0-0'}}%\n      🐖\n      {{ summaryDay?.totalGramsFats *9 / (summaryDay?.totalGramsProtein *4 + summaryDay?.totalGramsCarbohydrates*4 +summaryDay?.totalGramsFats*9) * 100 | number:'1.0-0'}}%\n      :\n      (\n      ✔️\n      {{ (summaryDay?.totalGramsFats-summaryDay?.totalGramsSaturated ) * 9 / (summaryDay?.totalGramsProtein *4 + summaryDay?.totalGramsCarbohydrates*4 +summaryDay?.totalGramsFats*9) * 100 | number:'1.0-0'}}%\n      ❌\n      {{ summaryDay?.totalGramsSaturated *9 / (summaryDay?.totalGramsProtein *4 + summaryDay?.totalGramsCarbohydrates*4 +summaryDay?.totalGramsFats*9) * 100 | number:'1.0-0'}}%\n      )\n    </strong>\n  </ion-card-content>\n</ion-card>\n\n<ion-content>\n  \n  <!-- Default Refresher -->\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n    <ion-list>\n      <ion-item-sliding *ngFor=\"let entry of dailyEntriesList\" #slidingItem>\n        <ion-item>\n          <ion-label class=\"ion-text-wrap\">\n            <h2><strong>{{entry.food.name}}</strong></h2>\n            <h3>🔋 {{entry.food.calories * entry.qty | number:'1.0-1' }}kcal 🥩\n              {{entry.food.protein * entry.qty | number:'1.0-1' }}g 🍞\n              {{entry.food.carbohydrates * entry.qty | number:'1.0-1' }}g 🐖\n              {{entry.food.fats * entry.qty | number:'1.0-1' }}g</h3>\n          </ion-label>\n\n          <ion-chip slot=\"end\" color=\"primary\">\n            ×&nbsp;<strong>{{entry.qty | number:'1.2-2'}}</strong>\n          </ion-chip>\n        </ion-item>\n        <ion-item-options side=\"end\">\n          <ion-item-option color=\"danger\" (click)=\"presentAlertConfirm(entry,slidingItem)\">\n            <ion-icon name=\"trash\"></ion-icon>\n            Delete\n          </ion-item-option>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  \n  <!-- Fab placed to the bottom end -->\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)=\"addNewEntry()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n  \n</ion-content>");

/***/ }),

/***/ "f/0e":
/*!***********************************************************!*\
  !*** ./src/app/tab-daily-entry/tab-daily-entry.module.ts ***!
  \***********************************************************/
/*! exports provided: TabDailyEntryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabDailyEntryPageModule", function() { return TabDailyEntryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab_daily_entry_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab-daily-entry.page */ "shDJ");








let TabDailyEntryPageModule = class TabDailyEntryPageModule {
};
TabDailyEntryPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab_daily_entry_page__WEBPACK_IMPORTED_MODULE_6__["TabDailyEntryPage"] }])
        ],
        declarations: [_tab_daily_entry_page__WEBPACK_IMPORTED_MODULE_6__["TabDailyEntryPage"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]
        ]
    })
], TabDailyEntryPageModule);



/***/ }),

/***/ "rH/p":
/*!***********************************************************!*\
  !*** ./src/app/tab-daily-entry/tab-daily-entry.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\nion-card {\n  --background: #3880ff;\n}\n\nion-card-title {\n  color: white;\n}\n\nion-card-content {\n  font-size: larger;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYi1kYWlseS1lbnRyeS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtBQUNGOztBQUNBO0VBQ0UsWUFBQTtBQUVGOztBQUNBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBRUYiLCJmaWxlIjoidGFiLWRhaWx5LWVudHJ5LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53ZWxjb21lLWNhcmQgaW1nIHtcbiAgbWF4LWhlaWdodDogMzV2aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuaW9uLWNhcmQge1xuICAtLWJhY2tncm91bmQ6ICMzODgwZmY7Ly8gcmdiKDcwLCAxNzUsIDI0NSkgO1xufVxuaW9uLWNhcmQtdGl0bGV7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuaW9uLWNhcmQtY29udGVudHtcbiAgZm9udC1zaXplOiBsYXJnZXI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuaW9uLWRhdGV0aW1lIHsgXG4gIC8vZm9udC1zaXplOiBsYXJnZXI7XG59XG5cbiJdfQ== */");

/***/ }),

/***/ "shDJ":
/*!*********************************************************!*\
  !*** ./src/app/tab-daily-entry/tab-daily-entry.page.ts ***!
  \*********************************************************/
/*! exports provided: TabDailyEntryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabDailyEntryPage", function() { return TabDailyEntryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab_daily_entry_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab-daily-entry.page.html */ "SeF5");
/* harmony import */ var _tab_daily_entry_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab-daily-entry.page.scss */ "rH/p");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _services_food_entry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/food-entry.service */ "bu6J");
/* harmony import */ var _services_summary_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/summary.service */ "5KKm");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/loading.service */ "7ch9");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");











let TabDailyEntryPage = class TabDailyEntryPage {
    constructor(_router, _datePipe, _foodEntryService, _summaryService, _loadingService, _alertController, _network) {
        this._router = _router;
        this._datePipe = _datePipe;
        this._foodEntryService = _foodEntryService;
        this._summaryService = _summaryService;
        this._loadingService = _loadingService;
        this._alertController = _alertController;
        this._network = _network;
        this.subscriptionsList = [];
    }
    ionViewWillEnter() {
        console.log("entering daily entries page");
        this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
            this.unsubscribeData();
            this.presentNetworkAlert();
            console.log('network was disconnected :-(');
            if (!this.connectSubscription.closed)
                this.connectSubscription.unsubscribe();
        });
        this.connectSubscription = this._network.onConnect().subscribe(() => {
            this.unsubscribeData();
            this.initialiseItems();
            console.log('network connected!');
        });
        this.initialiseItems();
    }
    ionViewWillLeave() {
        console.log("leaving daily entries page");
        this.unsubscribeData();
        this.unsubscribeNetwork();
    }
    unsubscribeNetwork() {
        if (!this.connectSubscription.closed)
            this.connectSubscription.unsubscribe();
        if (!this.disconnectSubscription.closed)
            this.disconnectSubscription.unsubscribe();
    }
    unsubscribeData() {
        this.subscriptionsList.forEach(item => {
            if (!item.closed)
                item.unsubscribe();
        });
        this.subscriptionsList = [];
    }
    initialiseItems() {
        this.transformDate(Date.now());
    }
    doRefresh(event) {
        this.initialiseItems();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
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
    // Transforms a the date to a specifed format and observe summary for that date
    transformDate(myDate) {
        this.date = this._datePipe.transform(myDate, 'yyyy-MM-dd');
        this.subscriptionsList.push(this._foodEntryService.getAllFoodEntriesByDate(this.date).subscribe(x => this.dailyEntriesList = x));
        this.subscriptionsList.push(this._summaryService.getSummaryObservable(this.date).subscribe(x => this.summaryDay = x));
    }
    // Parse selected date
    parseDate() {
        this.transformDate(this.date);
    }
    // Delete Confirmation
    presentAlertConfirm(entryArg, slidingItem) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.numberOfEntriesByDate = yield this._foodEntryService.getNumberOfFoodEntriesByDate(this.date);
            this.entrySummary = this.createEntrySummary(entryArg);
            this.existingSummary = yield this._summaryService.getSummary(this.date);
            const alert = yield this._alertController.create({
                header: 'Do you want to proceed deleting?',
                message: entryArg.food.name + ' Qty: ' + entryArg.qty,
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            slidingItem.close();
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            if (this.numberOfEntriesByDate > 1) {
                                this._foodEntryService.deleteFoodEntry(entryArg.key, this.date);
                                // Decrement summary on entry deletion 
                                this._summaryService.decrementExisitngSummary(this.existingSummary, this.entrySummary, this.date);
                            }
                            else {
                                // Remove summary on last entry deletion 
                                this._foodEntryService.deleteFoodEntry(entryArg.key, this.date);
                                this._summaryService.removeSummary(this.date);
                            }
                            slidingItem.close();
                            this._loadingService.presentLoading('Deleting..', 500);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    // Prepare summary of food entry selected 
    createEntrySummary(foodEntryArg) {
        return {
            key: null,
            totalGramsProtein: foodEntryArg.food.protein * foodEntryArg.qty,
            totalGramsFats: foodEntryArg.food.fats * foodEntryArg.qty,
            totalGramsSaturated: foodEntryArg.food.saturated * foodEntryArg.qty,
            totalGramsCarbohydrates: foodEntryArg.food.carbohydrates * foodEntryArg.qty,
            totalCalories: foodEntryArg.food.calories * foodEntryArg.qty,
        };
    }
    // Add New Entry
    addNewEntry() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._router.navigate(["/add_entry/" + this.date]);
        });
    }
};
TabDailyEntryPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _services_food_entry_service__WEBPACK_IMPORTED_MODULE_6__["FoodEntryService"] },
    { type: _services_summary_service__WEBPACK_IMPORTED_MODULE_7__["SummaryService"] },
    { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_9__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__["Network"] }
];
TabDailyEntryPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab-daily-entry',
        template: _raw_loader_tab_daily_entry_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab_daily_entry_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"],
        _services_food_entry_service__WEBPACK_IMPORTED_MODULE_6__["FoodEntryService"],
        _services_summary_service__WEBPACK_IMPORTED_MODULE_7__["SummaryService"],
        _services_loading_service__WEBPACK_IMPORTED_MODULE_9__["LoadingService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"],
        _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__["Network"]])
], TabDailyEntryPage);



/***/ })

}]);
//# sourceMappingURL=tab-daily-entry-tab-daily-entry-module.js.map