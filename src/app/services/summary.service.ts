import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../types';
import { AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  dailySummaryFireObject: AngularFireObject<any>;
  dailySummary: Observable<Summary>;
  allSummariesFire: AngularFireList<any>;
  allSummaries: Observable<Summary[]>;

  constructor(
    private _angularFireDatabase: AngularFireDatabase,
    private _authService: AuthService) { }


  //Get all summaries for that user 
  async getAllSummaries(): Promise<Observable<Summary[]>> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this.allSummariesFire = this._angularFireDatabase.list('/summary/' + currentUserUid + '/', ref => ref.orderByKey());
    this.allSummaries = this.allSummariesFire.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.allSummaries;
  }

  // Get summary for that date for that user, if it does not exist, it returns null
  async getSummary(selected_date): Promise<Summary> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    const getSummaryFireRef = this._angularFireDatabase.database.ref('/summary/' + currentUserUid + '/').child(selected_date);
    return await getSummaryFireRef.once("value").then(function (snapshot) {
      return snapshot.val();
    });
  }

  // Get summary observable for that date for that user
  async getSummaryObservable(selected_date): Promise<Observable<Summary>> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this.dailySummaryFireObject = this._angularFireDatabase.object('/summary/' + currentUserUid + '/' + selected_date + '/');
    this.dailySummary = this.dailySummaryFireObject.valueChanges();
    return this.dailySummary;
  }


  // Add or Edit summary under that date of that user
  async setSummary(summary, selected_date) {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this._angularFireDatabase.object('/summary/' +
    currentUserUid + '/' + selected_date + '/').set(summary);
  }

  // Remove summary for that date of that user
  async removeSummary(selected_date) {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    this._angularFireDatabase.object('/summary/' +
    currentUserUid + '/' + selected_date + '/').remove();
  }

  // Increment summary when new entry added for that date for that user
  incrementExisitngSummary(existingSummary: Summary, entrySummary: Summary, selected_date) {
    existingSummary.totalCalories += entrySummary.totalCalories;
    existingSummary.totalGramsCarbohydrates += entrySummary.totalGramsCarbohydrates;
    existingSummary.totalGramsFats += entrySummary.totalGramsFats;
    existingSummary.totalGramsProtein += entrySummary.totalGramsProtein;
    existingSummary.totalGramsSaturated += entrySummary.totalGramsSaturated;
    this.setSummary(existingSummary, selected_date);
  }

  // Decrement summary when entry deleted for that date for that user
  decrementExisitngSummary(existingSummary: Summary, entrySummary: Summary, selected_date) {
    existingSummary.totalCalories -= entrySummary.totalCalories;
    existingSummary.totalGramsCarbohydrates -= entrySummary.totalGramsCarbohydrates;
    existingSummary.totalGramsFats -= entrySummary.totalGramsFats;
    existingSummary.totalGramsProtein -= entrySummary.totalGramsProtein;
    existingSummary.totalGramsSaturated -= entrySummary.totalGramsSaturated;
    this.setSummary(existingSummary, selected_date);
  }
}
