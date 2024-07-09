interface IDependantTest {
  repeat?: number;
  name: string;
  xname?: string;
  fname?: string;
  test: () => Promise<void>;
  afterTest?: () => Promise<void>;
  disable?: IDisable;
  testRailId?: number;
  isSequential?: boolean;
}

export interface ITest extends IDependantTest {
  dependantTests?: IDependantTest[];
}

export interface ISuiteV2 {
  name: string;
  testRailSuiteId?: number;
  beforeAllSpecs?: () => Promise<unknown> | unknown;
  beforeEachSpec?: () => Promise<unknown> | unknown;
  afterEachSpec?: () => Promise<unknown> | unknown;
  afterAllSpecs?: () => Promise<unknown> | unknown;
  specs: ITest[];
  testRailId?: number;
  areTestsSequential?: boolean;
}

export interface IDisable {
  reason: string;
  link?: string;
  env?: string;
}
