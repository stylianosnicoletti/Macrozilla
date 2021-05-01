import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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
    console.log(currentUserUid);
    return this._angularFireStore.doc<User>("/TheMacroDiet/Testing/Users/" + currentUserUid).valueChanges();
  }


  /**
   * Updates current user doc fields.
   * @param user User.
   */
  async updateUserFields(user: User): Promise<void> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    console.log(currentUserUid);
    this._angularFireStore.doc<User>("/TheMacroDiet/Testing/Users/" + currentUserUid).set(user);
  }

}