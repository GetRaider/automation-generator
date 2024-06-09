import { GenericApi } from "@api/base/generic.api";
import { BaseApi } from "@api/base/base.api";
import { AuthApiClient } from "@api/clients/auth/auth.api.client";
import { UserApiClient } from "@api/clients/user/user.api.client";

export const api = {
  ...getApi(new GenericApi(new BaseApi())),
};

function getApi(genericApi: GenericApi) {
  return {
    auth: new AuthApiClient(genericApi),
    user: new UserApiClient(genericApi),
  };
}
