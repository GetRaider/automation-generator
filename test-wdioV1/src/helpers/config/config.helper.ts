import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { magicStrings } from "@magic-strings/magic-strings";

const { SPEC_NAMES, SPECS_FOLDER_NAME } = processEnv;

class ConfigHelper {
  public readonly specsType = { api: "api", web: "web" };
  private readonly specExtension = ".spec.ts";

  getSpecPathsByType(specsType: string): string[] {
    const folderPath = this.getSpecsFolderPathByType(specsType);
    return SPEC_NAMES
      ? this.getSpecifiedSpecPathsByFolder(folderPath)
      : [`${folderPath}/*${this.specExtension}`];
  }

  private getSpecsFolderPathByType(specsType: string): string {
    const specifiedFolderName = SPECS_FOLDER_NAME
      ? `/${SPECS_FOLDER_NAME}`
      : "";
    return `${magicStrings.path.root}/specs/${specsType}/**${specifiedFolderName}`;
  }

  private getSpecifiedSpecPathsByFolder(folderPath: string): string[] {
    return SPEC_NAMES.split(",").map(specName =>
      specName.endsWith(this.specExtension)
        ? `${folderPath}/${specName}`
        : `${folderPath}/${specName}${this.specExtension}`,
    );
  }
}

export const configHelper = new ConfigHelper();
