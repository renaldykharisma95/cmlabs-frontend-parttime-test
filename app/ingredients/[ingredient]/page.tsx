import { Content } from "@/components";
import Ingredients from "@/containers/Ingredients";
import { redirect } from "next/navigation";

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
