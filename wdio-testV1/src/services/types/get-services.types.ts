import { HomeService } from "@services/home.service";
import { CardDeckService } from "@services/card-deck.service";
import { CardDeckListService } from "@services/card-deck-list.service";

export interface IAssembleAllServices {
  home: HomeService;
  cardDeck: CardDeckService;
  cardDeckList: CardDeckListService;
}
