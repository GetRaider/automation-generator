import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("Promise-Helper");

export const promiseHelper = {
  async allTrue(arr: Array<Promise<boolean>>): Promise<boolean> {
    return allBoolean(arr, true);
  },

  async someTrue(arr: Array<Promise<boolean>>): Promise<boolean> {
    throwOnEmptyArray(arr);
    try {
      const resolvedPromisesArr = await Promise.all(arr);
      return resolvedPromisesArr.some(promise => promise);
    } catch (err) {
      throw new Error(`Some promises rejected: ${err}`);
    }
  },

  async allFalse(arr: Array<Promise<boolean>>): Promise<boolean> {
    return allBoolean(arr, false);
  },

  async ignoreReject<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (err) {
      logger.warn(`Ignoring rejection: ${err}`);
    }
  },

  isPromise(arg: unknown): boolean {
    return Object.prototype.toString.call(arg) === "[object Promise]";
  },
};

async function allBoolean(
  arr: Array<Promise<boolean>>,
  expectation: boolean,
): Promise<boolean> {
  throwOnEmptyArray(arr);
  try {
    const resolvedPromisesArr = await Promise.all(arr);
    let finalResult = true;
    resolvedPromisesArr.forEach(promise => {
      const result = promise === expectation;
      if (result === false) {
        finalResult = false;
      }
    });
    return finalResult;
  } catch (err) {
    throw new Error(`Some promises rejected: ${err}`);
  }
}

function throwOnEmptyArray(arr: Array<Promise<boolean>>): never | void {
  if (!arr.length) {
    throw new Error("Promises array is empty");
  }
}
