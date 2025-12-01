import axios from "axios";

// 直接固定 Cloudflare Tunnel 後端 URL
const API_BASE = "https://advanced-pig-porcelain-shelter.trycloudflare.com";

const api = axios.create({
  baseURL: API_BASE,
});

// 自動帶入 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("laser_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin Login
export const adminLogin = (username, password) =>
  api.post("/api/admin/login", { username, password });

// Get all machines
export const getMachines = () => api.get("/api/machines");

// Get single machine
export const getMachineById = (id) => api.get(`/api/machines/${id}`);

// Delete machine
export const deleteMachine = (id) => api.delete(`/api/machines/${id}`);

// Create machine
export const createMachine = (payload) => {
  const fd = new FormData();

  // 非 images 的欄位
  Object.keys(payload).forEach((key) => {
    if (key !== "images") fd.append(key, payload[key]);
  });

  // 多張圖片
  if (payload.images) {
    Array.from(payload.images).forEach((file) => {
      fd.append("images", file);
    });
  }

  return api.post("/api/machines", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

