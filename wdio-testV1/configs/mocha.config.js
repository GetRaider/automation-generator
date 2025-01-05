// init ts-node to use ts files here
require("ts-node/register");
const { configHelper } = require("../src/helpers/config/config.helper");
const { timeouts } = require("../src/constants/timeouts.constants");

module.exports = {
  diff: true,
  reporter: "spec",
  color: true,
  slow: 75,
  timeout: timeouts.testRunner,
  ui: "bdd",
  extensions: ["ts"],
  spec: configHelper.getSpecPathsByType(configHelper.specsTypes.api),
};
