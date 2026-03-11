---
title: "Configuring Kanso"
description: "A walkthrough of every configuration file you'll need to touch to make this theme your own — site metadata, social links, code themes, and content."
pubDatetime: 2026-03-12T00:00:00.000Z
tags: ["guide", "astro", "engineering"]
---

Kanso ships with placeholder content and default settings. Making it your own means editing a handful of files — all in predictable locations, all TypeScript or plain Markdown. This guide covers each one.

## Site Metadata — `src/constants.ts`

The primary configuration file. This is where most personalisation happens.

### Site identity

```ts
export const SITE_TITLE = "Kanso";
export const SITE_DESCRIPTION = "A minimal writing theme for Astro";
export const AUTHOR = "Your Name";
```

`SITE_TITLE` appears in the `<title>` tag on every page. `SITE_DESCRIPTION` is used as the default meta description on the homepage and in the RSS feed. `AUTHOR` is used in the about page heading, the RSS feed author field, and as the default `author` frontmatter value in writing entries.

### Social links

```ts
export const SOCIAL = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  email: "mailto:hello@yourdomain.com",
};
```

These populate the social icon links on the about page. Replace the placeholder URLs with your own.

### Display limits

```ts
export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const RELATED_WRITINGS_LIMIT = 5;
```

Controls how many writings appear in each listing context. The homepage shows up to `HOME_FEATURED_WRITINGS_LIMIT` featured cards and `HOME_LATEST_WRITINGS_LIMIT` latest entries. Writing detail pages show up to `RELATED_WRITINGS_LIMIT` related writings at the bottom.

### About page content

The about page renders from two arrays in `constants.ts` — no separate data file required.

**Experience entries:**

```ts
export const EXPERIENCES: Experience[] = [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    start: "2022",
    end: null, // null = "Present"
    description: "Leading frontend architecture and design system development.",
    icon: undefined, // optional: import a raw SVG string here
  },
];
```

Set `end: null` for your current role — the template renders it as "Present". Each entry can optionally include an `icon` field: a raw SVG string that appears as a badge. If omitted, the company's first letter is used instead.

**Project cards:**

```ts
export const PROJECTS: Project[] = [
  {
    name: "Project Name",
    description: "A short description of what the project does.",
    url: "https://github.com/your-username/project",
    tags: ["Astro", "TypeScript"],
  },
];
```

Each project renders as a bordered card with a linked title, description, and technology pills.

## Site URL and Base Path — `astro.config.mjs`

```js
export default defineConfig({
  site: "https://yourdomain.com",
  base: "/",
  trailingSlash: "always",
});
```

`site` must be your full production domain — it's used to generate the sitemap, RSS feed, and OG image URLs. `base` is the path prefix for the entire site. If you're hosting at the root of your domain, use `"/"`. For a GitHub Pages project site (e.g. `username.github.io/repo`), set it to `"/repo"`.

If you change `base`, every internal link resolves correctly automatically — they all go through `import.meta.env.BASE_URL` or the `URLS` constants. You shouldn't need to update any links manually.

## Code Block Themes — `ec.config.mjs`

Kanso uses [Expressive Code](https://expressive-code.com/) for syntax highlighting. The theme is configured in `ec.config.mjs`:

```js
export default defineEcConfig({
  themes: ["catppuccin-frappe", "catppuccin-latte"],
  themeCssSelector: theme => {
    const type = theme.type === "dark" ? "dark" : "light";
    return `[data-theme="${type}"]`;
  },
});
```

The first theme in the array is the dark variant; the second is the light variant. `themeCssSelector` maps Expressive Code's internal theme type to the site's `[data-theme]` attribute — this is what makes code blocks respond to the theme toggle.

To use a different theme pair, replace the strings in the `themes` array with any [Shiki built-in theme](https://shiki.style/themes). The dark/light pairing is determined by the theme's `type` property — the selector function handles that automatically, so you only need to update the theme names.

The code font (`JetBrains Mono`) and size are set via `styleOverrides`:

```js
styleOverrides: {
  codeFontFamily: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`,
  codeFontSize: "0.875rem",
  codeLineHeight: "1.41",
},
```

Replace `"JetBrains Mono"` with any other monospace font you prefer. If you change it here, also update the `<link rel="preload">` in `src/components/Head.astro` to match.

## Body Fonts — `src/components/Head.astro`

The site loads two Google Fonts globally — Lora for headings and PT Serif for body text — via a `<link>` in `Head.astro`. To change fonts, replace the Google Fonts URL and update the CSS custom properties in `src/styles/global.css`:

```css
:root {
  --font-body: "PT Serif", Georgia, serif;
  --font-display: "Lora", Georgia, serif;
}
```

Every component references `--font-body` and `--font-display` — updating these two variables is all that's needed.

## Writing Content — `src/content/writing/`

Writings are Markdown or MDX files in `src/content/writing/`. Each file requires this frontmatter:

```md
---
title: "Your Post Title"
description: "A one-sentence description for meta tags and listing pages."
pubDatetime: 2026-01-15T00:00:00.000Z
tags: ["guide", "astro"]
---
```

Optional frontmatter fields:

| Field         | Type      | Default  | Purpose                                 |
| :------------ | :-------- | :------- | :-------------------------------------- |
| `author`      | `string`  | `AUTHOR` | Overrides the default author            |
| `modDatetime` | `Date`    | —        | Shows a "Last updated" date             |
| `featured`    | `boolean` | `false`  | Pins to the featured section on home    |
| `draft`       | `boolean` | `false`  | Excludes from all listings and the feed |

**Tag format:** tags must be lowercase letters and hyphens only — `design-systems` is valid, `Design Systems` is not. The schema validates this at build time and reports which files are non-conforming.

**Slugs:** The URL slug is derived from the filename. `my-post.md` becomes `/writing/my-post/`. Rename the file to change the URL.

**MDX:** Files with the `.mdx` extension can import and use Astro components inline. The `Image` component (`@/components/Image.astro`) is the most commonly useful one — it adds optional captions on top of Astro's built-in image optimisation.

## RSS Feed Metadata — `src/pages/rss.xml.ts`

The RSS feed reads `SITE_TITLE`, `SITE_DESCRIPTION`, and `FULL_URL` from `constants.ts` automatically. The only time you need to open this file is if you want to change the feed's `customData` (e.g. the `<language>` tag).

## What You Don't Need to Touch

The navigation, theme toggle, search, and sitemap all configure themselves from the constants and content. The only files that require your attention to personalise the site are:

1. `src/constants.ts` — metadata, social links, display limits, about page content
2. `astro.config.mjs` — production URL and base path
3. `ec.config.mjs` — code block themes (optional)
4. `src/content/writing/` — your actual writings
