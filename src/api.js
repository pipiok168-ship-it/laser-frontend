import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api",
});

// Request 攔截器 — 自動帶 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response 攔截器 — 401：自動跳到登入
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export async function fetchMachines() {
  return (await api.get("/machines")).data;
}

export async function getMachineById(id) {
  return (await api.get(`/machines/${id}`)).data;
}

export async function createMachine(form, images) {
  const fd = new FormData();
  fd.append("data", JSON.stringify(form));
  images.forEach((img) => fd.append("images", img));
  return (await api.post("/machines", fd)).data;
}

export async function updateMachine(id, form, newImages) {
  const fd = new FormData();
  fd.append("data", JSON.stringify(form));
  newImages.forEach((img) => fd.append("images", img));
  return (await api.put(`/machines/${id}`, fd)).data;
}

export async function deleteImage(id, imgUrl) {
  return (await api.post("/deleteImage", { id, img: imgUrl })).data;
}

export async function deleteMachine(id) {
  return (await api.delete(`/machines/${id}`)).data;
}

export default api;
