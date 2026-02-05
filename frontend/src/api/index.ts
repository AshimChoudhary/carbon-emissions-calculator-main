import axios from "axios";

const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
};

// Activities API
export const activitiesAPI = {
  getAll: () => api.get("/activities"),
  getOne: (id: string) => api.get(`/activities/${id}`),
  create: (data: any) => api.post("/activities", data),
  update: (id: string, data: any) => api.put(`/activities/${id}`, data),
  delete: (id: string) => api.delete(`/activities/${id}`),
  getDashboardStats: (period: string = "daily") =>
    api.get(`/activities/dashboard/stats?period=${period}`),
};

// AI API
export const aiAPI = {
  getRecommendations: () => api.get("/ai/recommendations"),
};

export default api;
