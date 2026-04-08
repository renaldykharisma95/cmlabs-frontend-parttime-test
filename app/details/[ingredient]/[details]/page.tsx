import IngredientsDetails from "@/containers/Details/Details";

const STATIC_API_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchAllIngredientMealPairs(): Promise<
  { ingredient: string; details: string }[]
> {
  const res = await fetch(`${STATIC_API_BASE}/list.php?i=list`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const ingredients = data.meals ?? [];

  const pairs: { ingredient: string; details: string }[] = [];

  await Promise.all(
    ingredients
      .slice(0, 50)
      .map(async (ing: { idIngredient: string; strIngredient: string }) => {
        try {
          const filterRes = await fetch(
            `${STATIC_API_BASE}/filter.php?i=${ing.strIngredient}`,
            { next: { revalidate: 3600 } },
          );
          const filterData = await filterRes.json();
          const meals = filterData.meals ?? [];
          meals.slice(0, 3).forEach((meal: { idMeal: string }) => {
            pairs.push({
              ingredient: ing.strIngredient,
              details: meal.idMeal,
            });
          });
        } catch {
          // skip failures
        }
      }),
  );

  return pairs;
}

export async function generateStaticParams() {
  return fetchAllIngredientMealPairs();
}

export default async function DetailsPage(props: {
  params: Promise<{ ingredient: string; details: string }>;
}) {
  const { ingredient, details } = await props.params;
  return <IngredientsDetails ingredient={ingredient} mealId={details} />;
}
