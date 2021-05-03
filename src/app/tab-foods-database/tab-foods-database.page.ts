import { Component } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Food } from '../models/food.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Network } from '@ionic-native/network/ngx';
import { FoodDatabaseService } from '../services/food-db.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab-foods-database',
  templateUrl: 'tab-foods-database.page.html',
  styleUrls: ['tab-foods-database.page.scss']
})
export class TabFoodsDatabasePage {

  searchTerm: string = "";
  filteredFoodMap = new Map<string, Food>(); // To avoid duplication and maintain insertion order (for ES6+)
  foodDbSubscriptionsList: Subscription[] = []; // Storing subscriptions calling the food databases
  generalSubscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  useOnlyPersonalDb: boolean = false;
  noPersonalFoodsFoundAfterQuery: boolean = true;
  noGlobalFoodsFoundAfterQuery: boolean = true;
  personalDbSearchExecutionInProcess: boolean = false;
  globalDbSearchExecutionInProcess: boolean = false;
  loadingFlag: boolean = false;

  constructor
    (
      private _foodDatabaseService: FoodDatabaseService,
      private _loadingService: LoadingService,
      private _router: Router,
      private _alertController: AlertController,
      private _network: Network,
      private _unSubscribeService: UnsubscribeService,
      private _userService: UserService) {
  }

  ngOnInit() {
    console.log("ngOnInit Food DB Tab");
  }

  async ionViewWillEnter() {
    console.log("entering foods dbs page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this._unSubscribeService.unsubscribeData(this.generalSubscriptionsList);
      this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
      this.searchTerm = "";
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
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
    console.log("leaving foods dbs page");
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
    this.searchTerm = "";
    await (await this._userService.getUserFields()).subscribe(async x => {
      this.useOnlyPersonalDb = x.Options.UseOnlyPersonalDb;
    });
  }

  /**
   * Refreshes page.
   * @param event 
   */
  async doRefresh(event): Promise<void> {
    this._unSubscribeService.unsubscribeData(this.foodDbSubscriptionsList);
    await this.initialiseItems();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * No network alert
   */
  async presentNetworkAlert(): Promise<void> {
    const alert = await this._alertController.create({
      header: 'No Data Connection',
      message: 'Consider turning on mobile data or Wi-Fi.',
      buttons: ['OK']
    });
    await alert.present();
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
   * Delete Confirmation Alert
   * @param food Food.
   * @param slidingItem Sliding item.
   */
  async presentAlertConfirmDelete(food: Food, slidingItem: any): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Do you want to proceed deleting?',
      message: food.Name,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Yes',
          handler: () => {
            this._foodDatabaseService.deleteFood(food.DocumentId);
            slidingItem.close();
            this._loadingService.presentLoading('Deleting..', 500);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   *  Maintain insertion order in Map when using keyvalue pipe.
   */
  asIsOrder(a, b) {
    return 1;
  }

  /**
   * Add new Food.
   */
  async addFood() {
    await this._router.navigate(["/add_food/"]);
  }

  /**
   * Edit existing Food.
   * @param food Food.
   * @param slidingItem Sliding item.
   */
  async editFood(food: Food, slidingItem: any) {
    (await this._foodDatabaseService.getFood(food.DocumentId)).subscribe(res =>{
      //console.log(res);
    })

    //await this._router.navigate(["/edit_food/" + food.DocumentId]);
    slidingItem.close();
  }

}