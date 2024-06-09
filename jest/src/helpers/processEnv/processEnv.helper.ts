import { config } from "dotenv";

config();

interface processEnvHelperInterface {
  ENV: string;
  IS_CI: string;
  USER_PASSWORD: string;
  SPEC_NAMES: string;
  MOCHA_TIMEOUT: string;
}

export const processEnv = process.env as unknown as processEnvHelperInterface;
