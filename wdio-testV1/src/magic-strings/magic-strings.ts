export const magicStrings = {
  path: {
    root: process.cwd(),
    get allureReport() {
      return `${this.root}/allure-report`;
    },
    get allureResults() {
      return `${this.root}/allure-results'`;
    },
    get screenshots() {
      return `${this.root}/screenshots`;
    },
  },
};


