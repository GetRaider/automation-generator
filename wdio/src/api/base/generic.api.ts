import { BaseApi } from "./base.api";
import { IBaseApiRequestArgs, IGenericHttpResponse } from "./api.types";

export class GenericApi {
  constructor(private baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  async get<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseApi.sendRequest("GET", args);
  }

  async post<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseApi.sendRequest("POST", args);
  }

  async put<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseApi.sendRequest("PUT", args);
  }

  async patch<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseApi.sendRequest("PATCH", args);
  }

  async delete<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.baseApi.sendRequest("DELETE", args);
  }
}
