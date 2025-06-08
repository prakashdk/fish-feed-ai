import { getOrganization } from "../services/organization.service";
import { create } from "zustand";
import type { Organization } from "../dto/organization.dto";

interface OrgState {
  organization?: Organization;
  loading: boolean;
  error?: string;
  fetchOrganization: () => Promise<void>;
}

export const useOrganization = create<OrgState>((set, get) => ({
  organization: undefined,
  loading: false,
  error: undefined,

  fetchOrganization: async () => {
    set({ loading: true, error: undefined });
    try {
      const response = await getOrganization();
      set({ organization: response, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch organization",
        loading: false,
      });
    }
  },
}));
