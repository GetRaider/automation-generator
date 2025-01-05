export interface IAssembleArgs {
  service: IService;
  pages: IAssmbleServicePages;
  additionalServices?: IAssembleArgs[];
}

export interface IAssembleAllServicesArgs {
  home: IAssembleArgs;
  cardDeck: IAssembleArgs;
  cardDeckList: IAssembleArgs;
}

export interface IAssmbleServicePages {
  page: IPage;
  additionalPages?: IPage[];
}

export interface IPage {
  name: string;
}

export interface IService {
  name: string;
}
