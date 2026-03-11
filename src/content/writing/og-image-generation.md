---
title: "Dynamic OG Images at Build Time"
description: "How to generate a unique 1200×630 social card for every page using an SVG template, Sharp, and Astro's static API routes — no headless browser required."
pubDatetime: 2026-03-10T00:00:00.000Z
tags: ["guide", "astro", "engineering"]
---

When a link is shared on social media or in a messaging app, the platform fetches `og:image` from the page's meta tags and renders it as a card. A generic fallback image for every post is a missed opportunity — a title-specific image communicates what the content is about before anyone clicks.

The standard approach is a headless browser: launch Puppeteer, render an HTML template, take a screenshot. It works, but it's slow, heavyweight, and awkward in CI. A lighter approach uses SVG as the template format and [Sharp](https://sharp.pixelplumbing.com/) as the rasteriser. No browser, no screenshots — just string manipulation and a native image library.

## The Architecture

Three pieces work together:

1. **`src/assets/og/template.svg`** — A 1200×630 SVG with the static parts of the card (background, pattern, decorations) and an empty `<g id="content"/>` injection point.
2. **`src/utils/og-image.ts`** — Reads the template, injects title and metadata as SVG `<text>` elements, and hands the result to Sharp to produce a PNG.
3. **`src/pages/og/[slug].png.ts`** — An Astro static API route that calls `generateOgImage()` for every published writing at build time.

## The Template

The SVG template contains everything that doesn't change between posts: background color, a dot-grid pattern, an accent line, author name position. The content group is left intentionally empty:

```html
<!-- 1200×630, dark background, decorative elements … -->
<g id="content" />
```

At build time, the generator replaces that placeholder with the post-specific `<text>` nodes. The rest of the SVG stays identical across every card.

Keeping the static and dynamic parts separate means the template can be edited in any SVG editor without touching the generation code.

## Fonts: The Platform Problem

SVG `<text>` with `font-family="Lora"` only works if the system knows where to find Lora. On macOS, Sharp uses CoreText for font rendering — meaning it picks up system-installed fonts, but your CI runner and collaborators may not have the same fonts installed.

The fix is to force Pango's fontconfig backend and point it at a bundled `fonts.conf`:

```ts
process.env.PANGOCAIRO_BACKEND = "fontconfig";
process.env.FONTCONFIG_PATH = resolve("src/assets/og");
```

These are set at **module top level** — before any function is called — so they're in place when Sharp initialises. `fonts.conf` lives alongside the font files and uses `prefix="cwd"` so every path resolves from the project root regardless of where Node is invoked from:

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir prefix="cwd">src/assets/og/fonts</dir>
</fontconfig>
```

The font files (`.ttf`) live in `src/assets/og/fonts/`. They're committed to the repo, which means the build is fully reproducible on any machine.

## Adaptive Title Sizing

Long titles at large font sizes overflow the card. Short titles at small font sizes look undersized. The generator picks a font size based on title length and adjusts the character budget for wrapping accordingly:

```ts
let fontSize: number;
let charsPerLine: number;

