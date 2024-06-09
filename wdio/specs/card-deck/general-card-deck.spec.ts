import { expect } from "chai";

import { suiteHelper } from "@helpers/suite/suite.helper";
import { service } from "@services/get-services";
import { driver } from "@helpers/driver/driver";
import { envHelper } from "@helpers/env/env.helper";

suiteHelper({
  name: ["Card-deck"],
  beforeAllSpecs: async () => await driver.openUrl(envHelper.getBaseWebUrl()),
  specs: [
    {
      name: "Open card-deck with cards",
      test: async () => {
        await service.cardDeckList.openDecks();
        await service.cardDeckList.openDeckByName("Random cards");
        expect(
          await service.cardDeck.isSourceCardSide(),
          "default card state is not source",
        ).to.be.true;
      },
      dependantTests: [
        {
          name: "Flip card",
          test: async () => {
            await service.cardDeck.flipCard();
            await service.cardDeck.isTranslationCardSide();
          },
        },
      ],
    },
  ],
});
