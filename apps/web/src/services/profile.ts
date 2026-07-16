import api from "./api";

export async function getStudentProfile(id: number) {
  const response = await api.get(`/profile/${id}`);
  return response.data;
}

export async function createLearningProfile(id: number, payload: { subject: string; mastery: number; recommendation: string }) {
  const response = await api.post(`/profile/${id}/learning-profiles`, payload);
  return response.data;
}

export async function updateLearningProfile(
  id: number,
  profileId: number,
  payload: { subject: string; mastery: number; recommendation: string }
) {
  const response = await api.put(`/profile/${id}/learning-profiles/${profileId}`, payload);
  return response.data;
}

export async function deleteLearningProfile(id: number, profileId: number) {
  const response = await api.delete(`/profile/${id}/learning-profiles/${profileId}`);
  return response.data;
}
