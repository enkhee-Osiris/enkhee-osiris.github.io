import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const OLD_POSTS_DIR = "/Users/osiris/Work/old_posts";
const NEW_POSTS_DIR = "./src/content/writing";

// Get all markdown files from old posts directory
const files = readdirSync(OLD_POSTS_DIR).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = join(OLD_POSTS_DIR, file);
  const content = readFileSync(filePath, "utf-8");

  // Extract date from filename (YYYY-MM-DD-title.md)
  const dateMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!dateMatch) {
    console.log(`Skipping ${file} - no date found in filename`);
    continue;
  }

  const [, year, month, day, slug] = dateMatch;
  const pubDatetime = `${year}-${month}-${day}T00:00:00.000Z`;

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  if (!frontmatterMatch) {
    console.log(`Skipping ${file} - no frontmatter found`);
    continue;
  }

  const frontmatterText = frontmatterMatch[1];
  const bodyContent = content.slice(frontmatterMatch[0].length).trim();

  // Parse old frontmatter
  const oldFrontmatter = {};
  frontmatterText.split("\n").forEach(line => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Handle array values like tags: [github, hello-world]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map(v => v.trim().replace(/^"(.*)"$/, "$1"));
    }
    oldFrontmatter[key] = value;
  });

  // Extract tags and validate format (lowercase letters and hyphens only)
  const tags = Array.isArray(oldFrontmatter.tags)
    ? oldFrontmatter.tags.map(tag => tag.toLowerCase().replace(/[^a-z-]/g, "-"))
    : ["others"];

  // Generate title from slug (replace hyphens with spaces)
  const title = slug.replace(/-/g, " ");

  // Generate description from first paragraph or use default
  const firstParagraphMatch = bodyContent.match(/^(.+)$/m);
  const description = firstParagraphMatch
    ? firstParagraphMatch[1]
        .replace(/\*\*/g, "")
        .replace(/\[.+\]\(.+\)/g, "")
        .trim()
        .slice(0, 160)
    : `A post about ${title}`;

  // Build new Astro frontmatter
  const newFrontmatter = `---
title: "${title}"
description: "${description}"
pubDatetime: ${pubDatetime}
tags: [${tags.map(t => `"${t}"`).join(", ")}]
draft: false
---

`;

  const newContent = newFrontmatter + bodyContent;

  // Write to new location
  const newFilePath = join(NEW_POSTS_DIR, `${slug}.md`);
  writeFileSync(newFilePath, newContent, "utf-8");
  console.log(`Converted: ${file} -> ${slug}.md`);
}

console.log("\nConversion complete!");
