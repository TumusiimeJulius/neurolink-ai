import api from "./api";

export async function askLearningTwin(payload: { subject: any; prompt: string }) {
  const response = await api.post(`/recommendations/twin`, payload);
  return response.data;
}