if (title.length <= 40) {
  fontSize = 68;
  charsPerLine = 24;
} else if (title.length <= 70) {
  fontSize = 52;
  charsPerLine = 32;
} else {
  fontSize = 40;
  charsPerLine = 40;
}
```

Three tiers cover the full range of realistic post titles. The character-per-line budget shrinks as the font size grows — larger glyphs take more horizontal space, so fewer characters fit on a line at a given pixel width.

## Word Wrapping

SVG has no native text wrapping. The generator breaks the title into lines using `wrapTitle()`:

```ts
function wrapTitle(title: string, charsPerLine: number, maxLines: number): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > charsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = candidate;
    }
  }

  if (current && lines.length < maxLines) lines.push(current);

  // Append ellipsis if words were cut
  const consumed = lines.join(" ").split(/\s+/).length;
  if (consumed < words.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] =
      last.length < charsPerLine
        ? `${last}\u2026`
        : `${last.slice(0, charsPerLine - 1).trimEnd()}\u2026`;
  }

  return lines;
}
```

Greedy packing: words accumulate on the current line until the next word would exceed the budget, then a new line starts. After three lines, wrapping stops and an ellipsis (`…`) is appended. The ellipsis replaces the final character rather than extending the line, so the result never exceeds `charsPerLine`.

## SVG Injection

The wrapped lines become SVG `<tspan>` elements — one per line, each offset vertically by `fontSize * 1.25`:

```ts
const titleSpans = titleLines
  .map((line, i) => `<tspan x="120" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
  .join("");

const contentSvg = `
  <text x="120" y="267" font-family="Lora" font-size="${fontSize}" font-weight="bold" fill="white">
    ${titleSpans}
  </text>
  <text x="783" y="526" font-family="Lora" font-size="28" font-weight="bold" fill="white">
    ${escapeXml(AUTHOR)}
  </text>
  <text x="120" y="560" font-family="PT Serif" font-size="17" fill="white" fill-opacity="0.6">
    ${escapeXml(formattedDate)}
  </text>
`;

return templateSvg.replace('<g id="content"/>', `<g id="content">${contentSvg}</g>`);
```

`escapeXml()` sanitises any special characters in the title — `&`, `<`, `>`, `"`, `'` — before they're embedded in the SVG string. Without this, a title containing `&` would produce malformed XML that Sharp refuses to parse.

## Rasterisation

The completed SVG string goes to Sharp as a Buffer:

```ts
export async function generateOgImage(data: OgImageData): Promise<Uint8Array> {
  const buf = await sharp(Buffer.from(buildSvg(data)))
    .png()
    .toBuffer();
  const out = new Uint8Array(buf.length);
  out.set(buf);
  return out;
}
```

Sharp reads the SVG, renders it using librsvg (which uses Pango for text), and returns a PNG buffer. The `Uint8Array` conversion is required because Astro's `Response` constructor expects a typed array, not a Node.js `Buffer`.

## The Static API Route

`src/pages/og/[slug].png.ts` is a static API route — it generates files at build time rather than serving them at request time.

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  const writings = await getPublishedWritings();
  return writings.map(w => ({ params: { slug: w.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  const writings = await getPublishedWritings();
  const writing = writings.find(w => w.id === params.slug);

  if (!writing) return new Response("Not found", { status: 404 });

  const png = await generateOgImage({
    title: writing.data.title,
    pubDatetime: writing.data.pubDatetime,
    tags: writing.data.tags,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
```

`getStaticPaths` tells Astro which slugs to generate — one per published writing. The `GET` handler is called once per slug at build time. The output lands in `dist/og/[slug].png` and is served as a static asset.

The `Cache-Control: immutable` header is safe here because the slug is tied to the writing's content. If the title changes, the slug doesn't — but in practice, OG images are cached aggressively by social platforms anyway.

## Wiring Up the Meta Tags

The generated image URL is passed to `<Head>` on the writing detail page:

```ts
const ogImageUrl = new URL(`og/${writing.id}.png`, FULL_URL).href;
```

```astro
<Head
  title={TITLES.writing(writing.data.title)}
  description={DESCRIPTIONS.writing(writing.data.description)}
  image={ogImageUrl}
/>
```

`Head.astro` emits the full set of OG and Twitter card meta tags:

```html
<meta property="og:image" content="https://enkhee-Osiris.github.io/kanso/og/slug.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```

## Why SVG Instead of HTML

The headless browser approach renders an HTML page. That means a full browser engine, a JavaScript runtime, CSS layout, and font loading — for what is ultimately a static image. The startup cost alone makes it impractical to run per-post at build time on anything but a fast local machine.

SVG is a document format designed for static rendering. Sharp's SVG support is backed by librsvg — a C library that renders SVG quickly and correctly. The whole pipeline from template string to PNG buffer takes milliseconds per image, which makes generating hundreds of OG images at build time completely unremarkable.

The tradeoff is that SVG layout is more limited than CSS. Absolute positioning, manual line breaking, no flexbox. For a 1200×630 card with a title and a few metadata lines, that's a fine constraint.
