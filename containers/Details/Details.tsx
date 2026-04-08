"use client";

import Image from "next/image";
import { Content } from "@/components";
import { TextLink } from "@/components/atoms";
import { useDetailsAction } from "./Details.action";
import { H1, H2 } from "@/components/atoms";
import { Paragraph } from "@/components/atoms/Typography/Paragraph";

function MealDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="h-6 w-48 bg-white/10 rounded" />
      <div className="h-10 w-80 bg-white/10 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-white/10 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-5/6 bg-white/10 rounded" />
          <div className="h-4 w-4/6 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

function MealDetailError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-default-400 mb-4">{message}</p>
      <TextLink href="/" color="primary">
        Go back home
      </TextLink>
    </div>
  );
}

export default function IngredientsDetails() {
  const { meal, isLoading, error } = useDetailsAction();

  if (isLoading) return <MealDetailSkeleton />;
  if (error)
    return (
      <MealDetailError message="Failed to load meal details. Please try again." />
    );
  if (!meal) return <MealDetailError message="Meal not found." />;

  const ingredientItems = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof typeof meal] as
      | string
      | null;
    const measure = meal[`strMeasure${i + 1}` as keyof typeof meal] as
      | string
      | null;
    if (!ingredient?.trim()) return null;
    return { ingredient: ingredient.trim(), measure: measure?.trim() || "" };
  }).filter(Boolean) as { ingredient: string; measure: string }[];

  const youtubeId = meal.strYoutube?.split("v=")[1]?.split("&")[0] || "";

  return (
    <Content showNavbar>
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <div className="space-y-3">
          <H1 className="text-white">{meal.strMeal}</H1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80 md:h-auto md:aspect-square rounded-2xl overflow-hidden bg-white/5">
            {meal.strMealThumb ? (
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-default-500">No image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {meal.strInstructions && (
              <div>
                <H2 className="text-white mb-3">Instructions</H2>
                <div className="space-y-3 max-h-fit pr-2">
                  {meal.strInstructions
                    .split(/\r?\n/)
                    .filter((step) => step.trim())
                    .map((step, i) => (
                      <Paragraph
                        key={i}
                        size="sm"
                        className="text-default-300 leading-relaxed"
                      >
                        {step.trim()}
                      </Paragraph>
                    ))}
                </div>
              </div>
            )}

            {ingredientItems.length > 0 && (
              <div>
                <H2 className="text-white mb-3">Ingredients</H2>
                <div className="flex flex-col gap-2">
                  {ingredientItems.map(({ ingredient, measure }) => (
                    <div key={ingredient} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] shrink-0" />
                      <span className="text-default-300 text-sm">
                        <span className="font-medium text-white">
                          {measure}
                        </span>{" "}
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {youtubeId && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white font-semibold text-sm uppercase tracking-wider">
                Tutorials
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Meal Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>
          </div>
        )}
      </div>
    </Content>
  );
}
