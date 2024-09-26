import {times} from "lodash";

import {envHelper} from "@helpers/env/env.helper";
import {loggerHelper} from "@helpers/logger/logger.helper";
import {
  IExecuteTest,
  ISequentialTest,
} from "@helpers/suite/types/executeTest.types";
import {postConditionUtils} from "@helpers/suite/utils/prePostConditions.utils";

const logger = loggerHelper.get("ExecuteTest-Utils");
let firstSequentialFailedTest: ISequentialTest = null;
let specException = null;

export const executeTestUtils = {
  execute(params: IExecuteTest): void {
    const {
      generalTestRailId,
      isDependant,
      parentSpecName,
      spec,
      testRailSuiteId,
      areTestsSequential,
    } = params;
    const {
      name: specName,
      test,
      afterTest,
      repeat = 1,
      testRailId,
      isSequential = isDependant ? false : areTestsSequential,
    } = spec;
    let {disable} = spec;
    if (!this.isDisabled(disable)) {
      disable = null;
    }
    if (!isDependant) {
      specException = null;
    }
    const tmsId = testRailId || generalTestRailId;
    if (!tmsId) {
      logger.debug(`No documentation ID`);
    }
    repeat > 1 && logger.warn(`Dont forget to remove "REPEAT"`);
    const testName = `${specName}${disable ? ` #${disable?.reason}` : ""} [S-${
      testRailSuiteId || "Missing"
    } - C-${tmsId || "Missing"}]`;

    times(repeat, () => {
      const conditionalRun = disable ? it.skip : it;
      conditionalRun(testName, async function () {
        try {
          logger.info(testName);
          if (postConditionUtils.preconditionException) {
            throw new Error(
              `'before(all/each)' failed: ${postConditionUtils.preconditionException}`,
            );
          }
          if (isDependant && specException) {
            throw new Error(`Precondition failed: ${specException}`);
          }
          if (isSequential && firstSequentialFailedTest) {
            throw new Error(
              `Sequential parent test failed (${firstSequentialFailedTest.name}): ${firstSequentialFailedTest.error}`,
            );
          }
          await test.call(spec);
          specException = null;
        } catch (error) {
          if (isSequential && !firstSequentialFailedTest) {
            firstSequentialFailedTest = {name: testName, error};
          }
          if (!isDependant) {
            specException = error;
          }
          throw error;
        } finally {
          if (afterTest) {
            logger.debug(`Running afterTest`);
            await afterTest();
          }
        }
      });
    });
  },

  isDisabled(disable): boolean {
    if (!disable) {
      return false;
    }
    if (!disable.env) {
      return true;
    }
    return disable.env === envHelper.getEnv();
  },
};

function isAssertionError(err: Error): boolean {
  return (
    err.name === "AssertionError" || err.message.includes("AssertionError")
  );
}
