import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products";

export interface CategoryPageProps {
  title: string;
  label: string;
  description: string;
  image: string;
  products: Product[];
}

export function CategoryPage({ title, label, description, image, products }: CategoryPageProps) {
  return (
    <main className="min-h-screen bg-surface font-sans text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {label}
            </p>
            <h1 className="font-serif text-5xl leading-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/"
                className="inline-flex h-12 items-center justify-center bg-ink px-6 text-sm font-medium uppercase tracking-widest text-surface transition-colors hover:bg-ink/90"
              >
                <ArrowLeft className="mr-2 size-4" /> Back home
              </a>
              <a
                href="#products"
                className="inline-flex h-12 items-center justify-center border border-ink/15 px-6 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:border-ink/40"
              >
                View products
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-muted shadow-lg ring-1 ring-ink/5">
            <img
              src={image}
              alt={`${title} category banner`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <section id="details" className="mt-16">
          <div className="rounded-[2rem] border border-ink/5 bg-surface p-10 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                  What to expect
                </p>
                <h2 className="mt-4 text-3xl font-semibold">{title} by SKB Fashion</h2>
              </div>
              <div className="rounded-full bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
                New arrivals and curated pieces
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-muted p-8 ring-1 ring-ink/5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft">
                  Crafted for every season
                </p>
                <p className="mt-4 text-ink-soft">
                  Explore a handpicked selection of pieces designed to feel polished,
                  effortless and unmistakably elegant.
                </p>
              </div>
              <div className="rounded-3xl bg-muted p-8 ring-1 ring-ink/5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft">
                  Ready to style
                </p>
                <p className="mt-4 text-ink-soft">
                  Every outfit is styled to pair beautifully with matching dupattas,
                  trousers, and seasonal accessories from the boutique.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Premium fabrics that hold their colour and form.",
                "Fast styling advice from our in-store team.",
                "Limited quantities for a distinctive wardrobe statement.",
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-muted p-6 ring-1 ring-ink/5">
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Featured pieces
              </p>
              <h2 className="font-serif text-4xl md:text-5xl">Shop the collection</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-ink-soft">
              A curated selection of styles with vivid colors, comfortable fits, and handcrafted details for every occasion.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <a
                key={product.slug}
                href={`/product/${product.slug}`}
                className="group block overflow-hidden rounded-[2rem] border border-ink/5 bg-surface shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl">{product.name}</h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-ink-soft">
                        {product.price}
                      </p>
                    </div>
                    <div className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                      {product.colors[0]}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ink-soft">{product.description}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Sizes</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="rounded-full bg-muted px-3 py-1 text-xs text-ink-soft"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Colors</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            className="rounded-full bg-muted px-3 py-1 text-xs text-ink-soft"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">View details</span>
                    <span className="text-sm font-semibold text-gold">Order Now</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
