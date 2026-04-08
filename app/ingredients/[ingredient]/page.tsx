import { Content } from "@/components";
import Ingredients from "@/containers/Ingredients";
import { redirect } from "next/navigation";

export default async function IngredientsPage(props: {
  params: Promise<{ ingredient: string }>;
}) {
  const ingredientName = (await props.params).ingredient;

  if (!ingredientName) {
    redirect("/");
  }

  return (
    <Content showNavbar>
      <Ingredients/>
    </Content>
  );
}
