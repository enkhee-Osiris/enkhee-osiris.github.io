---
title: "Working with Astro's Content Layer"
description: "How Astro's content collections turn a folder of Markdown files into a type-safe, queryable data layer — with no database required."
pubDatetime: 2026-01-10T00:00:00.000Z
tags: ["guide", "astro", "engineering"]
---

Astro's content layer is one of those features that feels obvious in hindsight. Define a schema, write Markdown files, get type-safe data in your templates. No database, no CMS API, no separate build step.

## Defining a Collection

Collections are configured in `src/content.config.ts`. You define a loader — which tells Astro where to find the files — and a schema that validates frontmatter fields.

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.date(),
    author: z.string().default("Your Name"),
    tags: z.array(z.string()).default(["others"]),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { writing };
```

The schema does more than validate — it becomes the source of truth for every query. Add a field and your IDE autocompletes it everywhere. Make a field required and Astro reports which files are missing it at build time, not at runtime.

## Querying Entries

`getCollection()` returns a typed array of every entry in the collection. From there, filter and sort with plain TypeScript — no query language required.

```ts
import { getCollection } from "astro:content";

// All published writings, sorted by date descending
const writings = await getCollection("writing", w => !w.data.draft);
const sorted = writings.toSorted(
  (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
);
```

Because the schema defines `pubDatetime` as `z.date()`, TypeScript knows it's a `Date` object. No casting, no runtime surprises. Your IDE autocompletes `w.data.title`, `w.data.tags`, and every other field you defined.

Wrap your common queries in utility functions rather than repeating them across pages:

```ts
export async function getPublishedWritings() {
  return getCollection("writing", w => !w.data.draft);
}

export function getSortedWritings(writings: CollectionEntry<"writing">[]) {
  return writings.toSorted((a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime());
}
```

## Rendering Content

To render Markdown as HTML, call `render()` on a collection entry. This returns a `Content` component you drop directly into your template.

```ts
import { render } from "astro:content";

const { Content } = await render(entry);
```

```astro
<div class="prose">
  <Content />
</div>
```

The `Content` component renders the full Markdown body including any MDX components. Scoped styles won't reach into it by default — use `:global()` selectors inside your `<style>` block to style prose elements.

## Static Page Generation

Each collection entry maps to a page via `getStaticPaths()`. The entry `id` comes from the filename and acts as the URL slug.

```ts
export async function getStaticPaths() {
  const writings = await getPublishedWritings();

  return writings.map(writing => ({
    params: { slug: writing.id },
    props: writing,
  }));
}

type Props = CollectionEntry<"writing">;

const writing = Astro.props;
const { Content } = await render(writing);
```

At build time, Astro calls `getStaticPaths()` once, generates a page for every entry, and produces static HTML. No server, no runtime queries, no loading states.

## Tag and Category Pages

The same data that drives individual pages also drives listing pages. To generate a page for every tag, collect all unique tags across all entries:

```ts
export async function getStaticPaths() {
  const writings = await getPublishedWritings();
  const tags = [...new Set(writings.flatMap(w => w.data.tags))];

  return tags.map(tag => ({
    params: { tag },
    props: { writings: writings.filter(w => w.data.tags.includes(tag)) },
  }));
}
```

One `getCollection()` call. No joins, no foreign keys. The relationships between entries live in the data itself.

## Why the File System Wins

A CMS gives you a content editing UI. It also gives you an API to authenticate against, a dashboard to maintain, a deployment to manage, and a vendor to depend on.

For a site where you're the only author, the file system is a better CMS. Your editor is already open. Your files are already version-controlled. Content changes appear in pull requests alongside the code that renders them.

The content layer doesn't replace that — it enhances it. The schema enforces consistency without adding ceremony. The query API is just TypeScript. And because everything resolves at build time, the output is static HTML with no runtime cost.
