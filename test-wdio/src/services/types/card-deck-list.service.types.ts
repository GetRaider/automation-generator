import { CardDeckListPo } from "@pageObjects/card-deck-list.po";
import { HomeService } from "@services/home.service";

export interface ICardDeckListServiceArgs {
  page: CardDeckListPo;
  home: HomeService;
}
