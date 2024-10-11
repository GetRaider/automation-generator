import { IGetSpecifiedArgs } from "@helpers/logger/logger.types";
import { allureHelper } from "@helpers/reporter/allure.helper";
import { BaseLoggerHelper } from "@helpers/logger/base.logger.helper";

class LoggerHelper extends BaseLoggerHelper {
  constructor() {
    super();
  }

  getSpecifiedLog(args: IGetSpecifiedArgs): void {
    const { logger, type, message, shouldAddReportStep = false } = args;
    logger[type](message);
    shouldAddReportStep && allureHelper.addStep(message);
  }
}

export const loggerHelper = new LoggerHelper();
