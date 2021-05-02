import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from '../types';
import { FoodService } from '../services/food.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Network } from '@ionic-native/network/ngx';
import { FoodDatabaseService } from '../services/food-db.service';

@Component({
  selector: 'app-tab-foods-database',
  templateUrl: 'tab-foods-database.page.html',
  styleUrls: ['tab-foods-database.page.scss']
})
export class TabFoodsDatabasePage {

  searchTerm: string = "";
  filteredFoodList: Food[] = [];
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor
    (
      private _foodService: FoodService,
      private _foodDatabaseService: FoodDatabaseService,
      private _loadingService: LoadingService,
      private _router: Router,
      private _alertController: AlertController,
      private _network: Network) {
  }

 async ionViewWillEnter() {
    console.log("entering foods dbs page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this.unsubscribeData();
      this.searchTerm = "";
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this.unsubscribeData();
      await this.initialiseItems();
      this.searchTerm = "";
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {

    console.log("leaving foods dbs page");
    this.unsubscribeData();
    this.unsubscribeNetwork();
  }

  unsubscribeNetwork() {
    if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    if (!this.disconnectSubscription.closed) this.disconnectSubscription.unsubscribe();
  }

  unsubscribeData() {
    this.subscriptionsList.forEach(item => {
      if (!item.closed) item.unsubscribe();
    })
    this.subscriptionsList = [];
  }

  async initialiseItems() {
    this.subscriptionsList.push(
      (await this._foodService.getAllFoods()).subscribe(res => {
        this.filteredFoodList = res;
      }));
  }

  async doRefresh(event) {
    this.unsubscribeData();
    await this.initialiseItems();
    this.searchTerm = "";
    setTimeout(() => {
      event.target.complete();
    }, 1000);
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

  // Update filteredFoodList using search term parsed
  async filterFoods() {
    //this.subscriptionsList.push(await (await this._foodDatabaseService.getGlobalFoodsFromDb(false,true,this.searchTerm.toLowerCase(),false,)).subscribe(res => {console.log(res);}));
   // this.subscriptionsList.push(await (await this._foodDatabaseService.getFoodsFromDb(false,this.searchTerm.toLowerCase(),false,)).subscribe(res => {console.log(res);}));
    this.subscriptionsList.push(
      (await this._foodService.getAllFoods()).subscribe(res => {
        this.filteredFoodList = res.filter((item) => {
          return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
        })
      }));
  }

  // Delete Confirmation
  async presentAlertConfirm(food: Food, slidingItem: any) {
    const alert = await this._alertController.create({
      header: 'Do you want to proceed deleting?',
      message: food.name,
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
            this._foodService.deleteFood(food.key);
            slidingItem.close();
            this._loadingService.presentLoading('Deleting..', 500);
          }
        }
      ]
    });
    await alert.present();
  }

  // Add 
  async addFood() {
    await this._router.navigate(["/add_food/"]);
  }

  // Edit Food
  async editFood(food: Food, slidingItem: any) {
    await this._router.navigate(["/edit_food/" + food.key]);
    slidingItem.close();
  }

}