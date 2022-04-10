#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies, no-console */
const { existsSync, readdirSync, realpathSync } = require("fs");
const path = require("path");
const process = require("process");

const { cp, mkdir } = require("shelljs");

const { log } = require("./helper");

const APP_PATH = realpathSync(path.resolve(__dirname, ".."));

function getDirectories(inputPath) {
  return readdirSync(inputPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(inputPath, dirent.name));
}

const sitePaths = getDirectories(path.join("./", "sites"));

(async () => {
  log("Export Starting");

  // eslint-disable-next-line no-restricted-syntax
  for (const sitePath of sitePaths) {
    if (!existsSync(`${sitePath}/out`)) {
      log("Export Failed");
      process.exit(1);
    }

    const siteName = path.basename(sitePath);
    const siteDir = siteName === "personal" ? "" : `/${siteName}`;

    if (!existsSync(`${APP_PATH}/out${siteDir}`)) {
      mkdir("-p", `${APP_PATH}/out${siteDir}`);
    }

    log(`Exporting ${sitePath}/out => ${APP_PATH}/out${siteDir}`);
    cp("-Rf", [`${sitePath}/out/*`, `${sitePath}/out/.*`], `${APP_PATH}/out${siteDir}`);
  }
})();

["SIGINT", "SIGTERM"].forEach((sig) => {
  process.on(sig, () => {
    process.exit(1);
  });
});
