import {pathMagicStrings} from "./path/path.magic-strings";

export const magicStrings = {
  path: pathMagicStrings,
  errorMessage: {
    elementNotFound: [
      "still not existing",
      `Couldn't find element by locator`,
      `element wasn't found`,
      "element is not attached to the page document",
    ],
  },
};
