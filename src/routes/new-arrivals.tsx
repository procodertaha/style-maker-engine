import { createFileRoute } from "@tanstack/react-router";
import catChiffon from "@/assets/cat-chiffon.jpg";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  component: () => (
    <CategoryPage
      title="New Arrivals"
      label="Fresh Drops"
      description="Explore the latest styles added to SKB Fashion — modern silhouettes, seasonal colors, and the newest curated pieces for Karachi wardrobes."
      image={catChiffon}
      products={categoryProducts.newArrivals}
    />
  ),
});
