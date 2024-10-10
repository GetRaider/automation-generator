import {
  IRunPrePostConditions,
  IUsersHandler,
} from "../types/prePostConditions.types";
import {loggerHelper} from "../../logger/logger.helper";

const logger = loggerHelper.get("PrePostConditions-Utils");

export const postConditionUtils = {
  preconditionException: null,
  run(
    prePostCondition: () => unknown | Promise<unknown>,
    runnerCondition: any,
    params: IRunPrePostConditions,
  ): void {
    const {ignoreError = false, passExceptionToTests} = params;
    if (!prePostCondition) {
      return;
    }
    runnerCondition(async () => {
      try {
        await prePostCondition();
      } catch (err) {
        if (ignoreError) {
          logger.warn(`Ignoring error: ${err}`);
        } else {
          if (passExceptionToTests) {
            this.preconditionException = err;
          } else {
            throw err;
          }
        }
      }
    });
  },
  usersHandler(params: IUsersHandler) {
    const {getUsers, specFilePath, specs} = params;
    let users: any[];
    this.run(
      async () => (users = await Promise.all(await getUsers())),
      beforeAll,
      {
        specs,
        specFilePath,
        passExceptionToTests: true,
      },
    );
    this.run(
      async () => users && (await Promise.all(users.map(user => user.free()))),
      afterAll,
      {ignoreError: true},
    );
  },
};
