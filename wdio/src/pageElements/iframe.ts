import { timeouts } from "@constants/timeouts.constants";
import { BasePe } from "@pageElements/base.pe";

interface IframeInterface {
  switchTo: (timeout: number) => Promise<void>;
  switchBack: () => Promise<void>;
  runInside: <T>(callback: () => Promise<T>) => Promise<T>;
}

export class Iframe extends BasePe implements IframeInterface {
  constructor(
    locator: string,
    searchMethod: (locator: string) => Promise<WebdriverIO.Element>,
  ) {
    super(locator, searchMethod);
  }

  async switchTo(timeout: number = timeouts.xs): Promise<void> {
    await this.waitUntilExists(timeout, { errorMessage: "iframe isn't found" });
    await driver.switchToFrame(await this.element);
  }

  async switchBack(): Promise<void> {
    await driver.switchToParentFrame();
  }

  async runInside<T>(callback: () => Promise<T>): Promise<T> {
    await this.switchTo();
    let result: T = null;
    try {
      result = await callback();
    } finally {
      await this.switchBack();
    }
    return result;
  }
}
