import { IGenericHttpResponse } from "@api/http/http.types";
import { AuthOptionType } from "@api/controllers/auth/auth.controller.types";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoController {
  getAll: () => Promise<IGenericHttpResponse<ITodo[]>>;
  getAllWithAuth: (
    authOption: AuthOptionType,
  ) => Promise<IGenericHttpResponse<ITodo[]>>;
}
