import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

import { envHelper } from "@helpers/env/env.helper";
import { GenericApi } from "@api/base/generic.api";
import { IGenericHttpResponse, IMainApiRequestArgs } from "@api/base/api.types";
import { urlHelper } from "@helpers/url/url.helper";

export class MainApi {
  private readonly baseUrl = envHelper.getBaseApiUrl();

  protected constructor(protected genericApi: GenericApi) {
    this.genericApi = genericApi;
  }

  protected async get<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token, headers, pathParams, queries } = args;
    return this.genericApi.get({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
    });
  }

  protected async post<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericApi.post({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  protected async put<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericApi.put({
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
    return this.genericApi.patch({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
    });
  }

  protected async delete<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries } = args;
    return this.genericApi.delete({
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
