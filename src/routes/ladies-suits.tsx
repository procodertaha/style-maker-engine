import { createFileRoute } from "@tanstack/react-router";
import catEmbroidered from "@/assets/cat-embroidered.jpg";
import { CategoryPage } from "./category-page";
import { categoryProducts } from "@/lib/products";

export const Route = createFileRoute("/ladies-suits")({
  component: () => (
    <CategoryPage
      title="Ladies Suits"
      label="Boutique Classics"
      description="Discover our curated collection of embroidered, lawn and chiffon suits tailored for classic Karachi elegance. Perfect for everyday wear, special events, and formal occasions."
      image={catEmbroidered}
      products={categoryProducts.ladiesSuits}
    />
  ),
});
