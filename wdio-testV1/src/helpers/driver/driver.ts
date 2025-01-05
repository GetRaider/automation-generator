import { loggerHelper } from "@helpers/logger/logger.helper";
import { timeouts } from "@constants/timeouts.constants";
import {
  IDragAndDropUsingBrowserActions,
  IExecuteOptions,
  ISetLocalStorageDataArgs,
  IWaitArgs,
} from "@helpers/driver/driver.types";

const logger = loggerHelper.get("Driver-Helper");

class DriverHelper {
  readonly defaultImplicitTimeout = timeouts.xxs;

  async openUrl(url: string): Promise<WebdriverIO.Request | void> {
    return browser.url(url);
  }

  async getCurrentUrl(): Promise<string> {
    return browser.getUrl();
  }

  async refresh(): Promise<void> {
    return browser.refresh();
  }
  async getBrowserBaseUrl(): Promise<string> {
    return browser.options.baseUrl;
  }
  async switchWindowByName(name: string): Promise<void> {
    await browser.switchWindow(name);
  }

  async saveScreenshot(screenshotPath: string): Promise<void> {
    await browser.saveScreenshot(screenshotPath);
  }

  async takeScreenshot(): Promise<string> {
    return browser.takeScreenshot();
  }

  async execute<ReturnValue, InnerArguments>(
    script: unknown,
    args?: InnerArguments,
    options: IExecuteOptions = {},
  ): Promise<ReturnValue> {
    const { throwError = true, errorMessage = "" } = options;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    try {
      return browser.execute(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        script,
        args,
      );
    } catch (err) {
      logger.error(`Can't execute due to: ${err.message}`);
      if (throwError) {
        throw new Error(`Can't execute due to: ${errorMessage} ${err.message}`);
      }
    }
  }

  async findElement(locator: string): Promise<WebdriverIO.Element> {
    try {
      return browser.$(`[data-testid='${locator}']`).getElement();
    } catch (error) {
      const errorMessage = `Can't find element with "${locator}" locator due to: ${error.message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async findElements(locator: string): Promise<WebdriverIO.ElementArray> {
    try {
      return browser.$$(`[data-testid='${locator}']`).getElements();
    } catch (error) {
      const errorMessage = `Can't find elements with "${locator}" locator due to: ${error.message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async setImplicitTimeout(timeout: number): Promise<void> {
    await browser.setTimeout({ implicit: timeout });
  }

  async runWithoutImplicitTimeout(
    callback: () => Promise<boolean>,
  ): Promise<boolean> {
    try {
      await this.setImplicitTimeout(0);
      return callback();
    } finally {
      await this.setImplicitTimeout(this.defaultImplicitTimeout);
    }
  }

  async wait(
    callback: () => Promise<boolean>,
    timeout: number,
    params: IWaitArgs = {},
  ): Promise<boolean> {
    const { errorMessage, interval } = params;
    return browser.waitUntil(callback, {
      timeout,
      interval,
      timeoutMsg: errorMessage,
    });
  }

  async switchToFrame(element: WebdriverIO.Element): Promise<void> {
    return browser.switchToFrame(element);
  }

  async switchToParentFrame(): Promise<void> {
    return browser.switchToParentFrame();
  }

  async getLocalStorageDataByKey(key: string): Promise<string> {
    return this.execute<string, string>(
      (key: string) => localStorage.getItem(key),
      key,
    );
  }

  async setLocalStorageData(args: ISetLocalStorageDataArgs): Promise<void> {
    const { key, value } = args;
    await this.execute<string, ISetLocalStorageDataArgs>(
      (key: string, value: string) => localStorage.setItem(key, value),
      { key, value },
    );
  }

  async getAvailableWindows(): Promise<string[]> {
    logger.debug("Getting available Windows");
    return browser.getWindowHandles();
  }

  async removeElementsFromDomByLocators(locators: string[]): Promise<void> {
    if (!locators.length) {
      return;
    }
    await this.execute(
      locatorsToRemove =>
        document
          .querySelectorAll(locatorsToRemove)
          .forEach(locatorToRemove => locatorToRemove.remove()),
      [locators],
      { errorMessage: `Failed to remove element by locator: ${locators}` },
    );
  }

  async dragAndDropUsingBrowserActions(
    params: IDragAndDropUsingBrowserActions,
  ): Promise<void> {
    const { from, to } = params;
    return browser
      .action("pointer")
      .move({ duration: 0, origin: from, x: 0, y: 0 })
      .down({ button: 0 })
      .move({ duration: 0, origin: "pointer", x: 0, y: 0 })
      .pause(10)
      .move({ duration: 0, origin: to, x: 0, y: 0 })
      .move({ duration: 0, origin: "pointer", x: 1, y: 0 })
      .move({ duration: 0, origin: "pointer", x: -1, y: 0 })
      .up({ button: 0 })
      .perform();
  }
}

export const driver = new DriverHelper();
