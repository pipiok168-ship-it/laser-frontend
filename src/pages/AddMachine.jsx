import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMachine } from "../api";

const emptyForm = {
  name: "",
  model: "",
  power: "",
  price: "",
  location: "",
  description: "",
};

export default function AddMachine() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createMachine(form, images);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("新增失敗:", err);
      setError("新增失敗，請確認資料或稍後再試。");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
      {/* Top Bar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">新增機台</h1>
        <button
          onClick={handleCancel}
          className="px-3 py-1 rounded-lg text-sm bg-gray-700 hover:bg-gray-600"
        >
          返回列表
        </button>
      </header>

      <main className="px-6 py-6">
        <div className="max-w-3xl mx-auto bg-[#111218] border border-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">基本資訊</h2>

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
                placeholder="例如：台南"
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

            <div>
              <label className="block text-sm mb-1">圖片（可多選）</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="text-sm text-gray-300"
              />
              {images.length > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  已選擇 {images.length} 張圖片
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
                {submitting ? "送出中..." : "建立機台"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required, placeholder }) {
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
        placeholder={placeholder}
      />
    </div>
  );
}
