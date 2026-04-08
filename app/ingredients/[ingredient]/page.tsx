import { Content } from "@/components";
import Ingredients from "@/containers/Ingredients";
import { redirect } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchTopIngredients(): Promise<{ ingredient: string }[]> {
  const res = await fetch(`${API_BASE}/list.php?i=list`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const ingredients = data.meals ?? [];
  return ingredients.slice(0, 50).map((ing: { strIngredient: string }) => ({
    ingredient: ing.strIngredient,
  }));
}

export async function generateStaticParams() {
  try {
    return await fetchTopIngredients();
  } catch {
    return [];
  }
}

export default async function IngredientsPage(props: {
  params: Promise<{ ingredient: string }>;
}) {
  const { ingredient } = await props.params;

  if (!ingredient) {
    redirect("/");
  }

  return (
    <Content>
      <Ingredients ingredientName={ingredient} />
    </Content>
  );
}
