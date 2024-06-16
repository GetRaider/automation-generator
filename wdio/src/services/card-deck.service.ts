import { BaseService } from "@services/index";
import { CardDeckPo } from "@pageObjects/index";
import { ICardDeckServiceArgs } from "@services/types/card-deck.service.types";

export class CardDeckService extends BaseService {
  protected override readonly page: CardDeckPo = null;

  constructor(args: ICardDeckServiceArgs) {
    const { page } = args;
    super(page);
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
