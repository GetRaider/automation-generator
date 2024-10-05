import {loggerHelper} from "@helpers/logger/logger.helper";

// eslint-disable-next-line @typescript-eslint/ban-types
export function ClassLog(target: Function) {
  const logger = loggerHelper.get(target.name);

  // Iterate through all properties of the class prototype
  for (const propertyKey of Object.getOwnPropertyNames(target.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyKey);

    // Only apply to functions (exclude constructor)
    if (descriptor && typeof descriptor.value === 'function' && propertyKey !== 'constructor') {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: never[]) {
        logger.trace(`${String(propertyKey)} ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
      };

      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  }
}
