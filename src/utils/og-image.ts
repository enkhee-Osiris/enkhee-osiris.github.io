import { resolve } from "node:path";

import sharp from "sharp";

import templateSvg from "@/assets/og/template.svg?raw";
import { AUTHOR, FULL_URL } from "@/constants";

process.env.PANGOCAIRO_BACKEND = "fontconfig";
process.env.FONTCONFIG_PATH = resolve("src/assets/og");

interface OgImageData {
  title: string;
  pubDatetime: Date;
  tags: string[];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Breaks a title string into lines that fit within a character-count budget.
 *
 * Words are packed greedily: each word is appended to the current line until
 * adding the next word would exceed `charsPerLine`, at which point a new line
 * starts. Once `maxLines` lines are full, wrapping stops regardless of
 * remaining words.
 *
 * If the title was truncated (not all words fit), the last line is suffixed
 * with `…`. The ellipsis replaces the final character when the line is already
 * at the character limit, so the result never exceeds `charsPerLine`.
 *
 * @param title        - Raw title string (may contain multiple spaces).
 * @param charsPerLine - Maximum number of characters allowed per line.
 * @param maxLines     - Maximum number of lines to return.
 * @returns              An array of lines, length ≤ `maxLines`.
 */
function wrapTitle(title: string, charsPerLine: number, maxLines: number): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];

  let current = "";
  let overflow = false;

  for (const word of words) {
    if (overflow) break;

    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > charsPerLine && current) {
      lines.push(current);
      current = word;

      if (lines.length >= maxLines) {
        overflow = true;
        break;
      }
    } else {
      current = candidate;
    }
  }

  if (!overflow && current) {
    lines.push(current);
  }

  const totalWordsConsumed = lines.join(" ").split(/\s+/).length;

  if (totalWordsConsumed < words.length) {
    const lastLine = lines[lines.length - 1];

    if (lastLine) {
      lines[lines.length - 1] =
        lastLine.length <= charsPerLine - 1
          ? `${lastLine}\u2026`
          : `${lastLine.slice(0, charsPerLine - 1).trimEnd()}\u2026`;
    }
  }

  return lines;
}

function buildSvg(data: OgImageData): string {
  const { title, pubDatetime } = data;

  let fontSize: number;
  let charsPerLine: number;

  if (title.length <= 40) {
    fontSize = 68;
    charsPerLine = 24;
  } else if (title.length <= 70) {
    fontSize = 52;
    charsPerLine = 32;
  } else {
    fontSize = 40;
    charsPerLine = 40;
  }

  const lineHeight = fontSize * 1.25;
  const titleLines = wrapTitle(title, charsPerLine, 3);

  const formattedDate = pubDatetime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const titleSpans = titleLines
    .map((line, i) => `<tspan x="120" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  const contentSvg = `
    <text
      x="120"
      y="267"
      font-family="Lora"
      font-size="${fontSize}"
      font-weight="bold"
      fill="white"
    >${titleSpans}</text>
    <text
      x="783"
      y="526"
      font-family="Lora"
      font-size="28"
      font-weight="bold"
      fill="white"
    >${escapeXml(AUTHOR)}</text>
    <text
      x="120"
      y="560"
      font-family="PT Serif"
      font-size="17"
      fill="white"
      fill-opacity="0.6"
    >${escapeXml(formattedDate)}</text>
    <text
      x="783"
      y="560"
      font-family="PT Serif"
      font-size="17"
      fill="white"
      fill-opacity="0.6"
    >${escapeXml(FULL_URL.href)}</text>
  `;

  return templateSvg.replace('<g id="content"/>', `<g id="content">${contentSvg}</g>`);
}

export async function generateOgImage(data: OgImageData): Promise<Uint8Array<ArrayBuffer>> {
  const buf = await sharp(Buffer.from(buildSvg(data)))
    .png()
    .toBuffer();

  const out = new Uint8Array(buf.length);
  out.set(buf);

  return out;
}
