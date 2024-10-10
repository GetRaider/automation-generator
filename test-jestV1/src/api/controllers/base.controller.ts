import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

import { envHelper } from "@helpers/env/env.helper";
import { urlHelper } from "@helpers/url/url.helper";
import { GenericHttpClient } from "@api/http/generic-http.client";
import {
  IGenericHttpResponse,
  IMainApiRequestArgs,
} from "@api/http/http.types";

export class BaseController {
  private readonly baseUrl = envHelper.getBaseApiUrl();

  protected constructor(protected genericHttp: GenericHttpClient) {
    this.genericHttp = genericHttp;
  }

  protected async get<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token, headers, pathParams, queries } = args;
    return this.genericHttp.get({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
    });
  }

  protected async post<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericHttp.post({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  protected async put<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericHttp.put({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  protected async patch<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const {
      token = null,
      headers = { token },
      body,
      pathParams,
      queries,
    } = args;
    return this.genericHttp.patch({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  protected async delete<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericHttp.delete({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  private getUrl(
    pathParams: string[],
    queries: Record<string, string>,
  ): string {
    return urlHelper.construct(
      {
        base: this.baseUrl,
        params: pathParams,
        queries: queries,
      },
      { shouldSkipMissingArgs: true },
    );
  }

  private getHeaders(
    token: string,
    headers: RawAxiosRequestHeaders | AxiosHeaders,
  ) {
    return { authorization: token, ...headers };
  }
}
