import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GlobalVariables} from '../models/globalVariables.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  constructor(
    private _angularFireStore: AngularFirestore) { }

  /**
   * Get Global Variables Doc
   * @returns Observable of Variables Doc.
   */
  getServingUnits(): Observable<GlobalVariables> {

    // Get globalVariables doc 
    return this._angularFireStore.doc<GlobalVariables>("/TheMacroDiet/Production/Configuration/GlobalVariables").valueChanges();
    
    }

}
