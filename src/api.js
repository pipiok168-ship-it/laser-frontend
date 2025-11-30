import axios from "axios";

const api = axios.create({
  baseURL: "https://laser-backend.onrender.com",
});

// 自動夾帶 Token（Admin 登入用）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 取得全部機台（首頁）
export const fetchMachines = () => api.get("/api/machines");

// 新增（後台）
export const createMachine = (formData) =>
  api.post("/api/machines", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 取得單一
export const getMachineById = (id) => api.get(`/api/machines/${id}`);

// 更新（追加圖片）
export const updateMachine = (id, formData) =>
  api.put(`/api/machines/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 刪除單張圖片
export const deleteImage = (data) => api.post("/api/deleteImage", data);

// 刪除整台
export const deleteMachine = (id) => api.delete(`/api/machines/${id}`);

// Admin Login
export const adminLogin = (username, password) =>
  api.post("/api/admin/login", { username, password });

export default api;
