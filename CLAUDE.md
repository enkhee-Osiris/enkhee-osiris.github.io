# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Deployment** — GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), project site at `enkhee-Osiris.github.io/kanso`. Deploy only triggers on changes to source code, static assets, and build config (`src/`, `public/`, `astro.config.mjs`, `ec.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`). Manual deploy available via `workflow_dispatch`.
- **Skills** — Project-level agent skills in `.agents/skills/`: astro, css-architecture, accessibility-compliance, best-practices
- **Screenshots** — `screenshots/` contains 14 full-page PNGs at 1440×900 (7 pages × light + dark) taken from production preview (`npm run build && npm run preview`). When re-screenshotting, set `localStorage.setItem('theme','light')` **before** navigating (not after) so the anti-FOUC script in `Head.astro` initialises the correct theme on load.

## Architecture

This is an Astro 5 site with a minimal, content-focused design.

**Content system:** Writings live in `src/content/writing/` as `.md`/`.mdx` files. The collection schema is defined in `src/content.config.ts` — frontmatter requires `title`, `description`, `pubDatetime` (ISO 8601), `author` (defaults to `AUTHOR` constant), `tags` (defaults to `["others"]`), and optionally `modDatetime`, `ogImage`, `featured` (boolean), and `draft` (boolean). Tags are validated against `/^[a-z-]+$/` (lowercase letters and hyphens only — no spaces, no uppercase). Writings are queried via `getCollection('writing')` and rendered through `src/pages/writing/[...slug].astro`.

**Data utilities:** `src/utils/data.ts` exports helper functions for querying writings:

- `getPublishedWritings()` — wraps `getCollection("writing", w => !w.data.draft)`; use this everywhere instead of `getCollection` directly
- `getSortedWritings(writings)` — sorted by date descending
- `getFeaturedWritings(writings, limit?)` — featured only, sorted by date
- `getNonFeaturedWritings(writings, limit?)` — non-featured only, sorted by date
- `getRelatedWritings(current, writings, limit?)` — writings sharing tags with the current entry, ranked by shared tag count then date
- `getTagsWithWritings(writings)` — `{ tag, writings[] }` pairs for all tags, sorted by count descending then alphabetical
- `getWritingsByYear(writings)` — `{ year, writings[] }` pairs sorted by year descending

