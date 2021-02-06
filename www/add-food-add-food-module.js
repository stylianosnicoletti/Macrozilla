(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-food-add-food-module"],{

/***/ "3ZOh":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-food/add-food.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"home\" (click)=\"goToFoodsDatabaseTab()\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Add Food</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\"addForm\" (ngSubmit)=\"submitForm()\" (keyup.enter)=\"submitForm()\" novalidate>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Name</ion-label>\n      <ion-input formControlName=\"name\" type=\"text\" #nameInput></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Calories 🔋</ion-label>\n      <ion-input formControlName=\"calories\"type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Fats 🐖</ion-label>\n      <ion-input formControlName=\"fats\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Saturated Fats ❌</ion-label>\n      <ion-input formControlName=\"saturated\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Carbohydrates 🍞</ion-label>\n      <ion-input formControlName=\"carbohydrates\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n    \n    <ion-item lines=\"full\">\n      <ion-label position=\"floating\">Protein 🥩</ion-label>\n      <ion-input formControlName=\"protein\" type=\"text\" inputmode=\"numeric\"></ion-input>\n    </ion-item>\n\n    <ion-row>\n      <ion-col>\n        <ion-button type=\"submit\" color=\"danger\" expand=\"block\">Submit</ion-button>\n      </ion-col>\n    </ion-row>\n  </form>\n\n  \n</ion-content>\n");

/***/ }),

/***/ "Ic6N":
/*!*******************************************!*\
  !*** ./src/app/add-food/add-food.page.ts ***!
  \*******************************************/
/*! exports provided: AddFoodPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFoodPage", function() { return AddFoodPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_food_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-food.page.html */ "3ZOh");
/* harmony import */ var _add_food_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-food.page.scss */ "uq+9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_food_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/food.service */ "xKs8");
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/toast.service */ "2g2N");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");









let AddFoodPage = class AddFoodPage {
    constructor(_router, _formBuilder, _foodService, _toastService) {
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._foodService = _foodService;
        this._toastService = _toastService;
        this.isSubmitted = false;
        this.initialiseItems();
    }
    ionViewWillEnter() {
        this.setFocus();
    }
    initialiseItems() {
        this.addFoodData();
    }
    // Set focus on quantity input
    setFocus() {
        setTimeout(() => {
            this.nameInput.setFocus();
        });
    }
    // Contains Reactive Form logic
    addFoodData() {
        // Validator pattern don't work with input type number
        // Use type ="text" inputmode="numeric" as quick fix
        const decimalRegexPattern = /^(\d*\.)?\d+$/;
        const integerRegexPattern = /^[0-9]+$/;
        this.addForm = this._formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].minLength(5)]],
            protein: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            carbohydrates: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            fats: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            saturated: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(decimalRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]],
            calories: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(integerRegexPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].maxLength(6)]]
        });
    }
    // Route back to foods_databse tab
    goToFoodsDatabaseTab() {
        this._router.navigate(["/tabs/foods_database"]);
    }
    // Submit changes
    submitForm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.addForm.valid) {
                this._toastService.presentToast('Please provide all the required values!');
                return false;
            }
            else {
                this.fillFood(this.addForm.value);
                if (yield this.foodNameExistGuard(this.food)) {
                    this._toastService.presentToast('Food with that name already exists!');
                    return false;
                }
                else {
                    this._foodService.addFood(this.food);
                    this._router.navigate(["/tabs/foods_database"]);
                    this._toastService.presentToast('Food Successfully Added');
                }
            }
        });
    }
    // Check if food name exist under that user
    foodNameExistGuard(food) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return ((yield this._foodService.doesFoodNameExist(food)) != 0);
        });
    }
    // Fill food object from form values
    fillFood(formValue) {
        this.food = {
            name: formValue.name,
            protein: formValue.protein,
            carbohydrates: formValue.carbohydrates,
            fats: formValue.fats,
            saturated: formValue.saturated,
            calories: formValue.calories,
            key: null
        };
    }
};
AddFoodPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"] },
    { type: _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"] }
];
AddFoodPage.propDecorators = {
    nameInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['nameInput',] }]
};
AddFoodPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-food',
        template: _raw_loader_add_food_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_food_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
        _services_food_service__WEBPACK_IMPORTED_MODULE_5__["FoodService"],
        _services_toast_service__WEBPACK_IMPORTED_MODULE_6__["ToastService"]])
], AddFoodPage);



/***/ }),

/***/ "Xqrw":
/*!*********************************************!*\
  !*** ./src/app/add-food/add-food.module.ts ***!
  \*********************************************/
/*! exports provided: AddFoodPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFoodPageModule", function() { return AddFoodPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _add_food_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-food.page */ "Ic6N");







let AddFoodPageModule = class AddFoodPageModule {
};
AddFoodPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([{
                    path: '',
                    component: _add_food_page__WEBPACK_IMPORTED_MODULE_6__["AddFoodPage"]
                }
            ])
        ],
        declarations: [_add_food_page__WEBPACK_IMPORTED_MODULE_6__["AddFoodPage"]]
    })
], AddFoodPageModule);



/***/ }),

/***/ "uq+9":
/*!*********************************************!*\
  !*** ./src/app/add-food/add-food.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtZm9vZC5wYWdlLnNjc3MifQ== */");

/***/ })

}]);
//# sourceMappingURL=add-food-add-food-module.js.map