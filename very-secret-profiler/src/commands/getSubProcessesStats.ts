import { executeCommand } from "./shell";

export interface ProcessStat {
  processId: string;
  processName: string;
  totalCpuTime: number;
  cpuNumber: string;
}

export const getSubProcessesStats = async (
  pidId: string
): Promise<ProcessStat[]> => {
  const data = await executeCommand(
    `adb shell "cd /proc/${pidId}/task && ls | tr '\n' ' ' | sed 's/ /\\/stat /g' | xargs cat $1"`
  );

  return data
    .split("\n")
    .filter(Boolean)
    .map((stats) => stats.split(" "))
    .filter(Boolean)
    .map((subProcessStats) => {
      const processId = subProcessStats[0];
      const processName = subProcessStats[1];
      const utime = parseInt(subProcessStats[13], 10);
      const stime = parseInt(subProcessStats[14], 10);
      const cutime = parseInt(subProcessStats[15], 10);
      const cstime = parseInt(subProcessStats[16], 10);
      const cpuNumber = subProcessStats[38];

      const totalCpuTime = utime + stime + cutime + cstime;

      return { processId, processName, totalCpuTime, cpuNumber };
    });
};
