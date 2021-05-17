import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx'
import { AlertController, IonInput } from '@ionic/angular';
import { Food } from '../models/food.model';
import { FoodDatabaseService } from '../services/food-db.service';
import { UserService } from '../services/user.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { Entry, DailyEntry } from '../models/dailyEntry';
import { MyMacrosConstants } from '../my-macros-constants';
import { GlobalVariablesService } from '../services/global-variables.service';
import { ServingUnit } from '../models/servingUnit.model';
import { DailyTrackingService } from '../services/daily-tracking.service';



@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})


export class AddEntryPage {

  @ViewChild('qtyInput') qtyInput: IonInput;

  date: string;
  food: Food;
  consumedFood: Food;
  servingUnitsMap = new Map<String, ServingUnit>();
  entry: Entry;
  addEntryForm: FormGroup;
  isSubmitted = false;
  searchTerm: string = "";
  filteredFoodMap = new Map<string, Food>(); // To avoid duplication and maintain insertion order (for ES6+)
  foodDbSubscriptionsList: Subscription[] = []; // Storing subscriptions calling the food databases
  generalSubscriptionsList: Subscription[] = [];
  useOnlyPersonalDb: boolean = false;
  noPersonalFoodsFoundAfterQuery: boolean = true;
  noGlobalFoodsFoundAfterQuery: boolean = true;
  personalDbSearchExecutionInProcess: boolean = false;
  globalDbSearchExecutionInProcess: boolean = false;
  loadingFlag: boolean = false;
  isListHidden: boolean = false;
  isFormHidden: boolean = true;
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _router: Router,
    private _formbBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dailyTrackingServince: DailyTrackingService,
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
    console.log("ngOnInit Add New Daily Entry");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    console.log("entering add entry page");

    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
      this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
      this.searchTerm = "";
      // Don't alert becuase daily entry tabs page will do that
      console.log('network was disconnected :-(');
      await this.goToDailyEntryTab();
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
      this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
      await this.initialiseItems();
      this.searchTerm = "";
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving add entry page");
    this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
    this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
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
    this.enterGuard();
    this.addEntryData();
    this.searchTerm = "";
    await (await this._userService.getUserFields()).subscribe(x => {
      this.useOnlyPersonalDb = x.Options.UseOnlyPersonalDb;
    });
  }

  async doRefresh(event) {
    this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
    await this.initialiseItems();
    this.searchTerm = "";
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // Check if the route param key matches a date
  enterGuard() {
    this.date = this._activatedRoute.snapshot.params['date_selected'];
    if (!MyMacrosConstants.REGEX_DATE.test(this.date)) this._router.navigate(["/tabs/daily_entry"]);
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
   *  Navigate back to daily entrries tab
   */
  async goToDailyEntryTab(): Promise<void> {
    await this._router.navigate(["/tabs/daily_entry"]);
  }

  /**
   *  Navigates back to search list (in same view).
   */
  async goToSearchList(): Promise<void> {
    this.hideForm();
    this.unhidetList();
    await this._router.navigate(["/add_entry/" + this.date]);
  }

  /**
   * Update filteredFoodList using search term parsed.
   * Query first personal Db.
   * If public Db is also enabled query after getting results of Personal.
   * Put everything in a map (insertion order, no duplicates) to be displayed.
   * Manipulates flags for the templates to be showned.
   */
  async filterFoods(): Promise<void> {
    this.hideForm();
    this.unhidetList();
    this.loadingFlag = true;
    this.noPersonalFoodsFoundAfterQuery = true;
    this.noGlobalFoodsFoundAfterQuery = true;
    this.filteredFoodMap.clear();
    this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);

    if (this.searchTerm.length > 0) {
      this.personalDbSearchExecutionInProcess = true;
      if (this.useOnlyPersonalDb) {
        this.globalDbSearchExecutionInProcess = false;
        this.onlyPersonalQuery();
      } else {
        this.globalDbSearchExecutionInProcess = true;
        this.bothPersonalAndGlobalDbQuery();
      }
    }
  }

  /**
   * Subscribes only to Personal Db for querying.
   */
  async onlyPersonalQuery(): Promise<void> {
    this.foodDbSubscriptionsList.push(await (await this._foodDatabaseService.getFoodsFromDbWithFilter(this.searchTerm.toLowerCase(), true, 15))
      .subscribe(res => {
        // Personal Db Query
        if (res.length > 0) { this.noPersonalFoodsFoundAfterQuery = false; }
        res.forEach(element => {
          this.filteredFoodMap.set(element.DocumentId, element);
        });
        this.personalDbSearchExecutionInProcess = false;
        this.globalDbSearchExecutionInProcess = false;
        this.loadingFlag = false;
      }));
  }

  /**
   * Subscribes to both Global and Personal Db for querying.
   */
  async bothPersonalAndGlobalDbQuery(): Promise<void> {
    this.foodDbSubscriptionsList.push(await combineLatest([
      await this._foodDatabaseService.getFoodsFromDbWithFilter(this.searchTerm.toLowerCase(), true, 15),
      await this._foodDatabaseService.getGlobalFoodsFromDbWithFilter(this.searchTerm.toLowerCase(), true, 15)])
      .subscribe(res => {
        // Personal Db Query
        if (res[0].length > 0) { this.noPersonalFoodsFoundAfterQuery = false; }
        res[0].forEach(element => {
          this.filteredFoodMap.set(element.DocumentId, element);
        });
        this.personalDbSearchExecutionInProcess = false;

        // Global Db Query
        if (res[1].length > 0) { this.noGlobalFoodsFoundAfterQuery = false; }
        res[1].forEach(element => {
          this.filteredFoodMap.set(element.DocumentId, element);
        });
        this.globalDbSearchExecutionInProcess = false;
        this.loadingFlag = false;
      }));
  }

  /**
   * When food is selected from search list.
   * @param food Selected food.
   */
  async foodSelected(food: Food): Promise<void> {
    this.hideList();
    this.unhideForm();
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
    this.addEntryForm = this._formbBuilder.group({
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
      await this._dailyTrackingServince.addEntryAndUpdateDailyEntryFields(this.date, this.consumedFood);
      await this._router.navigate(["/tabs/daily_entry"]);
      this.hideForm();
      this.unhidetList();
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
   *  Maintain insertion order in Map when using keyvalue pipe.
   */
  asIsOrder(a, b): number {
    return 1;
  }

  // Hiding or unhiding elements
  hideForm(): void {
    this.isFormHidden = true;
  }

  unhideForm(): void {
    this.isFormHidden = false;
    this.setFocus();
  }

  hideList(): void {
    this.isListHidden = true;
  }

  unhidetList(): void {
    this.isListHidden = false;
  }

  // Set focus on quantity input
  setFocus(): void {
    setTimeout(async () => {
      await this.qtyInput.setFocus();
    });
  }

}
