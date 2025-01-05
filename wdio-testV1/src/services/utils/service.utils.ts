import {
  IPage,
  IServiceFactoryArgs,
  IServicePages,
} from "@services/utils/types/service-factory.types";
import { serviceFactory } from "@services/utils/service-factory";

let assembledMainPage: IPage = null;
const assembledAdditionalPages = {};

export const serviceUtils = {
  assembleAdditionalServices(
    additionalServices: IServiceFactoryArgs[] = [],
  ): Record<string, IServiceFactoryArgs> {
    const assembledAdditionalServices = {};

    additionalServices &&
      additionalServices.forEach(
        ({ service, pages, additionalServices }) =>
          (assembledAdditionalServices[normalizeServiceName(service.name)] =
            serviceFactory({
              service,
              pages,
              additionalServices,
            })),
      );

    return assembledAdditionalServices;
  },

  assemblePages(pages: IServicePages): Record<string, unknown> {
    const { page, additionalPages = [] } = pages;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    assembledMainPage = new page();

    additionalPages.length &&
      additionalPages.forEach(
        page =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (assembledAdditionalPages[normalizePageName(page.name)] = new page()),
      );

    return { page: assembledMainPage, ...assembledAdditionalPages };
  },
};

function normalizePageName(name: string): string {
  const letters = name.split("");
  letters[0] = letters[0].toLowerCase();
  return letters.join(",").replaceAll(",", "");
}

function normalizeServiceName(name: string): string {
  const letters = name.split("");
  letters[0] = letters[0].toLowerCase();
  return letters.join(",").replaceAll(",", "").replaceAll("Service", "");
}
