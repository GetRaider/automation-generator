import { MainHttpClient } from "@api/http/main-http.client";
import { api } from "@helpers/api/api.helper";
import { GenericHttpClient } from "@api/http/generic-http.client";
import { AuthOptionType } from "@api/controllers/auth/auth.controller.types";
import { IGenericHttpResponse } from "@api/http/http.types";
import { IGetAllUsers } from "@api/controllers/user/user.controller.types";

export class UserController extends MainHttpClient {
  private readonly relativeUrl = "users";

  constructor(protected override genericHttp: GenericHttpClient) {
    super(genericHttp);
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
