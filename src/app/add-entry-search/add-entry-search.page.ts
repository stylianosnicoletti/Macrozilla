import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { Food } from '../models/food.model';
import { FoodDatabaseService } from '../services/food-db.service';
import { UserService } from '../services/user.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { MacrozillaConstants } from '../macrozilla-constants';

@Component({
  selector: 'app-add-entry-search',
  templateUrl: './add-entry-search.page.html',
  styleUrls: ['./add-entry-search.page.scss'],
})

export class AddEntrySearchPage {

  date: string;
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
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  lastNetworkStatusIsConnected = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _foodDatabaseService: FoodDatabaseService,
    private _unSubscribeService: UnsubscribeService,
    private _userService: UserService,
    private _alertController: AlertController,
    private _renderer: Renderer2) {
  }

  async ngOnInit() {
    console.log("ngOnInit Add New Daily Entry Search");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    console.log("entering add entry search page");

    Network.addListener('networkStatusChange', async status => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
        console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
        this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
        this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
        await this.initialiseItems();
        this.searchTerm = "";       
      }
      else if(!status.connected) {
        console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
        this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
        this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
        this.searchTerm = "";
        await this.goToDailyEntryTab();
        
      }
    });
    
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving add entry search page");
    this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
    this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
    Network.removeAllListeners();
  }

  /**
   * Initialises items.
   */
  async initialiseItems(): Promise<void> {
    this.enterGuard();
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
    if (!MacrozillaConstants.REGEX_DATE.test(this.date)) this._router.navigate(["/tabs/daily_entry"]);
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
   *  Navigate back to daily entry tab
   */
  async goToDailyEntryTab(): Promise<void> {
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
   * When food is selected from search list route to AddEntryInputFormPage.
   * @param food Selected food.
   */
  async foodSelected(food: Food): Promise<void> {
    console.log(food.DocumentId);
    await this._router.navigate(["/add_entry_input_form/" + this.date +"/" + food.DocumentId]);
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
}
