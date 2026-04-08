import { useState } from "react";
import { GetDishFiltered } from "@/providers/services";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams, useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const useIngredientsAction = () => {
  const routing = useRouter();
  const params = useParams();
  const ingredientName = params.ingredient as string;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = useDebounce(searchQuery, 500);

  console.log("ingredientName: ", ingredientName);

  const { data: ingredientData } = useQuery({
    queryKey: ["listFilteredIngredients", ingredientName],
    queryFn: () =>
      GetDishFiltered({ ingredientName: String(ingredientName || "") }),
  });

  const allIngredients =
    ingredientData?.meals.filter((dish) => {
      if (!search) return true;
      return dish.strMeal.toLowerCase().includes(search.toLowerCase());
    }) || [];

  const totalPages = Math.ceil(allIngredients.length / ITEMS_PER_PAGE);
  const ingredientsPaginated = allIngredients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const categoryOptions = (allIngredients || []).map((ingredient) => ({
    id: ingredient.strMeal,
    label: ingredient.strMeal,
  }));

  const onIngredientSelect = (key: string) => {
    routing.push(`/details/${ingredientName}/${key}`);
  };

  return {
    listIngredients: ingredientsPaginated,
    currentPage,
    totalPages,
    searchQuery,
    categoryOptions,
    setCurrentPage,
    setSearchQuery,
    onIngredientSelect,
  };
};

export default useIngredientsAction;
