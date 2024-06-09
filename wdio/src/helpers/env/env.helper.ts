import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { urlConstant } from "@constants/url.constants";

export const envHelper = {
  getEnv(): string {
    return processEnv.ENV;
  },

  getBaseWebUrl(): string {
    return urlConstant.baseUrl.web[this.getEnv()];
  },
  getBaseApiUrl(): string {
    return urlConstant.baseUrl.api[this.getEnv()];
  },
};
