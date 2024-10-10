import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("Promise-Helper");

export const promiseHelper = {
  async allTrue(arr: Array<Promise<boolean>>): Promise<boolean> {
    return allBoolean(arr, true);
  },

  async someTrue(array: Array<Promise<boolean>>): Promise<boolean> {
    throwOnEmptyArray(array);
    try {
      const resolvedPromisesArr = await Promise.all(array);
      return resolvedPromisesArr.some(promise => promise);
    } catch (error) {
      throw new Error(`Some promises rejected: ${error}`);
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
  array: Array<Promise<boolean>>,
  expectation: boolean,
): Promise<boolean> {
  throwOnEmptyArray(array);
  try {
    const resolvedPromisesArr = await Promise.all(array);
    let finalResult = true;
    resolvedPromisesArr.forEach(promise => {
      const result = promise === expectation;
      if (!result) {
        finalResult = false;
      }
    });
    return finalResult;
  } catch (error) {
    throw new Error(`Some promises rejected: ${error}`);
  }
}

function throwOnEmptyArray(array: Array<Promise<boolean>>): never | void {
  if (!array.length) {
    throw new Error("Promises array is empty");
  }
}
