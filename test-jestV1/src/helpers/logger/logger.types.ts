import { Logger } from "log4js";

export interface IGetSpecifiedArgs {
  logger: Logger;
  message: string;
  type: LogType;
  shouldAddReportStep?: boolean;
}

export enum LogType {
  info = "info",
  warn = "warn",
  debug = "debug",
  trace = "trace",
  error = "error",
  fatal = "fatal",
}

export interface IGetLogger {
  info: (message: string, shouldAddReportStep?: boolean) => void;
  warn: (message: string, shouldAddReportStep?: boolean) => void;
  debug: (message: string, shouldAddReportStep?: boolean) => void;
  error: (message: string, shouldAddReportStep?: boolean) => void;
  trace: (message: string, shouldAddReportStep?: boolean) => void;
  fatal: (message: string, shouldAddReportStep?: boolean) => void;
}
