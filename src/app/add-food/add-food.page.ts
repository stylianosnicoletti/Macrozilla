import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { ToastService } from '../services/toast.service';
import { Food } from '../types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage {

  @ViewChild('nameInput') nameInput: IonInput;

  food: Food;
  addForm: FormGroup;
  isSubmitted = false;
  gramsDefaultValue: Number;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _foodService: FoodService,
    private _toastService: ToastService,
  ) {
    this.initialiseItems();
    this.gramsDefaultValue = 100;
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
      name: ['', [Validators.required, Validators.minLength(5)]],
      grams: ['', [Validators.required, Validators.minLength(1), Validators.pattern(integerRegexPattern), Validators.maxLength(6)]],
      comment: ['', [Validators.maxLength(15)]],
      protein: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      carbohydrates: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      fats: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      saturated: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      calories: ['', [Validators.required, Validators.minLength(1), Validators.pattern(integerRegexPattern), Validators.maxLength(6)]]
    })
  }

  // Route back to foods_databse tab
  goToFoodsDatabaseTab() {
    this._router.navigate(["/tabs/foods_database"]);
  }

  // Submit changes
  async submitForm() {
    this.isSubmitted = true;
    if (!this.addForm.valid) {
      this._toastService.presentToast('Please provide all the required values!');
      return false;
    } else {
      this.fillFood(this.addForm.value);
      if (await this.foodNameExistGuard(this.food)) {
        this._toastService.presentToast('Food with that name already exists!');
        return false;
      } else {
        this._foodService.addFood(this.food);
        this._router.navigate(["/tabs/foods_database"]);
        this._toastService.presentToast('Food Successfully Added');
      }
    }
  }

  // Check if food name exist under that user
  async foodNameExistGuard(food: Food): Promise<boolean> {
    return (await this._foodService.doesFoodNameExist(food) != 0);
  }

  // Fill food object from form values
  fillFood(formValue: any) {
    this.food = {
      name: this.prepareName(formValue.name, formValue.grams, formValue.comment),
      protein: formValue.protein,
      carbohydrates: formValue.carbohydrates,
      fats: formValue.fats,
      saturated: formValue.saturated,
      calories: formValue.calories,
      key: null
    };
  }

  // Returns the food name after appending grams and comment as a whole
  prepareName(name: String, grams: String, comment: String) {
    if (comment.length > 0) {
      return name + " " + "(" + grams + "g" + " " + "-" + " " + comment + ")";
    }
    else {
      return name + " " + "(" + grams + "g" + ")";
    }
  }
}
