import { configure, getLogger } from "log4js";

import {
  IGetLogger,
  IGetSpecifiedArgs,
  LogType,
} from "@helpers/logger/logger.types";

export abstract class BaseLoggerHelper {
  protected constructor() {
    configure({
      appenders: {
        console: {
          layout: {
            pattern: "%[%-5.5p [%d{hh:mm:ss:SSS}] {%c} %m%]",
            type: "pattern",
          },
          type: "console",
        },
        file: {
          filename: `logs/${Date.now()}_${process.pid}.log`,
          layout: {
            pattern: "%-5.5p [%d{hh.mm.ss.SSS}] {%c} %m",
            type: "pattern",
          },
          type: "file",
        },
      },
      categories: { default: { appenders: ["console", "file"], level: "ALL" } },
    });
  }

  abstract getSpecifiedLog(args: IGetSpecifiedArgs): void

  get(category: string): IGetLogger {
    const logger = getLogger(category);
    return {
      info: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.info,
          message,
          shouldAddReportStep,
        }),
      warn: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.warn,
          message,
          shouldAddReportStep,
        }),
      debug: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.debug,
          message,
          shouldAddReportStep,
        }),
      error: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.error,
          message,
          shouldAddReportStep,
        }),
      trace: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.trace,
          message,
          shouldAddReportStep,
        }),
      fatal: (message, shouldAddReportStep?) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.fatal,
          message,
          shouldAddReportStep,
        }),
    };
  }
}
