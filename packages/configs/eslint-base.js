module.exports = {
  env: { browser: true, es2021: true },
  extends: ["airbnb-base", "prettier"],
  ignorePatterns: ["node_modules", "coverage", ".cache", ".log", "dist", "out", ".turbo"],
  rules: {
    "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
    "no-console": "off",
    quotes: "off",
    "import/order": [
      "error",
      {
        alphabetize: { caseInsensitive: true, order: "asc" },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        pathGroups: [{ group: "parent", pattern: "@/**", position: "before" }],
      },
    ],
  },
};
