import type { CollectionEntry } from "astro:content";

// Types
type Writing = CollectionEntry<"writing">;
type Tag = Writing["data"]["tags"][number];

type Pages = "index" | "about" | "search" | "writing" | "writings" | "tags" | "tag";

type DynamicDataMap = {
  writing: (writing: Writing) => string;
  tag: (tag: Tag) => string;
};

type DynamicPages = keyof DynamicDataMap;

type OGImageTitleMap = {
  [K in Exclude<Pages, DynamicPages>]: string;
} & {
  [K in DynamicPages]: DynamicDataMap[K];
};

type OGImageLabelMap = {
  [K in Exclude<Pages, DynamicPages>]: string;
} & {
  [K in DynamicPages]: DynamicDataMap[K];
};

export interface Social {
  github: string;
  linkedin: string;
  email: string;
}

export interface Urls {
  home: string;
  writings: string;
  writing(slug: string): string;
  tags: string;
  tag(slug: string): string;
  search: string;
  about: string;
}

type TitleMap = {
  [K in Exclude<Pages, "writing" | "tag">]: string;
} & {
  writing: (writing: Writing) => string;
  tag: (tag: Tag) => string;
};

type DescriptionMap = {
  [K in Exclude<Pages, "writing" | "tag">]: string;
} & {
  writing: (writing: Writing) => string;
  tag: (tag: Tag) => string;
};

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string | null;
  description: string;
  icon?: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

const BASE = import.meta.env.BASE_URL;
const SITE = import.meta.env.SITE;

export const FULL_URL = new URL(BASE, SITE);

export const GA_ID = "G-8EMCLEMQCQ";

export const SITE_TITLE = "Enkherdene Bolormaa";
export const SITE_DESCRIPTION =
  "Enkherdene Bolormaa is a software engineer living in Ulaanbaatar Mongolia, currently focusing on designing things.";
export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const RELATED_WRITINGS_LIMIT = 5;
export const AUTHOR = "Enkherdene Bolormaa";

export const OG_IMAGE_TITLE: OGImageTitleMap = {
  index: `${AUTHOR} is a software engineer living in Ulaanbaatar Mongolia`,
  about: `Learn more about ${AUTHOR}`,
  search: "Search through all writings by title, description, or content",
  writings: `A collection of writings on design, engineering, and code by ${AUTHOR}`,
  writing(writing) {
    return writing.data.title;
  },
  tags: "Explore all tags used across writings",
  tag(tag) {
    return `All writings tagged with ${tag}`;
  },
};

export const OG_IMAGE_LABEL: OGImageLabelMap = {
  index: "/",
  about: "/about/",
  search: "/search/",
  writings: "/writing/",
  writing(writing) {
    const formattedDate = writing.data.pubDatetime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  },
  tags: "/tag/",
  tag(tag) {
    return `/tag/${tag}/`;
  },
};

export const SOCIAL: Social = {
  github: "https://github.com/enkhee-Osiris",
  linkedin: "https://www.linkedin.com/in/enkherdene-bolormaa",
  email: "mailto:enkhee.ag@gmail.com",
};

export const URLS: Urls = {
  home: `/`,
  writings: `/writing`,
  writing(slug: string) {
    return `/writing/${slug}`;
  },
  tags: `/tag`,
  tag(slug: string) {
    return `/tag/${slug}`;
  },
  search: `/search`,
  about: `/about`,
};

export const TITLES: TitleMap = {
  index: SITE_TITLE,
  about: `About ${AUTHOR}`,
  search: "Search",
  writings: "Writings",
  writing(writing) {
    return writing.data.title;
  },
  tags: "Tags",
  tag(tag) {
    return `Writings tagged with ${tag}`;
  },
};

export const DESCRIPTIONS: DescriptionMap = {
  index: SITE_DESCRIPTION,
  about: `Learn more about ${AUTHOR}, their background, interests, and what drives their work.`,
  search:
    "Search through all writings by title, description, or content. Find specific topics, techniques, or ideas.",
  writings: `A collection of writings on design, engineering, and code by ${AUTHOR}. Exploring ideas around minimal interfaces, thoughtful typography, and building for the web.`,
  writing(writing) {
    return writing.data.description;
  },
  tags: "Explore all tags used across writings. Each tag groups related pieces on design, engineering, CSS, and more.",
  tag(tag) {
    return `All writings tagged with "${tag}". Browse related thoughts and ideas on this topic.`;
  },
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    start: "2022",
    end: null,
    description:
      "Leading frontend architecture and design system development. Building tools that bridge design and engineering.",
  },
  {
    company: "Design Studio",
    role: "Software Engineer",
    start: "2019",
    end: "2022",
    description:
      "Developed interactive web experiences and component libraries for clients in fintech and media.",
  },
  {
    company: "Startup Inc",
    role: "Junior Developer",
    start: "2017",
    end: "2019",
    description:
      "Built and maintained React applications. Contributed to product design and accessibility improvements.",
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Kanso",
    description:
      "A minimal writing theme for Astro. Focused on typography, clean reading experience, and accessibility.",
    url: "https://github.com/enkhee-Osiris/kanso",
    tags: ["Astro", "TypeScript", "CSS"],
  },
  {
    name: "Project Two",
    description:
      "An open-source component library with accessible, theme-aware UI primitives for React.",
    url: "https://github.com/enkhee-Osiris",
    tags: ["React", "TypeScript"],
  },
];
