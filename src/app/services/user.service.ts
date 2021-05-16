import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options, Sizes, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService) { }

  /**
   * Get current user doc fields.
   * @returns Observable of User.
   */
  async getUserFields(): Promise<Observable<User>> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    return this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).valueChanges();
  }


  /**
   * Updates current user doc Options field.
   * @param user User.
   */
  async updateUserFieldOptions(options: Options): Promise<void> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).update({
      Options: options
    });
  }

  /**
   * Daily Entries Size Increment.
   */
  async DailyEntriesSizeIncrement(): Promise<any> {

    // Current User uid
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Current Fields
    const userDoc = await this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).get().toPromise();

    // Prepare new sizes
    const sizes = userDoc.data().Sizes
    sizes.DailyEntries += 1;

    // Update Sizes field without overwriting other fields
    await this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).update({
      Sizes: sizes
    });
  }

  /**
   * Daily Entries Size Decrement.
   */
  async DailyEntriesSizeDecrement(): Promise<any> {

    // Current User uid
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Current Fields
    const userDoc = await this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).get().toPromise();

    // Prepare new sizes
    const sizes = userDoc.data().Sizes
    sizes.DailyEntries -= 1;

    // Update Sizes field without overwriting other fields
    await this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).update({
      Sizes: sizes
    });
  }

  /**
   * Retrieve sizes field from User doc.
   */
  async GetSizes(): Promise<Sizes> {

    // Current User uid
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return await (await this._angularFireStore.doc<User>("/TheMacroDiet/Production/Users/" + currentUserUid).get().toPromise()).data().Sizes;

  }
}