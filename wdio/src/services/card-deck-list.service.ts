import { BaseService, HomeService } from "@services/index";
import { CardDeckListPo } from "@pageObjects/index";
import { ICardDeckListServiceArgs } from "@services/types/card-deck-list.service.types";

export class CardDeckListService extends BaseService {
  private readonly page: CardDeckListPo = null;
  private readonly home: HomeService = null;

  constructor(args: ICardDeckListServiceArgs) {
    super();
    const { page, home } = args;
    this.page = page;
    this.home = home;
  }

  async openDecks(): Promise<void> {
    return this.home.navigateToCardDeckLists();
  }

  async openDeckByName(name: string): Promise<void> {
    return (await this.page.getCardDeckListButtonByName(name)).click();
  }
}
