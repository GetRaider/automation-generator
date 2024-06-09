import { BaseService } from "@services/base.service";
import { CardDeckPo } from "@pageObjects/card-deck.po";
import { ICardDeckServiceArgs } from "@services/types/card-deck.service.types";

export class CardDeckService extends BaseService {
  private readonly page: CardDeckPo = null;

  constructor(args: ICardDeckServiceArgs) {
    super();
    const { page } = args;
    this.page = page;
  }

  async isSourceCardSide(): Promise<boolean> {
    return this.page.sourceCardButton.isDisplayed();
  }

  async isTranslationCardSide(): Promise<boolean> {
    return this.page.translationCardButton.isDisplayed();
  }

  async flipCard(): Promise<void> {
    return (await this.page.sourceCardButton.isDisplayed())
      ? this.page.sourceCardButton.click()
      : this.page.translationCardButton.click();
  }
}
