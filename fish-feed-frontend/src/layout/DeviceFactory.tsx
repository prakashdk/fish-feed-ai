import { DeviceType } from "../common/enums/DeviceType";
import { PondMonitorCard } from "./Devices/PondMonitorCard";
import { FeedLeftoverCard } from "./Devices/FeedLeftoverCard";
import type { DeviceDto } from "@/common/dto/Device.dto";

type DeviceCardProps = {
  device: DeviceDto;
};

export const DeviceFactory = ({ device }: DeviceCardProps) => {
  // Dynamically render the component based on device type
  switch (device.type) {
    case DeviceType.PondMonitor:
      return <PondMonitorCard device={device} />;
    case DeviceType.FeedCollector:
      return <FeedLeftoverCard device={device} />;
    default:
      return <>Default</>; // or some fallback UI
  }
};
