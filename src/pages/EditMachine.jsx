import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMachineById, updateMachine, deleteImage } from "../api";

export default function EditMachine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    model: "",
    power: "",
    price: "",
    location: "",
    description: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadMachine = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getMachineById(id);
      setForm({
        name: data.name || "",
        model: data.model || "",
        power: data.power || "",
        price: data.price || "",
        location: data.location || "",
        description: data.description || "",
      });
      setExistingImages(data.images || []);
    } catch (err) {
      console.error("讀取機台失敗:", err);
      setError("讀取機台資料失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMachine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files);
  };

  const handleDeleteImage = async (imgUrl) => {
    if (!window.confirm("確定要刪除這張圖片嗎？")) return;
    try {
      await deleteImage(id, imgUrl);
      setExistingImages((imgs) => imgs.filter((i) => i !== imgUrl));
    } catch (err) {
      console.error("圖片刪除失敗:", err);
      alert("圖片刪除失敗，請稍後再試。");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await updateMachine(id, form, newImages);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("更新失敗:", err);
      setError("更新失敗，請確認資料或稍後再試。");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">讀取中，請稍候...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
      {/* Top Bar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">編輯機台 #{id}</h1>
        <button
          onClick={handleCancel}
          className="px-3 py-1 rounded-lg text-sm bg-gray-700 hover:bg-gray-600"
        >
          返回列表
        </button>
      </header>

      <main className="px-6 py-6">
        <div className="max-w-3xl mx-auto bg-[#111218] border border-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">機台資訊</h2>

          {error && (
            <p className="text-red-400 text-sm mb-3">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="名稱"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Field
                label="型號"
                name="model"
                value={form.model}
                onChange={handleChange}
              />
              <Field
                label="功率"
                name="power"
                value={form.power}
                onChange={handleChange}
              />
              <Field
                label="價格 (NT$)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
              <Field
                label="地區"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">描述</label>
              <textarea
                name="description"
                rows={4}
                className="w-full dark-input resize-none"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* 既有圖片 */}
            <div>
              <label className="block text-sm mb-1">已上傳圖片</label>
              {existingImages.length === 0 && (
                <p className="text-xs text-gray-400">目前沒有圖片。</p>
              )}
              {existingImages.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {existingImages.map((img) => (
                    <div key={img} className="w-28">
                      <img
                        src={img}
                        alt=""
                        className="w-28 h-20 object-cover rounded-md border border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        className="mt-1 w-full text-xs py-1 rounded bg-red-600 hover:bg-red-500"
                      >
                        刪除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 新增圖片 */}
            <div>
              <label className="block text-sm mb-1">新增圖片（可多選）</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewImagesChange}
                className="text-sm text-gray-300"
              />
              {newImages.length > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  將新增 {newImages.length} 張圖片
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium disabled:opacity-60"
              >
                {submitting ? "儲存中..." : "儲存變更"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className="w-full dark-input"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
