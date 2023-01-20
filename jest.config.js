const tsPreset = require("ts-jest/jest-preset");

module.exports = {
  ...tsPreset,

  testEnvironment: "jest-dynalite/environment",

  setupFilesAfterEnv: [
    "jest-dynalite/setupTables",
    // Optional (but recommended)
    "jest-dynalite/clearAfterEach"
  ]
};