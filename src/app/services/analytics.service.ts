import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, collection, query, orderBy, limit, onSnapshot, getCountFromServer } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DailyEntry } from '../models/dailyEntry';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    private _firestore: Firestore,
    private _authService: AuthService) { }

  /**
   * Get Daily Entries for current user in ascending order.
   * (By default, a query retrieves all documents that satisfy the query in ascending order by document ID)
   * @param limitVal Last x tracked days to retrieve.
   * @returns Observable of DailyEntry array.
   */
  async getDailyEntries(limitVal: number): Promise<Observable<DailyEntry[]>> {
    // To avoid query with 0 and throwing exceptions
    if (limitVal < 1) {
      limitVal = 1;
    }

    // Current user id
    const currentUserUid = await this._authService.auth.currentUser.uid;

    const colRef = collection(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries`);

    const q = query(colRef, orderBy('Date', 'desc'), limit(limitVal));

    return new Observable<DailyEntry[]>(subscriber => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const entries = snapshot.docs.map(docSnap => docSnap.data() as DailyEntry);
        subscriber.next(entries);
      }, err => subscriber.error(err));

      return unsubscribe;
    });
  }

  async getDailyEntriesCount(): Promise<number> {
    // Current user id
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const colRef = collection(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries`);

    const snapshot = await getCountFromServer(colRef);
    //console.log('count: ', snapshot.data().count);

    return snapshot.data().count;
  }
}



