// src/services/organization.service.ts
import type { Organization } from "@/dto/organization.dto";
import axios from "axios";
import { API_BASE_URL } from "./api.constant";

const ORG_ID = "e14fd1b8-8e0a-4d27-bfc8-191fd594375e";

export const getOrganization = async (): Promise<Organization> => {
  const { data } = await axios.get(`${API_BASE_URL}/org/${ORG_ID}`);
  return data;
};

export const updateOrganization = async (
  updated: Partial<Organization>
): Promise<Organization> => {
  const { data } = await axios.put(`${API_BASE_URL}/org/${ORG_ID}`, updated);
  return data;
};
