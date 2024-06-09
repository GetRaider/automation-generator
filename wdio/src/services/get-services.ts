import { HomeService } from "@services/home.service";
import { HomePo } from "@pageObjects/home.po";
import { CardDeckListService } from "@services/card-deck-list.service";
import { CardDeckListPo } from "@pageObjects/card-deck-list.po";
import { CardDeckPo } from "@pageObjects/card-deck.po";
import { CardDeckService } from "@services/card-deck.service";

export const service = {
  ...getServices(),
};

function getServices() {
  return {
    home: new HomeService({ page: new HomePo() }),
    cardDeckList: new CardDeckListService({
      page: new CardDeckListPo(),
      homeService: new HomeService({ page: new HomePo() }),
    }),
    cardDeck: new CardDeckService({ page: new CardDeckPo() }),
  };
}
