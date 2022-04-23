module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testMatch: ["<rootDir>/**/*.test.(ts|tsx|js|jsx)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
};
