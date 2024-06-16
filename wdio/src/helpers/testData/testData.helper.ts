import { primitivesHelper } from "../primitives/primitives.helper";
import { processEnv } from "@helpers/processEnv/processEnv.helper";

const password = processEnv.USER_PASSWORD;

export const testDataHelper = {
    users: {
      getCreated() {
        const randomNumber = primitivesHelper.getRandom.number();
        return {
          login: `automation.user+${randomNumber}@beat.com`,
          password,
          name: `autotest+${randomNumber}`,
          age: 20,
        };
      },
    },
};
