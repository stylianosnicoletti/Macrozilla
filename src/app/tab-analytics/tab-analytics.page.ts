import { Component, ViewChild } from '@angular/core';
import { SummaryService } from '../services/summary.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab-analytics',
  templateUrl: './tab-analytics.page.html',
  styleUrls: ['./tab-analytics.page.scss'],
})
export class TabAnalyticsPage {

  @ViewChild('lineChartCaloriesAllTime') lineChartCaloriesAllTime;
  @ViewChild('pieChartMacrosAllTime') pieChartMacrosAllTime;

  bars: Chart[] = [];
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
    private _summaryService: SummaryService,
    private _alertController: AlertController,
    private _network: Network,
    private _screenOrientation: ScreenOrientation) {
  }

  async ionViewWillEnter() {
    console.log("entering analytics page");
    this.disconnectSubscription = this._network.onDisconnect().subscribe(async () => {
      this.unsubscribeData();
      await this.presentNetworkAlert();
      console.log('network was disconnected :-(');
    });

    this.connectSubscription = this._network.onConnect().subscribe(() => {
      this.unsubscribeData();
      this.initialiseItems();
      console.log('network connected!');
    });

    this.screenOrientationSubscription = this._screenOrientation.onChange().subscribe(() => {
      console.log("Orientation Changed");
      this.ionViewWillLeave();
      //need to find a better way
      //now am enabling portrain onluy from android manifest
      //location.reload();
    });
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving analytics page");
    this.unsubscribeData();
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

  unsubscribeData() {
    this.subscriptionsList.forEach(item => {
      if (!item.closed) item.unsubscribe();
    })
    this.subscriptionsList = [];
  }

  async initialiseItems() {
    await this.prepareAllTimeCharts();
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

  async prepareAllTimeCharts() {
    this.subscriptionsList.push((await this._summaryService.getAllSummaries()).subscribe(r => {
      this.allTimeDates = [];
      this.allTimeCalories = [];
      this.allTimeProteinCalories = 0;
      this.allTimeCarbsCalories = 0;
      this.allTimeSaturatedCalories = 0;
      this.allTimeUnsaturatedCalories = 0;
      this.allTimeCaloriesCalculatedFromMacros = 0;
      r.forEach(a => {
        this.allTimeDates.push(a.key);
        this.allTimeCalories.push(this.precise_round(a.totalCalories, 0));
        this.allTimeCaloriesCalculatedFromMacros += (a.totalGramsCarbohydrates * 4 + a.totalGramsFats * 9 + a.totalGramsProtein * 4);
        this.allTimeProteinCalories += a.totalGramsProtein * 4;
        this.allTimeCarbsCalories += a.totalGramsCarbohydrates * 4;
        this.allTimeSaturatedCalories += a.totalGramsSaturated * 9;
        this.allTimeUnsaturatedCalories += ((a.totalGramsFats * 9) - (a.totalGramsSaturated * 9));
      })
      this.allTimeAverageCalories = this.precise_round(this.averageOfArray(this.allTimeCalories), 0);
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






