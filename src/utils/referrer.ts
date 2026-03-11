export interface BackLinkState {
  href: string;
  label: string;
}

/**
 * Extracts back link information from a referrer URL.
 * Returns null if the referrer is not from the same origin.
 */
export function getBackLinkFromReferrer(
  referrer: string,
  currentOrigin: string,
  baseUrl: string
): BackLinkState | null {
  try {
    const ref = new URL(referrer);
    if (ref.origin !== currentOrigin) return null;

    const tagMatch = ref.pathname.match(/\/tag\/([^/]+)\/?$/);
    const writingMatch = ref.pathname.match(/\/writing\/([^/]+)\/?$/);
    const isTagsPage = /\/tag\/?$/.test(ref.pathname);
    const isSearchPage = /\/search\/?$/.test(ref.pathname);
    const isHomePage = ref.pathname === baseUrl || ref.pathname === baseUrl.replace(/\/$/, "");

    if (tagMatch) {
      return { href: ref.pathname, label: `Back to #${tagMatch[1]}` };
    }
    if (writingMatch) {
      return { href: ref.pathname, label: "Back to writing" };
    }
    if (isTagsPage) {
      return { href: ref.pathname, label: "Back to tags" };
    }
    if (isSearchPage) {
      return { href: ref.pathname + ref.search, label: "Back to search" };
    }
    if (isHomePage) {
      return { href: ref.pathname, label: "Back to home" };
    }

    return null;
  } catch {
    return null;
  }
}
