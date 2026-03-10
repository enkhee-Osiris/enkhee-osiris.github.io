import type { APIRoute } from "astro";

import { FULL_URL } from "@/constants";

const base = FULL_URL.pathname;

const robotsTxt = `
User-agent: *
Allow: /
Disallow: ${base}search/
Disallow: ${base}pagefind/

Sitemap: ${new URL("sitemap-index.xml", FULL_URL).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
