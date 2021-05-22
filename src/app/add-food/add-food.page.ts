import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodDatabaseService } from '../services/food-db.service';
import { ToastService } from '../services/toast.service';
import { Food } from '../models/food.model';
import { ServingUnit } from '../models/servingUnit.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MacrozillaConstants } from '../macrozilla-constants'
import { PopoverController, IonInput, AlertController } from '@ionic/angular';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { GlobalVariablesService } from '../services/global-variables.service';
import { UserService } from '../services/user.service';

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
    private _popController: PopoverController,
    private _alertController: AlertController,
    private _toastService: ToastService,
    private _unsubscribeService: UnsubscribeService,
    private _foodDbService: FoodDatabaseService,
    private _globalVariableService: GlobalVariablesService,
    private _renderer: Renderer2,
    private _userService: UserService
  ) {
    this.initialiseItems();
  }

  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
    console.log("ngOnInit AddFood Tab.");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
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
      servingAmount: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MacrozillaConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]],
      servingUnit: ['', [Validators.required]],
      protein: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      carbohydrates: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      fats: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      saturated: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      calories: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MacrozillaConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]]
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
    console.log(this.food);

    // Saturated Fats Check
    if (this.food.Saturated > this.food.Fats) {
      await this._toastService.presentToast('Cannot have more Saturated Fats than Total Fats!');
      return false;
    }

    // Submit food.
    await this._foodDbService.addFood(this.food);
    await this._router.navigate(["/tabs/foods_database"]);
    await this._toastService.presentToast('Food Successfully Added');
  }


  /**
   * No network alert
   */
  async presentIssueWithServerAlert(): Promise<void> {
    const alert = await this._alertController.create({
      header: 'There is an issue with server. ',
      message: 'Please try again later.',
      buttons: ['OK']
    });
    await alert.present();
  }


  /** 
  * Prepares Food with form values provided.
  * @param {any} formValue Form value.
  * @return {Food} Filled Food.
  */
  fillFood(formValue: any): Food {
    return {
      Name: formValue.name,
      Protein: formValue.protein,
      Carbohydrates: formValue.carbohydrates,
      Fats: formValue.fats,
      Saturated: formValue.saturated,
      Calories: formValue.calories,
      ServingAmount: formValue.servingAmount,
      ServingUnit: formValue.servingUnit.Name,
      ServingUnitShortCode: this.mapServingUnitToShortCode(formValue.servingAmount, formValue.servingUnit)
    };
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

  /**
   * Maps darkMode boolean to body name.
   * @param darkMode User prefered theme option.
   * @returns Body name.
   */
  mapThemeModeToBodyName(darkMode: boolean): string {
    if (darkMode) {
      return 'dark';
    }
    return 'light';
  }
}

