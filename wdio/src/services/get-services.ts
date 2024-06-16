import { assembleServices } from "@services/utils/service-assembler";
import { HomeService } from "@services/home.service";
import { CardDeckListService } from "@services/card-deck-list.service";
import { CardDeckService } from "@services/card-deck.service";
import { HomePo, CardDeckListPo, CardDeckPo } from "@pageObjects/index";

export const app = {
  ...getAppServices(),
};

function getAppServices(): IGetServices {
  return {
    ...assembleServices({
      home: { service: HomeService, pages: { page: HomePo } },
      cardDeck: { service: CardDeckService, pages: { page: CardDeckPo } },
      cardDeckList: {
        service: CardDeckListService,
        pages: { page: CardDeckListPo },
        additionalServices: [{ service: HomeService, pages: { page: HomePo } }],
      },
    }),
  };
}

export interface IGetServices {
  home: HomeService;
  cardDeck: CardDeckService;
  cardDeckList: CardDeckListService;
}
