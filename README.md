# Personal Website

A minimal, content-focused personal website built with [Astro 6](https://astro.build), based on the [Kanso](https://github.com/enkhee-Osiris/kanso) theme.

## Features

- 📝 Content collections for writings with MDX support
- 🔍 Full-text search via Pagefind
- 🌙 Dark mode support with system preference detection
- ♿ Accessibility-first design (WCAG 2.2 compliant)
- 📊 GDPR-compliant analytics with Google Analytics 4
- 🎨 Clean, minimal aesthetic with custom typography
- 📱 Responsive design
- 🗺️ Auto-generated sitemap and RSS feed

## Tech Stack

- [Astro 6](https://astro.build) — Static site generator
- [MDX](https://mdxjs.com) — Content authoring
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Pagefind](https://pagefind.app) — Full-text search
- [Sharp](https://sharp.pixelplumbing.com) — Image optimization & OG image generation
- [vanilla-cookieconsent](https://github.com/orestbida/cookie-consent-library) — GDPR compliance

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (search not available in dev)
npm run dev

# Start dev server with search functionality
npm run dev:search

# Build for production
npm run build

# Preview production build
npm run preview
```

## Commands

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start dev server at `localhost:4321` |
| `npm run dev:search` | Build + start dev with search        |
| `npm run build`      | Production build to `./dist/`        |
| `npm run preview`    | Preview production build             |
| `npm run clean`      | Remove build artifacts               |
| `npm run generate`   | Generate content collection types    |
| `npm run format`     | Format with Prettier                 |
| `npm run lint`       | Run ESLint                           |
| `npm run lighthouse` | Run Lighthouse audit                 |

## Deployment

Deployed to GitHub Pages via GitHub Actions. The workflow triggers on push to `master` for source code, static assets, and build configuration.

Manual deployments can be triggered via the `workflow_dispatch` event in GitHub Actions.

## License

MIT
