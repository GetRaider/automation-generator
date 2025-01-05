import { IHomeServiceArgs } from "@services/types/home.service.types";
import { HomePo } from "@pageObjects/home.po";
import { BaseService } from "@services/base.service";

export class HomeService extends BaseService {
  protected override readonly page: HomePo = null;

  constructor(args: IHomeServiceArgs) {
    const { page } = args;
    super(page);
    this.page = page;
  }

  async navigateToCardDeckLists() {
    await this.page.homeButton.click();
    await this.page.cardDeckListButton.click();
  }
}
