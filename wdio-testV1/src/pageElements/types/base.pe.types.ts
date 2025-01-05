import { BasePe } from "@pageElements/base.pe";

export interface ILocation {
  x: number;
  y: number;
}

export interface ICoordinates extends ILocation {}

export interface IClick {
  retry?: number;
  throwError?: boolean;
  retryInterval?: number;
  removeOverlappingElement?: boolean;
  removeOverlappingElementTries?: number;
  hover?: boolean;
  hoverRetry?: number;
  useCoordinates?: boolean;
  coordinates?: ICoordinates;
  scrollIntoView?: boolean;
}

export enum ScrollIntoViewPosition {
  center = "center",
  end = "end",
  nearest = "nearest",
  start = "start",
}

export interface IHoverOptions {
  retryCount?: number;
  coordinates?: { xOffset: number; yOffset: number };
  waitForComponent?: BasePe;
}
