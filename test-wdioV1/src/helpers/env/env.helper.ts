import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { urlConstant } from "@constants/url.constants";

export const envHelper = {
  getEnv(): string {
    return processEnv.ENV;
  },

  getCustomWebUrl(): string {
    return processEnv.WEB_URL;
  },

  getCustomApiUrl(): string {
    return processEnv.API_URL;
  },

  getBaseWebUrl(): string {
    return urlConstant.base.web[this.getEnv()];
  },

  getBaseApiUrl(): string {
    return urlConstant.base.api[this.getEnv()];
  },
};
