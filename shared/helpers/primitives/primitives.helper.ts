export const primitivesHelper = {
  string: {
    toBoolean(str: string): boolean {
      switch (str) {
        case "true":
          return true;
        case "false":
        case undefined:
        case "":
          return false;
        default:
          throw new Error(`wrong string: ${str}`);
      }
    },
  },
  getRandom: {
    number(max = 100) {
      return Math.floor(Math.random() * max);
    },
  },
};
