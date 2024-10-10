import {ITest} from "./suite.types";

export interface IRunPrePostConditions extends IRetryData {
  ignoreError?: boolean;
  passExceptionToTests?: boolean;
}

export interface IRetryData {
  specFilePath?: string;
  specs?: ITest[];
}

export interface IUsersHandler extends IRetryData {
  getUsers: () => Promise<any[]>;
}
