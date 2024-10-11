import { IConstructOptions, IConstructPathArgs } from "@helpers/url/url.types";
import { utils } from "@helpers/url/utils/utils";

export const urlHelper = {
  construct(args: IConstructPathArgs, options: IConstructOptions = {}): string {
    const { base, params, queries } = args;
    const { shouldGetExistingArgs = false, shouldSkipMissingArgs = false } =
      options;
    const strictParams = utils.getParams(params, shouldSkipMissingArgs);
    const strictQuery = utils.getQuery(queries, shouldSkipMissingArgs);

    return shouldGetExistingArgs
      ? `${base}${utils.getExistingParams(...params)}${utils.getExistingQuery(
          queries,
        )}`
      : `${base}${strictParams}${strictQuery}`;
  },

  getQueryValues(url: string, queryKeys: string[]): Record<string, string> {
    const { searchParams } = new URL(url);
    const queryValues = {};

    queryKeys.forEach(queryKey => {
      queryValues[queryKey] = searchParams.get(queryKey);
    });

    return queryValues;
  },
};
