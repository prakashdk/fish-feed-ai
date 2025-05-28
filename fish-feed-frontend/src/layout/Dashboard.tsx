import { useState } from "react";
import { DeviceType } from "../common/enums/DeviceType";
import { AddDeviceCard } from "./AddDeviceCard";
import { AddDeviceModal } from "./AddDeviceModal";
import { DeviceFactory } from "./DeviceFactory";
import { WavyBackground } from "../components/WavyBackground";

const devices = [
  {
    id: 1,
    name: "Pond Monitor",
    type: DeviceType.PondMonitor,
    status: "Active",
    data: {
      ph: "7.2",
      turbidity: "1.5 NTU",
      tds: "400 ppm",
      temperature: "22°C",
      rain: "0 mm",
      oxygenLevel: "6.5 mg/L",
    },
  },
  {
    id: 2,
    name: "Feed Remaining Collector",
    type: DeviceType.FeedCollector,
    status: "Active",
    data: {
      fishFeedRemaining: "50 kg",
    },
  },
];

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitForm = (formData: any) => {
    console.log("Device added with data:", formData);
    // Add your API logic here to save the device info
  };
  return (
    <>
      <WavyBackground>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceFactory key={device.id} device={device} />
          ))}
          <AddDeviceCard onClick={handleOpenModal} />
          <AddDeviceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitForm}
          />
        </div>
      </WavyBackground>
    </>
  );
};
