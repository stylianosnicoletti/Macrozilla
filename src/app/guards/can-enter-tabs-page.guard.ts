import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CanEnterTabsPageGuard implements CanActivate {
  constructor(
    private _auth: Auth,
    private _router: Router) { }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot) {
    return authState(this._auth).pipe(
      map((auth) => {
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
