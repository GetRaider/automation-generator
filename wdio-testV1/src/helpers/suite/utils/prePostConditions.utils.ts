import HookFunction = Mocha.HookFunction;
import { loggerHelper } from "@helpers/logger/logger.helper";
import { IRunPrePostConditions } from "@helpers/suite/types/prePostConditions.types";

const logger = loggerHelper.get("PrePostConditions-Utils");

export const postConditionUtils = {
  preconditionException: null,
  run(
    prePostCondition: () => unknown | Promise<unknown>,
    mochaConditionRunner: HookFunction,
    params: IRunPrePostConditions,
  ) {
    const { ignoreError = false, passExceptionToTests } = params;
    if (!prePostCondition) {
      return;
    }
    mochaConditionRunner(async () => {
      try {
        await prePostCondition();
      } catch (error) {
        if (ignoreError) {
          logger.warn(`Ignoring error: ${error}`);
        } else {
          if (passExceptionToTests) {
            this.preconditionException = error;
          } else {
            throw error;
          }
        }
      }
    });
  },
};
