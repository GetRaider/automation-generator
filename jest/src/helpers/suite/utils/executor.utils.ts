import {loggerHelper} from "@helpers/logger/logger.helper";
import {
  IExecuteTests,
  IGetSpecsToExecute,
} from "@helpers/suite/types/executor.types";
import {executeTestUtils} from "@helpers/suite/utils/executeTest.utils";
import {envHelper} from "@helpers/env/env.helper";
import {ITest} from "@helpers/suite/types/suite.types";

const logger = loggerHelper.get("Executor-Utils");

export const executorUtils = {
  tests(params: IExecuteTests) {
    const {
      generalTestRailId,
      isDependant,
      parentSpecName,
      specPath,
      specs,
      testRailSuiteId,
      areTestsSequential,
    } = params;
    getSpecsToExecute({specs, specPath}).forEach(spec => {
      const {dependantTests} = spec;
      executeTestUtils.execute({
        spec,
        testRailSuiteId,
        generalTestRailId,
        isDependant,
        parentSpecName,
        areTestsSequential,
      });
      if (dependantTests) {
        dependantTests.forEach(test => {
          if (
            spec.disable &&
            (!spec.disable.env || spec.disable.env === envHelper.getEnv())
          ) {
            test.disable = spec.disable;
          }
        });
        this.tests({
          testRailSuiteId,
          generalTestRailId,
          specPath,
          areTestsSequential,
          specs: dependantTests,
          isDependant: true,
          parentSpecName: spec.name,
        });
      }
    });
  },
};

function getSpecsToExecute(params: IGetSpecsToExecute): ITest[] {
  const {specs} = params;
  const forcedTest = specs.find(spec => spec.fname);
  if (forcedTest) {
    logger.warn(`Don't forget to remove "fname"`);
    forcedTest.name = forcedTest.fname;
    return [forcedTest];
  }
  return specs.map(spec => {
    if (spec.xname) {
      logger.warn(`Don't forget to remove "xname"`);
      spec.name = spec.xname;
      spec.disable = {reason: `No reason :(`};
    }
    return spec;
  });
}
