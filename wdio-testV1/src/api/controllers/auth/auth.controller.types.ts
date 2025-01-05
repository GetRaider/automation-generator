import { IUserCredentials } from "@api/http/http.types";

export interface IAuthController {
  getTokenByAuthOption: (authOption: AuthOptionType) => Promise<string>;
}

export type AuthOptionType = IUserCredentials | string;

export interface IGetToken {
  token: string;
}
