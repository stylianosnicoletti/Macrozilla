import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Chart } from 'chart.js';
import { AnalyticsService } from '../services/analytics.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab-analytics',
  templateUrl: './tab-analytics.page.html',
  styleUrls: ['./tab-analytics.page.scss'],
})
export class TabAnalyticsPage {

  @ViewChild('lineChartCaloriesAllTime') lineChartCaloriesAllTime;
  @ViewChild('pieChartMacrosAllTime') pieChartMacrosAllTime;

  bars: Chart[] = [];
  lastDaysToRetrieve: number;
  maxDaysThatCanBeRetrieved: number;
  minDaysThatCanBeRetrieved: number;
  allTimeAverageCalories: number;
  allTimeCalories: number[];
  allTimeDates: string[];
  allTimeProteinCalories: number;
  allTimeCarbsCalories: number;
  allTimeSaturatedCalories: number;
  allTimeUnsaturatedCalories: number;
  allTimeCaloriesCalculatedFromMacros: number;
  subscriptionsList: Subscription[] = [];
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  screenOrientationSubscription: Subscription;

  constructor(
    private _analyticsService: AnalyticsService,
    private _userService: UserService,
    private _alertController: AlertController,
    private _network: Network,
    private _screenOrientation: ScreenOrientation,
    private _unsubscribeService: UnsubscribeService) {
  }

  async ionViewWillEnter() {
    console.log("entering analytics page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this._unsubscribeService.unsubscribeData(this.subscriptionsList);
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
    });

    this.connectSubscription = this._network.onConnect().subscribe(() => {
      this._unsubscribeService.unsubscribeData(this.subscriptionsList);
      this.initialiseItems();
      console.log('network connected!');
    });

    this.screenOrientationSubscription = this._screenOrientation.onChange().subscribe(() => {
      console.log("Orientation Changed");
      this.ionViewWillLeave();
      //need to find a better way
      //now am enabling portrain only from android manifest
      //location.reload();
    });
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving analytics page");
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    this.unsubscribeNetwork();
    this.unsubscribeOrientation();
  }

  unsubscribeNetwork() {
    if (!this.connectSubscription.closed) this.connectSubscription.unsubscribe();
    if (!this.disconnectSubscription.closed) this.disconnectSubscription.unsubscribe();
  }

  unsubscribeOrientation() {
    if (!this.screenOrientationSubscription.closed) this.screenOrientationSubscription.unsubscribe();
  }

  async initialiseItems() {
    this.allTimeDates = [];
    this.allTimeCalories = [];
    this.allTimeProteinCalories = 0;
    this.allTimeCarbsCalories = 0;
    this.allTimeSaturatedCalories = 0;
    this.allTimeUnsaturatedCalories = 0;
    this.allTimeCaloriesCalculatedFromMacros = 0;
    this.maxDaysThatCanBeRetrieved = (await this._userService.GetSizes()).DailyEntries;
    this.minDaysThatCanBeRetrieved = this.maxDaysThatCanBeRetrieved == 0 ? 0 : 1;
    // Bring at least the last 7 days if the 1/3 of total entries is not a week.
    this.lastDaysToRetrieve = Math.round(this.maxDaysThatCanBeRetrieved / 3) < 7 ? this.maxDaysThatCanBeRetrieved : Math.round(this.maxDaysThatCanBeRetrieved / 3);
    if (this.minDaysThatCanBeRetrieved != 0) {
      await this.prepareAllTimeCharts();
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

  averageOfArray(array: number[]): number {
    return this.sumOfArray(array) / array.length;
  }

  sumOfArray(array: number[]): number {
    return array.reduce((previous, current) => current += previous);
  }

  precise_round(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  async selectedRange() {
    this.allTimeDates = [];
    this.allTimeCalories = [];
    this.allTimeProteinCalories = 0;
    this.allTimeCarbsCalories = 0;
    this.allTimeSaturatedCalories = 0;
    this.allTimeUnsaturatedCalories = 0;
    this.allTimeCaloriesCalculatedFromMacros = 0;
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    if (this.minDaysThatCanBeRetrieved != 0) {
      await this.prepareAllTimeCharts();
    }
  }

  async prepareAllTimeCharts() {
    this.subscriptionsList.push((await this._analyticsService.getDailyEntries(this.lastDaysToRetrieve)).subscribe(dentries => {
      dentries.forEach(dentry => {
        this.allTimeDates.push(dentry.Date);
        this.allTimeCalories.push(this.precise_round(dentry.TotalCalories, 0));
        this.allTimeCaloriesCalculatedFromMacros += (dentry.TotalCarbohydrateGrams * 4 + dentry.TotalFatGrams * 9 + dentry.TotalProteinGrams * 4);
        this.allTimeProteinCalories += dentry.TotalProteinGrams * 4;
        this.allTimeCarbsCalories += dentry.TotalCarbohydrateGrams * 4;
        this.allTimeSaturatedCalories += dentry.TotalSaturatedGrams * 9;
        this.allTimeUnsaturatedCalories += ((dentry.TotalFatGrams * 9) - (dentry.TotalSaturatedGrams * 9));
      })
      this.allTimeAverageCalories = (this.allTimeCalories.length > 0) ? this.precise_round(this.averageOfArray(this.allTimeCalories), 0) : null;
      this.createAllTimeCharts();
    }));
  }

  createAllTimeCharts() {
    this.bars.push(new Chart(this.lineChartCaloriesAllTime.nativeElement, {
      type: 'line',
      data: {
        // Labels: Dates
        labels: this.allTimeDates,
        datasets: [{
          // Data : Calories
          data: this.allTimeCalories,
          backgroundColor: '#7FB3D5',
          borderWidth: 1,
        }
        ]
      },
      options: {
        legend: null,
        scales: {
          yaxes: [{
            ticks: {
              beginAtZero: null
            }
          }]
        }
      }
    }));

    this.bars.push(new Chart(this.pieChartMacrosAllTime.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [(this.allTimeProteinCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Protein',
        (this.allTimeUnsaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Unsaturated Fat',
        (this.allTimeSaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Saturated Fat',
        (this.allTimeCarbsCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1) + '% ' + 'Carbohydrates'],
        datasets: [{
          // Percentages of macros
          data: [(this.allTimeProteinCalories / this.allTimeCaloriesCalculatedFromMacros),
          (this.allTimeUnsaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
          (this.allTimeSaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
          (this.allTimeCarbsCalories / this.allTimeCaloriesCalculatedFromMacros)],
          backgroundColor: ['#00bdaa', '#400082', '#fe346e', '#f1e7b6'],
          borderColor: ['#00bdaa', '#400082', '#fe346e', '#f1e7b6'],
          borderWidth: 1
        }]
      },
      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          position: 'right'
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            },
          }]

        }
      }
    }));
  }
}






