import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from '../types';
import { FoodService } from '../services/food.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Network } from '@ionic-native/network/ngx';

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
      private _loadingService: LoadingService,
      private _router: Router,
      private _alertController: AlertController,
      private _network: Network) {
  }

  ionViewWillEnter() {
    console.log("entering foods dbs page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
      this.unsubscribeData();
      this.searchTerm = "";
      this.presentNetworkAlert();
      console.log('network was disconnected :-(');
    });

    this.connectSubscription = this._network.onConnect().subscribe(() => {
      this.unsubscribeData();
      this.initialiseItems();
      this.searchTerm = "";
      console.log('network connected!');
    });

    this.initialiseItems();
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

  initialiseItems() {
    this.subscriptionsList.push(
      this._foodService.getAllFoods().subscribe(res => {
        this.filteredFoodList = res;
      }));
  }

  doRefresh(event) {
    this.unsubscribeData();
    this.initialiseItems();
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
  filterFoods() {
    this.subscriptionsList.push(
      this._foodService.getAllFoods().subscribe(res => {
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
    this._router.navigate(["/add_food/"]);
  }

  // Edit Food
  async editFood(food: Food, slidingItem: any) {
    this._router.navigate(["/edit_food/" + food.key]);
    slidingItem.close();
  }

}