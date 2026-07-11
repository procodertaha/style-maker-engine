import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly" as const, priority: "1.0" },
          { path: "/ladies-suits", changefreq: "weekly" as const, priority: "0.8" },
          { path: "/casual-wear", changefreq: "weekly" as const, priority: "0.8" },
          { path: "/party-wear", changefreq: "weekly" as const, priority: "0.8" },
          { path: "/kids-collection", changefreq: "weekly" as const, priority: "0.8" },
          { path: "/winter-collection", changefreq: "weekly" as const, priority: "0.8" },
          { path: "/new-arrivals", changefreq: "weekly" as const, priority: "0.8" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
