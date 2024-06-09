import { MainApi } from "@api/base/main.api";
import { GenericApi } from "@api/base/generic.api";
import { AuthOptionType } from "@api/clients/auth/auth.api.client.types";
import { IGenericHttpResponse } from "@api/base/api.types";
import { IGetAllUsers } from "@api/clients/user/user.api.client.types";
import { api } from "@helpers/api/api.helper";

export class UserApiClient extends MainApi {
  private readonly relativeUrl = "users";

  constructor(protected override genericApi: GenericApi) {
    super(genericApi);
  }

  async getAll(
    authOption: AuthOptionType,
  ): Promise<IGenericHttpResponse<IGetAllUsers>> {
    return await this.get<IGetAllUsers>({
      pathParams: [this.relativeUrl],
      token: await api.auth.getTokenByAuthOption(authOption),
    });
  }
}
