import allureReporter from "@wdio/allure-reporter";
import allure from "allure-commandline";

import { timeouts } from "@constants/timeouts.constants";
import { StepStatus } from "@helpers/reporter/allure.helper.types";

export const allureHelper = {
  async addAttachment(
    name: string,
    value: string | Buffer,
    type?: string,
  ): Promise<void> {
    allureReporter.addAttachment(name, value, type);
  },

  async addStep(stepName: string): Promise<void> {
    allureReporter.addStep(stepName);
  },
  async addStartStep(stepName: string): Promise<void> {
    allureReporter.startStep(stepName);
  },

  async addEndStep(status: StepStatus): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    allureReporter.endStep(status);
  },

  async addEndStepByResult(result: boolean): Promise<void> {
    return result
      ? await this.addEndStep(StepStatus.passed)
      : await this.addEndStep(StepStatus.failed);
  },

  async generate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const generation = allure(["generate", "allure-results", "--clean"]);
      const generationTimeout = setTimeout(() => {
        console.error(`Report generation timeout reached`);
        return reject(false);
      }, timeouts.xl);

      generation.on("exit", async (exitCode: number) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          console.error(
            `Report generation finished with exit code: ${exitCode}`,
          );
          return reject(false);
        }
        return resolve(true);
      });
    });
  },
};
