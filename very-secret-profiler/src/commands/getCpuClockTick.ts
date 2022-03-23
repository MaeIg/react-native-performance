import { executeCommand } from "./shell";

export const getCpuClockTick = async () =>
  parseInt(await executeCommand(`adb shell getconf CLK_TCK`), 10) || 100;
