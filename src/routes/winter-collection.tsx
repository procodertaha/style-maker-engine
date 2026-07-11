import { createFileRoute } from "@tanstack/react-router";
import catUnstitched from "@/assets/cat-unstitched.jpg";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/winter-collection")({
  component: () => (
    <CategoryPage
      title="Winter Collection"
      label="Cozy Layers"
      description="Warm, refined silhouettes for the cooler months. Discover pieces that layer beautifully and bring a polished winter look."
      image={catUnstitched}
      products={categoryProducts.winterCollection}
    />
  ),
});
