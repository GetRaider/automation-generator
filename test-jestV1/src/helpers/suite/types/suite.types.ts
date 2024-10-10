export interface ISuiteParams {
  name: string[];
  testRailSuiteId?: number;
  users?: () => Promise<any[]>;
  beforeAllSpecs?: () => Promise<unknown> | unknown;
  beforeEachSpec?: () => Promise<unknown> | unknown;
  afterEachSpec?: () => Promise<unknown> | unknown;
  afterAllSpecs?: () => Promise<unknown> | unknown;
  specs: ITest[];
  testRailId?: number;
  retryOnAssertionFail?: boolean;
  areTestsSequential?: boolean;
}

export interface ITest extends IDependantTest {
  dependantTests?: IDependantTest[];
}

export interface IDependantTest {
  repeat?: number;
  name: string;
  xname?: string;
  fname?: string;
  test: () => Promise<void>;
  afterTest?: () => Promise<void>;
  disable?: IDisable;
  testRailId?: number;
  retryOnAssertionFail?: boolean;
  isSequential?: boolean;
}

export interface IDisable {
  reason: string;
  link?: string;
  env?: string;
}
