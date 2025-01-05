import { config } from "dotenv";

config();

interface processEnvHelperInterface {
  ENV: string;
  CI: string;
  USER_PASSWORD: string;
  SPEC_NAMES: string;
  SPECS_FOLDER_NAME: string;
  WEB_URL: string;
  API_URL: string;
  TEST_RUNNER_TIMEOUT: string;
}

export const processEnv = process.env as unknown as processEnvHelperInterface;
