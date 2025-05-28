import type { Device } from "@/dto/device.dto";
import {
  FaCloudRain,
  FaTemperatureHigh,
  FaThermometerEmpty,
  FaTint,
  FaWater,
} from "react-icons/fa";
import { Card } from "../../components/Card";
import { InsetCard } from "../../components/InsetCard";

interface PondAttributes {
  ph: string;
  turbidity: string;
  tds: string;
  temperature: string;
  rain: string;
  oxygenLevel: string;
}

type PondMonitorCardProps = {
  device: Device;
};

export const PondMonitorCard = ({ device }: PondMonitorCardProps) => {
  const { ph, turbidity, tds, temperature, rain, oxygenLevel } = {};

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
      value: oxygenLevel,
    },
  ];

  return (
    <Card>
      <h3 className="text-xl font-semibold text-black mb-4">
        Pond Monitor #{device.id}
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-black">
        {metrics.map((metric, idx) => (
          <InsetCard key={idx}>
            {metric.icon}
            <div>
              <p className="text-xs opacity-70">{metric.label}</p>
              <p className="font-medium">{metric.value}</p>
            </div>
          </InsetCard>
        ))}
      </div>
    </Card>
  );
};
