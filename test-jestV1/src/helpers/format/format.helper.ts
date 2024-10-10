import { IJsonStringifyOptions } from "@helpers/format/format.types";

export const formatHelper = {
  json: {
    stringify(value: unknown, options: IJsonStringifyOptions = {}): string {
      const { replacer = null, spaces = 2 } = options;
      return JSON.stringify(value, replacer, spaces);
    },
  },
  string: {
    removeLast(source: string, charToRemove: string): string {
      if (source.length > 0 && source[source.length - 1] === charToRemove) {
        return source.slice(0, -1);
      }
      return source;
    },
  },
};
