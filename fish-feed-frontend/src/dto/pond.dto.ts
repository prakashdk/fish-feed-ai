import type { Species } from "./species.dto";

export interface Pond {
  id?: string;
  organization_id: string;
  name: string;
  location?: string;
  size_sq_m: number;
  depth_m: number;
  species?: Species[]; // assuming you have a Species type
  stocking_date?: string; // ISO string format
  stocking_density?: number;
  water_type?: string;
  status?: "active" | "maintenance" | "harvested" | string;
  is_active?: boolean;
  additional_attributes?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
