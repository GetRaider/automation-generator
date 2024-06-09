import { driver } from "@helpers/driver/driver";

export class BasePo {
  protected searchFor = {
    element: (locator: string) => driver.findElement(locator),
    elements: (locator: string) => driver.findElements(locator),
  };
}
