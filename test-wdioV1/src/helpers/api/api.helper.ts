import { BaseHttpClient } from "@api/http/base-http.client";
import { AuthController } from "@api/controllers/auth/auth.controller";
import { UserController } from "@api/controllers/user/user.controller";
import { GenericHttpClient } from "@api/http/generic-http.client";
import { TodoController } from "@api/controllers/todo/todo.controller";

export const api = {
  ...getApi(new GenericHttpClient(new BaseHttpClient())),
};

function getApi(genericHttp: GenericHttpClient) {
  return {
    auth: new AuthController(genericHttp),
    user: new UserController(genericHttp),
    todo: new TodoController(genericHttp),
  };
}
