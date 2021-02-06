import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";


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
        if (auth && auth.emailVerified) {
          this._router.navigate(["/tabs"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}