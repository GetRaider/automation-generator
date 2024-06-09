import { IUserCredentials } from "@api/base/api.types";

export interface IAuthApiClient {
  getTokenByAuthOption: (authOption: AuthOptionType) => Promise<string>;
}

export type AuthOptionType = IUserCredentials | string;

export interface IGetToken {
  token: string;
}
