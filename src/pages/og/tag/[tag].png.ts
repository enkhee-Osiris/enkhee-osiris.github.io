import type { APIContext } from "astro";

import { OG_IMAGE_TITLE, OG_IMAGE_LABEL } from "@/constants";
import { getPublishedWritings, getTags } from "@/utils/data";
import { generateOgImage } from "@/utils/og-image";

export async function getStaticPaths() {
  const writings = await getPublishedWritings();
  const tags = getTags(writings);

  return tags.map(tag => ({ params: { tag } }));
}

export async function GET({ params }: APIContext) {
  const { tag } = params;

  if (!tag) {
    return new Response("Tag not found", { status: 404 });
  }

  const png = await generateOgImage({
    title: OG_IMAGE_TITLE.tag(tag),
    label: OG_IMAGE_LABEL.tag(tag),
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
