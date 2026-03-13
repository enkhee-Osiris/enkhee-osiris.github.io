# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This is a personal website built with Astro 6, using the [kanso](https://github.com/enkhee-Osiris/kanso) theme as a base. The site features a minimal, content-focused design with writings, tags, about page, full-text search, and GDPR-compliant analytics.

**Current version:** v2.0.0 — Complete rewrite with Astro 6, search, and analytics.

## Documentation

- `README.md` — Project overview, features, tech stack, and getting started guide
- This file (`CLAUDE.md`) — Detailed architecture and development guidance

## Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run dev:search` — Build + copy pagefind index to `public/pagefind/` + start dev server (search functional in dev)
- `npm run build` — Production build to `./dist/` (runs `astro check && astro build && pagefind`)
- `npm run preview` — Preview production build locally
- `npm run clean` — Remove `dist/`, `.astro/`, `public/pagefind/`
- `npm run generate` — Run `astro sync` to generate content collection types
- `npm run format` — Format all files with Prettier
- `npm run format:check` — Check formatting without writing
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Run ESLint with auto-fix
- `npm run lighthouse` — Lighthouse audit against production build (run `npm run build` first, or pass `-- --build`)

## Tooling

- **Prettier** with `prettier-plugin-css-order` + `prettier-plugin-astro` — config in `.prettierrc`, 2-space indent, double quotes, `es5` trailing commas, `arrowParens: avoid`. CSS declarations are auto-sorted in `concentric-css` order (outside-in: position → box model → visual).
- **ESLint** flat config (`eslint.config.mjs`) — `@eslint/js` + `typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-import` (enforced import ordering) + `eslint-plugin-prettier` + `eslint-config-prettier`. Config files (`*.config.js`, `*.config.mjs`) are excluded from linting.
- **Husky + lint-staged** — Pre-commit hook runs eslint + prettier on staged files
- **Deployment** — GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Deploy only triggers on changes to source code, static assets, and build config (`src/`, `public/`, `astro.config.mjs`, `ec.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`). Manual deploy available via `workflow_dispatch`.
- **Skills** — Project-level agent skills in `.agents/skills/`: astro, css-architecture, accessibility-compliance, best-practices

## Architecture

This is an Astro 6 site with a minimal, content-focused design.

**Content system:** Writings live in `src/content/writing/` as `.mdx` files (MDX, not markdown). The collection schema is defined in `src/content.config.ts` — frontmatter requires `title`, `description`, `pubDatetime` (ISO 8601), `author` (defaults to `AUTHOR` constant), `tags` (defaults to `["others"]`), and optionally `modDatetime`, `ogImage`, `featured` (boolean), and `draft` (boolean). Tags are validated against `/^[a-z-0-9]+$/` (lowercase letters, hyphens, and numbers only — no spaces, no uppercase, Cyrillic characters not allowed). Writings are queried via `getCollection('writing')` and rendered through `src/pages/writing/[...slug].astro`.

**MDX image pattern:** All writing images use:

```tsx
import Image from "@/components/Image.astro";
import img1 from "@/assets/images/[article]/[file].jpg";

<Image src={img1} caption="Зураг 1: description" />;
```

**Data utilities:** `src/utils/data.ts` exports helper functions for querying writings:

- `getPublishedWritings()` — wraps `getCollection("writing", w => !w.data.draft)`; use this everywhere instead of `getCollection` directly
- `getSortedWritings(writings)` — sorted by date descending
- `getFeaturedWritings(writings, limit?)` — featured only, sorted by date
- `getNonFeaturedWritings(writings, limit?)` — non-featured only, sorted by date
- `getRelatedWritings(current, writings, limit?)` — writings sharing tags with the current entry, ranked by shared tag count then date
- `getTags(writings)` — flat array of unique tag strings, sorted alphabetically
- `getTagsWithWritings(writings)` — `{ tag, writings[] }` pairs for all tags, sorted by count descending then alphabetical
- `getWritingsByYear(writings)` — `{ year, writings[] }` pairs sorted by year descending

