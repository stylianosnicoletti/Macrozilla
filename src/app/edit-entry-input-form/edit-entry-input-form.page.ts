import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Network } from '@capacitor/network'
import { AlertController, IonInput } from '@ionic/angular';
import { Food } from '../models/food.model';
import { UserService } from '../services/user.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { Entry } from '../models/dailyEntry';
import { MacrozillaConstants } from '../macrozilla-constants';
import { GlobalVariablesService } from '../services/global-variables.service';
import { ServingUnit } from '../models/servingUnit.model';
import { DailyTrackingService } from '../services/daily-tracking.service';

@Component({
  selector: 'app-edit-entry-input-form',
  templateUrl: './edit-entry-input-form.page.html',
  styleUrls: ['./edit-entry-input-form.page.scss'],
})

export class EditEntryInputFormPage {

  @ViewChild('qtyInput') qtyInput: IonInput;

  defaultBackNoHistory: string;
  date: string;
  entryDocId: string;
  food: Food;
  consumedFood: Food;
  servingUnitsMap = new Map<String, ServingUnit>();
  entry: Entry;
  editEntryForm: FormGroup;
  isSubmitted = false;
  generalSubscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  isFormReadyToBuild = false;
  lastNetworkStatusIsConnected = true;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dailyTrackingService: DailyTrackingService,
    private _globalVariableService: GlobalVariablesService,
    private _unSubscribeService: UnsubscribeService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _alertController: AlertController,
    private _renderer: Renderer2) {
  }

  async ngOnInit() {
    console.log("ngOnInit Edit Daily Entry Input Form");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    console.log("entering edit entry input form page");

    Network.addListener('networkStatusChange', async status => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        this.isFormReadyToBuild = false;
        this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
        await this.initialiseItems();
      }
      else if(!status.connected) {
        console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
        this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
        // Don't alert becuase daily entry tabs page will do that
        await this.goToDailyEntryTab();   
      }
    });
    
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving edit entry input form page");
    this.isFormReadyToBuild = false;
    this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
    Network.removeAllListeners();
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    await this.enterGuard();
    await this.editEntryData();
  }

  /**
   * Check if the route param key matches a correct date and food document id
   */
  async enterGuard(): Promise<void> {

    // Check date
    this.date = this._activatedRoute.snapshot.params['date_selected'];
    if (MacrozillaConstants.REGEX_DATE.test(this.date)) {
      this.defaultBackNoHistory = "tabs/daily_entry";
      // Check entry doc id
      this.entryDocId = this._activatedRoute.snapshot.params['entry_doc_id'];
      this.entry = await this._dailyTrackingService.getEntry(this.entryDocId, this.date);
      if (this.entry != null) {
        await this.prepareEntryFoodSelected(this.entry.Food);
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
   * When food entry is selected to be edited.
   * @param food Selected food.
   */
  async prepareEntryFoodSelected(food: Food): Promise<void> {
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
  editEntryData(): void {
    this.editEntryForm = this._formBuilder.group({
      qty: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6), Validators.min(0.001)]]
    })
  }

  /**
   * Submit changes.
   **/
  async submitForm() {
    this.isSubmitted = true;
    if (!this.editEntryForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!');
      return false;
    } else {
      // Update entry in sub-collection of Entries on DailyEntry doc. 
      await this._dailyTrackingService.editEntryAndUpdateDailyEntryFields(this.date, this.entry, this.consumedFood);
      await this._router.navigate(["/tabs/daily_entry"]);
      await this._toastService.presentToast('Entry Successfully Edited!');
    }
  }

  /**
   * When input is decimal change the value of consumed food according to input else reset it.
   * @param qty Input
   */
  prepareConsumedFood(qty: string): void {
    if (MacrozillaConstants.REGEX_DECIMAL_PATTERN.test(qty)) {
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
