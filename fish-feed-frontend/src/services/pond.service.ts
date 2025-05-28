import type { Pond } from "@/dto/pond.dto";
import axios from "axios";
import { API_BASE_URL } from "./api.constant";

export const PondService = {
  async create(
    orgId: string,
    data: Omit<Pond, "id" | "created_at" | "updated_at">
  ) {
    const res = await axios.post(`${API_BASE_URL}/org/${orgId}/ponds/`, data);
    return res.data as Pond;
  },

  async list(orgId: string): Promise<Pond[]> {
    const res = await axios.get(`${API_BASE_URL}/org/${orgId}/ponds/`);
    return res.data;
  },
};
