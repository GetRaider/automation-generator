import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { magicStrings } from "@magic-strings/magic-strings";

const { SPEC_NAMES, SPECS_FOLDER_NAME } = processEnv;

class ConfigHelper {
  private readonly testExtension = ".test.ts";

  getSpecPaths(): string[] {
    const folderPath = this.getSpecsFolderPath();
    return SPEC_NAMES
      ? this.getSpecifiedSpecPathsByFolder(folderPath)
      : [`${folderPath}/*${this.testExtension}`];
  }

  private getSpecsFolderPath(): string {
    const specifiedFolderName = SPECS_FOLDER_NAME
      ? `/${SPECS_FOLDER_NAME}`
      : "";
    return `${magicStrings.path.root}/tests/**${specifiedFolderName}`;
  }

  private getSpecifiedSpecPathsByFolder(folderPath: string): string[] {
    return SPEC_NAMES.split(",").map(specName =>
      specName.endsWith(this.testExtension)
        ? `${folderPath}/${specName}`
        : `${folderPath}/${specName}${this.testExtension}`,
    );
  }
}

export const configHelper = new ConfigHelper();
