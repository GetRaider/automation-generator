import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { magicStrings } from "@magic-strings/magic-strings";

const { SPEC_NAMES } = processEnv;

class ConfigHelper {
  private readonly specExtension = ".spec.ts";

  getWebSpecPaths(): string[] {
    const folderPath = this.getSpecsFolderPath();
    return SPEC_NAMES
      ? this.getSpecifiedSpecPaths(folderPath)
      : [`${folderPath}/*${this.specExtension}`];
  }

  private getSpecsFolderPath(): string {
    const specifiedFolderName = processEnv.SPECS_FOLDER_NAME
      ? `/${processEnv.SPECS_FOLDER_NAME}`
      : "";
    return `${magicStrings.path.root}/specs/web/**${specifiedFolderName}`;
  }

  private getSpecifiedSpecPaths(folderPath: string): string[] {
    return SPEC_NAMES.split(",").map(specName =>
      specName.endsWith(this.specExtension)
        ? `${folderPath}/${specName}`
        : `${folderPath}/${specName}${this.specExtension}`,
    );
  }
}

export const configHelper = new ConfigHelper();
