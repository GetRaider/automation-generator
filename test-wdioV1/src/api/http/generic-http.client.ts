import { BaseHttpClient } from "./base-http.client";
import {
  IBaseApiRequestArgs,
  IGenericHttpResponse,
} from "@api/http/http.types";

export class GenericHttpClient {
  constructor(private baseHttp: BaseHttpClient) {
    this.baseHttp = baseHttp;
  }

  async get<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseHttp.sendRequest("GET", args);
  }

  async post<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseHttp.sendRequest("POST", args);
  }

  async put<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseHttp.sendRequest("PUT", args);
  }

  async patch<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseHttp.sendRequest("PATCH", args);
  }

  async delete<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseHttp.sendRequest("DELETE", args);
  }
}
