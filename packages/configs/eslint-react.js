const fs = require("fs");
const path = require("path");

function getDirectories(inputPath) {
  return fs
    .readdirSync(inputPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(inputPath, dirent.name));
}

const rootDir = path.resolve(__dirname, "../..");
const packageDirs = [
  rootDir,
  ...getDirectories(path.join(rootDir, "sites")),
  ...getDirectories(path.join(rootDir, "packages")),
];

const RULES = {
  "@next/next/no-html-link-for-pages": "off",
  "import/no-extraneous-dependencies": ["error", { packageDir: packageDirs }],
  "import/order": [
    "error",
    {
      alphabetize: { caseInsensitive: true, order: "asc" },
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      pathGroups: [
        { group: "external", pattern: "react", position: "before" },
        { group: "parent", pattern: "@/**", position: "before" },
      ],
      pathGroupsExcludedImportTypes: ["react"],
    },
  ],
  "import/prefer-default-export": "off",
  "max-classes-per-file": "off",
  "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
  "no-console": "off",
  quotes: "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
  "react/jsx-props-no-spreading": "off",
  "react/no-array-index-key": "off",
  "react/prop-types": "off",
  "react/react-in-jsx-scope": "off",
  "react/require-default-props": "off",
};

module.exports = {
  env: { node: true, browser: true, es2021: true },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
  ignorePatterns: [
    "node_modules",
    "coverage",
    ".cache",
    ".log",
    "dist",
    "out",
    ".turbo",
    ".next",
    "_next",
    "public",
  ],
  overrides: [
    {
      extends: [
        "plugin:react/recommended",
        "plugin:@next/next/recommended",
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "prettier",
      ],
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      plugins: ["react", "@typescript-eslint"],
      rules: {
        "@typescript-eslint/quotes": "off",
        ...RULES,
      },
    },
  ],
  rules: RULES,
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    react: { version: "detect" },
  },
};
