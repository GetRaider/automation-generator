import { ITest } from "@helpers/suite/types/suite.types";

export interface IRunPrePostConditions extends IRetryData {
  ignoreError?: boolean;
  passExceptionToTests?: boolean;
}

export interface IRetryData {
  specFilePath?: string;
  specs?: ITest[];
}
