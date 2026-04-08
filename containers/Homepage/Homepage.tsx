"use client";

import useHomepageAction from "./Homepage.action";
import { Autocomplete, CategoryCard, Pagination } from "@/components";

function Homepage() {
  const {
    dishesList,
    currentPage,
    totalPages,
    searchQuery,
    categoryOptions,
    setSearchQuery,
    setCurrentPage,
    onCategorySelect,
  } = useHomepageAction();

  return (
    <div className="min-h-screen bg-[#0F1115] text-white font-sans">
      <section className="flex flex-col items-center justify-center text-center pt-20 pb-12 px-4">
        <p className="text-sm font-medium tracking-widest text-[#FF6B35] uppercase mb-4">
          Explore the world of flavors
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          See All The Delicious Foods
        </h1>
        <p className="text-[#8B8B99] text-lg md:text-xl max-w-xl">
          Discover handcrafted dishes from every corner of the globe, curated
          for your palate.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8 w-80">
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
          {dishesList.map((dish) => (
            <CategoryCard
              onClick={() => onCategorySelect(dish.strIngredient)}
              key={dish.idIngredient}
              name={dish.strIngredient}
              image={dish.strThumb}
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

export default Homepage;
