import { BaseController } from "@api/controllers/base.controller";
import { GenericHttpClient } from "@api/http/generic-http.client";
import { AuthOptionType } from "../auth/auth.controller.types";
import { IGenericHttpResponse } from "@api/http/http.types";
import {
  ITodo,
  ITodoController,
} from "@api/controllers/todo/todo.controller.types";
import { api } from "@helpers/api/api.helper";

export class TodoController extends BaseController implements ITodoController {
  private readonly relativeUrl = "todos";

  constructor(protected override genericHttp: GenericHttpClient) {
    super(genericHttp);
  }

  async getAll(): Promise<IGenericHttpResponse<ITodo[]>> {
    return this.get<ITodo[]>({
      pathParams: [this.relativeUrl],
    });
  }

  // Just a demo of getTokenByAuthOption usage, title has to be changed
  async getAllWithAuth(
    authOption: AuthOptionType,
  ): Promise<IGenericHttpResponse<ITodo[]>> {
    return this.get<ITodo[]>({
      pathParams: [this.relativeUrl],
      token: await api.auth.getTokenByAuthOption(authOption),
    });
  }
}
