import {
  AuthOptionType,
  IAuthApiClient,
  IGetToken,
} from "./auth.api.client.types";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { MainApi } from "@api/base/main.api";
import { GenericApi } from "@api/base/generic.api";
import { IUserCredentials } from "@api/base/api.types";
import { formatHelper } from "@helpers/format/format.helper";

const logger = loggerHelper.get("Auth-Api-Client");

export class AuthApiClient extends MainApi implements IAuthApiClient {
  private readonly relativeUrl = "auth/token";
  private readonly tokens = {};
  constructor(genericApi: GenericApi) {
    super(genericApi);
  }

  async getTokenByAuthOption(authOption: AuthOptionType): Promise<string> {
    if (!this.isValidOption(authOption)) {
      throw new Error(
        `Invalid auth option: ${formatHelper.json.stringify(authOption)}`,
      );
    }

    const token = this.isToken(authOption)
      ? authOption
      : await this.getTokenByUser(authOption as IUserCredentials);

    return `Bearer ${token}`;
  }

  private async getTokenByUser(user: IUserCredentials): Promise<string> {
    if (!user) {
      throw new Error("User is not passed - token can't be gotten");
    }
    const { login, password } = user;

    if (this.tokens[login]) {
      logger.debug(`Taking existing token by email: ${login}`);
      return this.tokens[login];
    }

    this.tokens[login] = (
      await this.post<IGetToken>({
        pathParams: [this.relativeUrl],
        body: { login, password },
      })
    ).data.token;

    return this.tokens[login];
  }

  private isValidOption(authOption: AuthOptionType): boolean {
    return this.isToken(authOption) || this.isUserCredentials(authOption);
  }

  private isToken(authOption: AuthOptionType): boolean {
    return typeof authOption === "string" && authOption.length > 0;
  }

  private isUserCredentials(authOption: AuthOptionType): boolean {
    if (typeof authOption !== "object") {
      return false;
    }
    return Boolean(authOption?.login && authOption?.password);
  }
}
