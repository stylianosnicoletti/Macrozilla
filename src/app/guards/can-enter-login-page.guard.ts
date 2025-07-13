import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from "rxjs/operators";
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Device } from '@capacitor/device';
//import { StatusBar, Style } from '@capacitor/status-bar';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';


@Injectable({
  providedIn: 'root'
})
export class CanEnterLoginPageGuard implements CanActivate {
  constructor(private _angularFireAuth: AngularFireAuth, private _router: Router) { }
  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot) {
    return this._angularFireAuth.authState.pipe(
      map((auth) => {
        const platform = Capacitor.getPlatform();
        // Native Platform (Android/iOS)
        if (Capacitor.isNativePlatform()) {
          //EdgeToEdge.enable();
          console.log("Is Nativeee");
          //console.log(`Hide splash screen`);
          SplashScreen.hide().then(() => {
            //console.log(`Splashscreen hidden`);
          });
          Device.getInfo().then(deviceInfo => {
            if (platform === 'android' && Number(deviceInfo.osVersion) >= 15) {
              console.log("EdgeToEdge  enabled for this version");
              EdgeToEdge.enable(); // Enable only on Android 15+
            } else {
              console.log("EdgeToEdge not enabled for this version");
              EdgeToEdge.disable(); // Prevents layout issues on older Android versions
            }
          });
          //StatusBar.show();
        }
        //console.log("CanEnterLoginPageGuard");
        if (auth && auth.emailVerified) {
          this._router.navigate(["/authorized_user/tabs/daily_entry"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}