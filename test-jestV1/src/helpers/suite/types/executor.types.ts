import {ITest} from "./suite.types";

export interface IExecuteTests {
  specs: ITest[];
  testRailSuiteId: number;
  generalTestRailId: number;
  specPath: string;
  isDependant?: boolean;
  parentSpecName?: string;
  areTestsSequential?: boolean;
}

export interface IGetSpecsToExecute {
  specs: ITest[];
  specPath: string;
}
