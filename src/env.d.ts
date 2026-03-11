/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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

interface Window {
  dataLayer: Record<string, any>[];
  gtag: (...args: any[]) => void;
}
