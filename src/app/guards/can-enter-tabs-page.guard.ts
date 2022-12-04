import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from "rxjs/operators";
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';


@Injectable({
  providedIn: 'root'
})

export class CanEnterTabsPageGuard implements CanActivate {
  constructor(private _angularFireAuth: AngularFireAuth, private _router: Router) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, stateSnapshot: RouterStateSnapshot) {
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
        //console.log("CanEnterTabsPageGuard");
        if (!auth || !auth.emailVerified) {
          this._router.navigate(["/login"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
