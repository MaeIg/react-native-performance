import { exec } from "child_process";

export const executeCommand = async (command: string): Promise<string> => {
  return new Promise((resolve, reject) =>
    exec(command, (error, stdout) => {
      if (error) return reject(error);
      resolve(stdout);
    })
  );
};

export const execLoopCommand = (
  command: string,
  interval: number,
  dataCallback: { (data: any): void }
) => {
  return exec(
    `{ while true; do ${command};  sleep ${interval}; done }`
  ).stdout?.on("data", (data) => dataCallback(data.toString()));
};
