import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { DailyEntry, Entry } from "../models/dailyEntry";
import { Food } from "../models/food.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class DailyTrackingService {
  constructor(
    private _angularFireStore: AngularFirestore,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  /**
   * Get entry of a food consumed that date.
   * @param entryDocId Entry document Id.
   * @param date Date food consumed.
   * @returns Entry.
   */
  async getEntry(entryDocId: string, date: string): Promise<Entry> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );
    // Reference to document
    const docRef = await this._angularFireStore.doc<Entry>(
      "/TheMacroDiet/Production/Users/" +
        currentUserUid +
        "/DailyEntries/" +
        date +
        "/Entries/" +
        entryDocId
    );
    const doc = await docRef.get();

    if (!(await doc.toPromise()).exists) {
      return null;
    } else {
      return doc
        .pipe(
          map((c) => ({
            DocumentId: c.id,
            CreatedAt: c.data().CreatedAt,
            Food: c.data().Food,
          }))
        )
        .toPromise();
    }
  }

  /**
   * Update an entry to the Entries sub-collection of daily entries.
   * Updates Daily Entry document field based on the entry (consumed food) edited.
   * @param selectedDate Selected date.
   * @param entryBefore Entry before edit.
   * @param consumedFoodAfter Consumed food after edit.
   * @returns
   */
  async editEntryAndUpdateDailyEntryFields(
    selectedDate: string,
    entryBefore: Entry,
    consumedFoodAfter: Food
  ): Promise<any> {
    // Current user id.
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    // Get current Daily Entry Doc if exists
    const existingDailyEntry = await this.getDailyEntry(selectedDate);

    // Create entry to be updated in Entries sub-collection.
    const entryAfter = this.createEntry(consumedFoodAfter);

    if (existingDailyEntry != null) {
      // Update Existing Daily Entry.
      await this.updateDailyEntry(
        selectedDate,
        this.prepareUpdatedDailyEntryOnEntryEdit(
          existingDailyEntry,
          entryBefore.Food,
          consumedFoodAfter
        )
      );
      // Update Entry.
      await this._angularFireStore
        .doc(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries/" +
            entryBefore.DocumentId
        )
        .update(entryAfter);
    }
  }

  /**
   * Add a new entry to the Entries sub-collection of daily entries.
   * Updates Daily Entry document field based on the new entry (consumed food) added.
   * @param selectedDate Selected date.
   * @param consumedFood Consumed food.
   * @returns
   */
  async addEntryAndUpdateDailyEntryFields(
    selectedDate: string,
    consumedFood: Food
  ): Promise<any> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    // Get current Daily Entry Doc if exists
    const existingDailyEntry = await this.getDailyEntry(selectedDate);

    // Create entry to be added in Entries sub-collection
    const entry = this.createEntry(consumedFood);

    if (existingDailyEntry != null) {
      // Update Existing Daily Entry
      await this.updateDailyEntry(
        selectedDate,
        this.prepareUpdatedDailyEntryOnEntryAdd(
          existingDailyEntry,
          consumedFood
        )
      );
      // Add Entry
      await this._angularFireStore
        .collection(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries"
        )
        .add(entry);
    } else {
      // First Daily Entry
      await this.setDailyEntry(
        selectedDate,
        this.prepareUpdatedDailyEntryOnEntryAdd(
          null,
          consumedFood,
          selectedDate
        )
      );
      // Add Entry
      await this._angularFireStore
        .collection(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries"
        )
        .add(entry);
      // Increment size of collection
      await this._userService.DailyEntriesSizeIncrement();
    }
  }

  /**
   * Deletes entry from the Entries sub-collection..
   * Updates Daily Entry document field based on entry (consumed food) deletion.
   * @param selectedDate Selected date.
   * @param entry Entry (Consumed food with document Id and createdAt fields).
   * @returns
   */
  async deleteEntryAndUpdateDailyEntryFields(
    selectedDate: string,
    entry: Entry
  ): Promise<any> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    // Get current Daily Entry Doc if exists
    const existingDailyEntry = await this.getDailyEntry(selectedDate);
    //console.log(existingDailyEntry);
    if (existingDailyEntry?.SizeOfEntries > 1) {
      // Delete entry from Entries collections
      await this._angularFireStore
        .doc(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries/" +
            entry.DocumentId
        )
        .delete();
      // Update Existing Daily Entry
      await this.updateDailyEntry(
        selectedDate,
        this.prepareUpdatedDailyEntryOnEntryDelete(
          existingDailyEntry,
          entry.Food
        )
      );
    } else {
      // Delete entry from Entries collections (needed since when deleting docs subcollections remain)
      await this._angularFireStore
        .doc(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries/" +
            entry.DocumentId
        )
        .delete();
      // Remove whole Daily Entry on last Entry deletion
      await this.deleteDailyEntry(selectedDate);
      // Decrement size of collection
      await this._userService.DailyEntriesSizeDecrement();
    }
  }

  /**
   * Read Daily Entry doc with fields based on date. (Sub-collection of Entries can be fetched in descending orded of the time added.)
   * @param selectedDate Selected date.
   * @param includeSubCollection If true the Entries sub-collection is included. (Default = false)
   * @returns
   */
  async readDailyEntry(
    selectedDate: string,
    includeSubCollection: boolean = false
  ): Promise<Observable<DailyEntry>> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    // Daily Entry document
    const dailyEntryDocRef = this._angularFireStore.doc<DailyEntry>(
      "/TheMacroDiet/Production/Users/" +
        currentUserUid +
        "/DailyEntries/" +
        selectedDate
    );
    const dailyEntry$ = dailyEntryDocRef.valueChanges();

    if (includeSubCollection) {
      // Entries collection
      const entriesCollectionRef =
        await this._angularFireStore.collection<Entry>(
          "/TheMacroDiet/Production/Users/" +
            currentUserUid +
            "/DailyEntries/" +
            selectedDate +
            "/Entries/",
          (ref) => ref.orderBy("CreatedAt", "desc")
        );
      const entries$ = entriesCollectionRef.valueChanges({
        idField: "DocumentId",
      });

      return dailyEntry$.pipe(
        withLatestFrom(entries$),
        map(([dailyEntry, entries]) => {
          return {
            Date: dailyEntry?.Date,
            TotalCalories: dailyEntry?.TotalCalories,
            TotalFatGrams: dailyEntry?.TotalFatGrams,
            TotalSaturatedGrams: dailyEntry?.TotalSaturatedGrams,
            TotalCarbohydrateGrams: dailyEntry?.TotalCarbohydrateGrams,
            TotalProteinGrams: dailyEntry?.TotalProteinGrams,
            Entries: entries,
            SizeOfEntries: dailyEntry?.SizeOfEntries,
          };
        })
      );
    } else {
      return dailyEntry$.pipe(
        map((dailyEntry: DailyEntry) => {
          return {
            Date: dailyEntry?.Date,
            TotalCalories: dailyEntry?.TotalCalories,
            TotalFatGrams: dailyEntry?.TotalFatGrams,
            TotalSaturatedGrams: dailyEntry?.TotalSaturatedGrams,
            TotalCarbohydrateGrams: dailyEntry?.TotalCarbohydrateGrams,
            TotalProteinGrams: dailyEntry?.TotalProteinGrams,
            SizeOfEntries: dailyEntry?.SizeOfEntries,
          };
        })
      );
    }
  }

  /**
   * Get Daily Entry doc with fields based on date. (No Sub-collection of Entries is fetched)
   * @param selectedDate Selected date.
   * @returns
   */
  async getDailyEntry(selectedDate: string): Promise<DailyEntry> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    // Reference to document
    const userDocRef = await this._angularFireStore.doc<DailyEntry>(
      "/TheMacroDiet/Production/Users/" +
        currentUserUid +
        "/DailyEntries/" +
        selectedDate
    );
    const doc = await userDocRef.get();

    if (!(await doc.toPromise()).exists) {
      return null;
    } else {
      return doc
        .pipe(
          map((c) => ({
            DocumentId: c.id,
            Date: c.data().Date,
            TotalCalories: c.data().TotalCalories,
            TotalFatGrams: c.data().TotalFatGrams,
            TotalSaturatedGrams: c.data().TotalSaturatedGrams,
            TotalCarbohydrateGrams: c.data().TotalCarbohydrateGrams,
            TotalProteinGrams: c.data().TotalProteinGrams,
            SizeOfEntries: c.data().SizeOfEntries,
          }))
        )
        .toPromise();
    }
  }

  /**
   * Update Daily Entry.
   * @param selectedDate Selected Date.
   * @param dailyEntry Updated Daily Entry.
   * @returns
   */
  async updateDailyEntry(
    selectedDate: string,
    dailyEntry: DailyEntry
  ): Promise<any> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    return await this._angularFireStore
      .doc(
        "/TheMacroDiet/Production/Users/" +
          currentUserUid +
          "/DailyEntries/" +
          selectedDate
      )
      .update(dailyEntry);
  }

  /**
   * Set Daily Entry. (Used to initialise Daily Entry)
   * @param selectedDate Selected Date.
   * @param dailyEntry Daily Entry to be set.
   * @returns
   */
  async setDailyEntry(
    selectedDate: string,
    dailyEntry: DailyEntry
  ): Promise<any> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    return await this._angularFireStore
      .doc(
        "/TheMacroDiet/Production/Users/" +
          currentUserUid +
          "/DailyEntries/" +
          selectedDate
      )
      .set(dailyEntry);
  }

  /**
   * Delete Daily Entry. (Will not delete nested collections)
   * @param selectedDate Selected Date.
   * @returns
   */
  async deleteDailyEntry(selectedDate: string): Promise<void> {
    // Current user id
    const currentUserUid = await this._authService.afAuth.currentUser.then(
      (u) => u.uid
    );

    return await this._angularFireStore
      .doc(
        "/TheMacroDiet/Production/Users/" +
          currentUserUid +
          "/DailyEntries/" +
          selectedDate
      )
      .delete();
  }

  /**
   * Create new entry with the consumed food.
   * @param food Consumed Food.
   * @returns Entry.
   */
  createEntry(food: Food): Entry {
    return {
      CreatedAt: Math.floor(Date.now() / 1000), //unix timestamp in seconds
      Food: food,
    };
  }

  /**
   * Prepare an updated Daily Entry with the changes of the newly consumed food. If no currentDailyEntry is provided then current consumed food will only be used.
   * @param currentDailyEntry Current daily entry.
   * @param consumedFood Consumed Food added.
   * @param selectedDate Needed when there is no current Daily Entry
   * @returns Updated Daily Entry.
   */
  prepareUpdatedDailyEntryOnEntryAdd(
    currentDailyEntry: DailyEntry,
    consumedFood: Food,
    selectedDate?: string
  ): DailyEntry {
    if (currentDailyEntry != null) {
      return {
        Date: currentDailyEntry.Date,
        TotalCalories: currentDailyEntry.TotalCalories + consumedFood.Calories,
        TotalFatGrams: currentDailyEntry.TotalFatGrams + consumedFood.Fats,
        TotalSaturatedGrams:
          currentDailyEntry.TotalSaturatedGrams + consumedFood.Saturated,
        TotalCarbohydrateGrams:
          currentDailyEntry.TotalCarbohydrateGrams + consumedFood.Carbohydrates,
        TotalProteinGrams:
          currentDailyEntry.TotalProteinGrams + consumedFood.Protein,
        SizeOfEntries: currentDailyEntry.SizeOfEntries + 1,
      };
    } else {
      return {
        Date: selectedDate,
        TotalCalories: consumedFood.Calories,
        TotalFatGrams: consumedFood.Fats,
        TotalSaturatedGrams: consumedFood.Saturated,
        TotalCarbohydrateGrams: consumedFood.Carbohydrates,
        TotalProteinGrams: consumedFood.Protein,
        SizeOfEntries: 1,
      };
    }
  }

  /**
   * Prepare an updated Daily Entry when a consumed food is deleted.
   * @param currentDailyEntry Current daily entry.
   * @param consumedFood Consumed Food deleted.
   * @returns Updated Daily Entry.
   */
  prepareUpdatedDailyEntryOnEntryDelete(
    currentDailyEntry: DailyEntry,
    consumedFood: Food
  ): DailyEntry {
    return {
      Date: currentDailyEntry.Date,
      TotalCalories: currentDailyEntry.TotalCalories - consumedFood.Calories,
      TotalFatGrams: currentDailyEntry.TotalFatGrams - consumedFood.Fats,
      TotalSaturatedGrams:
        currentDailyEntry.TotalSaturatedGrams - consumedFood.Saturated,
      TotalCarbohydrateGrams:
        currentDailyEntry.TotalCarbohydrateGrams - consumedFood.Carbohydrates,
      TotalProteinGrams:
        currentDailyEntry.TotalProteinGrams - consumedFood.Protein,
      SizeOfEntries: currentDailyEntry.SizeOfEntries - 1,
    };
  }

  /**
   * Prepare an updated Daily Entry when a consumed food is edited.
   * @param currentDailyEntry Current daily entry.
   * @param consumedFood Consumed Food edited.
   * @returns Updated Daily Entry.
   */
  prepareUpdatedDailyEntryOnEntryEdit(
    currentDailyEntry: DailyEntry,
    consumedFoodBefore: Food,
    consumedFoodAfter: Food
  ): DailyEntry {
    return {
      Date: currentDailyEntry.Date,
      TotalCalories:
        currentDailyEntry.TotalCalories -
        consumedFoodBefore.Calories +
        consumedFoodAfter.Calories,
      TotalFatGrams:
        currentDailyEntry.TotalFatGrams -
        consumedFoodBefore.Fats +
        consumedFoodAfter.Fats,
      TotalSaturatedGrams:
        currentDailyEntry.TotalSaturatedGrams -
        consumedFoodBefore.Saturated +
        consumedFoodAfter.Saturated,
      TotalCarbohydrateGrams:
        currentDailyEntry.TotalCarbohydrateGrams -
        consumedFoodBefore.Carbohydrates +
        consumedFoodAfter.Carbohydrates,
      TotalProteinGrams:
        currentDailyEntry.TotalProteinGrams -
        consumedFoodBefore.Protein +
        consumedFoodAfter.Protein,
      SizeOfEntries: currentDailyEntry.SizeOfEntries,
    };
  }
}
