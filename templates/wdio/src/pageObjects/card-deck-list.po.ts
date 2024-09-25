import { BasePo } from "./base.po";
import { Button } from "@pageElements/button";

export class CardDeckListPo extends BasePo {
  async getCardDeckListButtonByName(name: string) {
    return new Button(`${name}_card-deck-button`, this.searchFor.element);
  }
}
