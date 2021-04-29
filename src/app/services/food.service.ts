import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, ServingUnit } from '../types';
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
  }

}




