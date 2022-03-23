import { executeCommand } from "./shell";

export const getPidId = async (bundleId: string) => {
  // Assuming we have only once process
  const [pidId] = (await executeCommand(`adb shell pidof ${bundleId}`)).split(
    "\n"
  );
  return pidId;
};
