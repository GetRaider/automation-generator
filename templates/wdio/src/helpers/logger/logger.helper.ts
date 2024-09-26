import {
  IGetSpecifiedArgs,
} from "@helpers/logger/logger.types";
import { reporterHelper } from "@helpers/reporter/reporter.helper";
import { BaseLoggerHelper } from "@helpers/logger/base.logger.helper";

class LoggerHelper extends BaseLoggerHelper {
  constructor() {
    super()
  }

  getSpecifiedLog(args: IGetSpecifiedArgs): void {
    const { logger, type, message, shouldAddReportStep = false } = args;
    logger[type](message);
    shouldAddReportStep && reporterHelper.addStep(message);
  }
}

export const loggerHelper = new LoggerHelper();
