import { processEnv } from "../../../../shared/helpers/processEnv/processEnv.helper";

export const urlConstant = {
  base: {
    web: {
      local: "http://localhost:5173/",
      custom: processEnv.WEB_URL,
    },
    api: {
      local: "http://localhost:8080",
      custom: processEnv.API_URL,
    },
  },
};
