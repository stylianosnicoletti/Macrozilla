import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Subscription } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { environment } from '../environments/environment';
import { MaintenanceService } from '../app/services/maintenance.service';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  platformPauseSubsciption: Subscription;
  platformResumeSubsciption: Subscription;
  isLoadingRouteConfig: boolean;

  constructor(
    private _platform: Platform,
    private _maintenanceService: MaintenanceService,
    private _router: Router,
    private _loadingService: LoadingService) {
    this.isLoadingRouteConfig = false;
    this.initializePauseResumeSubscriptions();
    this.initializeApp();
  }

  ngOnInit() {
    // ONLY WEB BRANCH !!!
    //this._loadingService.showLoadingOnRouteTransition(this._router, this.isLoadingRouteConfig);
  }

  initializeApp() {
    this._platform.ready().then(async () => {

      const platform = Capacitor.getPlatform();

      // Native Platform (Android/iOS)
      if (Capacitor.isNativePlatform()) {
        //console.log("Is Native");
        console.log(`Hide splash screen`);
        SplashScreen.hide().then(()=>console.log(`Splashscreen hidden`));
        StatusBar.show();
        // Android Platform
        if (platform == 'android') {
          //console.log("Is Android");
          let appVersionAndroid: string;
          App.getInfo().then(e => {
            //console.log("Current Version: " + e.version);
            appVersionAndroid = e.version;
          });
          await (await this._maintenanceService.getMaintenanceAndroid()).subscribe(async maintenance => {
            await this._maintenanceService.checkForUpdateOrAvailabilityAndroid(appVersionAndroid, maintenance);
          });
        }
      } else {
        // Web Platform
        if (platform == 'web') {
          //console.log("Is Web");
          //console.log("Current Version: " + environment.appVersion);
          await (await this._maintenanceService.getMaintenanceWeb()).subscribe(async maintenance => {
            await this._maintenanceService.checkForUpdateOrAvailabilityWeb(environment.appVersion, maintenance);
          });
        }
      }
    });
  }

  initializePauseResumeSubscriptions() {
    this.platformPauseSubsciption = this._platform.pause.subscribe(async () => {
      //console.log('paused!');

    });

    this.platformResumeSubsciption = this._platform.resume.subscribe(async () => {
      //console.log('resumed!');
    });
  }
}
