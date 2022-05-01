import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate,Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class CanEnterTabsPageGuard implements CanActivate {  
  constructor(private _angularFireAuth: AngularFireAuth,private _router: Router){}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, stateSnapshot:RouterStateSnapshot){
      return this._angularFireAuth.authState.pipe(
        map((auth)=>{
          if(!auth || !auth.emailVerified){
            this._router.navigate(["/login"]);
            return false;
          }else{
            return true;
          }
        })
      );
    }
}
