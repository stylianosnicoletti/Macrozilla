import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, doc, getDoc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options, Sizes, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _firestore: Firestore,
    private _authService: AuthService) { }

  /**
   * Get current user doc fields.
   * @returns Observable of User.
   */
  async getUserFields(): Promise<Observable<User>> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}`);

    return new Observable<User>(subscriber => {
      const unsubscribe = onSnapshot(docRef, docSnap => {
        if (docSnap.exists()) {
          subscriber.next(docSnap.data() as User);
        } else {
          subscriber.next(null);
        }
      }, err => subscriber.error(err));

      return unsubscribe;
    });
  }

  /**
   * Updates current user doc Options field.
   * @param user User.
   */
  async updateUserFieldOptions(options: Options): Promise<void> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}`);
    return await updateDoc(docRef, { Options: options });
  }

  /**
   * Daily Entries Size Increment.
   */
  async DailyEntriesSizeIncrement(): Promise<any> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as User;
      const sizes = data.Sizes;
      sizes.DailyEntries += 1;
      return await updateDoc(docRef, { Sizes: sizes });
    }
  }

  /**
   * Daily Entries Size Decrement.
   */
  async DailyEntriesSizeDecrement(): Promise<any> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as User;
      const sizes = data.Sizes;
      sizes.DailyEntries -= 1;
      return await updateDoc(docRef, { Sizes: sizes });
    }
  }

  /**
   * Retrieve sizes field from User doc.
   */
  async GetSizes(): Promise<Sizes> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(this._firestore, `/TheMacroDiet/Production/Users/${currentUserUid}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as User;
      return data.Sizes;
    }
    return null;
  }
}