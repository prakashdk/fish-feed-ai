import axios from "axios";
import { API_BASE_URL } from "./api.constant";

export interface FeedResponse {
  calculated_feed: number;
  predicted_feed: number;
  predict_message: string;
}

export interface FeedRequest {
  left_over: number;
}

export interface ActualFeedRequest {
  actual_feed: number;
}

export const FeedService = {
  async get(): Promise<FeedResponse> {
    const response = await axios.get(`${API_BASE_URL}/feed`);
    return response.data;
  },

  async post(data: FeedRequest): Promise<void> {
    await axios.post(`${API_BASE_URL}/feed`, data);
  },

  async updateActualFeed(data: ActualFeedRequest): Promise<void> {
    await axios.put(`${API_BASE_URL}/actual_feed`, data);
  },
};
