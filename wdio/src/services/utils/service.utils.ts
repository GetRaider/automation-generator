import {
  IPage,
  IServicePages,
} from "@services/utils/types/service-factory.types";

let assembledPage: IPage = null;
const assembledAdditionalPages = {};

export const serviceUtils = {
  assemblePages(pages: IServicePages) {
    const { page, additionalPages = [] } = pages;

    if (!page) {
      throw new Error("At least one page must be provided");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    assembledPage = new page();

    if (additionalPages.length) {
      additionalPages.forEach(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        page => (assembledAdditionalPages[normalize(page.name)] = new page()),
      );
    }

    return { page: assembledPage, ...assembledAdditionalPages };
  },
};

function normalize(name: string): string {
  const letters = name.split("");
  letters[0] = letters[0].toLowerCase();
  return letters.join(",").replaceAll(",", "");
}
