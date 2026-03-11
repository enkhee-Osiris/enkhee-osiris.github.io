---
title: "CSS Custom Properties as Design Tokens"
description: "How to structure CSS variables into a three-tier token system that scales from primitives to components — and survives dark mode."
pubDatetime: 2026-01-28T00:00:00.000Z
tags: ["guide", "css", "design-systems"]
---

CSS custom properties are frequently used as simple replacements for hardcoded values — swap `#1a1a1a` for `--color-text` and call it a day. That works, but it misses what makes custom properties genuinely powerful: they cascade, inherit, and update at runtime. Used deliberately, they become a design token system that lives entirely in the browser.

## How They Differ from Preprocessor Variables

Sass variables compile away. After the build step, `$primary` is gone — it's been inlined everywhere it was used. Change the value and rebuild; nothing updates at runtime.

CSS custom properties persist. `--color-primary` exists in the browser as a live value. You can:

- Read and write it with JavaScript (`element.style.setProperty`)
- Override it in a media query without duplicating declarations
- Scope it to a subtree so a component can have its own value
- Inspect it in DevTools like any other property

This runtime behavior is what makes custom properties suitable for theming, component variants, and responsive design in ways preprocessor variables aren't.

## A Three-Tier Token Structure

A flat list of custom properties doesn't scale. A well-organised system uses three tiers:

**Primitives** — the raw values. Every color, spacing step, and font size your palette contains. Named for what they are, not what they do.

**Semantic tokens** — purpose-mapped aliases into the primitives. Named for intent: background, text, border. These are what components reference.

**Component tokens** — optional local overrides scoped to a component. Named for the component, not the system.

```css
/* ---- Primitives ---- */
:root {
  --color-gray-100: #f5f5f4;
  --color-gray-500: #737373;
  --color-gray-900: #1a1a1a;
  --color-amber-500: #f59e0b;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
}

/* ---- Semantic tokens ---- */
:root {
  --color-bg: var(--color-gray-100);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-500);
  --color-accent: var(--color-amber-500);
  --color-border: color-mix(in srgb, var(--color-gray-900) 15%, transparent);
}
```

Components reference semantic tokens. Primitives never appear in component CSS. This means a component is never coupled to a specific color value — only to a role.

## Dark Mode Without Duplication

The semantic layer is where theming happens. Dark mode doesn't redefine primitives — it reassigns semantic tokens to different primitives. Components don't change at all.

```css
/* System preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-gray-900);
    --color-text: var(--color-gray-100);
    --color-text-muted: var(--color-gray-500);
    --color-border: color-mix(in srgb, var(--color-gray-100) 15%, transparent);
  }
}

/* Manual override via data attribute */
html[data-theme="dark"] {
  --color-bg: var(--color-gray-900);
  --color-text: var(--color-gray-100);
  --color-text-muted: var(--color-gray-500);
  --color-border: color-mix(in srgb, var(--color-gray-100) 15%, transparent);
}

html[data-theme="light"] {
  --color-bg: var(--color-gray-100);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-500);
  --color-border: color-mix(in srgb, var(--color-gray-900) 15%, transparent);
}
```

The duplication between the media query and the `[data-theme]` selectors is intentional. The media query handles the automatic default. The data attribute handles explicit user overrides. Together they cover all four combinations: light/dark preference × light/dark override.

## Cascading and Component Scoping

Custom properties follow the cascade. A value set on an element is available to all its descendants. This makes component-level overrides trivial:

```css
/* Default padding from a system variable */
.card {
  --_padding: var(--space-6);
  padding: var(--_padding);
}

/* Compact variant overrides locally */
.card--compact {
  --_padding: var(--space-2);
}
```

The `--_` prefix is a convention for private component tokens — tokens that are only meaningful within this component. It signals to readers that the variable isn't part of the public API.

This pattern works because the cascade finds the nearest ancestor definition. A child element reading `--_padding` gets the value from the closest ancestor that set it.

## Responsive Tokens

Custom properties in media queries don't re-declare the property on every element — they update the token once and every consumer picks up the change:

```css
:root {
  --container-padding: var(--space-4);
  --font-size-body: 1rem;
}

@media (min-width: 64rem) {
  :root {
    --container-padding: var(--space-6);
    --font-size-body: 1.0625rem;
  }
}
```

One override at `:root`, everything that references these tokens updates automatically. No selector repetition, no specificity juggling.

## JavaScript Integration

Because custom properties are live CSS values, JavaScript can read and write them directly:

```js
// Read
const value = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();

// Write
document.documentElement.style.setProperty("--color-accent", "#ef4444");
```

This is how theme toggles work cleanly: set `data-theme` on `<html>` or directly update the token. Either way, every component that references `--color-accent` repaints without touching their CSS.

## What to Token and What Not To

Not everything benefits from tokenisation. Tokens earn their value when the same decision appears in multiple places — colors, spacing scale, border radius, typography sizes.

One-off values don't need tokens. A `margin-block-start: -3px` hack to align a specific element belongs inline, not in a system. Premature abstraction in a token system is as costly as it is anywhere else.

Start with: color palette, semantic color roles, spacing scale, font family, font size scale. Add tokens when you notice yourself repeating a value in a context where changing it should update everywhere.
