import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _angularFireDatabase: AngularFireDatabase) {
    this.initializeApp();
    this.initializePauseResumeSubscriptions();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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