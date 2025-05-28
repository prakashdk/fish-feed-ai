export interface Device {
  id: string;
  pond_id: string;
  device_type: string;
  device_id?: string;
  model?: string;
  manufacturer?: string;
  additional_attributes?: Record<string, any>;
  status: string;
  is_active: boolean;
  installed_at?: string; // ISO format (e.g., 2023-12-12T07:00:00Z)
  last_maintenance_at?: string;
  created_at: string;
  updated_at: string;
}
