export interface IConstructPathArgs {
  base: string;
  params?: string[];
  queries?: Record<string, string | number>;
}

export interface IConstructOptions {
  shouldGetExistingArgs?: boolean;
  shouldSkipMissingArgs?: boolean;
}
