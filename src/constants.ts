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

export const SITE_TITLE = "Enkh-Erdene Bolormaa";
export const SITE_DESCRIPTION =
  "Enkh-Erdene is a software engineer born and raised in Ulaanbaatar, Mongolia. Enjoys exploring modern technologies, continuously learning new things, and building applications that solve real problems";

export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const RELATED_WRITINGS_LIMIT = 5;
export const AUTHOR = "Enkh-Erdene Bolormaa";

export const OG_IMAGE_TITLE: OGImageTitleMap = {
  index: `${AUTHOR} is a software engineer living in Ulaanbaatar, Mongolia`,
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
  writings: `/writing/`,
  writing(slug: string) {
    return `/writing/${slug}/`;
  },
  tags: `/tag/`,
  tag(slug: string) {
    return `/tag/${slug}/`;
  },
  search: `/search/`,
  about: `/about/`,
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
    company: "Zero Technology LLC",
    role: "Senior Software Engineer",
    start: "Feb 2023",
    end: "Feb 2025",
    description:
      "Built multiple web and mobile applications, including financial systems, ordering platforms, and internal tools. Developed several admin dashboards for managing transactions, employees, salaries, and operations. Also created an internal framework to standardize and speed up admin panel development.",
  },
  {
    company: "Xyyp Music Group",
    role: "Senior Front-end Engineer",
    start: "Aug 2021",
    end: "Mar 2022",
    description:
      "Developed web and mobile applications using React Native and Next.js. Built projects with modern tools including Tailwind CSS, Material UI, and GraphQL, and wrote unit and integration tests using Jest.",
  },
  {
    company: "ANDSystems",
    role: "Front-end Developer",
    start: "Oct 2018",
    end: "Jul 2021",
    description:
      "Developed multiple mobile and web applications using React Native, React, and Next.js. Built internal tools including a Node.js PDF table scraper CLI and several Slack bots, while helping improve code quality standards and development practices.",
  },
  {
    company: "Nomadays",
    role: "Front-end Developer",
    start: "Jul 2018",
    end: "Oct 2018",
    description: "Migrated an Angular app to React.",
  },
  {
    company: "EYS-Style",
    role: "Front-end Developer",
    start: "Jan 2017",
    end: "Jul 2018",
    description:
      "Worked on web development using Ruby on Rails, built a custom Slack bot, and improved development workflows with Google Apps Script.",
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
    name: "IPTV",
    description:
      "IPTV stream list and EPG generator for Mongolian TV channels. Automatically updates daily with ready-to-use M3U and XMLTV files.",
    url: "https://github.com/enkhee-Osiris/iptv",
    tags: ["TypeScript"],
  },
];
