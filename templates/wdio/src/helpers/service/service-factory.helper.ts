import {
  IPage,
  IService,
  IAssembleArgs,
  IAssmbleServicePages,
  IAssembleAllServicesArgs,
} from "@helpers/service/types/service-factory.types";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { IAssembleAllServices } from "@services/types/get-services.types";

const logger = loggerHelper.get("Service-Factory");

interface IServiceFactoryHelper {
  assembleAll: (servicesArgs: IAssembleAllServicesArgs) => IAssembleAllServices;
}

class ServiceFactoryHelper implements IServiceFactoryHelper {
  assembleAll(servicesArgs: IAssembleAllServicesArgs): IAssembleAllServices {
    const allAssembledServices = {};

    if (!Object.keys(servicesArgs).length) {
      logger.fatal("No services provided");
      process.exit(13);
    }

    Object.entries(servicesArgs).forEach(
      ([name, serviceArgs]) =>
        (allAssembledServices[name] = this.assemble(serviceArgs)),
    );

    return allAssembledServices as IAssembleAllServices;
  }

  private assemble(args: IAssembleArgs): IService {
    const { service, pages, additionalServices = [] } = args;

    !this.arePagesExist(service, pages) && process.exit(13);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new service({
      ...this.assemblePages(pages),
      ...this.assembleAdditionalServices(additionalServices),
    });
  }

  private arePagesExist(
    service: IService,
    pages: IAssmbleServicePages,
  ): boolean {
    if (!pages) {
      logger.fatal(`No pages provided for '${service.name}'`);
      return false;
    }

    if (!pages.page) {
      logger.fatal(`No main page provided for '${service.name}'`);
      return false;
    }

    return true;
  }

  private assemblePages(pages: IAssmbleServicePages): Record<string, unknown> {
    const { page, additionalPages = [] } = pages;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const assembledMainPage: IPage = new page();
    const assembledAdditionalPages = {};

    additionalPages.length &&
      additionalPages.forEach(
        page =>
          (assembledAdditionalPages[this.normalize.pageName(page.name)] =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            new page()),
      );

    return { page: assembledMainPage, ...assembledAdditionalPages };
  }

  private assembleAdditionalServices(
    additionalServices: IAssembleArgs[] = [],
  ): Record<string, IAssembleArgs> {
    const assembledAdditionalServices = {};

    additionalServices.length &&
      additionalServices.forEach(({ service, pages, additionalServices }) => {
        return (assembledAdditionalServices[
          this.normalize.serviceName(service.name)
        ] = this.assemble({
          service,
          pages,
          additionalServices,
        }));
      });

    return assembledAdditionalServices;
  }

  private normalize = {
    pageName(name: string): string {
      const letters = name.split("");
      letters[0] = letters[0].toLowerCase();
      return letters.join(",").replaceAll(",", "");
    },

    serviceName(name: string): string {
      const letters = name.split("");
      letters[0] = letters[0].toLowerCase();
      return letters.join(",").replaceAll(",", "").replaceAll("Service", "");
    },
  };
}

export const serviceFactory = new ServiceFactoryHelper();
