import { driver } from "@helpers/driver/driver";
import { BasePo } from "@pageObjects/base.po";

export class BaseService {
  protected constructor(protected page: BasePo) {}

  async openUrl(url: string): Promise<WebdriverIO.Request | void> {
    return driver.openUrl(url);
  }
}
