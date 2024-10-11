import { formatHelper } from "@helpers/format/format.helper";

export const utils = {
  getExistingParams(...possibleParams: string[]): string {
    return possibleParams
      .map(possibleParam => {
        const param = possibleParam ?? "";
        return `${param && `/${param}`}`;
      })
      .join(",")
      .replaceAll(",", "");
  },

  getExistingQuery(possibleQueries: Record<string, string | number>): string {
    if (!possibleQueries) {
      return "";
    }
    const queryParts = Object.keys(possibleQueries).map(key => {
      const possibleQuery = possibleQueries[key] ?? "";
      return `${
        possibleQuery &&
        `${encodeURIComponent(key)}=${encodeURIComponent(possibleQueries[key])}`
      }`;
    });
    return queryParts.some(queryPart => queryPart.length)
      ? formatHelper.string.removeLast(`?${queryParts.join("&")}`, "&")
      : "";
  },

  getParams(params: string[], shouldSkipMissingArgs: boolean): string {
    if (shouldSkipMissingArgs && !params.length) {
      return "";
    }

    if (params.some(param => !param)) {
      throw new Error(
        `Some of passed params is null or undefined: ${formatHelper.json.stringify(
          params,
        )}`,
      );
    }
    return params
      .map(param => {
        return `/${param}`;
      })
      .join(",")
      .replaceAll(",", "");
  },

  getQuery(
    queries: Record<string, string | number>,
    shouldSkipMissingArgs: boolean,
  ): string {
    if (shouldSkipMissingArgs && !queries) {
      return "";
    }

    if (Object.values(queries).some(query => !query)) {
      throw new Error(
        `Some of passed queries is null or undefined: ${formatHelper.json.stringify(
          { value: queries },
        )}`,
      );
    }

    const queryKeys = Object.keys(queries);
    const queryParts = queryKeys.map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
    );
    return `?${queryParts.join("&")}`;
  },
};
