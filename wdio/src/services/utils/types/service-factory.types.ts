export interface IServiceFactoryArgs {
  service: unknown;
  pages: IServicePages;
  additionalServices?: IServiceFactoryArgs[];
}

export interface IServicePages {
  page: IPage;
  additionalPages?: IPage[];
}

export interface IPage {
  name: string;
}
