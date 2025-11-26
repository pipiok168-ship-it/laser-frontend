// src/api.js
import axios from "axios";

// ==============================
// ★ Render 部署後端
// ==============================
const api = axios.create({
  baseURL: "https://laser-backend-v5g4.onrender.com/api",
  timeout: 15000, // 避免 Render 休眠第一次請求超時
});

// ============================================
// ★ Request 攔截器：自動帶 Token
// ============================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================
// ★ Response 攔截器：401 → 自動導向登入
// ============================================
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      // 不能 window.location.href（在 Vercel 有快取問題）
      // 改成強制刷新
      window.location.assign("/admin/login");
    }

    return Promise.reject(error);
  }
);

// ============================================
// ★ API：取得全部機台（公開）
// ============================================
export async function fetchMachines() {
  const res = await api.get("/machines");
  return res.data;
}

// ============================================
// ★ API：取得單一機台
// ============================================
export async function getMachineById(id) {
  const res = await api.get(`/machines/${id}`);
  return res.data;
}

// ============================================
// ★ API：新增機台（需登入）
// ============================================
export async function createMachine(form, images) {
  const fd = new FormData();
  fd.append("data", JSON.stringify(form));
  images.forEach((img) => fd.append("images", img));

  const res = await api.post("/machines", fd);
  return res.data;
}

// ============================================
// ★ API：更新機台（需登入）
// ============================================
export async function updateMachine(id, form, newImages) {
  const fd = new FormData();
  fd.append("data", JSON.stringify(form));
  newImages.forEach((img) => fd.append("images", img));

  const res = await api.put(`/machines/${id}`, fd);
  return res.data;
}

// ============================================
// ★ API：刪除圖片
// ============================================
export async function deleteImage(id, imgUrl) {
  const res = await api.post("/deleteImage", { id, img: imgUrl });
  return res.data;
}

// ============================================
// ★ API：刪除整台機台
// ============================================
export async function deleteMachine(id) {
  const res = await api.delete(`/machines/${id}`);
  return res.data;
}

export default api;
