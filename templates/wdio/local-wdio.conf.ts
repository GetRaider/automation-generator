import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { configHelper } from "@helpers/config/config.helper";
import { reporterHelper } from "@helpers/reporter/reporter.helper";
import { driver } from "@helpers/driver/driver";

const { MOCHA_TIMEOUT } = processEnv;
const reporters = [
  "spec",
  [
    "allure",
    {
      outputDir: "allure-results",
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      disableMochaHooks: true,
    },
  ],
];

export const config = {
  reporters,
  runner: "local",
  specs: configHelper.getSpecs(),
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        prefs: {
          "profile.default_content_settings.cookies": 1,
          "plugins.always_open_pdf_externally": true,
        },
        args: [],
        excludeSwitches: ["enable-automation"],
      },
    },
  ],
  services: [],
  logLevel: "silent",
  bail: 0,
  waitforTimeout: 0,
  connectionRetryTimeout: 90_000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: Number(MOCHA_TIMEOUT) || 90000,
  },

  async before() {
    await driver.setImplicitTimeout(driver.defaultImplicitTimeout);
  },

  onPrepare() {
    return configHelper.onPrepare();
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      return reporterHelper.addAttachment(
        "Last screenshot on error",
        Buffer.from(await driver.takeScreenshot(), "base64"),
        "image/png",
      );
    }
  },

  async onComplete() {
    return reporterHelper.generate();
  },
};
