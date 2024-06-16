import { IServiceFactoryArgs } from "@services/utils/types/service-factory.types";
import { serviceFactory } from "@services/utils/service-factory";
import { IGetAppServices } from "@services/types/get-services.types";
import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("Services-Assembler");

export function assembleServices(
  services: Record<string, IServiceFactoryArgs>,
): IGetAppServices {
  const assembledServices = {};

  if (!Object.keys(services).length) {
    logger.fatal("No services provided");
    process.exit(13);
  }

  Object.entries(services).forEach(
    ([name, serviceArgs]) =>
      (assembledServices[name] = serviceFactory(serviceArgs)),
  );

  return { ...assembledServices } as IGetAppServices;
}
