export interface IServiceFactoryArgs {
  service: IService;
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

export interface IService {
  name: string;
}
