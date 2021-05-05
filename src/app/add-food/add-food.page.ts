import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodService } from '../services/food.service';
import { ToastService } from '../services/toast.service';
import { Food } from '../types';
import { ServingUnit } from '../models/servingUnit.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyMacrosConstants } from '../my-macros-constants'
import { PopoverController, IonInput } from '@ionic/angular';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage {

  @ViewChild('nameInput') nameInput: IonInput;
  @ViewChild('servingUnitSelect') servingUnitSelect: PopoverController;

  food: Food;
  addForm: FormGroup;
  isSubmitted = false;
  servingUnits: ServingUnit[];
  subscriptionsList: Subscription[] = [];

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _foodService: FoodService,
    private _toastService: ToastService,
    private _unsubscribeService: UnsubscribeService,
    private _popController: PopoverController,
    private _globalVariableService: GlobalVariablesService
  ) {
    this.initialiseItems();
  }

  /**
  * Do before enter page.
  */
  ionViewWillEnter() {
    console.log("entering add food page");
    this.setFocus();
  }

  /**
  * Do before leave page.
  */
  async ionViewWillLeave() {
    console.log("Leaving add food page");
    await this.closePopItems();
    this.subscriptionsList = this._unsubscribeService.unsubscribeData(this.subscriptionsList);
  }

  /**
  * Initialises Items. (E.g. Serving Units)
  */
  initialiseItems(): void {
    this.subscriptionsList.push(
       this._globalVariableService.getServingUnits().subscribe(res => {
        console.log(res);
        this.servingUnits = res.ServingUnits;
      }));
      this.addFoodData();
  }

  /**
  * Closing pop items (E.g. Service Unit Select).
  */
  async closePopItems(): Promise<void> {
    console.log("Close pop items.");
    const popover = await this._popController.getTop();
    if (popover)
      await popover.dismiss(null);
  }

  /** 
  * Sets focus on name input.
  */
  setFocus(): void {
    setTimeout(async () => {
      await this.nameInput.setFocus();
    });
  }

  /** 
  * Contains Reactive Form logic.
  */
  addFoodData(): void {
    this.addForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      servingAmount: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MyMacrosConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]],
      servingUnit: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(50)]],
      protein: ['', [Validators.required, Validators.pattern(MyMacrosConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      carbohydrates: ['', [Validators.required, Validators.pattern(MyMacrosConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      fats: ['', [Validators.required, Validators.pattern(MyMacrosConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      saturated: ['', [Validators.required, Validators.pattern(MyMacrosConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      calories: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MyMacrosConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]]
    })
  }

  /**
   * Routes back to "foods_database" tab.
   */
  async goToFoodsDatabaseTab(): Promise<void> {
    await this._router.navigate(["/tabs/foods_database"]);
  }

  /**
   * Submit changes when validations pass.
   * @returns True when submission was successful.
   */
  async submitForm() {
    this.isSubmitted = true;

    // Validation Check
    if (!this.addForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!');
      return false;
    }

    this.food = this.fillFood(this.addForm.value);

    // Food Name Exists Check
    if (await this.foodNameExistGuard(this.food)) {
      await this._toastService.presentToast('Food with that name already exists!');
      return false;
    }

    // Saturated Fats Check
    if (this.food.saturated > this.food.fats) {
      await this._toastService.presentToast('Cannot have more Saturated Fats than Total Fats!');
      return false;
    }

    // Submit food.
    await this._foodService.addFood(this.food);
    await this._router.navigate(["/tabs/foods_database"]);
    await this._toastService.presentToast('Food Successfully Added');

  }

  /** 
  * Checks if food name exist under that user.
  * @param {Food} food Food.
  * @return {Promise<boolean>} True if it exists. False when it doesn't.
  */
  async foodNameExistGuard(food: Food): Promise<boolean> {
    return ((await this._foodService.doesFoodNameExist(food)) != 0);
  }

  /** 
  * Prepares Food with form values provided.
  * @param {any} formValue Form value.
  * @return {Food} Filled Food.
  */
  fillFood(formValue: any): Food {
    return {
      name: this.prepareName(formValue.name, formValue.servingAmount, formValue.servingUnit, formValue.comment),
      protein: formValue.protein,
      carbohydrates: formValue.carbohydrates,
      fats: formValue.fats,
      saturated: formValue.saturated,
      calories: formValue.calories,
      key: null
    };
  }

  /** 
  * Prepares the food name.
  * @param {string} name Name of food (E.g. Chocolate).
  * @param {string} servingAmount Serving amount (E.g. 100).
  * @param {ServingUnit} servingUnit Serving Unit (E.g Grams).
  * @param {string} comment Serving Unit (E.g bar).
  * @return {string} The full name (E.g. Chocolate (100g - bar)).
  */
  prepareName(name: String, servingAmount: string, servingUnit: ServingUnit, comment: string) {
    if (comment.length > 0) {
      return name + " (" + servingAmount + this.mapServingUnitToShortCode(servingAmount, servingUnit) + " - " + comment + ")";
    }
    else {
      return name + " (" + servingAmount + this.mapServingUnitToShortCode(servingAmount, servingUnit) + ")";
    }
  }

  /** 
  * Decides which serving unit shortcode should be used based on the amount.
  * @param {string} servingAmount Serving amount (E.g. 100)
  * @param {ServingUnit} servingUnit Serving Unit (E.g Grams)
  * @return {string} The shortcode or plural short code of the serving unit to be appended in the name (E.g gram or grams)
  */
  mapServingUnitToShortCode(servingAmount: string, servingUnit: ServingUnit): string {
    if (Number.parseInt(servingAmount) > 1 && servingUnit.ShortCodePlural != null) {
      return servingUnit.ShortCodePlural;
    }
    return servingUnit.ShortCode;
  }
}

