import { execLoopCommand, executeCommand } from "./shell";

const getRamPageSize = async () =>
  parseInt(await executeCommand(`adb shell getconf PAGESIZE`), 10);

const BYTES_PER_MB = 1024 * 1024;

export const pollRamUsage = async (pidId: string) => {
  // const RAM_PAGE_SIZE = (await getRamPageSize()) || 1024;
  const RAM_PAGE_SIZE = 1024;

  const TIME_INTERVAL_S = 1;
  const pollProcess = execLoopCommand(
    `adb shell cat /proc/${pidId}/statm | awk '{print $2}'`,
    TIME_INTERVAL_S,
    (data) => {
      console.log((parseInt(data, 10) * RAM_PAGE_SIZE) / BYTES_PER_MB);
    }
  );
};
