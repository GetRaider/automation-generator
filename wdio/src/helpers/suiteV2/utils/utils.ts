import { ITest } from "@helpers/suite/types/suite.types";
import { executorUtils } from "@helpers/suite/utils/executor.utils";
import { executeTestUtils } from "@helpers/suite/utils/executeTest.utils";
import { postConditionUtils } from "@helpers/suite/utils/prePostConditions.utils";

export const utils = {
  areAllSpecsDisabled(specs: ITest[]): boolean {
    return specs.every(spec => executeTestUtils.isDisabled(spec.disable));
  },
  executor: executorUtils,
  conditions: postConditionUtils,
};
