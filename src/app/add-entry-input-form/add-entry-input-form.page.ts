import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx'
import { AlertController, IonInput } from '@ionic/angular';
import { Food } from '../models/food.model';
import { FoodDatabaseService } from '../services/food-db.service';
import { UserService } from '../services/user.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { Entry } from '../models/dailyEntry';
import { MyMacrosConstants } from '../my-macros-constants';
import { GlobalVariablesService } from '../services/global-variables.service';
import { ServingUnit } from '../models/servingUnit.model';
import { DailyTrackingService } from '../services/daily-tracking.service';

@Component({
  selector: 'app-add-entry-input-form',
  templateUrl: './add-entry-input-form.page.html',
  styleUrls: ['./add-entry-input-form.page.scss'],
})

export class AddEntryInputFormPage {

  @ViewChild('qtyInput') qtyInput: IonInput;

  defaultBackNoHistory: string;
  date: string;
  foodDocId: string;
  food: Food;
  consumedFood: Food;
  servingUnitsMap = new Map<String, ServingUnit>();
  entry: Entry;
  addEntryForm: FormGroup;
  isSubmitted = false;
  generalSubscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  isFormReadyToBuild = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dailyTrackingService: DailyTrackingService,
    private _foodDatabaseService: FoodDatabaseService,
    private _globalVariableService: GlobalVariablesService,
    private _unSubscribeService: UnsubscribeService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _network: Network,
    private _alertController: AlertController,
    private _renderer: Renderer2) {
  }

  async ngOnInit() {
    console.log("ngOnInit Add New Daily Entry Input Form");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    console.log("entering add entry input form page");

    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
      // Don't alert becuase daily entry tabs page will do that
      console.log('network was disconnected :-(');
      await this.goToDailyEntryTab();
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this.isFormReadyToBuild = false;
      this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
      await this.initialiseItems();
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving add entry input form page");
    this.isFormReadyToBuild = false;
    this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
    this.unsubscribeNetwork();
  }

  unsubscribeNetwork() {
    if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    if (!this.disconnectSubscription.closed) this.disconnectSubscription.unsubscribe();
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    await this.enterGuard();
    await this.addEntryData();
  }

  /**
   * Check if the route param key matches a correct date and food document id
   */
  async enterGuard(): Promise<void> {

    // Check date
    this.date = this._activatedRoute.snapshot.params['date_selected'];
    if (MyMacrosConstants.REGEX_DATE.test(this.date)) {
      this.defaultBackNoHistory = "add_entry_search/" + this.date;
      // Check food doc id
      this.foodDocId = this._activatedRoute.snapshot.params['food_doc_id'];
      console.log(this.foodDocId);
      const food: Food = await this._foodDatabaseService.getPersonalOrGlobalFoodDocExists(this.foodDocId);
      if (food != null) {
        await this.prepareFoodSelected(food);
        this.isFormReadyToBuild = true;
        await this.setFocus();
      } else {
        await this.goToDailyEntryTab();
      }
    } else {
      await this.goToDailyEntryTab();
    }
  }

  // No network alert
  async presentNetworkAlert() {
    const alert = await this._alertController.create({
      header: 'No Data Connection',
      message: 'Consider turning on mobile data or Wi-Fi.',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * When food is selected from search list.
   * @param food Selected food.
   */
  async prepareFoodSelected(food: Food): Promise<void> {
    // Selected food
    this.food = food;
    // Prepare consumed food based on details of selected food
    this.consumedFood = {
      Name: this.food.Name,
      Calories: 0,
      Fats: 0,
      Saturated: 0,
      Carbohydrates: 0,
      Protein: 0,
      ServingAmount: 0,
      ServingUnit: this.food.ServingUnit,
      ServingUnitShortCode: this.food.ServingUnitShortCode
    };
    // Get map of all serving units
    this.generalSubscriptionsList.push((await this._globalVariableService.getServingUnits()).subscribe(res => {
      res.ServingUnits.forEach(servingUnit => {
        this.servingUnitsMap.set(servingUnit.Name, servingUnit);
      });
    }));
  }

  /**
   * Contains Reactive Form logic
   **/
  addEntryData(): void {
    this.addEntryForm = this._formBuilder.group({
      qty: ['', [Validators.required, Validators.pattern(MyMacrosConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]]
    })
  }

  /**
   * Submit changes.
   **/
  async submitForm() {
    this.isSubmitted = true;
    if (!this.addEntryForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!');
      return false;
    } else {
      // Add entry in sub-collection of Entries on DailyEntry doc
      await this._dailyTrackingService.addEntryAndUpdateDailyEntryFields(this.date, this.consumedFood);
      await this._router.navigate(["/tabs/daily_entry"]);
      await this._toastService.presentToast('Entry Successfully Added!');
    }
  }

  /**
   * When input is decimal change the value of consumed food according to input else reset it.
   * @param qty Input
   */
  prepareConsumedFood(qty: string): void {
    if (MyMacrosConstants.REGEX_DECIMAL_PATTERN.test(qty)) {
      this.consumedFood.Calories = this.food.Calories * Number(qty) / this.food.ServingAmount;
      this.consumedFood.Fats = this.food.Fats * Number(qty) / this.food.ServingAmount;
      this.consumedFood.Saturated = this.food.Saturated * Number(qty) / this.food.ServingAmount;
      this.consumedFood.Carbohydrates = this.food.Carbohydrates * Number(qty) / this.food.ServingAmount;
      this.consumedFood.Protein = this.food.Protein * Number(qty) / this.food.ServingAmount;
      this.consumedFood.ServingAmount = Number(qty);
      this.consumedFood.ServingUnitShortCode = this.mapServingUnitToShortCode(qty, this.servingUnitsMap.get(this.food.ServingUnit));
    } else {
      this.consumedFood.Calories = 0;
      this.consumedFood.Fats = 0;
      this.consumedFood.Saturated = 0;
      this.consumedFood.Carbohydrates = 0;
      this.consumedFood.Protein = 0;
      this.consumedFood.ServingAmount = 0;
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

  /**
   * Navigates back to search list (in same view).
   */
  async goToSearchList(): Promise<void> {
    await this._router.navigate(["/add_entry_search/" + this.date]);
  }

  /**
   * Navigates back to daily entry tab
   */
  async goToDailyEntryTab(): Promise<void> {
    await this._router.navigate(["/tabs/daily_entry"]);
  }


  /**
   * Set focus on quantity input
   */
  setFocus(): void {
    setTimeout(async () => {
      await this.qtyInput.setFocus();
    });
  }

}
