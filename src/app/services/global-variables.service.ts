import { Injectable } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GlobalVariables} from '../models/globalVariables.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  constructor(
    private _firestore : Firestore
  ) { }

  /**
   * Get Global Variables Doc
   * @returns Observable of Variables Doc.
   */
  getServingUnits(): Observable<GlobalVariables> {
    const docRef = doc(this._firestore, "/TheMacroDiet/Production/Configuration/GlobalVariables");

    return new Observable<GlobalVariables>(subscriber => {
      const unsubscribe = onSnapshot(docRef, docSnap => {
        if (docSnap.exists()) {
          subscriber.next(docSnap.data() as GlobalVariables);
        } else {
          subscriber.next(null);
        }
      }, err => subscriber.error(err));

      return unsubscribe;
    });
  }
}
