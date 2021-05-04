import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServingUnitsDoc, ServingUnit} from '../models/servingUnits.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  constructor(
    private _angularFireStore: AngularFirestore) { }

  /**
   * Get Serving Units Doc
   * @returns Observable of Food doc.
   */
  //async getServingUnits(): Promise<Observable<ServingUnit>> {

    // Get food doc 
    //return (await this._angularFireStore.doc<ServingUnit>("/TheMacroDiet/Production/GlobalVariables/ServingUnits").get().toPromise().then{
    //  return documen
   // }



  /*{ Name: e.Name)
 
actions.map(a => {
  const data = a.payload.doc.data() as Article;
  const id = a.payload.doc.id;
  return { id, ...data };
}))


subscribe(res => {
  // Personal Db Query
  if (res.length > 0) { this.noPersonalFoodsFoundAfterQuery = false; }
  res.forEach(element => {
);
 
});... );
}*/

  /*
    // Get all serving units
    getAllServingUnits(): Observable<ServingUnit[]> {
      this.servingUnitsFire = this._angularFireDatabase.list('/servingUnits/');
      this.servingUnits = this.servingUnitsFire.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      return this.servingUnits;
    }*/

}
