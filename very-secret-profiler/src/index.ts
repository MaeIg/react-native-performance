import _ from "lodash";
import { getPidId } from "./commands/getPidId";
// import { pollCpuPerCoreUsage } from "./commands/pollCpuPerCoreUsage";
// import { pollFpsUsage } from "./commands/pollFpsUsage";
import { pollRamUsage } from "./commands/pollRamUsage";
import {
  getAverageCpuUsage,
  getAverageCpuUsagePerProcess,
  getHighCpuUsageStats,
} from "./reporting/reporting";
// import { JS_THREAD_PROCESS_NAME } from "./JS_THREAD_PROCESS_NAME";
// import { Measure } from "./Measure";

// const bundleId = process.argv[2];
// const pidId = getPidId(bundleId);

// const measures: Measure[] = [];

// // const pollProcess = pollCpuPerCoreUsage(pidId, (measure) => {
// //   measures.push(measure);
// //   console.log(measure.perName[JS_THREAD_PROCESS_NAME]);
// // });

// // setTimeout(() => {
// //   pollProcess.stop();

// //   const totalCpuUsagePerProcess = getAverageCpuUsagePerProcess(measures);
// //   const totalCpuUsage = getAverageCpuUsage(measures);

// //   const HIGH_CPU_USAGE_THRESHOLD = 90;
// //   const threadLockedMeasure = getHighCpuUsageStats(
// //     measures,
// //     HIGH_CPU_USAGE_THRESHOLD
// //   );

// //   console.log(
// //     totalCpuUsage,
// //     totalCpuUsagePerProcess.slice(0, 5),
// //     threadLockedMeasure
// //   );
// // }, 15000);

// pollFpsUsage(bundleId);

export {
  getPidId,
  // pollCpuPerCoreUsage,
  getAverageCpuUsage,
  getAverageCpuUsagePerProcess,
  getHighCpuUsageStats,
};

const main = async () => {
  const pidId = await getPidId(process.argv[2]);

  await pollRamUsage(pidId);
};

main();
