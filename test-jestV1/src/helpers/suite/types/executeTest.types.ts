import {ITest} from "./suite.types";

export interface IExecuteTest {
  spec: ITest;
  testRailSuiteId: number;
  generalTestRailId: number;
  isDependant?: boolean;
  parentSpecName?: string;
  areTestsSequential?: boolean;
}

export interface ISequentialTest {
  name: string;
  error: Error;
}
