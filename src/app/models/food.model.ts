/**
 * Food Model (For Food Database).
 */
export interface Food {
    
    Name: string;

    Calories: Number;
    
    Carbohydrates: Number;
    
    Fats: Number;

    Protein: Number;

    Saturated: Number;

    ServingAmount: Number;

    ServingUnit: string;

    ServingUnitShortCode: string;

    /**
     * Not in firestore fields.
     */
    DocumentId: string;

    /**
     * Not in firestore fields.
     */
    IsFromPersonalDb: Boolean;

}