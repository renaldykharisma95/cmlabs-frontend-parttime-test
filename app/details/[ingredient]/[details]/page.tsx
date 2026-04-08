import IngredientsDetails from "@/containers/Details/Details";

export default async function DetailsPage(props: {
  params: Promise<{ ingredient: string; details: string }>;
}) {
  const { ingredient, details } = await props.params;
  return <IngredientsDetails ingredient={ingredient} mealId={details} />;
}
