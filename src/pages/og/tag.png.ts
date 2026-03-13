import { OG_IMAGE_TITLE, OG_IMAGE_LABEL } from "@/constants";
import { generateOgImage } from "@/utils/og-image";

export async function GET() {
  const png = await generateOgImage({
    title: OG_IMAGE_TITLE.tags,
    label: OG_IMAGE_LABEL.tags,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
