import { IGetServices } from "@services/get-services";
import { IServiceFactoryArgs } from "@services/utils/types/service-factory.types";
import { serviceFactory } from "@services/utils/service-factory";

export function assembleServices(
  services: Record<string, IServiceFactoryArgs>,
): IGetServices {
  const assembledServices = {};

  if (!services) {
    throw new Error("At least one service must be provided");
  }

  Object.entries(services).forEach(
    ([name, serviceArgs]) =>
      (assembledServices[name] = serviceFactory(serviceArgs)),
  );

  return <IGetServices>assembledServices;
}
