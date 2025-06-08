import type { Device } from "@/dto/device.dto";
import { useEffect, useState } from "react";
import {
  FaCloudRain,
  FaTemperatureHigh,
  FaThermometerEmpty,
  FaTint,
  FaWater,
} from "react-icons/fa";
import { Card } from "../../components/Card";
import { Info } from "../../components/Info";
import { InsetCard } from "../../components/InsetCard";
import {
  subscribeToDevice,
  unsubscribeFromDevice,
} from "../../hooks/deviceSocketService";
import { TimeAgo } from "../../components/TimeAgo";

interface PondAttributes {
  ph: string;
  turbidity: string;
  tds: string;
  temperature: string;
  rain: string;
  oxygen_level: string;
}

type PondMonitorCardProps = {
  device: Device;
};

export const PondMonitorCard = ({ device }: PondMonitorCardProps) => {
  const [deviceData, setDeviceData] = useState<PondAttributes>();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  const { ph, turbidity, tds, temperature, rain, oxygen_level } =
    deviceData ?? {};

  // 🔁 Refresh 'now' every second to update the "x ago" text
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (device.device_id) {
      subscribeToDevice(device.device_id, (data) => {
        setDeviceData(data as PondAttributes);
        setLastUpdated(new Date());
      });
    }

    return () => {
      if (device.device_id) {
        unsubscribeFromDevice(device.device_id);
      }
    };
  }, [device.device_id]);

  const metrics = [
    {
      icon: <FaTint className="text-blue-500" />,
      label: "pH",
      value: ph,
    },
    {
      icon: <FaWater className="text-blue-400" />,
      label: "Turbidity",
      value: turbidity,
    },
    {
      icon: <FaThermometerEmpty className="text-purple-500" />,
      label: "TDS",
      value: tds,
    },
    {
      icon: <FaTemperatureHigh className="text-yellow-500" />,
      label: "Temperature",
      value: temperature,
    },
    {
      icon: <FaCloudRain className="text-gray-500" />,
      label: "Rain",
      value: rain,
    },
    {
      icon: <FaWater className="text-green-500" />,
      label: "Oxygen",
      value: oxygen_level,
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center p-2">
        <h3 className="flex items-center gap-x-2 text-xl font-semibold text-black m-0">
          Pond Monitor <Info>{device.device_id}</Info>
        </h3>
        {lastUpdated && (
          <p className="text-xs text-gray-500 m-0">
            <TimeAgo date={lastUpdated} now={now} />
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-black">
        {metrics.map((metric, idx) => (
          <InsetCard key={idx}>
            {metric.icon}
            <div>
              <p className="text-xs opacity-70">{metric.label}</p>
              <p className="font-medium">{metric.value ?? `N/A`}</p>
            </div>
          </InsetCard>
        ))}
      </div>
    </Card>
  );
};
