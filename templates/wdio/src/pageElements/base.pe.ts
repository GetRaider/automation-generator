import { loggerHelper } from "@helpers/logger/logger.helper";
import {
  IClick,
  IHoverOptions,
  ScrollIntoViewPosition,
} from "./types/base.pe.types";
import { waiterHelper } from "@helpers/waiter/waiter.helper";
import { timeouts } from "@constants/timeouts.constants";
import { driver } from "@helpers/driver/driver";
import { IWaitOptions } from "@helpers/waiter/waiters.types";

const logger = loggerHelper.get("Base-Pe");
const overlappingElementErrors = [
  "Other element would receive the click",
  `because another element`,
];

export class BasePe {
  locator: string = null;
  searchMethod: (locator: string) => Promise<WebdriverIO.Element> = null;

  constructor(
    locator: string,
    searchMethod: (locator: string) => Promise<WebdriverIO.Element>,
  ) {
    this.locator = locator;
    this.searchMethod = searchMethod;
  }

  protected get element(): Promise<WebdriverIO.Element> {
    return this.searchMethod(this.locator);
  }

  async click(params: IClick = {}): Promise<void> {
    let { retry = 0 } = params;
    const {
      throwError = true,
      removeOverlappingElement = false,
      removeOverlappingElementTries = 3,
      coordinates,
      useCoordinates,
    } = params;
    if (useCoordinates || coordinates) {
      return (await this.element).click(coordinates || { x: 0, y: 0 });
    }
    do {
      try {
        return await this.simpleClick(params);
      } catch (err) {
        if (
          this.shouldRemoveOverlappingElement(
            removeOverlappingElement,
            removeOverlappingElementTries,
          )
        ) {
          return this.clickWithRemovingOverlappingElement(params, err);
        }
        if (this.shouldThrow(retry, throwError)) {
          throw err;
        }
        await this.sleepAndLog(params, err);
      }
    } while (retry--);
  }

  async scrollTo(): Promise<void> {
    await (
      await this.element
    ).scrollIntoView({
      block: ScrollIntoViewPosition.end,
      inline: ScrollIntoViewPosition.nearest,
    });
  }

  async hover(params: IHoverOptions = {}): Promise<void> {
    const { retryCount, coordinates, waitForComponent } = params;
    await (await this.element).moveTo(coordinates);
    if (retryCount) {
      await waiterHelper.retry(
        async () => {
          await (await this.element).moveTo(coordinates);
          return waitForComponent
            ? waitForComponent.waitUntilDisplayed(timeouts.xxxs, {
                throwError: false,
              })
            : this.isDisplayed();
        },
        retryCount,
        { errorMessage: "failed to hover" },
      );
    }
  }

  async isPresent(): Promise<boolean> {
    return driver.runWithoutImplicitTimeout(async () =>
      (await this.element).waitForExist({ timeout: 0 }),
    );
  }

  async isDisplayed(): Promise<boolean> {
    return (
      (await this.isPresent()) &&
      driver.runWithoutImplicitTimeout(async () =>
        (await this.element).isDisplayed(),
      )
    );
  }

  async isClickable(): Promise<boolean> {
    return driver.runWithoutImplicitTimeout(async () =>
      (await this.element).isClickable(),
    );
  }

  async isEnabled(): Promise<boolean> {
    return (await this.element).isEnabled();
  }

  async waitUntilDisplayed(
    timeout: number,
    options: IWaitOptions = {},
  ): Promise<boolean> {
    return waiterHelper.wait(async () => this.isDisplayed(), timeout, options);
  }

  async waitUntilExists(
    timeout: number,
    params: IWaitOptions = {},
  ): Promise<boolean> {
    return waiterHelper.wait(async () => this.isPresent(), timeout, params);
  }

  private async simpleClick(params: IClick): Promise<void> {
    const { scrollIntoView = true, hover = false, hoverRetry = 0 } = params;
    scrollIntoView && (await this.scrollTo());
    hover && (await this.hover({ retryCount: hoverRetry }));
    return (await this.element).click();
  }

  private async sleepAndLog(params: IClick, err: Error): Promise<void> {
    const { retry, retryInterval = 100 } = params;
    await waiterHelper.sleep({ timeout: retryInterval, ignoreReason: true });
    logger.debug(`Failed to click: ${err}${retry ? " retrying" : ""}`);
  }

  private async clickWithRemovingOverlappingElement(
    params: IClick,
    err: Error,
  ): Promise<void> {
    const { removeOverlappingElementTries } = params;
    logger.warn(`Failed to click element: ${err}`);
    if (
      !overlappingElementErrors.find(overlappingError =>
        err.message.includes(overlappingError),
      )
    ) {
      logger.warn(`Nothing covers the element`);
      return this.click({ ...params, removeOverlappingElement: false });
    }
    await this.removeOverlappingElement(err.message);
    return this.click({
      ...params,
      removeOverlappingElementTries: removeOverlappingElementTries - 1,
    });
  }

  private shouldThrow(retry: number, throwError: boolean): boolean {
    return !retry && throwError;
  }

  private async removeOverlappingElement(error: string): Promise<void> {
    let noAttributes = false;
    const message = error
      .replace(/.*Other element would receive the click: </, "")
      .replace(/.*because another element </, "");
    const tag = message.replace(/\s.*/s, "").replace(/>.*/s, "");
    const attributes = message
      .replace(`${tag} `, "")
      .replace(/>.*/s, "")
      .replace(/"\s/, '"][');
    if (tag === attributes) {
      noAttributes = true;
      logger.warn(
        `covering element doesn't have attributes. Trying to remove using button's locator`,
      );
    }
    const css = noAttributes
      ? `${this.locator} ${tag}}`
      : `${tag}[${attributes}]`;
    try {
      await driver.removeElementsFromDomByLocators([css]);
    } catch (err) {
      logger.warn(`Failed to remove element: ${err}`);
    }
  }

  private shouldRemoveOverlappingElement(
    removeOverlappingElement: boolean,
    removeOverlappingElementTries: number,
  ): number {
    return removeOverlappingElement && removeOverlappingElementTries;
  }
}
