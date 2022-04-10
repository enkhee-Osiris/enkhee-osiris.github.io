#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies, no-console */
const { execSync } = require("child_process");
const { realpathSync, existsSync } = require("fs");
const path = require("path");
const process = require("process");

const { cp, mkdir, rm } = require("shelljs");

const { log } = require("./helper");

const date = new Date();
const BRANCH = "gh-pages";
const APP_PATH = realpathSync(path.resolve(__dirname, ".."));
const BUILD_PATH = path.join(APP_PATH, "out");
const TMP_WORK_PATH = path.join(APP_PATH, `tmp_work_dir_${date.getTime()}`);

const execOptions = {
  encoding: "utf8",
  cwd: APP_PATH,
  stdio: [
    "pipe", // stdin (default)
    "pipe", // stdout (default)
    "ignore", // stderr
  ],
};

(async () => {
  if (!existsSync(BUILD_PATH)) {
    log("Deploy Failed");
    process.exit(1);
  }

  try {
    log("Deploy Starting");
    if (!existsSync(TMP_WORK_PATH)) {
      mkdir("-p", TMP_WORK_PATH);
    }

    log(`Fetching ${BRANCH} branch`);
    execSync(`git fetch origin ${BRANCH}`, execOptions);

    log("Copying .git dir");
    cp("-Rf", `${APP_PATH}/.git`, `${TMP_WORK_PATH}/.git`);

    log("Checking out branch");
    execSync(`git checkout -b ${BRANCH} origin/${BRANCH}`, {
      ...execOptions,
      cwd: TMP_WORK_PATH,
    });

    log(`Copying assets ${BUILD_PATH} => ${TMP_WORK_PATH}`);
    cp("-Rf", [`${BUILD_PATH}/*`, `${BUILD_PATH}/.*`], TMP_WORK_PATH);

    log("Creating commit");
    execSync("git add -A", { ...execOptions, cwd: TMP_WORK_PATH });

    let gitUserName = "";
    let gitUserEmail = "";

    try {
      gitUserName = execSync("git config user.name", execOptions).trim();
      gitUserEmail = execSync("git config user.email", execOptions).trim();

      execSync(
        `git -c user.name="${gitUserName}" -c user.email="${gitUserEmail}" commit --allow-empty -m "Update github page" --author="enkhee-Osiris <enkhee.ag@gmail.com>"`,
        { ...execOptions, cwd: TMP_WORK_PATH }
      );
    } catch (e) {
      log("Using default git config");
      gitUserName = "github-actions";
      gitUserEmail = "github-actions@github.com";

      execSync(
        `git -c user.name="${gitUserName}" -c user.email="${gitUserEmail}" commit --allow-empty -m "Update github page" --author="enkhee-Osiris <enkhee.ag@gmail.com>"`,
        { ...execOptions, cwd: TMP_WORK_PATH }
      );
    }

    log("Pushing commit");
    execSync(`git push -f origin HEAD:${BRANCH}`, { ...execOptions, cwd: TMP_WORK_PATH });

    log("Cleaning up");

    rm("-rf", TMP_WORK_PATH);
    execSync("git reset --hard HEAD", execOptions);
  } catch (e) {
    console.error("Error while deploying", e.message);
    process.exit(1);
  }
})();

["SIGINT", "SIGTERM"].forEach((sig) => {
  process.on(sig, () => {
    process.exit(1);
  });
});
