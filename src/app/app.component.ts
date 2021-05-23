import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  platformPauseSubsciption: Subscription;
  platformResumeSubsciption: Subscription;

  constructor(
    private platform: Platform,
    private _angularFireDatabase: AngularFireDatabase) {
    this.initializeApp();
    this.initializePauseResumeSubscriptions();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Platform: " +Capacitor.getPlatform());
      if (Capacitor.isNativePlatform()) {
        console.log("Is Native");
        StatusBar.show();
        SplashScreen.hide();
      }
    });
  }

  initializePauseResumeSubscriptions() {
    this.platformPauseSubsciption = this.platform.pause.subscribe(async () => {
      console.log('paused!');

    });

    this.platformResumeSubsciption = this.platform.resume.subscribe(async () => {
      this._angularFireDatabase.database.goOffline();
      this._angularFireDatabase.database.goOnline();
      console.log('resumed!');
    });
  }
}