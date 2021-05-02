/**
 * Food Model (For Food Database).
 */
export interface Food {
    DocumentId: string;

    Name: String;

    Calories: Number;
    
    Carbohydrates: Number;
    
    Fats: Number;

    Protein: Number;

    Saturated: Number;

    ServingAmount: Number;

    ServingUnit: String;

    ServingUnitShortCode: String;

}