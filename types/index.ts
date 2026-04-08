import type { HTMLAttributes } from "react";

export type ComponentProps = HTMLAttributes<HTMLElement>;

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description?: string;
}

export interface DishListResponse {
  meals: {
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strThumb: string;
    strType: null;
  }[];
}

export interface FilteredIngedientsResponse {
  meals: Pick<Meal, "idMeal" | "strMeal" | "strMealThumb">[];
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions?: string;
  strDescription?: string;
  strArea?: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  author?: {
    name: string;
    avatar?: string;
    postedAt?: string;
  };
  rating?: number;
  reviewCount?: number;
  nutrition?: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
  ingredients?: string[];
  ingredientsMeasures?: { ingredient: string; measure: string }[];
}

export interface MealSearchResponse {
  meals: Meal[];
}
