(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit-food-edit-food-module"],{

/***/ "5fC2":
/*!***********************************************!*\
  !*** ./src/app/edit-food/edit-food.module.ts ***!
  \***********************************************/
/*! exports provided: EditFoodPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditFoodPageModule", function() { return EditFoodPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _edit_food_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-food.page */ "ssHU");







let EditFoodPageModule = class EditFoodPageModule {
};
EditFoodPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([{
                    path: '',
                    component: _edit_food_page__WEBPACK_IMPORTED_MODULE_6__["EditFoodPage"]
                }
            ])
        ],
        declarations: [_edit_food_page__WEBPACK_IMPORTED_MODULE_6__["EditFoodPage"]]
    })
], EditFoodPageModule);



/***/ }),

/***/ "QGCS":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-food/edit-food.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"home\" (click)=\"goToFoodsDatabaseTab()\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Edit Food</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!--(keyup.enter)=\"submitForm()\"-->\n  <div *ngIf=\"isFormReadyToBuild\">\n  <form [formGroup]=\"editForm\" (ngSubmit)=\"submitForm()\" (keyup.enter)=\"submitForm()\" novalidate>\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Name</ion-label>\n      <ion-input formControlName=\"name\" type=\"text\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Calories 🔋</ion-label>\n      <ion-input formControlName=\"calories\"type=\"text\" inputmode=\"numeric\" autofocus></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Fats 🐖</ion-label>\n      <ion-input formControlName=\"fats\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Saturated Fats ❌</ion-label>\n      <ion-input formControlName=\"saturated\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Carbohydrates 🍞</ion-label>\n      <ion-input formControlName=\"carbohydrates\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Protein 🥩</ion-label>\n      <ion-input formControlName=\"protein\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-row>\n      <ion-col>\n        <ion-button type=\"submit\" color=\"danger\" expand=\"block\">Submit</ion-button>\n      </ion-col>\n    </ion-row>\n  </form>\n</div>\n  \n</ion-content>\n");

/***/ }),

/***/ "ot0X":
/*!***********************************************!*\
  !*** ./src/app/edit-food/edit-food.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LWZvb2QucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "ssHU":
/*!*********************************************!*\
  !*** ./src/app/edit-food/edit-food.page.ts ***!
  \*********************************************/
/*! exports provided: EditFoodPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditFoodPage", function() { return EditFoodPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_edit_food_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./edit-food.page.html */ "QGCS");
/* harmony import */ var _edit_food_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit-food.page.scss */ "ot0X");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_food_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/food.service */ "xKs8");
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/toast.service */ "2g2N");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "TEn/");










let EditFoodPage = class EditFoodPage {
    constructor(_router, _formBuilder, _activatedRoute, _foodService, _toastService, _network, _alertController) {
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._activatedRoute = _activatedRoute;
        this._foodService = _foodService;
        this._toastService = _toastService;
        this._network = _network;
        this._alertController = _alertController;
        this.isSubmitted = false;
        this.subscriptionsList = [];
        this.isFormReadyToBuild = false;
    }
    ionViewWillEnter() {
        console.log("entering edit food page");
        this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
            this.unsubscribeData();
            //don't alert cz inherits from mother page
            console.log('network was disconnected :-(');
            this.goToFoodsDatabaseTab();
        });
        this.connectSubscription = this._network.onConnect().subscribe(() => {
            this.isFormReadyToBuild = false;
            this.unsubscribeData();
            this.initialiseItems();
            console.log('network connected!');
        });
        this.initialiseItems();
    }
    ionViewWillLeave() {
        console.log("leaving edit food page");
        this.isFormReadyToBuild = false;
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
    // Initialise items
    initialiseItems() {
        this.foodExistGuard();
        this.updateFoodData();
        this.subscriptionsList.push(this._foodService.getFood(this.foodKey).subscribe(res => { this.editForm.setValue(res, res.key = this._activatedRoute.snapshot.params['food_key']); }));
    }
    // Check if the route param food key exist
    foodExistGuard() {
        this.foodKey = this._activatedRoute.snapshot.params['food_key'];
        if (this._foodService.doesFoodKeyExist(this.foodKey) <= 0) {
            this._router.navigate(["/tabs/foods_database"]);
        }
        else {
            this.isFormReadyToBuild = true;
        }
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
    // Contains Reactive Form logic
    updateFoodData() {
        // Validator pattern don't work with input type number
        // Use type ="text" inputmode="numeric" as quick fix
        const decimalRegexPattern = /^(\d*\.)?\d+$/;
        const integerRegexPattern = /^[0-9]+$/;
        this.editForm = this._formBuilder.group({
            name: [{ value: '', disabled: true, }, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            protein: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            carbohydrates: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            fats: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            saturated: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            calories: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(integerRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            key: ['']
        });
    }
    // Route back to foods_databse tab
    goToFoodsDatabaseTab() {
        this._router.navigate(["/tabs/foods_database"]);
    }
    // Submit changes
    submitForm() {
        this.isSubmitted = true;
        if (!this.editForm.valid) {
            this._toastService.presentToast('Please provide all the required values!');
            return false;
        }
        else {
            this._foodService.updateFood(this.editForm.value);
            this._router.navigate(["/tabs/foods_database"]);
            this._toastService.presentToast('Food Successfully Edited!');
        }
    }
};
EditFoodPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"] },
    { type: _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__["Network"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] }
];
EditFoodPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-edit-food',
        template: _raw_loader_edit_food_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_edit_food_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
        _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"],
        _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"],
        _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_8__["Network"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"]])
], EditFoodPage);



/***/ })

}]);
//# sourceMappingURL=edit-food-edit-food-module.js.map