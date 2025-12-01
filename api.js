import axios from "axios";

// --------------------------------------------
// API Base URL
// Vercel 會自動讀取 .env 裡的 VITE_API_BASE
// --------------------------------------------
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://laser-backend-1.onrender.com"; // fallback

console.log("API 使用:", API_BASE);

const api = axios.create({
  baseURL: API_BASE,
});

// --------------------------------------------
// Admin Login
// --------------------------------------------
export const adminLogin = (data) =>
  api.post("/api/admin/login", data);

// --------------------------------------------
// Machines APIs
// --------------------------------------------
export const getMachines = () =>
  api.get("/api/machines");

export const getMachine = (id) =>
  api.get(`/api/machines/${id}`);

export const createMachine = (formData, token) =>
  api.post("/api/machines", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteMachine = (id, token) =>
  api.delete(`/api/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
