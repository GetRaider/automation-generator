export const utils = {
  hasTime(startTime: number, timeout: number): boolean {
    return Date.now() < startTime + timeout;
  },
};
