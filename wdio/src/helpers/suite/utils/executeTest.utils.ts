import { times } from "lodash";
import allureReporter from "@wdio/allure-reporter";
import { loggerHelper } from "@helpers/logger/logger.helper";
import {
  IExecuteTest,
  ISequentialTest,
} from "@helpers/suite/types/executeTest.types";
import { postConditionUtils } from "@helpers/suite/utils/prePostConditions.utils";
import { envHelper } from "@helpers/env/env.helper";

const logger = loggerHelper.get("Execute-Test-Util");
let firstSequentialFailedTest: ISequentialTest = null;
let specException = null;

export const executeTestUtils = {
  execute(params: IExecuteTest) {
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
    let { disable } = spec;
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
    const testName = `- ${specName}${disable ? ` #${disable?.reason}` : ""} S${
      testRailSuiteId || " - Missing"
    } C${tmsId || " - Missing"}`;

    times(repeat, () =>
      it(testName, async function () {
        if (disable) {
          allureReporter.addIssue(disable.link);
          this.skip();
        }
        try {
          logger.info(testName.toUpperCase());
          if (postConditionUtils.preconditionException) {
            logger.error(
              `'before(all/each)' failed: ${postConditionUtils.preconditionException}`,
            );
            throw new Error(
              `'before(all/each)' failed: ${postConditionUtils.preconditionException}`,
            );
          }
          if (isDependant && specException) {
            logger.error(`Precondition failed: ${specException}`);
            throw new Error(`Precondition failed: ${specException}`);
          }
          if (isSequential && firstSequentialFailedTest) {
            logger.error(
              `Sequential parent test failed (${firstSequentialFailedTest.name}): ${firstSequentialFailedTest.error}`,
            );
            throw new Error(
              `Sequential parent test failed (${firstSequentialFailedTest.name}): ${firstSequentialFailedTest.error}`,
            );
          }
          await test.call(spec);
          specException = null;
        } catch (error) {
          if (isSequential && !firstSequentialFailedTest) {
            firstSequentialFailedTest = { name: testName, error };
          }
          if (!isAssertionError(error)) {
            logger.trace(
              `Adding test for retry [${specName}${
                isDependant ? `, ${parentSpecName}` : ""
              }]`,
            );
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
      }),
    );
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

function isAssertionError(error: Error): boolean {
  return (
    error.name === "AssertionError" || error.message.includes("AssertionError")
  );
}
