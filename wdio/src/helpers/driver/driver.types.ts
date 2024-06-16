export interface IWaitArgs {
  errorMessage?: string;
  interval?: number;
}

export interface ISetLocalStorageDataArgs {
  key: string;
  value: string;
}

export interface IDragAndDropUsingBrowserActions {
  from: WebdriverIO.Element;
  to: WebdriverIO.Element;
}

export interface IExecuteOptions {
  throwError?: boolean;
  errorMessage?: string;
}
