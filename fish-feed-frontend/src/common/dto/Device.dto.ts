import type { DeviceType } from "../enums/DeviceType";

export interface DeviceDto<T = any> {
  id: number;
  name: string;
  type: DeviceType;
  status: string;
  data: T;
}
