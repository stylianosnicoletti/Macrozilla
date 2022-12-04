
import { Food } from "./food.model";

/**
 * DailyEntry Model.
 */
export interface DailyEntry {
    
    DocumentId?: string;

    Entries?: Entry[];

    Date: string;

    TotalCalories: number;

    TotalFatGrams: number;

    TotalSaturatedGrams: number;

    TotalCarbohydrateGrams: number;

    TotalProteinGrams: number;
    
    SizeOfEntries: number;
}

export interface Entry {

    DocumentId?: string;

    CreatedAt: number;

    Food: Food;

    IsChecked?: boolean;
}