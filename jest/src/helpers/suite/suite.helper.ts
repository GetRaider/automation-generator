import {envHelper} from "../env/env.helper";
import {utils} from "./utils/utils";
import {ISuiteParams} from "./types/suite.types";
import {loggerHelper} from "../logger/logger.helper";

const logger = loggerHelper.get("Suite-Helper");

// The suiteHelper has been created by [Hennadii Mishchevskyi](https://github.com/Gennadiii/MochaWrapper)
export function suiteHelper(params: ISuiteParams): void {
  const {
    name,
    testRailSuiteId,
    users,
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
        describe(inner, () => {
          logger.info(
            `Tests "${specs
              .map(spec => spec.name)
              .join(", ")}" running on pid: ${process.pid}`,
          );

          if (!utils.areAllSpecsDisabled(specs)) {
            users &&
              utils.prePostConditions.usersHandler({
                specs,
                getUsers: users,
                specFilePath: expect.getState().testPath,
              });

            utils.prePostConditions.run(beforeAllSpecs, beforeAll, {
              specs,
              specFilePath: expect.getState().testPath,
              passExceptionToTests: true,
            });
            utils.prePostConditions.run(beforeEachSpec, beforeEach, {
              specs,
              specFilePath: expect.getState().testPath,
              passExceptionToTests: true,
            });
            utils.prePostConditions.run(afterEachSpec, afterEach, {
              specs,
              specFilePath: expect.getState().testPath,
            });
            utils.prePostConditions.run(
              async () => {
                utils.prePostConditions.preconditionException = null;
                await afterAllSpecs();
              },
              afterAll,
              {ignoreError: true},
            );
          }

          utils.executor.tests({
            specs,
            testRailSuiteId,
            generalTestRailId,
            areTestsSequential,
            specPath: expect.getState().testPath,
          });
        }),
    )();
  });
}
