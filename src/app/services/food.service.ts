import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../types';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodsFire: AngularFireList<any>;
  foods: Observable<Food[]>;
  servingUnitsFire: AngularFireList<any>;
  servingUnits: Observable<ServingUnit[]>;
  foodFire: AngularFireObject<any>;
  food: Observable<Food>;

  constructor(
    private _angularFireDatabase: AngularFireDatabase,
    private _authService: AuthService) {
  }

  // Get all foods from database ordered by name for the current user
  getAllFoods(): Observable<Food[]> {
    this.foodsFire = this._angularFireDatabase.list('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/', ref => ref.orderByChild('name'));
    this.foods = this.foodsFire.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.foods;
  }

  // Delete food from database for the current user
  deleteFood(key) {
    this._angularFireDatabase.object('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/' + key).remove();
  }

  // Update food on database for the current user
  updateFood(food) {
    this._angularFireDatabase.object('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/' + food.key).update(food);
  }

  // Add food on database for the current user
  addFood(food) {
    this._angularFireDatabase.list('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/').push(food);
  }

  // Get food from databade for the current user
  getFood(key): Observable<Food> {
    this.foodFire = this._angularFireDatabase.object('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/' + key + '/');
    this.food = this.foodFire.valueChanges();
    return this.food;
  }

  // Check to see if the food with that name already exist for that user and returns count 
  async doesFoodNameExist(food: Food): Promise<Number> {
    const foodAlreadyExistsFireRef = this._angularFireDatabase.database.ref('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/');
    return foodAlreadyExistsFireRef.orderByChild('name').equalTo(food.name).once("value").then(function (snapshot) {
      return snapshot.numChildren();
    });
  }

  // Check to see if the food with that id already exist for that user and returns count 
  doesFoodKeyExist(key: any): Number {
    let timesFoodExist = 0;
    const foodAlreadyExistsFireRef = this._angularFireDatabase.database.ref('/foods/' + this._authService.afAuth.auth.currentUser.uid + '/');
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
  }

}




