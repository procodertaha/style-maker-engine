import { createFileRoute } from "@tanstack/react-router";
import catLawn from "@/assets/cat-lawn.jpg";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/kids-collection")({
  component: () => (
    <CategoryPage
      title="Kids Collection"
      label="Little Wardrobe"
      description="Charming outfit sets for little ones, crafted with playful prints and soft, durable fabrics. Perfect for family gatherings and everyday ease."
      image={catLawn}
      products={categoryProducts.kidsCollection}
    />
  ),
});
