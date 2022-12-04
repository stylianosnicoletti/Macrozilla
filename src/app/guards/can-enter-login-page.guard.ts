import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from "rxjs/operators";
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';


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
          //console.log("Is Native");
          //console.log(`Hide splash screen`);
          SplashScreen.hide().then(() => { 
            //console.log(`Splashscreen hidden`);
           });
          StatusBar.show();
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