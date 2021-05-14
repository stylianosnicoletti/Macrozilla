import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { map } from 'rxjs/operators';
import { DailyEntry, Entry } from '../models/dailyEntry';


@Injectable({
  providedIn: 'root'
})
export class DailyTrackingService {
  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService) { }



  /**
 * Get Document from User Daily Entries.
 * @param selectedDate Selected date.
 * @param includeSubCollection If true the Entries sub-collection is included. (Default = false)
 * @returns 
 */
  async getDailyEntry(selectedDate: string, includeSubCollection: boolean = false): Promise<DailyEntry> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Reference to document
    const userDocRef = await this._angularFireStore.doc<DailyEntry>("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate);
    const doc = await userDocRef.get();
    
    if (!(await doc.toPromise()).exists) {
      return null;
    } else {
      if (includeSubCollection) {
        return doc.pipe(map(c => ({
          DocumentId: c.id,
          Entries: c.data().Entries,
          TotalCalories: c.data().TotalCalories,
          TotalFatGrams: c.data().TotalFatGrams,
          TotalSaturatedGrams: c.data().TotalSaturatedGrams,
          TotalCarbohydrateGrams: c.data().TotalCarbohydrateGrams,
          TotalProteinGrams: c.data().TotalProteinGrams
        }))).toPromise();
      }
      else {
        return doc.pipe(map(c => ({
          DocumentId: c.id,
          TotalCalories: c.data().TotalCalories,
          TotalFatGrams: c.data().TotalFatGrams,
          TotalSaturatedGrams: c.data().TotalSaturatedGrams,
          TotalCarbohydrateGrams: c.data().TotalCarbohydrateGrams,
          TotalProteinGrams: c.data().TotalProteinGrams
        }))).toPromise();
      }
    }
  }

  /**
 * Add a new entry to the Entries sub-collection of daily entries
 * @param selectedDate Selected date.
 * @param entry Entry (Consumed food).
 * @returns 
 */
  async addEntryToDailyEntries(selectedDate: string, entry: Entry): Promise<any> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return await this._angularFireStore.collection("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate + "/Entries").add(entry);
  }

  async updateDailyEntry(selectedDate: string, dailyEntry: DailyEntry): Promise<any> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return await this._angularFireStore.doc("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate).update(dailyEntry);
  }

  async setDailyEntry(selectedDate: string, dailyEntry: DailyEntry): Promise<any> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return await this._angularFireStore.doc("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate).set(dailyEntry);
  }

  async resetDailyEntry(selectedDate: string): Promise<any> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    const newDailyEntry: DailyEntry = {
      TotalCalories: 0,
      TotalFatGrams: 0,
      TotalSaturatedGrams: 0,
      TotalCarbohydrateGrams: 0,
      TotalProteinGrams: 0
    }

    return await this._angularFireStore.doc("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/" + selectedDate).update(newDailyEntry);
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





