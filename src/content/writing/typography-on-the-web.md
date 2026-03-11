---
title: "Typography on the Web"
description: "A practical guide to typefaces, sizing, spacing, and loading — the decisions that determine whether your text is actually readable."
pubDatetime: 2026-02-10T00:00:00.000Z
tags: ["guide", "typography", "design"]
---

Typography is the majority of what users actually look at on a text-heavy site. Yet most web typography decisions are made by default — the browser's 16px base, a single sans-serif font, whatever spacing felt right. Making those decisions deliberately produces noticeably better reading experiences.

## Serif vs. Sans-Serif

The old rule — use sans-serif for screens — was written for 72 DPI monitors. At 200+ PPI, serifs render cleanly and add warmth to long-form text.

What actually determines readability is x-height, letter spacing, and how carefully the type is set. A well-spaced serif outperforms a cramped sans-serif. The genre is a secondary concern.

For long-form prose, serifs signal "reading mode" to the reader in a way that sans-serifs don't. That context-setting is worth something.

## Font Pairing

Good pairing creates hierarchy without visual noise. The simplest approach: one display face for headings, one text face for body. They should be different enough to establish hierarchy but share enough character to feel like they belong together.

Contrast doesn't have to come from genre. A heavier weight of the same family, or two serifs with different proportions, often works better than a serif/sans-serif combination that fights itself.

What to look for in a text face:

- Generous x-height — letters stay readable at small sizes
- Open apertures — `a`, `e`, `c` should feel open, not tight
- Moderate stroke contrast — high contrast looks elegant in print, strains on screens
- Good hinting or variable font support — renders consistently across browsers and operating systems

## Scale

A type scale gives you a limited set of sizes that relate to each other. Using arbitrary font sizes (`17px` here, `22px` there) produces inconsistent rhythm. A ratio-based scale doesn't.

A simple scale based on a 1.25 ratio from a 16px base:

| Step | Size   | Use              |
| ---- | ------ | ---------------- |
| sm   | 12.8px | Captions, labels |
| base | 16px   | Body text        |
| md   | 20px   | Large body, lead |
| lg   | 25px   | h4               |
| xl   | 31px   | h3               |
| 2xl  | 39px   | h2               |
| 3xl  | 48px   | h1               |

In CSS, define these as custom properties and reference them consistently. Avoid hardcoded `px` values scattered across components.

## Measure

Line length — the measure — has more impact on readability than any other decision. Too long and the eye loses its place returning to the next line. Too short and reading becomes choppy.

The target is 60–75 characters per line for body text. In CSS:

```css
.prose {
  max-width: 65ch;
}
```

The `ch` unit approximates character width for the current font, so the measure scales with the typeface rather than being a fixed pixel value.

## Line Height

Body text needs room to breathe. A line-height of 1.5–1.6 works for most text faces. Go tighter and lines feel crowded; go looser and the eye loses the thread from one line to the next.

Headings use tighter line heights — 1.1 to 1.3 — because their larger size already creates visual separation between lines.

```css
body {
  line-height: 1.6;
}

h1,
h2,
h3 {
  line-height: 1.2;
}
```

Don't add `line-height` in `px` or `rem`. Unitless values scale with the element's own `font-size`, which is what you want.

## Spacing

Vertical rhythm comes from consistent spacing relative to the base line height. If body text has `line-height: 1.6` at `16px`, that's `25.6px`. Use multiples of that as margin values:

- Paragraph spacing: `1em` (equals one line of text)
- Section spacing: `2–3em`
- Heading margin-above: `2–3em` (creates clear separation from previous content)
- Heading margin-below: `0.5–0.75em` (keeps it visually attached to what follows)

Heading margins above and below are not equal — the heading belongs to the section that follows it, not the one above.

## Loading Web Fonts

Fonts requested from Google Fonts or a CDN arrive after the initial render. The browser has to decide: show a blank space, or show the fallback font and swap when the web font arrives.

Control this explicitly:

```css
@font-face {
  font-family: "Lora";
  font-display: swap; /* show fallback, swap when ready */
}
```

For critical above-the-fold fonts, preload the file in `<head>`:

```html
<link
  rel="preload"
  href="/fonts/lora-v35-latin-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Self-hosting fonts is faster and more reliable than third-party CDNs. You control the cache headers, avoid the extra DNS lookup, and eliminate the dependency on an external service.

Variable fonts offer a middle ground: one file covers all weights and styles, reducing total font payload while giving you the full range of typographic control.

## The Defaults Matter Most

The decisions with the most impact are the boring ones: body font size, line height, and measure. Get these right and the rest is refinement. Get them wrong and no amount of careful heading styling will fix the reading experience.

Start with 16px base, 1.6 line height, 65ch measure. Then adjust based on what the typeface actually needs.
