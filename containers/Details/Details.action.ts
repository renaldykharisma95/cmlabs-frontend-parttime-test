import { useParams } from "next/navigation";
import { GetDetailDish } from "@/providers/services";
import { useQuery } from "@tanstack/react-query";
import type { Meal } from "@/types";

export const useDetailsAction = () => {
  const params = useParams();
  const ingredients = params.ingredient as string;
  const mealId = params.details as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["mealDetail", mealId],
    queryFn: () => GetDetailDish({ id: String(mealId || "") }),
    enabled: !!mealId,
  });

  const meal: Meal | null = data?.meals?.[0] ?? null;

  return {
    meal,
    isLoading,
    error,
    ingredients,
  };
};
