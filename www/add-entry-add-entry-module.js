(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-entry-add-entry-module"],{

/***/ "DNcQ":
/*!***********************************************!*\
  !*** ./src/app/add-entry/add-entry.module.ts ***!
  \***********************************************/
/*! exports provided: AddEntryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEntryPageModule", function() { return AddEntryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _add_entry_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-entry.page */ "NPEe");







let AddEntryPageModule = class AddEntryPageModule {
};
AddEntryPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([{
                    path: '',
                    component: _add_entry_page__WEBPACK_IMPORTED_MODULE_6__["AddEntryPage"]
                }
            ])
        ],
        declarations: [_add_entry_page__WEBPACK_IMPORTED_MODULE_6__["AddEntryPage"]]
    })
], AddEntryPageModule);



/***/ }),

/***/ "NPEe":
/*!*********************************************!*\
  !*** ./src/app/add-entry/add-entry.page.ts ***!
  \*********************************************/
/*! exports provided: AddEntryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEntryPage", function() { return AddEntryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_entry_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-entry.page.html */ "f09M");
/* harmony import */ var _add_entry_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-entry.page.scss */ "d9Ro");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_food_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/food.service */ "xKs8");
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/toast.service */ "2g2N");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _services_summary_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/summary.service */ "5KKm");
/* harmony import */ var _services_food_entry_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/food-entry.service */ "bu6J");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ "TEn/");












let AddEntryPage = class AddEntryPage {
    constructor(_router, _formbBuilder, _activatedRoute, _foodService, _foodEntryService, _summaryService, _toastService, _network, _alertController) {
        this._router = _router;
        this._formbBuilder = _formbBuilder;
        this._activatedRoute = _activatedRoute;
        this._foodService = _foodService;
        this._foodEntryService = _foodEntryService;
        this._summaryService = _summaryService;
        this._toastService = _toastService;
        this._network = _network;
        this._alertController = _alertController;
        this.isSubmitted = false;
        this.searchTerm = "";
        this.filteredFoodList = [];
        this.isListHidden = false;
        this.isFormHidden = true;
        this.subscriptionsList = [];
    }
    ionViewWillEnter() {
        console.log("entering add entry page");
        this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
            this.unsubscribeData();
            this.searchTerm = "";
            // Don't alert becuase daily entry tabs page will do that
            console.log('network was disconnected :-(');
            this.goToDailyEntryTab();
        });
        this.connectSubscription = this._network.onConnect().subscribe(() => {
            this.unsubscribeData();
            this.initialiseItems();
            this.searchTerm = "";
            console.log('network connected!');
        });
        this.initialiseItems();
    }
    ionViewWillLeave() {
        console.log("leaving add entry page");
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
        this.enterGuard();
        this.addEntryData();
        this.subscriptionsList.push(this._foodService.getAllFoods().subscribe(res => {
            this.filteredFoodList = res;
        }));
    }
    doRefresh(event) {
        this.unsubscribeData();
        this.initialiseItems();
        this.searchTerm = "";
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }
    // Check if the route param key matches a date
    enterGuard() {
        let dateRegEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        this.date = this._activatedRoute.snapshot.params['date_selected'];
        if (!dateRegEx.test(this.date))
            this._router.navigate(["/tabs/daily_entry"]);
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
    // Route back to foods_databse tab
    goToDailyEntryTab() {
        this._router.navigate(["/tabs/daily_entry"]);
    }
    // Update filteredFoodList using search term parsed
    filterFoods() {
        this.hideForm();
        this.unhidetList();
        this.subscriptionsList.push(this._foodService.getAllFoods().subscribe(res => {
            this.filteredFoodList = res.filter((item) => {
                return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });
        }));
    }
    // When food is selected
    foodSelected(food) {
        this.hideList();
        this.unhideForm();
        this.food = food;
    }
    // Hiding or unhiding elements
    hideForm() {
        this.isFormHidden = true;
    }
    unhideForm() {
        this.isFormHidden = false;
        this.setFocus();
    }
    hideList() {
        this.isListHidden = true;
    }
    unhidetList() {
        this.isListHidden = false;
    }
    // Set focus on quantity input
    setFocus() {
        setTimeout(() => {
            this.qtyInput.setFocus();
        });
    }
    // Contains Reactive Form logic
    addEntryData() {
        const decimalRegexPattern = /^(\d*\.)?\d+$/;
        this.addEntryForm = this._formbBuilder.group({
            qty: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]]
        });
    }
    // Submit changes
    submitForm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.addEntryForm.valid) {
                this._toastService.presentToast('Please provide all the required values!');
                return false;
            }
            else {
                this.entry = this.createEntry(this.food, this.addEntryForm.value.qty);
                this.entrySummary = this.createEntrySummary(this.entry);
                this._foodEntryService.addFoodEntry(this.entry, this.date);
                this.existingSummary = yield this._summaryService.getSummary(this.date);
                if (this.existingSummary != null) {
                    // Increment summary if already exists
                    this._summaryService.incrementExisitngSummary(this.existingSummary, this.entrySummary, this.date);
                }
                else {
                    // Set summary if it does not exists
                    this._summaryService.setSummary(this.entrySummary, this.date);
                }
                this._router.navigate(["/tabs/daily_entry"]);
                this.hideForm();
                this.unhidetList();
                this._toastService.presentToast('Entry Successfully Added!');
            }
        });
    }
    // Prepare entry
    createEntry(foodArg, qtyArg) {
        return {
            qty: qtyArg,
            food: foodArg,
            key: null
        };
    }
    // Prepare entry's summary
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
};
AddEntryPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"] },
    { type: _services_food_entry_service__WEBPACK_IMPORTED_MODULE_9__["FoodEntryService"] },
    { type: _services_summary_service__WEBPACK_IMPORTED_MODULE_8__["SummaryService"] },
    { type: _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__["Network"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__["AlertController"] }
];
AddEntryPage.propDecorators = {
    qtyInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['qtyInput',] }]
};
AddEntryPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-entry',
        template: _raw_loader_add_entry_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_entry_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
        _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"],
        _services_food_entry_service__WEBPACK_IMPORTED_MODULE_9__["FoodEntryService"],
        _services_summary_service__WEBPACK_IMPORTED_MODULE_8__["SummaryService"],
        _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_10__["Network"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_11__["AlertController"]])
], AddEntryPage);



