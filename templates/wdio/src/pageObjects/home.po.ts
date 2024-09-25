import { BasePo } from "./base.po";
import { Button } from "@pageElements/button";
import { Label } from "@pageElements/label";

export class HomePo extends BasePo {
  homeButton = new Button("home-button", this.searchFor.element);
  cardDeckListButton = new Button(
    "card-deck-list-button",
    this.searchFor.element,
  );
  createNewCardButton = new Button(
    "create-card-button",
    this.searchFor.element,
  );

  welcomeLabel = new Label("welcome-label", this.searchFor.element);
}
