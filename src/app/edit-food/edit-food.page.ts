import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.page.html',
  styleUrls: ['./edit-food.page.scss'],
})
export class EditFoodPage {

  foodKey: any;
  editForm: FormGroup;
  isSubmitted = false;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  isFormReadyToBuild = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _foodService: FoodService,
    private _toastService: ToastService,
    private _network: Network,
    private _alertController: AlertController) {
  }

  async ionViewWillEnter() {
    console.log("entering edit food page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
      this.unsubscribeData();
      //don't alert cz inherits from mother page
      console.log('network was disconnected :-(');
      this.goToFoodsDatabaseTab()
    });

    this.connectSubscription = this._network.onConnect().subscribe(async () => {
      this.isFormReadyToBuild = false;
      this.unsubscribeData();
      await this.initialiseItems();
      console.log('network connected!');
    });

    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving edit food page");
    this.isFormReadyToBuild = false;
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

  // Initialise items
  async initialiseItems() {
    await this.foodExistGuard();
    this.updateFoodData();
    this.subscriptionsList.push(
      (await this._foodService.getFood(this.foodKey)).subscribe(res => {
        this.editForm.setValue(res, res.key = this._activatedRoute.snapshot.params['food_key']);
      }
      ));
  }

  // Check if the route param food key exist
  async foodExistGuard() {
    this.foodKey = this._activatedRoute.snapshot.params['food_key'];
    if ((await this._foodService.doesFoodKeyExist(this.foodKey)) <= 0) {
      this._router.navigate(["/tabs/foods_database"]);
    } else {
      this.isFormReadyToBuild = true;
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

  // Contains Reactive Form logic
  updateFoodData() {
    // Validator pattern don't work with input type number
    // Use type ="text" inputmode="numeric" as quick fix
    const decimalRegexPattern = /^(\d*\.)?\d+$/;
    const integerRegexPattern = /^[0-9]+$/;

    this.editForm = this._formBuilder.group({
      name: [{ value: '', disabled: true, }, Validators.required],
      protein: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      carbohydrates: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      fats: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      saturated: ['', [Validators.required, Validators.pattern(decimalRegexPattern), Validators.maxLength(6)]],
      calories: ['', [Validators.required, Validators.minLength(1), Validators.pattern(integerRegexPattern), Validators.maxLength(6)]],
      key: ['']
    })
  }

  // Route back to foods_databse tab
  async goToFoodsDatabaseTab() {
    await this._router.navigate(["/tabs/foods_database"]);
  }

  // Submit changes
  async submitForm() {
    this.isSubmitted = true;
    if (!this.editForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!')
      return false;
    } else {
      await this._foodService.updateFood(this.editForm.value);
      await this._router.navigate(["/tabs/foods_database"]);
      await this._toastService.presentToast('Food Successfully Edited!')
    }
  }
}
