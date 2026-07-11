import { createFileRoute } from "@tanstack/react-router";
import catBridal from "@/assets/cat-bridal.jpg";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/party-wear")({
  component: () => (
    <CategoryPage
      title="Party Wear"
      label="Celebration Style"
      description="Glimmering formals and party-ready pieces designed to make every celebration unforgettable. Choose looks that feel luxurious and beautifully finished."
      image={catBridal}
      products={categoryProducts.partyWear}
    />
  ),
});