**Referrer utility:** `src/utils/referrer.ts` exports `getBackLinkFromReferrer(referrer, currentOrigin, baseUrl)` which parses a referrer URL and returns `{ href, label }` for smart back links or `null` if cross-origin.

**Cookie consent utility:** `src/utils/cookieConfig.ts` exports `initCookieConsent()` which configures vanilla-cookieconsent with:

- Categories: `necessary` (always enabled, read-only), `analytics` (disabled by default, user-controlled)
- Consent modal: inline box at bottom right with "Accept all", "Reject all", "Manage preferences" buttons
- Preferences modal: box on the right with category descriptions and GA cookie table
- `onFirstConsent`, `onConsent`, `onChange` callbacks that update gtag consent state and load Google Analytics when analytics category is accepted
- `loadGoogleAnalytics()` — injects gtag.js script dynamically and initializes GA4 config with `anonymize_ip: true` and `cookie_domain: location.hostname` (fixes GitHub Pages cookie rejection)
- `updateConsentState()` — calls `gtag("consent", "update", ...)` to grant/deny storage based on user choice

**Navigation:** `FloatingNav.astro` is a fixed right-side bar (z-index 100) with menu toggle, search link, and theme toggle. `FullscreenNav.astro` is a full-screen overlay (z-index 90) with centered nav links (Home, Writings, About, Search) — visibility is CSS-driven via `html[data-menu-open]` (set by FloatingNav's menu toggle). Page scroll is locked when the overlay is open (`overflow: hidden` on `html`). Both components are included on every page.

**Page layout chain:** All pages use `BaseLayout.astro` which includes `Head.astro` (global CSS import, meta tags, OG/Twitter cards, font preloads, cookie consent) + `SkipLink.astro` (skip to `#main-content`, z-index 200) + `FloatingNav.astro` + `FullscreenNav.astro` + optional `Footer.astro`. The writing detail page (`src/pages/writing/[...slug].astro`) uses BaseLayout with `includeFooter={true}` and passes JetBrains Mono font preload via the `head` slot. Markdown content is rendered inside a `.prose` div with scoped `:global()` styles for all typography elements. The writing detail page also includes a related writings section (filtered by shared tags, limited to `RELATED_WRITINGS_LIMIT`) and a client-side script that uses `document.referrer` to update the `BackLink` based on the previous same-origin page: `/tag/[slug]` → "Back to #slug", `/tag/` → "Back to tags", `/search/` → "Back to search" (preserving `?q=` param), `BASE_URL` root → "Back to home"; default is "Back to writings". The tag detail page (`/tag/[tag]`) has a similar script: navigating from a writing updates the back link to "Back to writing"; from home updates it to "Back to home".

**Key integrations:**

- `@astrojs/mdx` — MDX support for writings
- `@astrojs/sitemap` — Auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`)
- `astro-expressive-code` — Code blocks with Catppuccin Frappé (dark) / Catppuccin Latte (light) themes, JetBrains Mono font, line numbers (`ec.config.mjs`). Uses `themeCssSelector` to map theme type to `[data-theme="dark"]`/`[data-theme="light"]`.
- `sharp` — SVG→PNG rasterisation for OG images (via librsvg/pango). Set `process.env.PANGOCAIRO_BACKEND = "fontconfig"` and `process.env.FONTCONFIG_PATH = resolve("src/assets/og")` at module top-level in `src/utils/og-image.ts` so pango uses the bundled fonts rather than CoreText on macOS. Font files live in `src/assets/og/fonts/` (`SchoolBook-New_Bold.ttf`, `PT-Serif-Pro_Book.ttf`). SVG uses `font-family="SchoolBookNew-Bold"` for title/author and `font-family="PTSerifProWeb-Book"` for metadata. `src/assets/og/fonts.conf` uses `prefix="cwd"` so paths resolve from the project root at build time, and includes fontconfig aliases (`<alias>` tags) that map the SVG font-family names to the actual TTF font family names ("SchoolBook New", "PT Serif Pro Web") for cross-platform compatibility (macOS CoreText vs Linux fontconfig in CI).
- **Rehype plugins** (configured in `astro.config.mjs` `markdown.rehypePlugins`, order matters): `rehypeHeadingIds` (stamp heading IDs) → `@benjc/rehype-enhanced-tables` (wrap tables in `.table-scroll` div) → `rehype-external-links` (auto `target="_blank" rel="noopener noreferrer"`) → `rehype-unwrap-images` (strip `<p>` around standalone images) → `rehype-autolink-headings` (prepend `.heading-anchor` link to headings). Heading anchors use a Radix-style 15×15 SVG icon rendered at 20×20; clicking copies the URL to clipboard via `history.pushState` + `navigator.clipboard.writeText`.
- `pagefind` (devDep) + `@pagefind/default-ui` — Static full-text search. `pagefind` CLI runs after `astro build` to index `dist/`. Config in `pagefind.json` (`site: "dist"`, `root_selector: "main"`). Bundle lands in `dist/pagefind/`. Non-writing pages (homepage, listing pages, search page itself) are excluded via `data-pagefind-ignore="all"` on `<main>`. Search page at `src/pages/search.astro` — syncs `?q=` URL param on load (`ui.triggerSearch`) and on input (`history.replaceState`). Dev workflow: `npm run dev:search` builds, copies index to `public/pagefind/` (gitignored), then starts dev server.
- **Astro v6 Fonts** — Self-hosted fonts via `fontProviders.local()` configured in `astro.config.mjs`. Font files live in `src/assets/fonts/`. Astro automatically copies them to the build output, generates `@font-face` rules, and creates CSS variables (`--font-pt-serif-pro`, `--font-schoolbook-new`, `--font-jetbrains-mono`).
- **Google Analytics 4** — GDPR-compliant analytics via `vanilla-cookieconsent`. `CookieConsent.astro` component initializes gtag with default denied consent, then loads GA only after user grants consent. Set `PUBLIC_GA_ID` in `.env` to enable. Configuration in `src/utils/cookieConfig.ts`:
  - `loadGoogleAnalytics()` — dynamically injects gtag.js script with duplicate check, enables `url_passthrough`, and uses `cookie_domain: isLocalhost ? "none" : location.hostname` (fixes GitHub Pages cookie rejection)
  - `updateConsentState()` — calls `gtag("consent", "update", ...)` to grant/deny all storage types (analytics_storage, ad_storage, functionality_storage, personalization_storage)
  - Categories: `necessary` (always enabled, read-only), `analytics` (disabled by default, user-controlled)
  - Auto-clear cookies with regex pattern `{ name: /^_ga/ }, { name: "_gid" }, { name: "_gat" }` when consent is revoked
  - Bot detection via `hideFromBots: true`
  - See `/writing/google-analytics-4-astro` for complete setup guide

- **Vite config** — `vanilla-cookieconsent` is included in `optimizeDeps.include` and `ssr.noExternal` in `astro.config.mjs` for proper bundling

- **Cookie consent styles** — `src/styles/cookie.css` maps vanilla-cookieconsent CSS variables to site design tokens (`--cc-*` variables), with light/dark theme support for category backgrounds and uppercase small-caps button styling matching site conventions

**CSS comments:** Style blocks use SMACSS-style section headers throughout. Format: `/* -------------------------\n * [Category] — [Name]\n * [Optional description]\n * ------------------------- */`. Categories: **Theme** (variables, color tokens), **Base** (element defaults), **Layout** (major structural containers), **Module** (components and sub-elements), **State** (interactive states, media queries, attribute-driven states). CSS declaration order is enforced by `prettier-plugin-css-order` (concentric-css) — do not manually reorder; run `npm run format` instead.

**Styling:** Global styles in `src/styles/global.css` (imported via `Head.astro`). Fonts: School Book (display/headings), PT Serif Pro (body), and JetBrains Mono (code) — all served via Astro's native font system from `src/assets/fonts/`. CSS variables on `:root` for colors (`--color-surface-*`), fonts (`--font-body`, `--font-display`), and semantic tokens (`--color-bg`, `--color-text`, `--color-border`, `--color-code-bg`, `--color-code-text`, `--color-mark-bg`, `--color-mark-text`). Accent color: `--color-accent: #c2410c` (orange-700) for light theme; `#d97706` (amber-500) for dark theme. Dark mode via `prefers-color-scheme` with `html[data-theme]` override. Theme variables are defined in four blocks: `:root`, `@media (prefers-color-scheme: dark)`, `html[data-theme="light"]`, `html[data-theme="dark"]`. Component-scoped styles use `<style>` tags in `.astro` files. Cookie consent styles in `src/styles/cookie.css` map vanilla-cookieconsent CSS variables to site design tokens.

**Interaction tokens** (`src/styles/global.css`, `:root` block after design tokens — use these everywhere, never hardcode or create per-page locals):

- `--focus-outline` — `1px solid var(--color-border-hover)`; use on all `:focus-visible` rules
- `--focus-offset-sm` (`0.125rem`) — compact chips and tag links
- `--focus-offset` (`0.25rem`) — default: icon buttons, inputs
- `--focus-offset-lg` (`0.5rem`) — text links and large block links
- `--focus-radius` (`0.125rem`) — focus ring corner radius for rectangular elements
- `--transition-fast` (`0.15s ease`) — micro transitions (e.g. SkipLink slide)
- `--transition` (`0.3s ease-in-out`) — standard colour/opacity fades
- `--transition-motion` (`0.2s ease`) — physical movement (gap, transform)
- `--letter-spacing-caps` (`0.1em`) — uppercase/small-caps labels

Focus shape conventions: circular elements (FloatingNav buttons, TagChip) use `border-radius: 9999px` on `:focus-visible` (not `--focus-radius`). Prose links keep `outline-offset: 0.15rem` as a literal (matches `text-underline-offset`). SkipLink keeps `outline-offset: -2px` as a literal (prevents clipping at viewport top).

**Responsive design:** Three breakpoints used across all pages. `64rem` (1024px) — FloatingNav moves to top-right corner, horizontal layout. `48rem` (768px) — add `padding-inline: 1.5rem` to page containers, collapse fixed-width inner sections to `width: 100%`, reduce `padding-block` to `5rem`. `40rem` (640px) — layout changes: featured cards collapse from 2-column grid to 1-column, article meta collapses from `1fr auto` grid to single column (reset `grid-row: auto` + `order: 0` on all children to restore DOM order: date → title → tags), hover-only date patterns (`.latest-link time`, `.related-link time`) shown inline, prose h2/h3/h4 scale down. `FullscreenNav` has its own `@media (max-width: 640px)` stacking breakpoint. Prose tables scroll via `.table-scroll` wrapper div (`overflow-x: auto`) injected by `@benjc/rehype-enhanced-tables` — `<table>` stays as `display: table`.

**SVG icons:** Stored in `src/assets/icons/` and imported via `?raw` suffix + `set:html` directive (e.g., `const icon = await import("@/assets/icons/name.svg?raw")`). For CSS usage (e.g., blockquote decoration), SVGs are embedded as data URIs with `mask-image` so `background-color` can use CSS variables for theme-aware coloring.

**Favicons and PWA:** Complete favicon set in `public/` with PWA manifest at `public/site.webmanifest`. Includes `favicon.ico` (multi-resolution), `favicon.svg`, `favicon-96x96.png`, `apple-touch-icon.png` (180×180), and web app manifest icons (192×192, 512×512). Favicon links and manifest reference added in `Head.astro`.

**Layouts:**

- `BaseLayout.astro` — page wrapper for all routes; includes `Head.astro`, `SkipLink.astro`, `FloatingNav.astro`, `FullscreenNav.astro`, optional `Footer.astro`. Props: `title`, `description`, `image`, `pagefindIgnore` (default: `false`), `includeFooter` (default: `false`). Provides `head` slot for page-specific additions (e.g., fonts, inline styles).

**Components:**

- `BackLink.astro` — back navigation link with arrow-left icon. Props: `href` (default: `URLS.writings`), `label` (default: `"Back to writings"`).
- `CookieConsent.astro` — GDPR-compliant cookie consent banner using vanilla-cookieconsent. Initializes gtag with default denied consent, loads Google Analytics only after user grants consent. Requires `PUBLIC_GA_ID` environment variable. Configuration in `src/utils/cookieConfig.ts`.
- `FloatingNav.astro` — fixed right-side navigation bar (z-index 100) with menu toggle, search link, and theme toggle. At `max-width: 64rem` moves to top-right corner with horizontal layout and smaller icons (2.25rem). Manages theme state (light/dark) via localStorage and sets `html[data-theme]` attribute. Opens/closes `FullscreenNav.astro` and sets `html[data-menu-open]` attribute.
- `FormattedDate.astro` — renders a `<time>` element. Props: `date: Date`, optional `formatOptions: Intl.DateTimeFormatOptions` (default: `{ year: "numeric", month: "short", day: "numeric" }`).
- `FullscreenNav.astro` — full-screen navigation overlay (z-index 90) with two-column grid: left panel shows latest 3 writings + social links, right panel has main nav links (Home, Writings, Tags, About, Search). Visibility controlled by `html[data-menu-open]` attribute set by `FloatingNav.astro`. Locks page scroll when open via `html { overflow: hidden }`. At `max-width: 640px` stacks vertically with nav links first.
- `Head.astro` — document head with global styles, meta tags, OG/Twitter cards, font preloads, anti-FOUC theme script, cookie consent import. Props: `title`, `description`, optional `image`. Used by `BaseLayout.astro`.
- `Image.astro` — wraps Astro's `<Image>` with `<figure>` and optional `<figcaption>`. Fills container width with `height: auto`. Use this component (not Astro's built-in `<Image>`) for all writing images. Images stored in `src/assets/images/[article-name]/` and imported as `import img1 from '@/assets/images/[article]/[file].jpg';`. Captions should use Mongolian with numbering: `caption="Зураг N: description"`.
- `Footer.astro` — site footer with copyright line displaying `© {year} {AUTHOR}`.
- `SkipLink.astro` — skip-to-content link targeting `#main-content`. Visually hidden until focused, z-index 200.
- `SocialLinks.astro` — social icon links (GitHub, LinkedIn, Email) from `SOCIAL` constants. Props: `iconStyle` ("default" at 1.125rem or "large" at 1.5rem), `includeLabels` (default: `true`). Each link has `aria-label` for accessibility; no `role="list"` (redundant on `<ul>`).
- `TagChip.astro` — pill-shaped tag link using `URLS.tag()`. Displays `#tag` prefix.
- `WritingsByYear.astro` — reusable year-grouped writings list. Two-column grid with sticky year labels and writing entries (date + title). Used on writings index, tag index, and tag detail pages.

