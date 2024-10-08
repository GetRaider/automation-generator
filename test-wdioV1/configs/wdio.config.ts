import { configHelper } from "@helpers/config/config.helper";
import { allureHelper } from "@helpers/reporter/allureHelper";
import { driver } from "@helpers/driver/driver";
import { magicStrings } from "@magic-strings/magic-strings";
import { primitivesHelper } from "@helpers/primitives/primitives.helper";
import { fsHelper } from "@helpers/fs/fs.helper";
import { processEnv } from "@helpers/processEnv/processEnv.helper";

const { CI } = processEnv;

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
  specs: configHelper.getSpecPathsByType(configHelper.specsType.web),
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
    timeout: 90_000,
  },

  async before() {
    await driver.setImplicitTimeout(driver.defaultImplicitTimeout);
  },

  onPrepare(): void {
    return primitivesHelper.string.toBoolean(CI)
      ? fsHelper.removeDirectories(
          magicStrings.path.allureReport,
          magicStrings.path.allureResults,
        )
      : console.debug("On prepare hook is skipped");
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      return allureHelper.addAttachment(
        "Error screenshot",
        Buffer.from(await driver.takeScreenshot(), "base64"),
        "image/png",
      );
    }
  },

  async onComplete() {
    return allureHelper.generate();
  },
};
