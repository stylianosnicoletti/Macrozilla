import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { AnalyticsService } from '../services/analytics.service';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { UserService } from '../services/user.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart,
  ArcElement,
  LineElement,
  //BarElement,
  PointElement,
  //BarController,
  //BubbleController,
  DoughnutController,
  LineController,
  //PieController,
  //PolarAreaController,
  //RadarController,
  //ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  //RadialLinearScale,
  //TimeScale,
  //TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
  //ChartConfiguration,
  //CoreScaleOptions,
  //Scale,
  ChartOptions,
  ChartData
} from 'chart.js';

@Component({
  selector: 'app-tab-analytics',
  templateUrl: './tab-analytics.page.html',
  styleUrls: ['./tab-analytics.page.scss'],
})
export class TabAnalyticsPage {

  @ViewChild('lineChartCalories') lineChartCalories;
  @ViewChild('doughnutChartMacros') doughnutChartMacros;

  bars: Chart[] = [];
  lastDaysToRetrieve: number;
  maxDaysThatCanBeRetrieved: number;
  minDaysThatCanBeRetrieved: number;
  allTimeAverageCalories: number;
  dateCaloriesMap = new Map<string, number>(); // Used map instead of arrays to avoid duplication when adding each element on value changes (may receive same element more than once) 
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
    private _unsubscribeService: UnsubscribeService) {
    Chart.register(
      ArcElement,
      LineElement,
      //BarElement,
      PointElement,
      //BarController,
      //BubbleController,
      DoughnutController,
      LineController,
      //PieController,
      //PolarAreaController,
      //RadarController,
      //ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      //RadialLinearScale,
      //TimeScale,
      //TimeSeriesScale,
      ChartDataLabels,
      Filler,
      Legend,
      Title,
      Tooltip
    );
  }

  async ionViewWillEnter() {
    console.log("entering analytics page");
    Network.addListener('networkStatusChange', async status => {
      if (status.connected) {
        console.log('Network connected!');
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        this.initialiseItems();
      }
      else {
        console.log('Network disconnected!');
        this._unsubscribeService.unsubscribeData(this.subscriptionsList);
        await this.presentNetworkAlert();   
      }
    });
    await this.initialiseItems();
  }

  ionViewWillLeave() {
    console.log("leaving analytics page");
    this._unsubscribeService.unsubscribeData(this.subscriptionsList);
    Network.removeAllListeners();
  }

  async initialiseItems() {
    this.dateCaloriesMap = new Map<string, number>();
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
    this.dateCaloriesMap = new Map<string, number>();
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
        this.dateCaloriesMap.set(dentry.Date, this.precise_round(dentry.TotalCalories, 0));
        this.allTimeCaloriesCalculatedFromMacros += (dentry.TotalCarbohydrateGrams * 4 + dentry.TotalFatGrams * 9 + dentry.TotalProteinGrams * 4);
        this.allTimeProteinCalories += dentry.TotalProteinGrams * 4;
        this.allTimeCarbsCalories += dentry.TotalCarbohydrateGrams * 4;
        this.allTimeSaturatedCalories += dentry.TotalSaturatedGrams * 9;
        this.allTimeUnsaturatedCalories += ((dentry.TotalFatGrams * 9) - (dentry.TotalSaturatedGrams * 9));
      })
      this.allTimeAverageCalories = (this.dateCaloriesMap.size > 0) ? this.precise_round(this.averageOfArray(Array.from(this.dateCaloriesMap.values())), 0) : null;
      this.createAllTimeCharts();
    }));
  }

  createAllTimeCharts() {
    // Clean up any references stored to the chart object within Chart.js, along with any associated event listeners attached by Chart.js. This must be called before the canvas is reused for a new chart.
    this.bars.forEach(chart => {
      chart.destroy();
    });

    // Line Chart
    const lineChartLabels = Array.from(this.dateCaloriesMap.keys());

    const lineChartData = {
      labels: lineChartLabels,
      datasets: [{
        data: Array.from(this.dateCaloriesMap.values()),
        fill: true,

        borderColor: '#7fd5cc',
        pointBorderColor: '#7f88d5',
        pointBackgroundColor: '#7f88d5',
        backgroundColor: '#7FB3D5',
        borderWidth: 3,
        pointBorderWidth: 5,
        tension: 0.3
      }]
    } as ChartData;

    const lineChartOptions = {
      aspectRatio: 2.5, 
      plugins: {
        datalabels: {
          display: false
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value) {
              return value + ' kcal';
            }
          }
        }
      }
    } as ChartOptions;

    this.bars.push(new Chart(this.lineChartCalories.nativeElement, {
      type: 'line',
      data: lineChartData,
      options: lineChartOptions
    }));


    // Doughnut Chart
    const doughnutChartLabels = [('🥩 ' + (this.allTimeProteinCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1)) + '%',
    ('🐖 ' + (this.allTimeUnsaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1)) + '%',
    ('🐖 ' + (this.allTimeSaturatedCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1)) + '%',
    ('🍞 ' + (this.allTimeCarbsCalories * 100 / this.allTimeCaloriesCalculatedFromMacros).toFixed(1)) + '%'];

    const doughnutChartData = {
      labels: doughnutChartLabels,
      datasets: [{
        // Percentages of macros
        data: [(this.allTimeProteinCalories / this.allTimeCaloriesCalculatedFromMacros),
        (this.allTimeUnsaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
        (this.allTimeSaturatedCalories / this.allTimeCaloriesCalculatedFromMacros),
        (this.allTimeCarbsCalories / this.allTimeCaloriesCalculatedFromMacros)],
        backgroundColor: ['#400082', '#00bdaa', '#fe346e', '#f1e7b6'],
        borderColor: ['#400082', '#00bdaa', '#fe346e', '#f1e7b6'],
        borderWidth: 1,
        clip: 0
      }]
    } as ChartData;

    const doughnutChartOptions = {
      aspectRatio: 1.45, 
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: null
      },
      plugins: {
        datalabels: {
          display: true,
          formatter: (value, context) => {
            return context.chart.data.labels[context.dataIndex];
          },
          color: '#fff',
          backgroundColor: '#696969',
          font: {
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          display: false,
          labels: {
            font: {
            }
          }
        },
        title: {
          display: false
        },
      }
    } as ChartOptions;

    this.bars.push(new Chart(this.doughnutChartMacros.nativeElement, {
      type: 'doughnut',
      data: doughnutChartData,
      options: doughnutChartOptions
    }));
  }
}






