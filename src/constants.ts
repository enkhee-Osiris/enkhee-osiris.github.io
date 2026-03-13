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
  resume: string;
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
  resume: "https://enkhee-osiris.github.io/resume/enkherdene_bolormaa.pdf",
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
      "Built multiple web and mobile applications, including financial systems, ordering platforms, and internal tools. Developed several admin dashboards for managing transactions, part-time employees, and operations. Also created an internal framework to standardize and speed up admin panel development.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" fill="none" viewBox="0 0 450 450"><path fill="#000" d="M0 0h450v450H0z"/><path fill="#fc3820" d="M79 115h282.203c7.055 0 10.551 8.565 5.509 13.502L334.546 160H79zM79 202.75h122.51c7.048 0 10.547 8.548 5.522 13.49l-32.044 31.51H79zM371.5 247.75H248.99c-7.048 0-10.547-8.548-5.522-13.49l32.044-31.51H371.5zM371.5 335.5H89.297c-7.055 0-10.55-8.565-5.51-13.502l32.167-31.498H371.5z"/></svg>`,
  },
  {
    company: "Xyyp Music Group",
    role: "Senior Front-end Engineer",
    start: "Aug 2021",
    end: "Mar 2022",
    description:
      "Developed web and mobile applications using React Native and Next.js. Built projects with modern tools including Tailwind CSS, Material UI, and GraphQL, and wrote unit and integration tests using Jest.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 450 450"><path fill="url(#paint0_linear_248_76)" d="M0 0h450v450H0z"/><path fill="#fff" fill-rule="evenodd" d="M225 65c88.366 0 160 71.634 160 160s-71.634 160-160 160S65 313.366 65 225 136.634 65 225 65m.711 39.822c-65.98 0-119.467 53.487-119.467 119.467s53.487 119.467 119.467 119.467 119.467-53.487 119.467-119.467q0-.642-.009-1.283c-.612-50.476-37.398-83.4-88.169-84.05-44.373-.569-72.059 29.155-80.356 44.088 37.689 0 16.356 88.178 60.445 88.178 9.103 0 18.489-7.822 18.489-18.489 0-10.666-8.534-13.511-8.534-19.911s9.956-10.666 9.956-25.6c0-14.933-9.956-22.044-9.956-22.044 51.2 0 51.2 51.911 51.2 51.911 0 66.125-72.534 66.125-72.534 66.125-79.547-1.421-79.645-78.736-79.645-78.933 0-84.868 73.264-116.586 138.692-100.705 1.583.385 2.534-1.693 1.128-2.515-17.671-10.323-38.232-16.239-60.174-16.239" clip-rule="evenodd"/><defs><linearGradient id="paint0_linear_248_76" x1="225" x2="225" y1="0" y2="450" gradientUnits="userSpaceOnUse"><stop stop-color="#f02992"/><stop offset=".5" stop-color="#f02960"/><stop offset="1" stop-color="#ef292e"/></linearGradient></defs></svg>`,
  },
  {
    company: "ANDSystems",
    role: "Front-end Developer",
    start: "Oct 2018",
    end: "Jul 2021",
    description:
      "Developed multiple mobile and web applications using React Native, React, and Next.js. Built internal tools including a Node.js PDF table scraper CLI and several Slack bots, while helping improve code quality standards and development practices.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" fill="none" viewBox="0 0 450 450"><path fill="#000" d="M0 0h450v450H0z"/><path fill="#fff" d="M138.5 169.5 83 225l55.492 55.485 27.494-27.494L138.5 225.5l28-28zM311 169l55.5 55.5-55.492 55.485-27.494-27.494L311 225l-28-28zM169.5 197.5l28-28L280 252l-28 28z"/></svg>`,
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" fill="none" viewBox="0 0 450 450"><path fill="#fff" d="M0 0h450v450H0z"/><path fill="#000" d="M113.3 243.929H70.992v-17.07h35.237v-5.572H70.992v-16.212h41.585v-5.571H65v49.994h48.3zM245.938 199.507l-20.831 27.068-20.971-27.068h-7.205l25.11 32.497V249.5h5.992v-17.496l25.036-32.497zM359.756 245.43a36.05 36.05 0 0 1-25.323-9.212l-4.209 4.498a43.88 43.88 0 0 0 29.176 10.283c16.262 0 25.6-6.783 25.6-15.999 0-9.855-10.557-12.782-25.75-13.996-11.77-.916-21.187-2.212-21.187-8.428 0-6.57 10.414-9.072 19.331-8.999a29.2 29.2 0 0 1 20.544 7.357l4.709-4a38.34 38.34 0 0 0-25.542-8.922c-13.34 0-25.18 5.355-25.18 14.78 0 9.856 12.769 12.786 26.109 13.927 13.48 1.141 20.828 2.642 20.828 8.712.012 6.215-7.052 9.999-19.106 9.999"/></svg>`,
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
