import type {Config} from "@jest/types";

import {processEnv} from "@helpers/processEnv/processEnv.helper";

const {SPEC_NAMES} = processEnv;

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testRegex: SPEC_NAMES.split(","),
  rootDir: `./`,
  passWithNoTests: true,
  setupFilesAfterEnv: ["./logging.config.ts"],
  reporters: ["default", "jest-html-reporters"],
  moduleNameMapper: {
    "@api/(.*)": "<rootDir>/src/api/$1",
    "@helpers/(.*)": "<rootDir>/src/helpers/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@fixtures/(.*)": "<rootDir>/src/fixtures/$1",
    "@magic-strings/(.*)": "<rootDir>/src/magic-strings/$1",
  },
};

export default config;
