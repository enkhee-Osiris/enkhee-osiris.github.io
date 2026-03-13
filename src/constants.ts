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

export interface Titles {
  home: string;
  writings: string;
  writing(title: string): string;
  tags: string;
  tag(tag: string): string;
  search: string;
  about: string;
}

export interface Descriptions {
  home: string;
  writings: string;
  writing(description: string): string;
  tags: string;
  tag(tag: string): string;
  search: string;
  about: string;
}

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

const hasTrailingSlash = BASE.endsWith("/");

const CLEAN_BASE = hasTrailingSlash ? BASE.slice(0, -1) : BASE;
const URL_ENDING = hasTrailingSlash ? "/" : "";

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
  home: `${CLEAN_BASE}/`,
  writings: `${CLEAN_BASE}/writing${URL_ENDING}`,
  writing(slug: string) {
    return `${CLEAN_BASE}/writing/${slug}${URL_ENDING}`;
  },
  tags: `${CLEAN_BASE}/tag${URL_ENDING}`,
  tag(slug: string) {
    return `${CLEAN_BASE}/tag/${slug}${URL_ENDING}`;
  },
  search: `${CLEAN_BASE}/search${URL_ENDING}`,
  about: `${CLEAN_BASE}/about${URL_ENDING}`,
};

export const TITLES: Titles = {
  home: SITE_TITLE,
  writings: "Writings",
  writing(title: string) {
    return title;
  },
  tags: "Tags",
  tag(tag: string) {
    return `Writings tagged with ${tag}`;
  },
  search: "Search",
  about: `About ${AUTHOR}`,
};

export const DESCRIPTIONS: Descriptions = {
  home: SITE_DESCRIPTION,
  writings: `A collection of writings on design, engineering, and code by ${AUTHOR}. Exploring ideas around minimal interfaces, thoughtful typography, and building for the web.`,
  writing(description: string) {
    return description;
  },
  tags: "Explore all tags used across writings. Each tag groups related pieces on design, engineering, CSS, and more.",
  tag(tag: string) {
    return `All writings tagged with "${tag}". Browse related thoughts and ideas on this topic.`;
  },
  search:
    "Search through all writings by title, description, or content. Find specific topics, techniques, or ideas.",
  about: `Learn more about ${AUTHOR}, their background, interests, and what drives their work.`,
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
