import axios from "axios";

// 🔥 直接寫死 backend URL → 不再使用 Vercel 環境變數
const API_BASE = "https://laser-backend-1.onrender.com";

const api = axios.create({ baseURL: API_BASE });

// 自動帶入 JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("laser_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminLogin = (username, password) =>
  api.post("/api/admin/login", { username, password });

export const getMachines = () => api.get("/api/machines");

export const getMachineById = (id) => api.get(`/api/machines/${id}`);

export const deleteMachine = (id) => api.delete(`/api/machines/${id}`);

export const createMachine = (payload) => {
  const fd = new FormData();

  Object.keys(payload).forEach((k) => {
    if (k !== "images") fd.append(k, payload[k]);
  });

  if (payload.images) {
    Array.from(payload.images).forEach((f) => fd.append("images", f));
  }

  return api.post("/api/machines", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

