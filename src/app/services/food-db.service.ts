import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, collection, query, orderBy, doc, getDoc, addDoc, updateDoc, deleteDoc, limit, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FoodDatabaseService {
  constructor(
    private _firestore: Firestore,
    private _authService: AuthService) { }


  /**
 * Get List of all Food docs from Personal Food DB in order.
 * @param orderField Field to be used for the ordering..
 * @param inDescending If true, descending order will be used for ordering (Default: False -> Ascending order)
 * @returns Observable of list of Foods.
 */
  async getFoodsFromDb(orderField: string, inDescending: boolean = false): Promise<Observable<Food[]>>  {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase`;
    //console.log(path);
    const ref = collection(this._firestore, path);
    const q = query(
      ref,
      orderBy(orderField, inDescending ? "desc" : "asc")
    );

    return new Observable<Food[]>(subscriber => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const foods = snapshot.docs.map(docSnap => ({
          DocumentId: docSnap.id,
          ...docSnap.data()
        } as any));
        const mappedFoods = foods.map(f => ({
          DocumentId: f.DocumentId,
          Name: f.Name,
          Calories: f.Calories,
          Carbohydrates: f.Carbohydrates,
          Fats: f.Fats,
          Protein: f.Protein,
          Saturated: f.Saturated,
          ServingAmount: f.ServingAmount,
          ServingUnit: f.ServingUnit,
          ServingUnitShortCode: f.ServingUnitShortCode,
          IsFromPersonalDb: true
        }));
        subscriber.next(mappedFoods);
      }, err => subscriber.error(err));
      return unsubscribe;
    });
  }

  /**
   * Get List of Food docs from Personal Food DB with filter.
   * @param filter Filter query by Food Name using searchable Indexes stored for each food in database (Order: Most matches first).
   * @param useLimit When true, limit in the number of returned Foods will be used (Default = true).
   * @param limitVal Limit in the number of returned Foods (Default = 20).
   * @returns Observable of list of Foods.
   */
    async getFoodsFromDbWithFilter(filter: string, useLimit: boolean, limitVal: number = 20) {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase`;
    const ref = collection(this._firestore, path);

    let q = query(
      ref,
      orderBy(`searchableFoodNameIndex.${filter}`)
    );

    if (useLimit) {
      q = query(q, limit(limitVal));
    }

    return new Observable<Food[]>(subscriber => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const foods = snapshot.docs.map(docSnap => ({
          DocumentId: docSnap.id,
          ...docSnap.data()
        } as any));
        const mappedFoods = foods.map(f => ({
          DocumentId: f.DocumentId,
          Name: f.Name,
          Calories: f.Calories,
          Carbohydrates: f.Carbohydrates,
          Fats: f.Fats,
          Protein: f.Protein,
          Saturated: f.Saturated,
          ServingAmount: f.ServingAmount,
          ServingUnit: f.ServingUnit,
          ServingUnitShortCode: f.ServingUnitShortCode,
          IsFromPersonalDb: true
        }));
        subscriber.next(mappedFoods);
      }, err => subscriber.error(err));
      return unsubscribe;
    });
  }

  /**
     * Get List of Food docs from Global Food DB with filter.
     * @param filter Filter query by Food Name using searchable Indexes stored for each food in database (Order: Most matches first).
     * @param useLimit When true, limit in the number of returned Foods will be used (Default = true).
     * @param limitVal Limit in the number of returned Foods (Default = 20).
     * @returns Observable of list of Foods.
     */
  async getGlobalFoodsFromDbWithFilter(filter: string, useLimit: boolean = true, limitVal: number = 20): Promise<Observable<Food[]>> {
    const path = `TheMacroDiet/Production/GlobalFoodDatabase`;
    //console.log(path);
    const ref = collection(this._firestore, path);

    let q = query(
      ref,
      orderBy(`searchableFoodNameIndex.${filter}`)
    );

    if (useLimit) {
      q = query(q, limit(limitVal));
    }

    //console.log(q);

    return new Observable<Food[]>(subscriber => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const foods = snapshot.docs.map(docSnap => ({
          DocumentId: docSnap.id,
          ...docSnap.data()
        } as any));
        const mappedFoods = foods.map(f => ({
          DocumentId: f.DocumentId,
          Name: f.Name,
          Calories: f.Calories,
          Carbohydrates: f.Carbohydrates,
          Fats: f.Fats,
          Protein: f.Protein,
          Saturated: f.Saturated,
          ServingAmount: f.ServingAmount,
          ServingUnit: f.ServingUnit,
          ServingUnitShortCode: f.ServingUnitShortCode,
          IsFromPersonalDb: false
        }));
        subscriber.next(mappedFoods);
      }, err => subscriber.error(err));
      return unsubscribe;
    });
  }

    /**
   * Delete food document from Personal database for the current user.
   * @param docId Food Doc Id.
   */
  async deleteFood(docId: string): Promise<void> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase/${docId}`;
    //console.log(path);
    const docRef = doc(this._firestore, path);
    return await deleteDoc(docRef);
  }


  /**
   * Update food document on personal database for the current user
   * @param food Food.
   */
  async updateFood(food: Food): Promise<void> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase/${food.DocumentId}`;
    //console.log(path);
    const docRef = doc(this._firestore, path);
    return await updateDoc(docRef, {
      Name: food.Name,
      Calories: food.Calories,
      Carbohydrates: food.Carbohydrates,
      Fats: food.Fats,
      Protein: food.Protein,
      Saturated: food.Saturated,
      ServingAmount: food.ServingAmount,
      ServingUnit: food.ServingUnit,
      ServingUnitShortCode: food.ServingUnitShortCode
    });
  }


  /**
   * Add food document on personl database for the current user.
   * @param food Food.
   */
    async addFood(food: Food): Promise<any> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase`;
    //console.log(path);
    const colRef = collection(this._firestore, path);
    return await addDoc(colRef, {
      Name: food.Name,
      Calories: food.Calories,
      Carbohydrates: food.Carbohydrates,
      Fats: food.Fats,
      Protein: food.Protein,
      Saturated: food.Saturated,
      ServingAmount: food.ServingAmount,
      ServingUnit: food.ServingUnit,
      ServingUnitShortCode: food.ServingUnitShortCode
    });
  }


    /**
   * Get food document from Personal database for the current user.
   * @param docId Food Doc Id.
   * @returns Observable of Food doc.
   */
  async getFood(docId: any): Promise<Observable<Food>> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase/${docId}`;
    //console.log(path);
    const docRef = doc(this._firestore, path);

    return new Observable<Food>(subscriber => {
      const unsubscribe = onSnapshot(docRef, docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          subscriber.next({
            DocumentId: docSnap.id,
            Name: data?.Name,
            Calories: data?.Calories,
            Carbohydrates: data?.Carbohydrates,
            Fats: data?.Fats,
            Protein: data?.Protein,
            Saturated: data?.Saturated,
            ServingAmount: data?.ServingAmount,
            ServingUnit: data?.ServingUnit,
            ServingUnitShortCode: data?.ServingUnitShortCode,
            IsFromPersonalDb: true
          } as Food);
        } else {
          subscriber.next(null);
        }
      }, err => subscriber.error(err));

      return unsubscribe;
    });
  }

  /**
   * Check to see if the food with that DocId already exists for that user
   * @param docId Document Id
   * @returns True if food document exists. False if food document does not exists.
   */
  async doesPersonalFoodDocExists(docId: any): Promise<boolean> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const path = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase/${docId}`;
    //console.log(path);
    const docRef = doc(this._firestore, path);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  /**
 * Get food with that DocId already exists in either Global or Personal Databases
 * @param docId Document Id
 * @returns Food if food document exists. Null if food document does not exists.
 */
  async getPersonalOrGlobalFoodDocExists(docId: any): Promise<Food> {
    const currentUserUid = await this._authService.auth.currentUser.uid;

    // Check global first
    const globalPath = `TheMacroDiet/Production/GlobalFoodDatabase/${docId}`;
    //console.log(globalPath);
    const globalDocRef = doc(this._firestore, globalPath);
    const globalDocSnap = await getDoc(globalDocRef);

    if (globalDocSnap.exists()) {
      const data = globalDocSnap.data() as any;
      return {
        DocumentId: globalDocSnap.id,
        IsFromPersonalDb: false,
        Name: data?.Name,
        Calories: data?.Calories,
        Carbohydrates: data?.Carbohydrates,
        Fats: data?.Fats,
        Protein: data?.Protein,
        Saturated: data?.Saturated,
        ServingAmount: data?.ServingAmount,
        ServingUnit: data?.ServingUnit,
        ServingUnitShortCode: data?.ServingUnitShortCode
      } as Food;
    } else {
      // Check personal
      const personalPath = `TheMacroDiet/Production/Users/${currentUserUid}/FoodDatabase/${docId}`;
      const personalDocRef = doc(this._firestore, personalPath);
      //console.log(personalPath);
      //console.log(personalDocRef);
      const personalDocSnap = await getDoc(personalDocRef);


      if (personalDocSnap.exists()) {
        const data = personalDocSnap.data() as any;
        return {
          DocumentId: personalDocSnap.id,
          IsFromPersonalDb: true,
          Name: data?.Name,
          Calories: data?.Calories,
          Carbohydrates: data?.Carbohydrates,
          Fats: data?.Fats,
          Protein: data?.Protein,
          Saturated: data?.Saturated,
          ServingAmount: data?.ServingAmount,
          ServingUnit: data?.ServingUnit,
          ServingUnitShortCode: data?.ServingUnitShortCode
        } as Food;
      } else {
        return null;
      }
    }
  }

}





