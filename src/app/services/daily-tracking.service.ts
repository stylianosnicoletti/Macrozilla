import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from "rxjs/operators";
import { DailyEntry, Entry } from "../models/dailyEntry";
import { Food } from "../models/food.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class DailyTrackingService {
  constructor(
    private _firestore: Firestore,
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
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const docRef = doc(
      this._firestore,
      `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${date}/Entries/${entryDocId}`
    );
    //console.log(docRef);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap);
    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data() as any;
    //console.log(data);
    return {
      DocumentId: docSnap.id,
      CreatedAt: data.CreatedAt,
      Food: data.Food,
    } as Entry;
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
      const currentUserUid = await this._authService.auth.currentUser.uid;

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
      await updateDoc(
        doc(
          this._firestore,
          `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}/Entries/${entryBefore.DocumentId}`
        ),
        { ...entryAfter }
      );
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
    const currentUserUid = await this._authService.auth.currentUser.uid;

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
      await addDoc(
        collection(
          this._firestore,
          `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}/Entries`
        ),
        entry
      );
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
      await addDoc(
        collection(
          this._firestore,
          `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}/Entries`
        ),
        entry
      );
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
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const existingDailyEntry = await this.getDailyEntry(selectedDate);
    //console.log(existingDailyEntry);
    const entryDocRef = doc(
      this._firestore,
      `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}/Entries/${entry.DocumentId}`
    );

    if (existingDailyEntry?.SizeOfEntries > 1) {
      await deleteDoc(entryDocRef);
      await this.updateDailyEntry(
        selectedDate,
        this.prepareUpdatedDailyEntryOnEntryDelete(
          existingDailyEntry,
          entry.Food
        )
      );
    } else {
      await deleteDoc(entryDocRef);
      await this.deleteDailyEntry(selectedDate);
      await this._userService.DailyEntriesSizeDecrement();
    }
  }

  async readDailyEntry(
    selectedDate: string,
    includeSubCollection: boolean = false
  ): Promise<Observable<DailyEntry>> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const dailyEntryDocRef = doc(
      this._firestore,
      `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}`
    );
    //console.log(dailyEntryDocRef);
    const dailyEntry$ = new Observable<any>(subscriber => {
      const unsubscribe = onSnapshot(dailyEntryDocRef, docSnap => {
        if (docSnap.exists()) {
          subscriber.next(docSnap.data());
        } else {
          subscriber.next(null);
        }
      }, err => subscriber.error(err));
      return unsubscribe;
    });
    //console.log(dailyEntry$);
    if (includeSubCollection) {
      const entriesCollectionRef = collection(
        this._firestore,
        `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}/Entries`
      );

      //console.log(entriesCollectionRef);
      const entriesQuery = query(entriesCollectionRef, orderBy('CreatedAt', 'desc'));
      //console.log(entriesQuery);
      const entries$ = new Observable<Entry[]>(subscriber => {
        const unsubscribe = onSnapshot(entriesQuery, snapshot => {
          const entries = snapshot.docs.map(docSnap => ({
            DocumentId: docSnap.id,
            ...docSnap.data()
          } as Entry));
          subscriber.next(entries);
        }, err => subscriber.error(err));
        return unsubscribe;
      });

      //console.log(entries$);

      return dailyEntry$.pipe(
        withLatestFrom(entries$),
        map(([dailyEntry, entries]) => ({
          Date: dailyEntry?.Date,
          TotalCalories: dailyEntry?.TotalCalories,
          TotalFatGrams: dailyEntry?.TotalFatGrams,
          TotalSaturatedGrams: dailyEntry?.TotalSaturatedGrams,
          TotalCarbohydrateGrams: dailyEntry?.TotalCarbohydrateGrams,
          TotalProteinGrams: dailyEntry?.TotalProteinGrams,
          Entries: entries,
          SizeOfEntries: dailyEntry?.SizeOfEntries,
        }))
      );
    }

    return dailyEntry$.pipe(
      map((dailyEntry: any) => ({
        Date: dailyEntry?.Date,
        TotalCalories: dailyEntry?.TotalCalories,
        TotalFatGrams: dailyEntry?.TotalFatGrams,
        TotalSaturatedGrams: dailyEntry?.TotalSaturatedGrams,
        TotalCarbohydrateGrams: dailyEntry?.TotalCarbohydrateGrams,
        TotalProteinGrams: dailyEntry?.TotalProteinGrams,
        SizeOfEntries: dailyEntry?.SizeOfEntries,
      }))
    );
  }

  /**
   * Get Daily Entry doc with fields based on date. (No Sub-collection of Entries is fetched)
   * @param selectedDate Selected date.
   * @returns
   */
  async getDailyEntry(selectedDate: string): Promise<DailyEntry> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    const userDocRef = doc(
      this._firestore,
      `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}`
    );
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data() as any;
    return {
      DocumentId: docSnap.id,
      Date: data.Date,
      TotalCalories: data.TotalCalories,
      TotalFatGrams: data.TotalFatGrams,
      TotalSaturatedGrams: data.TotalSaturatedGrams,
      TotalCarbohydrateGrams: data.TotalCarbohydrateGrams,
      TotalProteinGrams: data.TotalProteinGrams,
      SizeOfEntries: data.SizeOfEntries,
    } as DailyEntry;
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
    const currentUserUid = await this._authService.auth.currentUser.uid;
    return await updateDoc(
      doc(
        this._firestore,
        `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}`
      ),
      { ...dailyEntry }
    );
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
    const currentUserUid = await this._authService.auth.currentUser.uid;
    return await setDoc(
      doc(
        this._firestore,
        `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}`
      ),
      dailyEntry as any
    );
  }

  /**
   * Delete Daily Entry. (Will not delete nested collections)
   * @param selectedDate Selected Date.
   * @returns
   */
  async deleteDailyEntry(selectedDate: string): Promise<void> {
    const currentUserUid = await this._authService.auth.currentUser.uid;
    return await deleteDoc(
      doc(
        this._firestore,
        `/TheMacroDiet/Production/Users/${currentUserUid}/DailyEntries/${selectedDate}`
      )
    );
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
