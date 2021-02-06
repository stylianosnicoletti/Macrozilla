export interface LoginCredential {
  email: string;
  password: string;
}

export interface Food {
  key: any;
  name: string;
  protein: number;
  fats: number;
  saturated: number;
  carbohydrates: number;
  calories: number;
}

export interface DailyEntryFood {
  key: any;
  food: Food;
  qty: number;
}

export interface Summary {
  key:any;
  totalGramsProtein: number;
  totalGramsFats: number;
  totalGramsSaturated: number;
  totalGramsCarbohydrates: number;
  totalCalories: number;
}

