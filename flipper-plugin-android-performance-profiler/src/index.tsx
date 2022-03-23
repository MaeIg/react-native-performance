import React from "react";
import {
  DevicePluginClient,
  usePlugin,
  createState,
  useValue,
  Layout,
} from "flipper-plugin";
import {
  pollCpuPerCoreUsage,
  getPidId,
  Measure,
  getAverageCpuUsage,
  getAverageCpuUsagePerProcess,
  getHighCpuUsageStats,
} from "android-profiler";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "antd";
import { useRef } from "react";

// We don't actually use the device plugin functionalities
export function devicePlugin(client: DevicePluginClient) {
  const data = createState<string[]>([]);

  return { data };
}

export function Component() {
  const instance = usePlugin(devicePlugin);

  const [measures, setMeasures] = useState<Measure[]>([]);

  const measuresRef = useRef<Measure[]>([]);

  const poll = useRef<any>(null);

  const start = async () => {
    const pidId = await getPidId("com.example");
    if (pidId) {
      poll.current = await pollCpuPerCoreUsage(pidId, (measure) => {
        measuresRef.current = [...measuresRef.current, measure];
        setMeasures(measuresRef.current);
      });
    }
  };

  const stop = () => poll.current?.stop();
  console.log(measures.length);

  return (
    <>
      <Button onClick={start}>START</Button>
      <Button onClick={stop}>STOP</Button>
      Average CPU Usage {getAverageCpuUsage(measures)}
      {/* Top Process:
      {getAverageCpuUsagePerProcess(measures)}
      Processes with high CPU usage detected{" "}
      {getHighCpuUsageStats(measures, 90)} */}
    </>
  );
}
