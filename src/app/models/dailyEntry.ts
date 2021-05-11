
import { Food } from "./food.model";

/**
 * DailyEntry Model.
 */
export interface DailyEntry {
    
    DocumentId: string;

    Entries: Entry[];

    TotalCalories: Number;

    TotalFatGrams: Number;

    TotalSaturatedGrams: Number;

    TotalCarbohydrateGrams: Number;

    TotalProteinGrams: Number;
}

export interface Entry {

    DocumentId: string;

    CreatedAt: Date;

    Food: Food;
}