import axios, { Method } from "axios";

import {
  IBaseApi,
  IBaseApiRequestArgs,
  IGenericHttpResponse,
  IGetRequestError,
} from "./api.types";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { formatHelper } from "@helpers/format/format.helper";
import { reporterHelper } from "@helpers/reporter/reporter.helper";

const logger = loggerHelper.get("Base-Api");

export class BaseApi implements IBaseApi {
  async sendRequest<T>(
    method: Method,
    args: IBaseApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { url, headers, body } = args;
    const request = {
      url,
      method,
      headers,
      data: body,
    };
    try {
      const { data, headers, status } = await axios.request(request);
      return {
        data,
        headers,
        status,
      };
    } catch (error) {
      await this.handleRequestError({ request, error });
    }
  }

  private async handleRequestError(args: IGetRequestError): Promise<void> {
    const { request, error } = args;
    const failedRequestPayloadJson = formatHelper.json.stringify(request);
    const errorMessage = `${error.message} ${
      error?.response?.data?.["message"]
        ? `with message '${error.response.data["message"]}'`
        : "without any message"
    }`;

    logger.error(errorMessage);
    logger.debug(`Failed request payload: ${failedRequestPayloadJson}`);
    await reporterHelper.addAttachment(
      "FailedRequest",
      failedRequestPayloadJson,
    );
    throw new Error(errorMessage);
  }
}
