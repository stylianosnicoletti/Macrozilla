/**
 * Food Model (For Food Database).
 */
export interface Food {
    
    Name: string;

    Calories: number;
    
    Carbohydrates: number;
    
    Fats: number;

    Protein: number;

    Saturated: number;

    /**
     * The name of serving unit object.
     */
    ServingAmount: number;

    ServingUnit: string;

    ServingUnitShortCode: string;

    /**
     * Not in firestore fields.
     */
    DocumentId?: string;

    /**
     * Not in firestore fields.
     */
    IsFromPersonalDb?: boolean;

}