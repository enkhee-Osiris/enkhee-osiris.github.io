import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const CONTENT_DIR = "./src/content/writing";

// Find all gist references in markdown files
function findGists(content) {
  // Match {% gist id %} or {% gist user/id %}
  const gistRegex = /{%\s*gist\s+([a-f0-9]+)(?:\/[a-f0-9]+)?\s*%}/g;
  const matches = [];
  let match;
  while ((match = gistRegex.exec(content)) !== null) {
    matches.push({ full: match[0], id: match[1] });
  }
  return matches;
}

// Fetch gist content via GitHub API
async function fetchGist(gistId) {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    const gist = await response.json();

    // Get the first file from the gist
    const files = Object.values(gist.files);
    if (files.length === 0) {
      throw new Error("Gist has no files");
    }

    const file = files[0];
    const content = file.content;
    const filename = file.filename;
    const extension = filename.split(".").pop();

    // Map common extensions to language names
    const languageMap = {
      py: "python",
      js: "javascript",
      ts: "typescript",
      rb: "ruby",
      php: "php",
      sh: "bash",
      c: "c",
      cpp: "cpp",
      h: "c",
      java: "java",
      go: "go",
      rs: "rust",
      sql: "sql",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      xml: "xml",
      yaml: "yaml",
      yml: "yaml",
    };

    const language = languageMap[extension] || extension;

    return { content, language, filename };
  } catch (error) {
    console.error(`Error fetching gist ${gistId}:`, error.message);
    return null;
  }
}

// Process all markdown files
const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));

let totalReplaced = 0;

for (const file of files) {
  const filePath = join(CONTENT_DIR, file);
  const content = readFileSync(filePath, "utf-8");
  const gists = findGists(content);

  if (gists.length === 0) continue;

  console.log(`\nProcessing ${file}:`);
  let updatedContent = content;

  for (const gist of gists) {
    console.log(`  Found gist: ${gist.id}`);

    const gistData = await fetchGist(gist.id);
    if (!gistData) {
      console.log(`  ⚠️  Could not fetch gist ${gist.id} - skipping`);
      continue;
    }

    // Create markdown code block
    const codeBlock = `\`\`\`${gistData.language} filename="${gistData.filename}"
${gistData.content}
\`\`\``;

    // Replace the gist tag with code block
    updatedContent = updatedContent.replace(gist.full, codeBlock);

    console.log(`  ✅ Replaced with ${gistData.language} code block (${gistData.filename})`);
    totalReplaced++;
  }

  // Write updated content
  if (updatedContent !== content) {
    writeFileSync(filePath, updatedContent, "utf-8");
  }
}

console.log(`\n✨ Done! Replaced ${totalReplaced} gist(s) with markdown code blocks.`);
