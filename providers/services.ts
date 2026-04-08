import api from "@/lib/api";
import {
  FilteredIngedientsResponse,
  type DishListResponse,
  type MealSearchResponse,
} from "@/types";

export const GetMealById = async ({ id }: { id: string }) => {
  try {
    const resp = await api.get<MealSearchResponse>(`/lookup.php?i=${id}`);
    return resp.data;
  } catch (error) {
    throw error as unknown;
  }
};

export const GetListDishes = async () => {
  try {
    const resp = await api.get<DishListResponse>(`/list.php?i=list`);
    return resp.data;
  } catch (error) {
    throw error as unknown;
  }
};

export const GetDishFiltered = async ({
  ingredientName,
}: {
  ingredientName: string;
}) => {
  try {
    const resp = await api.get<FilteredIngedientsResponse>(
      `/filter.php?i=${ingredientName}`,
    );
    return resp.data;
  } catch (error) {
    throw error as unknown;
  }
};

export const GetDetailDish = async ({ id }: { id: string }) => {
  try {
    const resp = await api.get(`/lookup.php?i=${id}`);
    return resp.data;
  } catch (error) {
    throw error as unknown;
  }
};
