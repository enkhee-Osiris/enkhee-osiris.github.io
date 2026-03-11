import { renameSync } from "fs";
import { join } from "path";

const CONTENT_DIR = "./src/content/writing";

// Mapping of old filenames to new English filenames (keeping Mongolian titles in frontmatter)
const fileMappings = {
  "Блог-нээгдлээ.md": "blog-launched.md",
  "Блог-шинэчлэл.md": "blog-update.md",
  "Sound-30-оноо.md": "sound-30-points.md",
  "Байгуулалт-40-оноо.md": "structure-40-points.md",
  "Толгой-40-оноо.md": "header-40-points.md",
  "Миний-линукс-window-manager.md": "my-linux-window-manager.md",
  "BTTF-40-оноо.md": "bttf-40-points.md",
  "Certificate-20-оноо.md": "certificate-20-points.md",
  "cat-flag-30-оноо.md": "cat-flag-30-points.md",
  "Crypto-сонихдог-уу.md": "crypto-interested.md",
  "Find-Summation-20-оноо.md": "find-summation-20-points.md",
  "Hexor-40-оноо.md": "hexor-40-points.md",
  "JD-20-оноо.md": "jd-20-points.md",
  "Mr.-Robot-20-оноо.md": "mr-robot-20-points.md",
  "Morse-30-оноо.md": "morse-30-points.md",
  "Plainscript-20-оноо.md": "plainscript-20-points.md",
  "Prime-Number-40-оноо.md": "prime-number-40-points.md",
  "RIddle-Transfer-30-оноо.md": "riddle-transfer-30-points.md",
  "U18-2017-эхний-шатны-даалгаврууд.md": "u18-2017-first-round.md",
  "U18-2018-эхний-шатны-даалгаврууд.md": "u18-2018-first-round.md",
  "2017-оны-анхний-нийтлэл.md": "first-post-of-2017.md",
};

for (const [oldName, newName] of Object.entries(fileMappings)) {
  const oldPath = join(CONTENT_DIR, oldName);
  const newPath = join(CONTENT_DIR, newName);

  try {
    // Simply rename the file - keep Mongolian title in frontmatter
    renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } catch (error) {
    console.error(`Error processing ${oldName}:`, error.message);
  }
}

console.log("\nRename complete! Mongolian titles preserved in frontmatter.");
