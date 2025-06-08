export interface Organization {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active: boolean;
  additional_attributes?: Record<string, any> | null;
  created_at: string; // ISO format datetime
  updated_at: string;
}
