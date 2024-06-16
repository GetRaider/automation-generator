import { driver } from "@helpers/driver/driver";

export class BaseService {
  constructor(args) {
    const { page } = args;
  }
  async openUrl(url: string): Promise<string> {
    return driver.openUrl(url);
  }
}
