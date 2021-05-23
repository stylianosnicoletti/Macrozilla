import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodDatabaseService } from '../services/food-db.service';
import { ToastService } from '../services/toast.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Network } from '@capacitor/network'
import { AlertController, PopoverController } from '@ionic/angular';
import { MacrozillaConstants } from '../macrozilla-constants';
import { Food } from '../models/food.model';
import { ServingUnit } from '../models/servingUnit.model';
import { GlobalVariablesService } from '../services/global-variables.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.page.html',
  styleUrls: ['./edit-food.page.scss'],
})
export class EditFoodPage {

  foodDocId: string;
  food: Food;
  preselectedServingUnit: ServingUnit;
  servingUnitsMap = new Map<String, ServingUnit>();
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
    private _foodDatabaseService: FoodDatabaseService,
    private _globalVariableService: GlobalVariablesService,
    private _userService: UserService,
    private _renderer: Renderer2,
    private _unsubscribeService: UnsubscribeService,
    private _alertController: AlertController,
    private _toastService: ToastService,
    private _popController: PopoverController) {
  }

  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
    console.log("ngOnInit EditFood Tab.");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });
  }

  async ionViewWillEnter() {
    console.log("entering edit food page");
    
    Network.addListener('networkStatusChange', async status => {
      if (status.connected) {
        console.log('Network connected!');
        this.isFormReadyToBuild = false;
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.initialiseItems();
      }
      else {
        console.log('Network disconnected!');
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        //don't alert cz inherits from mother page
        this.goToFoodsDatabaseTab()     
      }
    });
    
    await this.initialiseItems();
  }

  async ionViewWillLeave() {
    console.log("leaving edit food page");
    await this.closePopItems();
    this.isFormReadyToBuild = false;
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    Network.removeAllListeners();
  }

  /**
   * Initialise items.
   */
  async initialiseItems(): Promise<void> {
    await this.foodExistGuard();
    this.updateFoodData();

    this.subscriptionsList.push((await this._globalVariableService.getServingUnits()).subscribe(res => {
      res.ServingUnits.forEach(servingUnit => {
        this.servingUnitsMap.set(servingUnit.Name, servingUnit);
      });
    }));

    this.subscriptionsList.push((await this._foodDatabaseService.getFood(this.foodDocId)).subscribe(res => {
      this.editForm.setValue(res);
      this.preselectedServingUnit = this.servingUnitsMap.get(res.ServingUnit);
    }));

  }

  /**
   * Checks if the route param food key exist.
   */
  async foodExistGuard(): Promise<void> {
    this.foodDocId = this._activatedRoute.snapshot.params['food_doc_id'];
    if ((await this._foodDatabaseService.doesPersonalFoodDocExists(this.foodDocId))) {
      this.isFormReadyToBuild = true;
    } else {
      this._router.navigate(["/tabs/foods_database"]);
    }
  }

  /**
   * No network alert.
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
    * Closing pop items (E.g. Service Unit Select).
    */
  async closePopItems(): Promise<void> {
    const popover = await this._popController.getTop();
    if (popover)
      await popover.dismiss(null);
  }

  /** 
   * Contains Reactive Form logic.
   */
  updateFoodData(): void {
    this.editForm = this._formBuilder.group({
      DocumentId: '',
      ServingUnitShortCode: '',
      IsFromPersonalDb: '',
      Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      ServingAmount: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MacrozillaConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]],
      ServingUnit: ['', [Validators.required]],
      Protein: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      Carbohydrates: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      Fats: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      Saturated: ['', [Validators.required, Validators.pattern(MacrozillaConstants.REGEX_DECIMAL_PATTERN), Validators.maxLength(6)]],
      Calories: ['', [Validators.required, Validators.minLength(1), Validators.pattern(MacrozillaConstants.REGEX_INTEGER_PATTERN), Validators.maxLength(6)]]
    })
  }

  /**
   * Route back to foods_database tab.
   */
  async goToFoodsDatabaseTab(): Promise<void> {
    await this._router.navigate(["/tabs/foods_database"]);
  }

  /** 
   * Prepares Food with form values provided.
   * @param {any} formValue Form value.
   * @return {Food} Filled Food.
   */
  fillFood(formValue: any): Food {
    return {
      DocumentId: this.foodDocId,
      Name: formValue.Name,
      Protein: formValue.Protein,
      Carbohydrates: formValue.Carbohydrates,
      Fats: formValue.Fats,
      Saturated: formValue.Saturated,
      Calories: formValue.Calories,
      ServingAmount: formValue.ServingAmount,
      ServingUnit: formValue.ServingUnit.Name,
      ServingUnitShortCode: this.mapServingUnitToShortCode(formValue.ServingAmount, formValue.ServingUnit)
    };
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
   * Submit changes when validations pass.
   * @returns True when submission was successful.
   */
  async submitForm(): Promise<boolean> {
    this.isSubmitted = true;

    // Validation
    if (!this.editForm.valid) {
      await this._toastService.presentToast('Please provide all the required values!')
      return false;
    }

    this.food = this.fillFood(this.editForm.value);

    // Saturated Fats Check
    if (this.food.Saturated > this.food.Fats) {
      await this._toastService.presentToast('Cannot have more Saturated Fats than Total Fats!');
      return false;
    }

    await this.presentAlertConfirmEdit(this.food);

  }

  /**
   * Delete Confirmation Alert
   * @param food Food.
   * @param slidingItem Sliding item.
   */
  async presentAlertConfirmEdit(food: Food): Promise<void> {
    const alert = await this._alertController.create({
      header:  'Proceeding will not affect any existing tracking!',
      message: 'Do you wish to continue?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           return false;
          }
        }, {
          text: 'Yes',
          handler: async () => {
            await this._foodDatabaseService.updateFood(this.food);
            await this._router.navigate(["/tabs/foods_database"]);
            await this._toastService.presentToast('Food Successfully Edited!')
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
}
