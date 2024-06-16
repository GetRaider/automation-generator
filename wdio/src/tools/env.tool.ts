import * as fs from "fs";

import { magicStrings } from "@magic-strings/magic-strings";
import { defaultEnvVariables } from "@fixtures/default-env-variables.fixture";

const envFilePath = `${magicStrings.path.root}/.env`;

if (!fs.existsSync(envFilePath)) {
  console.info(`🔄 Creating .env configuration file...`);
  fs.writeFileSync(envFilePath, defaultEnvVariables);
}
