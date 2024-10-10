import {loggerHelper} from "@helpers/logger/logger.helper";
import {
  IRetryOptions,
  ISleepArgs,
  IWaitOptions,
} from "@helpers/waiter/waiters.types";
import {timeouts} from "@constants/timeouts.constants";
import {utils} from "@helpers/waiter/utils/utils";

const logger = loggerHelper.get("Waiter-Helper");

export const waiterHelper = {
  async waitForAnimation(): Promise<void> {
    return this.sleep({timeout: timeouts.animation, ignoreReason: true});
  },

  async waitWithoutDriver(
    callback: () => Promise<boolean>,
    timeout: number,
    options: IWaitOptions = {},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): Promise<boolean> {
    const {interval = 100, errorMessage, throwError = true} = options;
    const startTime = Date.now();
    while (utils.hasTime(startTime, timeout)) {
      try {
        const result = await callback();
        if (result) {
          return result;
        }
        await this.sleep({timeout: interval, ignoreReason: true});
      } catch (error) {
        if (throwError) {
          errorMessage && logger.error(errorMessage);
          throw new Error(error.message);
        }
        errorMessage && logger.warn(errorMessage);
        return false;
      }
    }
  },

  async retry<T>(
    callback: () => Promise<T>,
    retryCount: number,
    options: IRetryOptions = {},
  ): Promise<T> {
    const {
      interval = timeouts.xxxs,
      throwError = true,
      resolveWhenNoException = false,
      continueWithException = resolveWhenNoException,
      errorMessage,
    } = options;
    let caughtError = null;
    do {
      try {
        const result = await callback();
        if (resolveWhenNoException || result) {
          return result;
        }
      } catch (error) {
        caughtError = error;
        logger.error(`Caught error: ${caughtError}`);
        if (!continueWithException) {
          break;
        }
      }
      await this.logErrorAndSleep(errorMessage, caughtError, interval);
    } while (retryCount--);
    throwError && this.logRetryFailedAndThrow(errorMessage, caughtError);
    logger.warn(`${errorMessage}: ${caughtError}`);
  },

  sleep(args: ISleepArgs): Promise<void> {
    const {timeout, sleepReason, ignoreReason = false} = args;
    ignoreReason ||
      logger.info(
        `Sleeping: ${timeout / 1000} seconds${
          sleepReason ? `. Due to: ${sleepReason}` : ""
        }`,
      );
    return new Promise(resolve => setTimeout(resolve, timeout));
  },

  async logErrorAndSleep(
    errorMessage: string | undefined,
    error: Error,
    interval: number,
  ): Promise<void> {
    if (error || errorMessage) {
      logger.warn(`${errorMessage}: ${error}`);
    }
    logger.warn(`Retrying...`);
    await this.sleep({timeout: interval, ignoreReason: true});
  },

  logRetryFailedAndThrow(
    errorMessage: string | undefined,
    caughtError: boolean,
  ): never {
    const message = `Retry failed: ${errorMessage}
      ${caughtError || ""}`;
    logger.error(message);
    throw new Error(message);
  },
};
