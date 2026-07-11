import { createFileRoute } from "@tanstack/react-router";
import catCasual from "@/assets/casual-wear.png";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/casual-wear")({
  component: () => (
    <CategoryPage
      title="Casual Wear"
      label="Everyday Comfort"
      description="Comfortable 3-piece sets for relaxed days and easy city styling. These pieces are made for effortless looks that feel as good as they look."
      image={catCasual}
      products={categoryProducts.casualWear}
    />
  ),
});
