import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FoodDatabaseService {
  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService) { }


  /**
   * Get List of Food docs.
   * @param onlyPesronalDb When true, food will be fetched only from personal Db.
   * @param filter Filter query by Food Name using searchable Indexes stored for each food in database (Order: Most matches first).
   * @param useLimit When true, limit in the number of returned Foods will be used.
   * @param limitVal Limit in the number of returned Foods (Default = 20).
   * @returns Observable of list of Foods.
   */
  async getFoodsFromDb(onlyPesronalDb: boolean, filter: string, useLimit: boolean, limitVal: number = 20): Promise<Observable<Food[]>> {
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    return this._angularFireStore.collection<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase", ref => ref
      .orderBy(`searchableFoodNameIndex.${filter}`)
      .limit(limitVal))
      .snapshotChanges().pipe(map(changes =>
        // Maps doc data to Food
        changes.map(c => ({
           DocumentId: c.payload.doc.id,
           Name: c.payload.doc.data().Name,
           Calories: c.payload.doc.data().Calories,
           Carbohydrates: c.payload.doc.data().Carbohydrates,
           Fats: c.payload.doc.data().Fats,
           Protein: c.payload.doc.data().Protein,
           Saturated: c.payload.doc.data().Saturated,
           ServingAmount: c.payload.doc.data().ServingAmount,
           ServingUnit: c.payload.doc.data().ServingUnit,
           ServingUnitShortCode: c.payload.doc.data().ServingUnitShortCode,
           // ...c.payload.val()  To fill the rest
          }))
      ));
  }

  async getGlobalFoodsFromDb(onlyPesronalDb: boolean, orderByName: boolean, filter: string, useLimit: boolean, limitVal: number = 20): Promise<Observable<Food[]>> {
    //const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    return this._angularFireStore.collection<Food>("/TheMacroDiet/Production/GlobalFoodDatabase", ref => ref
      .orderBy(`searchableFoodNameIndex.${filter}`)
      .limit(limitVal))
      .snapshotChanges().pipe(map(changes =>
        // Maps doc data to Food
        changes.map(c => ({
           DocumentId: c.payload.doc.id,
           Name: c.payload.doc.data().Name,
           Calories: c.payload.doc.data().Calories,
           Carbohydrates: c.payload.doc.data().Carbohydrates,
           Fats: c.payload.doc.data().Fats,
           Protein: c.payload.doc.data().Protein,
           Saturated: c.payload.doc.data().Saturated,
           ServingAmount: c.payload.doc.data().ServingAmount,
           ServingUnit: c.payload.doc.data().ServingUnit,
           ServingUnitShortCode: c.payload.doc.data().ServingUnitShortCode,
           // ...c.payload.val()  To fill the rest
          }))
      ));
  }
  /* this.foodsFire = this._angularFireDatabase.list('/foods/' + currentUserUid + '/', ref => ref.orderByChild('name'));
   this.foods = this.foodsFire.snapshotChanges().pipe(
     map(changes =>
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
     )
   );
   return this.foods;
 }

 /*
   // Get all foods from personal database ordered by name for the current user
   async getAllFoods(): Promise<Observable<Food[]>> {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     this.foodsFire = this._angularFireDatabase.list('/foods/' + currentUserUid + '/', ref => ref.orderByChild('name'));
     this.foods = this.foodsFire.snapshotChanges().pipe(
       map(changes =>
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
       )
     );
     return this.foods;
   }
 
   // Delete food from database for the current user
   async deleteFood(key) {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     this._angularFireDatabase.object('/foods/' + currentUserUid + '/' + key).remove();
   }
 
   // Update food on database for the current user
   async updateFood(food) {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     this._angularFireDatabase.object('/foods/' + currentUserUid + '/' + food.key).update(food);
   }
 
   // Add food on database for the current user
   async addFood(food) {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     this._angularFireDatabase.list('/foods/' + currentUserUid + '/').push(food);
   }
 
   // Get food from databade for the current user
   async getFood(key): Promise<Observable<Food>> {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     this.foodFire = this._angularFireDatabase.object('/foods/' + currentUserUid + '/' + key + '/');
     this.food = this.foodFire.valueChanges();
     return this.food;
   }
 
   // Check to see if the food with that name already exist for that user and returns count 
   async doesFoodNameExist(food: Food): Promise<Number> {
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     const foodAlreadyExistsFireRef = this._angularFireDatabase.database.ref('/foods/' + currentUserUid + '/');
     return foodAlreadyExistsFireRef.orderByChild('name').equalTo(food.name).once("value").then(function (snapshot) {
       return snapshot.numChildren();
     });
   }
 
   // Check to see if the food with that id already exist for that user and returns count 
   async doesFoodKeyExist(key: any): Promise<Number> {
     let timesFoodExist = 0;
     const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
     const foodAlreadyExistsFireRef = this._angularFireDatabase.database.ref('/foods/' + currentUserUid + '/');
     foodAlreadyExistsFireRef.orderByKey().equalTo(key).on("value", function (snapshot) {
       timesFoodExist = snapshot.numChildren();
     });
     return timesFoodExist;
   }
 
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




