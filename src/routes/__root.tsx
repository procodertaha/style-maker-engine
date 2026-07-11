import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer } from "@/components/footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-ink">404</h1>
        <h2 className="mt-4 font-serif text-xl text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The page you're looking for isn't part of the collection.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-ink px-5 py-3 text-xs font-medium uppercase tracking-widest text-surface transition-colors hover:bg-ink/90"
          >
            Return home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-ink">Something didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">Please try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-ink px-5 py-3 text-xs font-medium uppercase tracking-widest text-surface transition-colors hover:bg-ink/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-ink/15 px-5 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:border-ink/40"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SKB Fashion" },
      {
        name: "description",
        content:
          "SKB Fashion – a Karachi ladies suits boutique in Saima Pari Mall, Hyderi. Embroidered, lawn, chiffon, bridal and unstitched suits. Open daily 11 AM – 10 PM.",
      },
      { name: "author", content: "SKB Fashion" },
      {
        name: "keywords",
        content:
          "SKB Fashion, ladies suits Karachi, Pakistani suits, embroidered suits, lawn suits, chiffon suits, bridal suits, unstitched fabric, Hyderi boutique, North Nazimabad",
      },
      { property: "og:site_name", content: "SKB Fashion" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SKB Fashion | Ladies Suits Boutique in Karachi" },
      {
        property: "og:description",
        content:
          "Beautifully crafted ladies suits — embroidered, lawn, chiffon, bridal & unstitched — at SKB Fashion, Saima Pari Mall, Hyderi, Karachi.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1b1b18" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "SKB Fashion",
          description:
            "Ladies suits boutique in Karachi — embroidered, lawn, chiffon, bridal and unstitched.",
          telephone: "+92 316 2723318",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Saima Pari Mall, S-43, 2nd Floor, Hyderi, Block H",
            addressLocality: "North Nazimabad, Karachi",
            postalCode: "74700",
            addressCountry: "PK",
          },
          openingHours: "Mo-Su 11:00-22:00",
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "2",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
}
