import * as fs from "fs";

export const fsHelper = {
  removeDirectories(...directories: string[]): void {
    directories.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.rm(dir, { recursive: true }, err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  },
};
