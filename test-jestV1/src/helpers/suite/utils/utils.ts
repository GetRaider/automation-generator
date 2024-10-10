import {executorUtils} from "./executor.utils";
import {postConditionUtils} from "./prePostConditions.utils";
import {ITest} from "../types/suite.types";
import {executeTestUtils} from "./executeTest.utils";

export const utils = {
  areAllSpecsDisabled(specs: ITest[]): boolean {
    return specs.every(spec => executeTestUtils.isDisabled(spec.disable));
  },
  executor: executorUtils,
  prePostConditions: postConditionUtils,
};
