export interface IWaitArgs {
  errorMessage?: string;
  interval?: number;
}

export interface IRunInFrameArgs {
  frame: WebdriverIO.Element;
  callback: () => Promise<void>;
  allowErrorInside: boolean;
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