**Navigation:** `FloatingNav.astro` is a fixed right-side bar (z-index 100) with menu toggle, search link, and theme toggle. `FullscreenNav.astro` is a full-screen overlay (z-index 90) with centered nav links (Home, Writings, About, Search) — visibility is CSS-driven via `html[data-menu-open]` (set by FloatingNav's menu toggle). Page scroll is locked when the overlay is open (`overflow: hidden` on `html`). Both components are included on every page.

**Page layout chain:** Pages use `Head.astro` (global CSS import, meta tags, OG/Twitter cards, font preloads) + `SkipLink.astro` (skip to `#main-content`, z-index 200) + `Footer.astro` (copyright line) for site chrome. The writing detail page (`src/pages/writing/[...slug].astro`) is self-contained — it imports components directly rather than using a layout wrapper. Markdown content is rendered inside a `.prose` div with scoped `:global()` styles for all typography elements. The writing detail page also includes a related writings section (filtered by shared tags, limited to `RELATED_WRITINGS_LIMIT`) and a client-side script that uses `document.referrer` to update the `BackLink` based on the previous same-origin page: `/tag/[slug]` → "Back to #slug", `/tag/` → "Back to tags", `/search/` → "Back to search" (preserving `?q=` param), `BASE_URL` root → "Back to home"; default is "Back to writings". The tag detail page (`/tag/[tag]`) has a similar script: navigating from a writing updates the back link to "Back to writing"; from home updates it to "Back to home".

**Key integrations:**

- `@astrojs/mdx` — MDX support for writings
- `@astrojs/sitemap` — Auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`)
- `astro-expressive-code` — Code blocks with Catppuccin Frappé (dark) / Catppuccin Latte (light) themes, JetBrains Mono font, line numbers (`ec.config.mjs`). Uses `themeCssSelector` to map theme type to `[data-theme="dark"]`/`[data-theme="light"]`.
- `sharp` — SVG→PNG rasterisation for OG images (via librsvg/pango). Set `process.env.PANGOCAIRO_BACKEND = "fontconfig"` and `process.env.FONTCONFIG_PATH = resolve("src/assets/og")` at module top-level in `src/utils/og-image.ts` so pango uses the bundled fonts rather than CoreText on macOS. Font files live in `src/assets/og/fonts/`; `src/assets/og/fonts.conf` uses `prefix="cwd"` so paths resolve from the project root at build time.
- **Rehype plugins** (configured in `astro.config.mjs` `markdown.rehypePlugins`, order matters): `rehypeHeadingIds` (stamp heading IDs) → `@benjc/rehype-enhanced-tables` (wrap tables in `.table-scroll` div) → `rehype-external-links` (auto `target="_blank" rel="noopener noreferrer"`) → `rehype-unwrap-images` (strip `<p>` around standalone images) → `rehype-autolink-headings` (prepend `.heading-anchor` link to headings). Heading anchors use a Radix-style 15×15 SVG icon rendered at 20×20; clicking copies the URL to clipboard via `history.pushState` + `navigator.clipboard.writeText`.
- `pagefind` (devDep) + `@pagefind/default-ui` — Static full-text search. `pagefind` CLI runs after `astro build` to index `dist/`. Config in `pagefind.json` (`site: "dist"`, `root_selector: "main"`). Bundle lands in `dist/pagefind/` → served at `/kanso/pagefind/`. Non-writing pages (homepage, listing pages, search page itself) are excluded via `data-pagefind-ignore="all"` on `<main>`. Search page at `src/pages/search.astro` — syncs `?q=` URL param on load (`ui.triggerSearch`) and on input (`history.replaceState`). Dev workflow: `npm run dev:search` builds, copies index to `public/pagefind/` (gitignored), then starts dev server.

**CSS comments:** Style blocks use SMACSS-style section headers throughout. Format: `/* -------------------------\n * [Category] — [Name]\n * [Optional description]\n * ------------------------- */`. Categories: **Theme** (variables, color tokens), **Base** (element defaults), **Layout** (major structural containers), **Module** (components and sub-elements), **State** (interactive states, media queries, attribute-driven states). CSS declaration order is enforced by `prettier-plugin-css-order` (concentric-css) — do not manually reorder; run `npm run format` instead.

**Styling:** Global styles in `src/styles/global.css` (imported via `Head.astro`). Fonts: Lora (display/headings) and PT Serif (body) loaded globally via Google Fonts in `Head.astro`; JetBrains Mono (code) loaded only on the writing detail page. CSS variables on `:root` for colors (`--color-surface-*`), fonts (`--font-body`, `--font-display`), and semantic tokens (`--color-bg`, `--color-text`, `--color-border`, `--color-code-bg`, `--color-code-text`, `--color-mark-bg`, `--color-mark-text`). Accent color: `--color-accent: #c2410c` (orange-700) for light theme; `#d97706` (amber-500) for dark theme. Dark mode via `prefers-color-scheme` with `html[data-theme]` override. Theme variables are defined in four blocks: `:root`, `@media (prefers-color-scheme: dark)`, `html[data-theme="light"]`, `html[data-theme="dark"]`. Component-scoped styles use `<style>` tags in `.astro` files.

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

**Components:**

- `TagChip.astro` — pill-shaped tag link using `URLS.tag()`
- `Image.astro` — wraps Astro's `<Image>` with `<figure>`/optional `<figcaption>`, fills container width with `height: auto`
- `BackLink.astro` — back navigation link with arrow-left icon; accepts `href` (default: `URLS.writings`) and `label` (default: `"Back to writings"`) props
- `FormattedDate.astro` — renders a `<time>` element; accepts `date: Date` and optional `formatOptions: Intl.DateTimeFormatOptions` (default: `{ year: "numeric", month: "short", day: "numeric" }`)
- `WritingsByYear.astro` — reusable year-grouped writings list (two-column grid: sticky year label + writing entries with date and title); used on writings index, tag index, and tag detail pages
- `SkipLink.astro` — skip-to-content link targeting `#main-content`, visually hidden until focused, z-index 200

**Pages:**

- `src/pages/index.astro` — homepage with featured cards and latest writings list
- `src/pages/writing/index.astro` — all writings, year-grouped with date + title
- `src/pages/writing/[...slug].astro` — writing detail with prose styles, related writings, and referrer-aware back link
- `src/pages/tag/index.astro` — all tags as pill-shaped chips (`#name` + count badge), sorted by count desc then alphabetical; includes `WritingsByYear` section below
- `src/pages/tag/[tag].astro` — same layout as tag index (all tag chips + `WritingsByYear`), with the active tag chip highlighted via `aria-current="page"` (inverted colors, `order: -1` to appear first)
- `src/pages/search.astro` — search page using `PagefindUI`; `<main data-pagefind-ignore="all">` excludes it from the index; pagefind CSS variables overridden with site tokens on `#search`
- `src/pages/robots.txt.ts` — API route generating `robots.txt`; disallows `${base}search/` and `${base}pagefind/`; uses `FULL_URL.pathname` for the base path prefix
- `src/pages/rss.xml.ts` — RSS feed
- `src/pages/og/[slug].png.ts` — static API route; generates a 1200×630 PNG for every published writing at build time using `generateOgImage()` from `src/utils/og-image.ts`
- `src/pages/about.astro` — bio (name + paragraphs + social links), experience list (icon badge or company initial + company/role/period using `<time>`), projects list (bordered cards with title link, description, tech tags)

**Links:** The site uses `base: "/kanso"` in `astro.config.mjs`. Internal links must use `import.meta.env.BASE_URL` as prefix or use `URLS` constants.

**Site constants:** `src/constants.ts` exports:

- `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR` — site metadata
- `HOME_LATEST_WRITINGS_LIMIT`, `HOME_FEATURED_WRITINGS_LIMIT`, `RELATED_WRITINGS_LIMIT` — display limits
- `FULL_URL` — resolved site URL with base path
- `SOCIAL` — social link URLs (`github`, `linkedin`, `email`)
- `URLS` — route map (`home`, `writings`, `writing(slug)`, `tags`, `tag(slug)`, `search`, `about`), all prefixed with `BASE_URL`
- `TITLES` — static strings for fixed pages + `writing(title)` and `tag(tag)` functions
- `DESCRIPTIONS` — static strings for fixed pages + `writing(description)` and `tag(tag)` functions

**Type declarations:** `src/env.d.ts` holds the `/// <reference types="astro/client" />` triple-slash and any third-party module declarations that lack `@types` packages (e.g. `declare module "@pagefind/default-ui"`).

**Lighthouse:** `scripts/lighthouse.mjs` runs Lighthouse programmatically via `lighthouse` + `chrome-launcher` (both devDeps). Discovers Chrome automatically: `CHROME_PATH` env → Playwright cache (`~/Library/Caches/ms-playwright`) → system installs. Prints a color-coded score table (green ≥90, yellow ≥50, red <50) and failing audit details. Exits with code 1 if any score is below 90 — safe to use in CI. Pass `-- --build` to build before auditing.

**TypeScript:** Extends `astro/tsconfigs/strict` (provides `strict`, `noEmit`, `verbatimModuleSyntax`, etc.). Additional: `target: ES2023`, `lib: ["ES2023", "ES2023.Array", "DOM", "DOM.Iterable"]` (enables `toSorted`/`toReversed`/`toSpliced`), `noImplicitReturns`, path aliases (`@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/assets/*`, `@/constants`), and `@astrojs/ts-plugin`.
