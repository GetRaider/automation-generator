import {CustomConsole, LogType, LogMessage} from "@jest/console";

function format(type: LogType, message: LogMessage): string {
  return message
    .split(/\n/)
    .map(line => "> " + line)
    .join("\n");
}

global.console = new CustomConsole(
  process.stdout,
  process.stderr,
  format,
);