**Pages:** All pages use `BaseLayout.astro` as their wrapper.

- `src/pages/index.astro` — homepage with intro section (name, bio, large social links), featured writings grid (2-column cards with title, description, tags), and latest writings list with hover-reveal dates. Uses `pagefindIgnore={true}` to exclude from search index.
- `src/pages/writing/index.astro` — all writings, year-grouped with date + title, rendered via `WritingsByYear.astro`.
- `src/pages/writing/[...slug].astro` — writing detail with BackLink, article header (date, title, tags), prose content with typography styles, and related writings section. Uses `includeFooter={true}` and preloads JetBrains Mono font via `head` slot. Includes referrer-aware back link script.
- `src/pages/tag/index.astro` — all tags as pill-shaped chips (`#name` + count badge), sorted by count desc then alphabetical; includes `WritingsByYear` section below with all writings.
- `src/pages/tag/[tag].astro` — same layout as tag index (all tag chips + `WritingsByYear` for filtered writings), with the active tag chip highlighted via `aria-current="page"` (inverted colors, `order: -1` to appear first). Includes BackLink component and referrer-aware script.
- `src/pages/search.astro` — search page using `PagefindUI` with `?q=` URL param sync on load and input. `<main data-pagefind-ignore="all">` excludes it from the index. Pagefind CSS variables overridden with site tokens via `head` slot.
- `src/pages/about.astro` — bio section (name, paragraphs, social links), experience list (icon badge or company initial + company/role/period with `<time>`), and projects list (bordered cards with title link, description, tech tags). Uses `pagefindIgnore={true}`.
- `src/pages/robots.txt.ts` — API route generating `robots.txt`; disallows `${base}search/` and `${base}pagefind/`; uses `FULL_URL.pathname` for the base path prefix.
- `src/pages/rss.xml.ts` — RSS feed at `/rss.xml` using `@astrojs/rss`.
- `src/pages/og/*.png.ts` — OG image generation routes:
  - `index.png.ts` — homepage OG image
  - `about.png.ts` — about page OG image
  - `search.png.ts` — search page OG image
  - `writing.png.ts` — writings index OG image
  - `tag.png.ts` — tags index OG image
  - `tag/[tag].png.ts` — dynamic tag OG images for each tag
  - `writing/[...slug].png.ts` — dynamic writing OG images for each post
