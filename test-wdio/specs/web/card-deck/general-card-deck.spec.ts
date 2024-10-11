import { expect } from "chai";

import { suiteHelper } from "@helpers/suite/suite.helper";
import { envHelper } from "@helpers/env/env.helper";
import { app } from "@services/get-services";

const { cardDeck, cardDeckList } = app;

suiteHelper({
  name: ["Card-deck"],
  beforeAllSpecs: async () =>
    await cardDeckList.openUrl(envHelper.getBaseWebUrl()),
  specs: [
    {
      name: "Open card-deck with cards",
      test: async () => {
        await cardDeckList.openDecks();
        await cardDeckList.openDeckByName("Random cards");
        expect(
          await cardDeck.isSourceCardSide(),
          "default card state is not source",
        ).to.be.true;
      },
      dependantTests: [
        {
          name: "Flip card",
          test: async () => {
            await cardDeck.flipCard();
            await cardDeck.isTranslationCardSide();
          },
        },
      ],
    },
  ],
});
