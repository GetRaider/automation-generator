const { config } = require("dotenv");

// Has to be initiated again due to missing possibility to import config, processEnv helpers
config();

module.exports = {
  diff: true,
  reporter: "spec",
  color: true,
  slow: "75",
  timeout: "60000",
  ui: "bdd",
  require: "ts-node/register",
  extensions: ["ts"],
  spec: [`specsApi/**/${process.env.SPEC_NAMES}.apiSpec.ts`],
};
