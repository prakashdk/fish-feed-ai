import axios from "axios";
import type { Device } from "../dto/device.dto";
import { API_BASE_URL } from "./api.constant";

export const DeviceService = {
  async create(
    device: Omit<Device, "id" | "created_at" | "updated_at">
  ): Promise<Device> {
    const response = await axios.post(`${API_BASE_URL}/device/`, device);
    return response.data;
  },

  async get(deviceId: string): Promise<Device> {
    const response = await axios.get(`${API_BASE_URL}/device/${deviceId}`);
    return response.data;
  },

  async update(deviceId: string, device: Partial<Device>): Promise<Device> {
    const response = await axios.put(
      `${API_BASE_URL}/device/${deviceId}`,
      device
    );
    return response.data;
  },

  async delete(deviceId: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/device/${deviceId}`);
  },

  async listByPond(pondId: string): Promise<Device[]> {
    const response = await axios.get(`${API_BASE_URL}/device/pond/${pondId}`);
    return response.data;
  },
};
