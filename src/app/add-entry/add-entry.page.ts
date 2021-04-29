import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { ToastService } from '../services/toast.service';
import { Food, DailyEntryFood, Summary } from '../types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SummaryService } from '../services/summary.service';
import { FoodEntryService } from '../services/food-entry.service';
import { Network } from '@ionic-native/network/ngx'
import { AlertController, IonInput } from '@ionic/angular';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})


export class AddEntryPage {

  @ViewChild('qtyInput') qtyInput: IonInput;

  date: string;
  food: Food;
  entry: DailyEntryFood;
  entrySummary: Summary;
  existingSummary: Summary;
  addEntryForm: FormGroup;
  isSubmitted = false;
  searchTerm: string = "";
  filteredFoodList: Food[] = [];
  isListHidden = false;
  isFormHidden = true;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;

  constructor(
    private _router: Router,
    private _formbBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _foodService: FoodService,
    private _foodEntryService: FoodEntryService,
    private _summaryService: SummaryService,
    private _toastService: ToastService,
    private _network: Network,
    private _alertController: AlertController) {
  }

  async ionViewWillEnter() {
    console.log("entering add entry page");

    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this.unsubscribeData();
      this.searchTerm = "";
      // Don't alert becuase daily entry tabs page will do that
      console.log('network was disconnected :-(');
      await this.goToDailyEntryTab();
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
    console.log("leaving add entry page");
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
    this.enterGuard();
    this.addEntryData();
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

  // Update filteredFoodList using search term parsed
  async filterFoods() {
    this.hideForm();
    this.unhidetList();
    this.subscriptionsList.push(
      (await this._foodService.getAllFoods()).subscribe(res => {
        this.filteredFoodList = res.filter((item) => {
          return (item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
        })
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
      this.entrySummary = this.createEntrySummary(this.entry);
      await this._foodEntryService.addFoodEntry(this.entry, this.date);
      this.existingSummary = await this._summaryService.getSummary(this.date);
      if (this.existingSummary != null) {
        // Increment summary if already exists
        this._summaryService.incrementExisitngSummary(this.existingSummary, this.entrySummary, this.date);
      } else {
        // Set summary if it does not exists
        await this._summaryService.setSummary(this.entrySummary, this.date);
      }
      await this._router.navigate(["/tabs/daily_entry"]);
      this.hideForm();
      this.unhidetList();
      await this._toastService.presentToast('Entry Successfully Added!');
    }
  }

  // Prepare entry
  createEntry(foodArg: Food, qtyArg: number): DailyEntryFood {
    return {
      qty: qtyArg,
      food: foodArg,
      key: null
    };
  }

  // Prepare entry's summary
  createEntrySummary(foodEntryArg): Summary {
    return {
      key: null,
      totalGramsProtein: foodEntryArg.food.protein * foodEntryArg.qty,
      totalGramsFats: foodEntryArg.food.fats * foodEntryArg.qty,
      totalGramsSaturated: foodEntryArg.food.saturated * foodEntryArg.qty,
      totalGramsCarbohydrates: foodEntryArg.food.carbohydrates * foodEntryArg.qty,
      totalCalories: foodEntryArg.food.calories * foodEntryArg.qty,
    };
  }

}
