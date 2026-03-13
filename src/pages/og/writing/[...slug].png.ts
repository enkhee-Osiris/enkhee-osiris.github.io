import type { APIContext } from "astro";

import { OG_IMAGE_TITLE, OG_IMAGE_LABEL } from "@/constants";
import { getPublishedWritings } from "@/utils/data";
import { generateOgImage } from "@/utils/og-image";

export async function getStaticPaths() {
  const writings = await getPublishedWritings();

  return writings.map(w => ({ params: { slug: w.id } }));
}

export async function GET({ params }: APIContext) {
  const writings = await getPublishedWritings();

  const writing = writings.find(w => w.id === params.slug);

  if (!writing) return new Response("Not found", { status: 404 });

  const png = await generateOgImage({
    title: OG_IMAGE_TITLE.writing(writing),
    label: OG_IMAGE_LABEL.writing(writing),
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
