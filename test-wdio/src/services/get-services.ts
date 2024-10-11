import { HomePo, CardDeckListPo, CardDeckPo } from "@pageObjects/index";
import {
  HomeService,
  CardDeckService,
  CardDeckListService,
} from "@services/index";
import { IAssembleAllServices } from "@services/types/get-services.types";
import { serviceFactory } from "@helpers/service/service-factory.helper";

export const services = {
  ...getServices(),
};

function getServices(): IAssembleAllServices {
  return serviceFactory.assembleAll({
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
