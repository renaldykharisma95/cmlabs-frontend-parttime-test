import { useState } from "react";
import { GetListDishes } from "@/providers/services";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const useHomepageAction = () => {
  const route = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = useDebounce(searchQuery, 500);

  const { data: mealsListResult } = useQuery({
    queryKey: ["listDishes"],
    queryFn: () => GetListDishes(),
  });

  const allDishes =
    mealsListResult?.meals.filter((dish) => {
      if (!search) return true;
      return dish.strIngredient.toLowerCase().includes(search.toLowerCase());
    }) || [];

  const totalPages = Math.ceil(allDishes.length / ITEMS_PER_PAGE);
  const dishesPaginated = allDishes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const categoryOptions = (allDishes || []).map((dish) => ({
    id: dish.strIngredient,
    label: dish.strIngredient,
  }));

  const onCategorySelect = (key: string) => {
    route.push(`/ingredients/${key}`);
  };

  return {
    dishesList: dishesPaginated,
    categoryOptions,
    onCategorySelect,
    currentPage,
    totalPages,
    searchQuery,
    setCurrentPage,
    setSearchQuery,
  };
};

export default useHomepageAction;
