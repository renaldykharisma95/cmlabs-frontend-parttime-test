"use client";

import { Autocomplete, CategoryCard, Pagination } from "@/components";
import useIngredientsAction from "./Ingredients.action";

function IngredientsFilter() {
  const {
    listIngredients,
    currentPage,
    totalPages,
    searchQuery,
    categoryOptions,
    setSearchQuery,
    setCurrentPage,
    onIngredientSelect,
  } = useIngredientsAction();

  return (
    <div className="min-h-screen bg-[#0F1115] text-white font-sans">
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="py-8 w-80">
          <Autocomplete
            options={categoryOptions}
            placeholder="Filter by category"
            label="Category"
            value={searchQuery}
            onInputChange={setSearchQuery}
            onSelectionChange={(key) => setSearchQuery(key as string)}
            onClear={() => setSearchQuery("")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listIngredients.map((ingredient) => (
            <CategoryCard
              key={ingredient.idMeal}
              name={ingredient.strMeal}
              image={ingredient.strMealThumb}
              onClick={() => onIngredientSelect(ingredient.idMeal)}
            />
          ))}
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default IngredientsFilter;
