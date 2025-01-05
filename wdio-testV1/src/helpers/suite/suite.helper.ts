import { loggerHelper } from "@helpers/logger/logger.helper";
import { ISuite } from "@helpers/suite/types/suite.types";
import { envHelper } from "@helpers/env/env.helper";
import { utils } from "@helpers/suite/utils/utils";

const logger = loggerHelper.get("Suite-Helper");

// The suiteHelper has been created by [Hennadii Mishchevskyi](https://github.com/Gennadiii/MochaWrapper)
export function suiteHelper(params: ISuite): void {
  const {
    name,
    testRailSuiteId,
    beforeAllSpecs,
    beforeEachSpec,
    afterEachSpec,
    afterAllSpecs,
    specs,
    areTestsSequential,
    testRailId: generalTestRailId,
  } = params;

  if (name.length === 0) {
    throw new Error(`Please specify suite name`);
  }

  const reducedName = [...name];
  const inner = reducedName.pop();
  const baseDescribeName = `${envHelper.getEnv()} <-${envHelper.getBaseApiUrl()}->`;

  describe(baseDescribeName, () => {
    reducedName.reduceRight(
      (prev, cur) => {
        return () =>
          describe(cur, () => {
            prev();
          });
      },
      () =>
        describe(inner, function () {
          logger.info(
            `Tests "${specs
              .map(spec => spec.name)
              .join(", ")}" running on pid: ${process.pid}`,
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
        }),
    )();
  });
}
