import { getOrganization } from "../services/organisation.service";
import { create } from "zustand";
import type { Organization } from "../dto/organisation.dto";

interface OrgState {
  organisation?: Organization;
  loading: boolean;
  error?: string;
  fetchOrganisation: () => Promise<void>;
}

export const useOrganisation = create<OrgState>((set, get) => ({
  organisation: undefined,
  loading: false,
  error: undefined,

  fetchOrganisation: async () => {
    set({ loading: true, error: undefined });
    try {
      const response = await getOrganization();
      set({ organisation: response, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch organisation",
        loading: false,
      });
    }
  },
}));
