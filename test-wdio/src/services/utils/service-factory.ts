import {
  IService,
  IServiceFactoryArgs,
  IServicePages,
} from "@services/utils/types/service-factory.types";
import { serviceUtils } from "@services/utils/service.utils";
import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("Service-Factory");

export function serviceFactory(args: IServiceFactoryArgs) {
  const { service, pages, additionalServices = [] } = args;

  !arePagesExist(service, pages) && process.exit(13);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new service({
    ...serviceUtils.assemblePages(pages),
    ...serviceUtils.assembleAdditionalServices(additionalServices),
  });
}

function arePagesExist(service: IService, pages: IServicePages): boolean {
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
