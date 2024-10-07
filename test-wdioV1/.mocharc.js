const { config } = require("dotenv");

// Has to be initiated again due to missing possibility to import config, processEnv helpers
config();

module.exports = {
  diff: true,
  reporter: "spec",
  color: true,
  slow: "75",
  timeout: "90000",
  ui: "bdd",
  require: "ts-node/register",
  extensions: ["ts"],
  spec: [
    `specs/api/**${
      process.env.SPECS_FOLDER_NAME ? `/${process.env.SPECS_FOLDER_NAME}` : ""
    }/${process.env.SPEC_NAMES}.spec.ts`,
  ],
};
