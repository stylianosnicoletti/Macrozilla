import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
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
 * Get List of all Food docs from Personal Food DB in order.
 * @param orderField Field to be used for the ordering..
 * @param inDescending If true, descending order will be used for ordering (Default: False -> Ascending order)
 * @returns Observable of list of Foods.
 */
  async getFoodsFromDb(orderField: string, inDescending: boolean = false): Promise<Observable<Food[]>> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    return this._angularFireStore.collection<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase", ref => ref
      .orderBy(orderField, inDescending ? "desc" : "asc"))
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
          IsFromPersonalDb: true,
          // ...c.payload.val()  To fill the rest
        }))
      ));
  }

  /**
   * Get List of Food docs from Personal Food DB with filter.
   * @param filter Filter query by Food Name using searchable Indexes stored for each food in database (Order: Most matches first).
   * @param useLimit When true, limit in the number of returned Foods will be used (Default = true).
   * @param limitVal Limit in the number of returned Foods (Default = 20).
   * @returns Observable of list of Foods.
   */
  async getFoodsFromDbWithFilter(filter: string, useLimit: boolean, limitVal: number = 20): Promise<Observable<Food[]>> {

    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    let foodCollection: AngularFirestoreCollection<Food>;

    // Use limit
    if (useLimit) {
      foodCollection = this._angularFireStore.collection<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase", ref => ref
        .orderBy(`searchableFoodNameIndex.${filter}`)
        .limit(limitVal));
    }


    // No limit
    if (!useLimit) {
      foodCollection = this._angularFireStore.collection<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase", ref => ref
        .orderBy(`searchableFoodNameIndex.${filter}`));
    }

    return foodCollection.snapshotChanges().pipe(map(changes =>
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
        IsFromPersonalDb: true,
        // ...c.payload.val()  To fill the rest
      }))
    ));
  }

  /**
     * Get List of Food docs from Global Food DB with filter.
     * @param filter Filter query by Food Name using searchable Indexes stored for each food in database (Order: Most matches first).
     * @param useLimit When true, limit in the number of returned Foods will be used (Default = true).
     * @param limitVal Limit in the number of returned Foods (Default = 20).
     * @returns Observable of list of Foods.
     */
  async getGlobalFoodsFromDbWithFilter(filter: string, useLimit: boolean = true, limitVal: number = 20): Promise<Observable<Food[]>> {

    let foodCollection: AngularFirestoreCollection<Food>;

    // Use limit
    if (useLimit) {
      foodCollection = this._angularFireStore.collection<Food>("/TheMacroDiet/Production/GlobalFoodDatabase", ref => ref
        .orderBy(`searchableFoodNameIndex.${filter}`)
        .limit(limitVal));
    }

    // No limit
    if (!useLimit) {
      foodCollection = this._angularFireStore.collection<Food>("/TheMacroDiet/Production/GlobalFoodDatabase", ref => ref
        .orderBy(`searchableFoodNameIndex.${filter}`));
    }

    return foodCollection.snapshotChanges().pipe(map(changes =>
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
        IsFromPersonalDb: false,
        // ...c.payload.val()  To fill the rest
      }))
    ));
  }

  /**
   * Delete food document from Personal database for the current user.
   * @param docId Food Doc Id.
   * @returns True when food sucesfully deleted.
   */
  async deleteFood(docId: string): Promise<boolean> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Delete food doc 
    return await this._angularFireStore.doc<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase/" + docId).delete()
    .then(function() {
      return true;
    })
    .catch(function() {
      return false;
    });
  }


  /**
   * Update food document on personal database for the current user
   * @param food Food.
   * @returns True when food sucesfully updated.
   */
  async updateFood(food: Food): Promise<boolean> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Update food doc 
    return await this._angularFireStore.doc<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase/" + food.DocumentId).update({
      Name: food.Name, // Investigate if the cloud function gets executed if the name remains the same
      Calories: food.Calories,
      Carbohydrates: food.Carbohydrates,
      Fats: food.Fats,
      Protein: food.Protein,
      Saturated: food.Saturated,
      ServingAmount: food.ServingAmount,
      ServingUnit: food.ServingUnit,
      ServingUnitShortCode: food.ServingUnitShortCode
    })
      .then(function() {
        return true;
      })
      .catch(function() {
        return false;
      });
  }


  /**
   * Add food document on personl database for the current user.
   * @param food Food.
   * @returns True when food sucesfully added.
   */
  async addFood(food: Food): Promise<boolean> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);

    // Update food doc 
    return await this._angularFireStore.collection("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase").add({
      Name: food.Name, // Investigate if the cloud function gets executed if the name remains the same
      Calories: food.Calories,
      Carbohydrates: food.Carbohydrates,
      Fats: food.Fats,
      Protein: food.Protein,
      Saturated: food.Saturated,
      ServingAmount: food.ServingAmount,
      ServingUnit: food.ServingUnit,
      ServingUnitShortCode: food.ServingUnitShortCode
    })
      .then(function() {
        return true;
      })
      .catch(function() {
        return false;
      });
    }


  /**
   * Get food document from Personal database for the current user.
   * @param docId Food Doc Id.
   * @returns Observable of Food doc.
   */
   async getFood(docId: any): Promise<Observable<Food>>{
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(u => u.uid);
    
    // Get food doc 
    return await this._angularFireStore.doc<Food>("/TheMacroDiet/Production/Users/" + currentUserUid + "/FoodDatabase/" + docId).get()
    .pipe(map(c => ({
        DocumentId: c.id,
        Name: c.data().Name,
        Calories: c.data().Calories,
        Carbohydrates: c.data().Carbohydrates,
        Fats: c.data().Fats,
        Protein: c.data().Protein,
        Saturated: c.data().Saturated,
        ServingAmount: c.data().ServingAmount,
        ServingUnit: c.data().ServingUnit,
        ServingUnitShortCode: c.data().ServingUnitShortCode,
        IsFromPersonalDb: true,
        // ...c.payload.val()  To fill the rest
      }))
    );
  }
    /*
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




