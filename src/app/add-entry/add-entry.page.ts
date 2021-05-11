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


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})


export class AddEntryPage {

  @ViewChild('qtyInput') qtyInput: IonInput;

  date: string;
  food: Food;
  entry: Entry;
  //entrySummary: Summary;
  //existingSummary: Summary;
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
    private _foodDatabaseService: FoodDatabaseService,
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
    let dateRegEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    this.date = this._activatedRoute.snapshot.params['date_selected'];
    if (!dateRegEx.test(this.date)) this._router.navigate(["/tabs/daily_entry"]);
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

  // Route back to foods_databse tab
  async goToDailyEntryTab() {
    await this._router.navigate(["/tabs/daily_entry"]);
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
    setTimeout(async () => {
      await this.qtyInput.setFocus();
    });
  }

  // Contains Reactive Form logic
  addEntryData() {
    const decimalRegexPattern = /^(\d*\.)?\d+$/;
    this.addEntryForm = this._formbBuilder.group({
      qty: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]]
    })
  }

  // Submit changes
  async submitForm() {
    this.isSubmitted = true;
    if (!this.addEntryForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!');
      return false;
    } else {
      this.entry = this.createEntry(this.food, this.addEntryForm.value.qty);
    //  this.entrySummary = this.createEntrySummary(this.entry);
     // await this._foodEntryService.addFoodEntry(this.entry, this.date);
      //this.existingSummary = await this._summaryService.getSummary(this.date);
   //   if (this.existingSummary != null) {
        // Increment summary if already exists
      //  this._summaryService.incrementExisitngSummary(this.existingSummary, this.entrySummary, this.date);
     // } else {
        // Set summary if it does not exists
      //  await this._summaryService.setSummary(this.entrySummary, this.date);
    //  }
      await this._router.navigate(["/tabs/daily_entry"]);
      this.hideForm();
      this.unhidetList();
      await this._toastService.presentToast('Entry Successfully Added!');
    }
  }

  // Prepare entry
  createEntry(food: Food, qtyArg: number): Entry {
    return {//do the magic calculations here!
      DocumentId: '',

      CreatedAt: '10-33-93',
  
      Food: food
      //qty: qtyArg,
      //food: foodArg,
      //key: null
    };
  }

  // Prepare entry's summary
 /* createEntrySummary(foodEntryArg): Summary {
    return {
      key: null,
      totalGramsProtein: foodEntryArg.food.protein * foodEntryArg.qty,
      totalGramsFats: foodEntryArg.food.fats * foodEntryArg.qty,
      totalGramsSaturated: foodEntryArg.food.saturated * foodEntryArg.qty,
      totalGramsCarbohydrates: foodEntryArg.food.carbohydrates * foodEntryArg.qty,
      totalCalories: foodEntryArg.food.calories * foodEntryArg.qty,
    };
  }*/

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
   asIsOrder(a, b) {
    return 1;
  }

}
