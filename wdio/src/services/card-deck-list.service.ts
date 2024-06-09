import { BaseService } from "@services/base.service";
import { CardDeckListPo } from "@pageObjects/card-deck-list.po";
import { HomeService } from "@services/home.service";
import { ICardDeckListServiceArgs } from "@services/types/card-deck-list.service.types";

export class CardDeckListService extends BaseService {
  private readonly page: CardDeckListPo = null;
  private readonly homeService: HomeService = null;

  constructor(args: ICardDeckListServiceArgs) {
    super();
    const { page, homeService } = args;
    this.page = page;
    this.homeService = homeService;
  }

  async openDecks(): Promise<void> {
    return this.homeService.navigateToCardDeckLists();
  }

  async openDeckByName(name: string): Promise<void> {
    return (await this.page.getCardDeckListButtonByName(name)).click();
  }
}
