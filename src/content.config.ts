import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { AUTHOR } from "./constants";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    author: z.string().default(AUTHOR),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z
      .array(z.string().regex(/^[a-z-]+$/, "Tag must contain only lowercase letters and hyphens"))
      .default(["others"]),
    description: z.string(),
  }),
});

export const collections = { writing };