- Uses `generateOgImage()` from `src/utils/og-image.ts`

**Links:** Internal links use `URLS` constants from `src/constants.ts` or `import.meta.env.BASE_URL` for base path prefix.

**Site constants:** `src/constants.ts` exports:

- `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR` — site metadata
- `GA_ID` — Google Analytics 4 Measurement ID (hardcoded for build-time access)
- `HOME_LATEST_WRITINGS_LIMIT`, `HOME_FEATURED_WRITINGS_LIMIT`, `RELATED_WRITINGS_LIMIT` — display limits
- `FULL_URL` — resolved site URL with base path
- `SOCIAL` — social link URLs (`github`, `linkedin`, `email`)
- `URLS` — route map (`home`, `writings`, `writing(slug)`, `tags`, `tag(slug)`, `search`, `about`), all prefixed with `BASE_URL`
- `TITLES` — uses `TitleMap` mapped type: static pages have `string` values, dynamic pages (`writing`, `tag`) have functions
- `DESCRIPTIONS` — uses `DescriptionMap` mapped type: static pages have `string` values, dynamic pages (`writing`, `tag`) have functions
- `OG_IMAGE_TITLE` — uses `OGImageTitleMap` mapped type for OG image titles
- `OG_IMAGE_LABEL` — uses `OGImageLabelMap` mapped type for OG image labels (URLs or dates)
- TypeScript interfaces: `Social`, `Urls`, `Experience`, `Project` for type safety

**Type declarations:** `src/env.d.ts` holds the `/// <reference types="astro/client" />` triple-slash and any third-party module declarations that lack `@types` packages. Includes:

- `declare module "@pagefind/default-ui"` for Pagefind UI
- `Window` interface extension for `dataLayer` and `gtag` (Google Analytics)

**TypeScript:** Extends `astro/tsconfigs/strict` (provides `strict`, `noEmit`, `verbatimModuleSyntax`, etc.). Additional: `target: ES2023`, `lib: ["ES2023", "ES2023.Array", "DOM", "DOM.Iterable"]` (enables `toSorted`/`toReversed`/`toSpliced`), `noImplicitReturns`, path aliases (`@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/assets/*`, `@/constants`), and `@astrojs/ts-plugin`.
