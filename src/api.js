import axios from "axios";

// 後端 Render API
const api = axios.create({
  baseURL: "https://laser-backend-1.onrender.com",
});

// 夾帶 Token（Admin Login 後）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// 🚀 以下是前端會 import 的所有 API 函式
//

// 取得全部機台（公開）
export const fetchMachines = () => api.get("/api/machines");

// 新增一台機器（需 Token）
export const createMachine = (formData) =>
  api.post("/api/machines", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 取得單一機台（前端用）
export const getMachineById = (id) => api.get(`/api/machines/${id}`);

// 更新機台（EDIT）
export const updateMachine = (id, formData) =>
  api.put(`/api/machines/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 刪除單張圖片
export const deleteImage = (data) =>
  api.post(`/api/deleteImage`, data);

// 刪除整台機器（後台）
export const deleteMachine = (id) => api.delete(`/api/machines/${id}`);

// Admin Login
export const adminLogin = (username, password) =>
  api.post("/api/admin/login", { username, password });

export default api;

