// src/api.js
import axios from "axios";

// 直接寫死 Cloudflare Tunnel 的後端網址，不再用 Vercel 環境變數
const API_BASE = "https://extension-clients-editions-cet.trycloudflare.com";

const api = axios.create({ baseURL: API_BASE });

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
    Array.from(payload.images).forEach((file) => {
      fd.append("images", file);
    });
  }

  return api.post("/api/machines", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

