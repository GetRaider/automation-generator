import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { IUserCredentials } from "@api/http/http.types";

const password = processEnv.USER_PASSWORD;

export const userDataHelper = {
  admin(): IUserCredentials {
    return {
      login: "alex.local.admin+4@beat.com",
      password,
    };
  },
};
