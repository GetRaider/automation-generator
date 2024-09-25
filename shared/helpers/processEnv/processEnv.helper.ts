import { config } from "dotenv";

config();

interface processEnvHelperInterface {
  ENV: string;
  CI: string;
  USER_PASSWORD: string;
  SPEC_NAMES: string;
  MOCHA_TIMEOUT: string;
  WEB_URL: string;
  API_URL: string;
}

export const processEnv = process.env as unknown as processEnvHelperInterface;
