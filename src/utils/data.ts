import { getCollection, type CollectionEntry } from "astro:content";

type Writing = CollectionEntry<"writing">;

export function getPublishedWritings() {
  return getCollection("writing", (w: Writing) => !w.data.draft);
}

function byDateDesc(a: Writing, b: Writing) {
  return b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf();
}

export function getSortedWritings(writings: Writing[]) {
  return writings.toSorted(byDateDesc);
}

export function getFeaturedWritings(writings: Writing[], limit?: number) {
  const filtered = writings.filter(b => b.data.featured).toSorted(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getNonFeaturedWritings(writings: Writing[], limit?: number) {
  const filtered = writings.filter(b => !b.data.featured).toSorted(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getRelatedWritings(current: Writing, writings: Writing[], limit = 5) {
  const currentTags = new Set(current.data.tags);

  return writings
    .filter(w => w.id !== current.id)
    .map(w => ({
      writing: w,
      shared: w.data.tags.filter(t => currentTags.has(t)).length,
    }))
    .filter(w => w.shared > 0)
    .toSorted((a, b) => b.shared - a.shared || byDateDesc(a.writing, b.writing))
    .slice(0, limit)
    .map(w => w.writing);
}

export function getTagsWithWritings(writings: Writing[]) {
  const tagMap = new Map<string, Writing[]>();

  for (const writing of writings) {
    if (writing.data.tags === undefined || writing.data.tags.length === 0) continue;

    for (const tag of writing.data.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tagMap.get(tag)!.push(writing);
    }
  }

  return Array.from(tagMap, ([tag, writings]) => ({ tag, writings })).toSorted(
    (a, b) => b.writings.length - a.writings.length || a.tag.localeCompare(b.tag)
  );
}

export function getWritingsByYear(writings: Writing[]) {
  const yearMap = new Map<number, Writing[]>();

  for (const writing of writings) {
    const year = writing.data.pubDatetime.getFullYear();
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yearMap.get(year)!.push(writing);
  }

  return Array.from(yearMap, ([year, writings]) => ({
    year,
    writings: getSortedWritings(writings),
  })).toSorted((a, b) => b.year - a.year);
}
