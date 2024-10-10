import {
  IGetSpecifiedArgs,
} from "@helpers/logger/logger.types";
import { BaseLoggerHelper } from "@helpers/logger/base.logger.helper";

class LoggerHelper extends BaseLoggerHelper{
  constructor() {
    super()
  }

  getSpecifiedLog(args: IGetSpecifiedArgs): void {
    const { logger, type, message } = args;
    logger[type](message);
  }
}

export const loggerHelper = new LoggerHelper();
