import { WS_BASE_URL } from "../services/api.constant";

type DeviceCallback = <T = unknown>(data: T) => void;

const listeners = new Map<string, DeviceCallback>(); // deviceId => callback
let socket: WebSocket | null = null;

export function initDeviceSocket() {
  if (socket) return; // Prevent multiple connections

  socket = new WebSocket(`${WS_BASE_URL}/sensor`);

  socket.onopen = () => console.log("WebSocket connected");

  socket.onmessage = (event) => {
    try {
      const { data, device_id } = JSON.parse(event.data);

      const callback = listeners.get(device_id);

      if (callback) callback(JSON.parse(data));
    } catch (err) {
      console.error("WebSocket parse error", err);
    }
  };

  socket.onerror = (err) => console.error("WebSocket error", err);
  socket.onclose = () => console.warn("WebSocket disconnected");
}

export function subscribeToDevice(deviceId: string, callback: DeviceCallback) {
  listeners.set(deviceId, callback);
}

export function unsubscribeFromDevice(deviceId: string) {
  listeners.delete(deviceId);
}
