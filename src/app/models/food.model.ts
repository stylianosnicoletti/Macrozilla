/**
 * Food Model (For Food Database).
 */
export interface Food {
    DocumentId: string;

    Name: string;

    Calories: Number;
    
    Carbohydrates: Number;
    
    Fats: Number;

    Protein: Number;

    Saturated: Number;

    ServingAmount: Number;

    ServingUnit: string;

    ServingUnitShortCode: string;

    IsFromPersonalDb: Boolean;

}