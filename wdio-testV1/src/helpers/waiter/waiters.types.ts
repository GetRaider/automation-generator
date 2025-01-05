export interface IWaitOptions {
  errorMessage?: string;
  interval?: number;
  throwError?: boolean;
}

export interface ISleepArgs {
  timeout: number;
  sleepReason?: string;
  ignoreReason?: boolean;
}

export interface IRetryOptions {
  interval?: number;
  throwError?: boolean;
  resolveWhenNoException?: boolean;
  continueWithException?: boolean;
  errorMessage?: string;
}
