import { BasePo } from "./base.po";
import { Button } from "@pageElements/button";

export class CardDeckPo extends BasePo {
  sourceCardButton = new Button("source-card-button", this.searchFor.element);
  translationCardButton = new Button(
    `translation-card-button`,
    this.searchFor.element,
  );
}
