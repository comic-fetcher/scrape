module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["jest-date-mock", "./test/setup/fetch.js"],

  testEnvironment: "node",

  coverageDirectory: "./coverage",
  collectCoverage: true,
};