/***/ }),

/***/ "d9Ro":
/*!***********************************************!*\
  !*** ./src/app/add-entry/add-entry.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtZW50cnkucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "f09M":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-entry/add-entry.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"home\" (click)=\"goToDailyEntryTab()\"></ion-back-button>\n    </ion-buttons>\n\n    <ion-title *ngIf=\"!isListHidden\">Select Food</ion-title>\n    <ion-title *ngIf=\"!isFormHidden\">Enter Quantity</ion-title>\n\n  </ion-toolbar>\n</ion-header>\n\n<!-- Searchbar with cancel button shown on focus -->\n<ion-searchbar *ngIf=\"!isListHidden\" debounce=\"380\" [(ngModel)]=\"searchTerm\" (ionChange)=\"filterFoods()\">\n</ion-searchbar>\n\n<ion-content>\n\n  <!-- Default Refresher -->\n  <ion-refresher *ngIf=\"!isListHidden\" slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf=\"!isListHidden\">\n    <ion-list *ngIf=\"filteredFoodList.length > 0; else loading\">\n      <ion-item *ngFor=\"let food of filteredFoodList\" (click)=\"foodSelected(food)\">\n        <ion-label class=\"ion-text-wrap\">\n          <h2><strong>{{food?.name}}</strong></h2>\n        </ion-label>\n        <ion-chip slot=\"end\" color=\"secondary\">\n          <strong>🔋 {{food?.calories}} kcal</strong>\n        </ion-chip>\n      </ion-item>\n    </ion-list>\n      <!-- Skeleton dummy screen -->\n  <ng-template #loading>\n    <ion-list>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n    </ion-list>\n  </ng-template>\n  </div>\n\n  <div *ngIf=\"!isFormHidden\">\n    <form [formGroup]=\"addEntryForm\" (ngSubmit)=\"submitForm()\" novalidate>\n      <ion-card>\n        <ion-card-header>\n          <ion-card-title>\n            <strong>{{food?.name}}</strong></ion-card-title>\n        </ion-card-header>\n        <ion-item>\n          <ion-label position=\"floating\">Qty</ion-label>\n          <ion-input formControlName=\"qty\" type=\"text\" inputmode=\"numeric\" #qtyInput></ion-input>\n        </ion-item>\n      </ion-card>\n      <ion-row>\n        <ion-col>\n          <ion-button type=\"submit\" color=\"danger\" expand=\"block\">Submit</ion-button>\n        </ion-col>\n      </ion-row>\n    </form>\n  </div>\n\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=add-entry-add-entry-module.js.map