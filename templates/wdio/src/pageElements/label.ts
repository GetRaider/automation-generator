import { BasePe } from "./base.pe";
import { timeouts } from "@constants/timeouts.constants";
import { waiterHelper } from "@helpers/waiter/waiter.helper";

export class Label extends BasePe {
  constructor(
    locator: string,
    searchMethod: (locator: string) => Promise<WebdriverIO.Element>,
  ) {
    super(locator, searchMethod);
  }

  async waitForTextToChange(
    params: waitForTextToChangeInterface,
  ): Promise<boolean> {
    const { initialText, timeout = timeouts.xxxs, throwError = true } = params;
    return waiterHelper.wait(
      async () => {
        return (
          (await this.isTextDisappeared()) ||
          initialText !== (await (await this.element).getText())
        );
      },
      timeout,
      {
        throwError,
        errorMessage: `Initial text "${initialText}" didn't change`,
      },
    );
  }

  private async isTextDisappeared(): Promise<boolean> {
    return !(await this.waitUntilExists(0, { throwError: false }));
  }
}

interface waitForTextToChangeInterface {
  initialText: string;
  timeout?: number;
  throwError?: boolean;
}
