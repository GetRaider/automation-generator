import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { fsHelper } from "@helpers/fs/fs.helper";
import { magicStrings } from "@magic-strings/magic-strings";

const { SPEC_NAMES, IS_CI } = processEnv;
const logger = loggerHelper.get("Config-Helper");

export const configHelper = {
  getSpecs(): string[] {
    return SPEC_NAMES
      ? SPEC_NAMES.split(",").map(testName =>
          !testName.endsWith(".spec.ts") ? `${testName}.spec.ts` : testName,
        )
      : [];
  },

  onPrepare(): void {
    return IS_CI === "true"
      ? fsHelper.removeDirectories(
          magicStrings.path.allureReport,
          magicStrings.path.allureResults,
        )
      : logger.debug("On prepare hook is skipped");
  },
};
