import axios from "axios";

// --------------------------------------------
// API Base URL - Vercel + Render 專用
// --------------------------------------------
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://laser-backend-1.onrender.com"; // fallback

console.log("API 使用:", API_BASE);

const api = axios.create({
  baseURL: API_BASE,
});

// --------------------------------------------
// Token 自動加入 Header
// --------------------------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("laser_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --------------------------------------------
// Admin Login
// --------------------------------------------
export const adminLogin = (username, password) =>
  api.post("/api/admin/login", { username, password });

// --------------------------------------------
// Machine APIs
// --------------------------------------------
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
