import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { map } from 'rxjs/operators';
import { DailyEntry } from '../models/dailyEntry';


@Injectable({
  providedIn: 'root'
})
export class DailyTrackingService {
  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService) { }



 /**
  * Get DailyEntry Doc together with Entries sub-collection for the current user on that date.
  */
  async getAllDailyFoodEntriesByDate(selectedDate: string): Promise<Observable<DailyEntry>> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return this._angularFireStore.doc<DailyEntry>("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate).valueChanges();
    
  }

 /*
   //Get all foods from database ordered by name for the current user on that date
  async getAllFoodEntriesByDate(selected_date): Promise<Observable<DailyEntryFood[]>> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this.foodEntriesFire = this._angularFireDatabase.list('/entries/' + currentUserUid + '/' +
      selected_date + '/', ref => ref.orderByKey());

    this.foodEntries = this.foodEntriesFire.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.foodEntries;
  }

  // Delete food entry from entries for the current user on that date
  async deleteFoodEntry(key_negative_timestamp, selected_date) {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this._angularFireDatabase.object('/entries/' +
    currentUserUid + '/' +
      selected_date + '/' + key_negative_timestamp).remove();
  }

  // Add a new food entry on entries for the current user on that date
  async addFoodEntry(food_entry, selected_date) {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this._angularFireDatabase.object('/entries/' +
    currentUserUid + '/' +
      selected_date + '/' + this.getAnEntryKey() + '/').set(food_entry);
  }


  // Get number of entries under that date for that user 
  async getNumberOfFoodEntriesByDate(selected_date): Promise<Number> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    const getNumberOfEntriesRef = this._angularFireDatabase.database.ref('/entries/' + currentUserUid + '/').child(selected_date);
    return getNumberOfEntriesRef.once("value").then(function (snapshot) {
      return snapshot.numChildren()
    });
  }

  // Return the max lenfth that Number type can get minus the date now in miliseconds
  getAnEntryKey() {
    return Number.MAX_SAFE_INTEGER - Date.now();
  }
 */
}





