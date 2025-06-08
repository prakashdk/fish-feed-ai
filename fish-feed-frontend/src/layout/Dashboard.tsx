import { useEffect, useState } from "react";
import { AddDeviceCard } from "./AddDeviceCard";
import { DeviceFactory } from "./DeviceFactory";
import { WavyBackground } from "../components/WavyBackground";
import { DeviceService } from "../services/device.service";
import { PondService } from "../services/pond.service";
import { useOrganization } from "../hooks/useOrganization";
import type { Device } from "../dto/device.dto";
import type { Pond } from "../dto/pond.dto";
import { AddDeviceModal } from "./AddDeviceModal";

export const Dashboard = () => {
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [selectedPondId, setSelectedPondId] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceIdInput, setDeviceIdInput] = useState("");

  const { organization: organisation } = useOrganization();

  useEffect(() => {
    async function fetchPonds() {
      if (!organisation?.id) return;
      try {
        const data = await PondService.list(organisation.id);
        setPonds(data);
        if (data.length > 0) setSelectedPondId(data[0].id);
      } catch (e) {
        console.error("Failed to load ponds", e);
      }
    }
    fetchPonds();
  }, [organisation?.id]);

  useEffect(() => {
    async function fetchDevices() {
      if (!selectedPondId) return;
      try {
        const result = await DeviceService.listByPond(selectedPondId);
        setDevices(result);
      } catch (e) {
        console.error("Failed to fetch devices", e);
      }
    }
    fetchDevices();
  }, [selectedPondId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeviceIdInput("");
  };

  const handleSubmitForm = async () => {
    if (!selectedPondId || !deviceIdInput) return;
    try {
      await DeviceService.update(deviceIdInput, { pond_id: selectedPondId });
      const updatedDevices = await DeviceService.listByPond(selectedPondId);
      setDevices(updatedDevices);
      handleCloseModal();
    } catch (e) {
      console.error("Failed to link device", e);
    }
  };

  return (
    <>
      <WavyBackground>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Select Pond
          </label>
          <select
            className="border rounded px-4 py-2 w-full max-w-sm"
            value={selectedPondId ?? ""}
            onChange={(e) => setSelectedPondId(e.target.value)}
          >
            {ponds.map((pond) => (
              <option key={pond.id} value={pond.id}>
                {pond.name || "Unnamed Pond"}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceFactory key={device.id} device={device} />
          ))}
          <AddDeviceCard onClick={handleOpenModal} />
        </div>

        <AddDeviceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitForm}
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium">Device ID</label>
            <input
              type="text"
              value={deviceIdInput}
              onChange={(e) => setDeviceIdInput(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter existing device ID"
            />
            <button
              onClick={handleSubmitForm}
              className="bg-aqua-600 hover:bg-aqua-700 border font-semibold rounded px-4 py-2 mt-2"
            >
              Link Device to Pond
            </button>
          </div>
        </AddDeviceModal>
      </WavyBackground>
    </>
  );
};
