import {
  AxiosHeaders,
  RawAxiosRequestHeaders,
  Method,
  AxiosError,
} from "axios";

export interface IBaseApiRequestArgs {
  url: string;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  body?: unknown;
}

export interface IGenericHttpResponse<T> {
  data: T;
  headers: RawAxiosRequestHeaders | AxiosHeaders;
  status: number;
}

export interface IMainApiRequestArgs {
  token?: string;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  body?: unknown;
  pathParams?: string[];
  queries?: Record<string, string>;
}

export interface IBaseApi {
  sendRequest<T>(
    method: Method,
    args: IBaseApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>>;
}

export interface IGetRequestError {
  request: unknown;
  error: AxiosError;
}

export enum ContentType {
  csv = "text/csv",
  png = "image/png",
  json = "application/json",
  multipartFormData = "multipart/form-data",
}

export interface IUserCredentials {
  login: string;
  password: string;
}
