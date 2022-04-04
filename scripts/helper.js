/* eslint-disable import/no-extraneous-dependencies, no-console */
const { info } = require("@actions/core");

function log(...args) {
  if (process.env.CI) {
    info(...args);
  } else {
    console.log(...args);
  }
}

module.exports = {
  log,
};
