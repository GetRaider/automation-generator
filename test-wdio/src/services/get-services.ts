import { assembleServices } from "@services/utils/service-assembler";
import { HomePo, CardDeckListPo, CardDeckPo } from "@pageObjects/index";
import {
  HomeService,
  CardDeckService,
  CardDeckListService,
} from "@services/index";
import { IGetAppServices } from "@services/types/get-services.types";

export const app = {
  ...getAppServices(),
};

function getAppServices(): IGetAppServices {
  return assembleServices({
    home: {
      service: HomeService,
      pages: { page: HomePo },
    },
    cardDeck: { service: CardDeckService, pages: { page: CardDeckPo } },
    cardDeckList: {
      service: CardDeckListService,
      pages: { page: CardDeckListPo },
      additionalServices: [{ service: HomeService, pages: { page: HomePo } }],
    },
  });
}
