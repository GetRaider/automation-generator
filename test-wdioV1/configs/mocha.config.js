require("ts-node/register");
const { configHelper } = require("../src/helpers/config/config.helper");

module.exports = {
  diff: true,
  reporter: "spec",
  color: true,
  slow: 75,
  timeout: "90000",
  ui: "bdd",
  require: ["ts-node/register"],
  extensions: ["ts"],
  spec: configHelper.getSpecPathsByType(configHelper.specsType.api),
};
