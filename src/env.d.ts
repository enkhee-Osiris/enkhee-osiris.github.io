/// <reference types="astro/client" />

declare module "@pagefind/default-ui" {
  interface PagefindUIOptions {
    element: string;
    bundlePath?: string;
    showImages?: boolean;
    showSubResults?: boolean;
    excerptLength?: number;
    showEmptyFilters?: boolean;
  }
  export class PagefindUI {
    constructor(options: PagefindUIOptions);
    triggerSearch(query: string): void;
  }
}
