import IngredientsDetails from "@/containers/Details/Details";
import { redirect } from "next/navigation";

export default async function DetailsPage(props: {
  params: Promise<{ ingredient: string; details: string }>;
}) {
  const { ingredient, details } = await props.params;

  if (!ingredient) {
    redirect("/");
  } else if (!details) {
    redirect(`/ingredients/${ingredient}`);
  }
  return <IngredientsDetails />;
}
