import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DailyEntry } from '../models/dailyEntry';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService) { }

  /**
   * Get Daily Entries for current user in ascending order.
   * (By default, a query retrieves all documents that satisfy the query in ascending order by document ID)
   * @param limit Last x tracked days to retrieve.
   * @returns 
   */
  async getDailyEntries(limit: number): Promise<Observable<DailyEntry[]>> {

    // To avoid query with 0 and throwing exceptions
    if (limit < 1){
      limit = 1;
    }

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    const collectionRef = await this._angularFireStore.collection<DailyEntry>("/TheMacroDiet/Production/Users/" + currentUserUid + "/DailyEntries/", ref => ref.limit(limit));
    return await collectionRef.valueChanges({ idField: 'DocumentId' });
  }

}





