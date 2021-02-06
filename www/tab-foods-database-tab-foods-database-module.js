(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-foods-database-tab-foods-database-module"],{

/***/ "7a9s":
/*!*****************************************************************!*\
  !*** ./src/app/tab-foods-database/tab-foods-database.module.ts ***!
  \*****************************************************************/
/*! exports provided: TabFoodsDatabasePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabFoodsDatabasePageModule", function() { return TabFoodsDatabasePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tab_foods_database_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab-foods-database.page */ "7x0U");







const routes = [
    {
        path: '',
        component: _tab_foods_database_page__WEBPACK_IMPORTED_MODULE_6__["TabFoodsDatabasePage"]
    }
];
let TabFoodsDatabasePageModule = class TabFoodsDatabasePageModule {
};
TabFoodsDatabasePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            //RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{
                    path: '',
                    component: _tab_foods_database_page__WEBPACK_IMPORTED_MODULE_6__["TabFoodsDatabasePage"]
                }
            ])
        ],
        declarations: [_tab_foods_database_page__WEBPACK_IMPORTED_MODULE_6__["TabFoodsDatabasePage"]]
    })
], TabFoodsDatabasePageModule);



/***/ }),

/***/ "7x0U":
/*!***************************************************************!*\
  !*** ./src/app/tab-foods-database/tab-foods-database.page.ts ***!
  \***************************************************************/
/*! exports provided: TabFoodsDatabasePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabFoodsDatabasePage", function() { return TabFoodsDatabasePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tab_foods_database_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tab-foods-database.page.html */ "q7Cf");
/* harmony import */ var _tab_foods_database_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab-foods-database.page.scss */ "vf5o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_food_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/food.service */ "xKs8");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/loading.service */ "7ch9");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");









let TabFoodsDatabasePage = class TabFoodsDatabasePage {
    constructor(_foodService, _loadingService, _router, _alertController, _network) {
        this._foodService = _foodService;
        this._loadingService = _loadingService;
        this._router = _router;
        this._alertController = _alertController;
        this._network = _network;
        this.searchTerm = "";
        this.filteredFoodList = [];
        this.subscriptionsList = [];
    }
    ionViewWillEnter() {
        console.log("entering foods dbs page");
        this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
            this.unsubscribeData();
            this.searchTerm = "";
            this.presentNetworkAlert();
            console.log('network was disconnected :-(');
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
        console.log("leaving foods dbs page");
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
    // Update filteredFoodList using search term parsed
    filterFoods() {
        this.subscriptionsList.push(this._foodService.getAllFoods().subscribe(res => {
            this.filteredFoodList = res.filter((item) => {
                return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });
        }));
    }
    // Delete Confirmation
    presentAlertConfirm(food, slidingItem) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this._alertController.create({
                header: 'Do you want to proceed deleting?',
                message: food.name,
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
                            this._foodService.deleteFood(food.key);
                            slidingItem.close();
                            this._loadingService.presentLoading('Deleting..', 500);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    // Add 
    addFood() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._router.navigate(["/add_food/"]);
        });
    }
    // Edit Food
    editFood(food, slidingItem) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._router.navigate(["/edit_food/" + food.key]);
            slidingItem.close();
        });
    }
};
TabFoodsDatabasePage.ctorParameters = () => [
    { type: _services_food_service__WEBPACK_IMPORTED_MODULE_4__["FoodService"] },
    { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__["Network"] }
];
TabFoodsDatabasePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tab-foods-database',
        template: _raw_loader_tab_foods_database_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab_foods_database_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_food_service__WEBPACK_IMPORTED_MODULE_4__["FoodService"],
        _services_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__["Network"]])
], TabFoodsDatabasePage);



/***/ }),

/***/ "q7Cf":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-foods-database/tab-foods-database.page.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<!-- Searchbar with cancel button shown on focus -->\n<ion-searchbar debounce=\"380\" [(ngModel)]=\"searchTerm\" (ionChange)=\"filterFoods()\">\n</ion-searchbar>\n\n\n<ion-content padding>\n\n  <!-- Default Refresher -->\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <!-- Normal screen -->\n  <ion-list *ngIf=\"filteredFoodList.length > 0; else loading\">\n    <!-- Removed virtaul scroll there was an issue with the keyboard when forwar back-->\n    <!--    <ion-virtual-scroll [items]=\"filteredFoodList\">\n      <ion-item-sliding *virtualItem=\"let food\" #slidingItem>\n      -->\n    <ion-item-sliding *ngFor=\"let food of filteredFoodList\" #slidingItem>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <h2><strong>{{food.name}}</strong></h2>\n          <h3>🔋 {{food.calories}} kcal</h3>\n          <p>🥩 {{food.protein | number:'.1'}}g 🍞 {{food.carbohydrates | number:'.1'}}g 🐖\n            {{food.fats | number:'.1'}}g :\n            (✔️ {{+food.fats - +food.saturated | number:'.1'}}g ❌ {{food.saturated | number:'.1'}}g) </p>\n        </ion-label>\n      </ion-item>\n      <ion-item-options side=\"end\">\n        <ion-item-option color=\"warning\" (click)=\"editFood(food,slidingItem)\">\n          <ion-icon name=\"create\"></ion-icon>\n          Edit\n        </ion-item-option>\n        <ion-item-option color=\"danger\" (click)=\"presentAlertConfirm(food,slidingItem)\">\n          <ion-icon name=\"trash\"></ion-icon>\n          Delete\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <!-- Skeleton dummy screen -->\n  <ng-template #loading>\n    <ion-list>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n          <ion-skeleton-text animated style=\"width: 90%; height: 21px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 40%; height: 15px\"></ion-skeleton-text>\n          <ion-skeleton-text animated style=\"width: 80%; height: 14px\"></ion-skeleton-text>\n        </ion-label>\n      </ion-item>\n    </ion-list>\n  </ng-template>\n\n  <!-- Fab placed to the bottom end -->\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)=\"addFood()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n</ion-content>");

/***/ }),

/***/ "vf5o":
/*!*****************************************************************!*\
  !*** ./src/app/tab-foods-database/tab-foods-database.page.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".spinner-container {\n  width: 100%;\n  text-align: center;\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RhYi1mb29kcy1kYXRhYmFzZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBQ0YiLCJmaWxlIjoidGFiLWZvb2RzLWRhdGFiYXNlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zcGlubmVyLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHg7XG59Il19 */");

/***/ })

}]);
//# sourceMappingURL=tab-foods-database-tab-foods-database-module.js.map