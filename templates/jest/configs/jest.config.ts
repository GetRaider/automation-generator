import type { Config } from "@jest/types";

import { configHelper } from "@helpers/config/config.helper";
import { timeouts } from "@constants/timeouts.constants";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  passWithNoTests: true,
  testTimeout: timeouts.testRunner,
  testMatch: configHelper.getSpecPaths(),
  setupFilesAfterEnv: ["./configs/logging.config.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports/html-report",
        filename: "report.html",
      },
    ],
  ],
  rootDir: `../`,
  moduleNameMapper: {
    "@api/(.*)": "<rootDir>/src/api/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@fixtures/(.*)": "<rootDir>/src/fixtures/$1",
    "@magic-strings/(.*)": "<rootDir>/src/magic-strings/$1",
    "@decorators/(.*)": "<rootDir>/src/decorators/$1",
  },
};

export default config;
