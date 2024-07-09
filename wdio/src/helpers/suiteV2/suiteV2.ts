import { loggerHelper } from "@helpers/logger/logger.helper";
import { ISuite } from "@helpers/suite/types/suite.types";
import { envHelper } from "@helpers/env/env.helper";
import { utils } from "@helpers/suite/utils/utils";
import { times } from "lodash";

const logger = loggerHelper.get("Suite-Helper");

// The suiteHelper has been created by [Hennadii Mishchevskyi](https://github.com/Gennadiii/MochaWrapper)
export function suiteV2(params: ISuite): void {
  const {
    name: suiteNames,
    testRailSuiteId,
    beforeAllSpecs,
    beforeEachSpec,
    afterEachSpec,
    afterAllSpecs,
    specs,
    areTestsSequential,
    testRailId: generalTestRailId,
  } = params;

  if (suiteNames.length === 0) {
    throw new Error(`Please specify suite name`);
  }

  const envName = `${envHelper.getEnv()}`;
}

function asd1(suiteNames) {
  let counter = suiteNames;
  suiteNames.forEach((name, index) => {
    if (index + 1 === suiteNames.length) {
      describe(name, () => {
        logger.info(
          `Tests "${specs.map(spec => spec.name).join(", ")}" running on pid: ${
            process.pid
          }`,
        );
        if (!utils.areAllSpecsDisabled(specs)) {
          utils.conditions.run(beforeAllSpecs, before, {
            specs,
            specFilePath: this.file,
            passExceptionToTests: true,
          });
          utils.conditions.run(beforeEachSpec, beforeEach, {
            specs,
            specFilePath: this.file,
            passExceptionToTests: true,
          });
          utils.conditions.run(afterEachSpec, afterEach, {
            specs,
            specFilePath: this.file,
          });
          utils.conditions.run(
            async () => {
              utils.conditions.preconditionException = null;
              await afterAllSpecs();
            },
            after,
            { ignoreError: true },
          );
        }
        utils.executor.tests({
          specs,
          testRailSuiteId,
          generalTestRailId,
          areTestsSequential,
          specPath: this.file,
        });
      });
    } else {
      describe(name, () => {});
    }
  });
}

function runSpecs(specs) {
  logger.info(
    `Tests "${specs.map(spec => spec.name).join(", ")}" running on pid: ${
      process.pid
    }`,
  );
  if (!utils.areAllSpecsDisabled(specs)) {
    utils.conditions.run(beforeAllSpecs, before, {
      specs,
      specFilePath: this.file,
      passExceptionToTests: true,
    });
    utils.conditions.run(beforeEachSpec, beforeEach, {
      specs,
      specFilePath: this.file,
      passExceptionToTests: true,
    });
    utils.conditions.run(afterEachSpec, afterEach, {
      specs,
      specFilePath: this.file,
    });
    utils.conditions.run(
      async () => {
        utils.conditions.preconditionException = null;
        await afterAllSpecs();
      },
      after,
      { ignoreError: true },
    );
  }
  utils.executor.tests({
    specs,
    testRailSuiteId,
    generalTestRailId,
    areTestsSequential,
    specPath: this.file,
  });
}
