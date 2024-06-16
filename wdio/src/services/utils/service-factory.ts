import { serviceUtils } from "@services/utils/service.utils";
import { IServiceFactoryArgs } from "@services/utils/types/service-factory.types";

export function serviceFactory(args: IServiceFactoryArgs) {
  const { service, pages, additionalServices = [] } = args;
  const assembledAdditionalServices = {};

  if (additionalServices.length) {
    additionalServices.forEach(
      ({ service, pages, additionalServices }) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (assembledAdditionalServices[normalizeServiceName(service.name)] =
          serviceFactory({
            service,
            pages,
            additionalServices,
          })),
    );
  }

  const serviceArgs = {
    ...serviceUtils.assemblePages(pages),
    ...assembledAdditionalServices,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new service(serviceArgs);
}

function normalizeServiceName(name: string): string {
  const letters = name.split("");
  letters[0] = letters[0].toLowerCase();
  return letters.join(",").replaceAll(",", "").replaceAll("Service", "");
}
