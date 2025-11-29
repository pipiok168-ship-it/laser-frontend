import React, { useState } from "react";
import { createMachine } from "../api";   // ← 使用我們設定好的 api.js

function AddMachine() {
  const [form, setForm] = useState({
    name: "",
    model: "",
    power: "",
    location: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // ⭐ 改成使用 createMachine（自動帶 Token）
      await createMachine(form, images);

      setMsg("✔ 上架成功！");
    } catch (err) {
      console.error(err);
      setMsg("❌ 上架失敗（可能未登入或後端未啟動）");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">新增機台（含圖片）</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">

        <input
          name="name"
          placeholder="名稱"
          className="border p-2 rounded"
          value={form.name}
          onChange={change}
          required
        />

        <input
          name="model"
          placeholder="型號"
          className="border p-2 rounded"
          value={form.model}
          onChange={change}
        />

        <input
          name="power"
          placeholder="功率（W）"
          className="border p-2 rounded"
          value={form.power}
          onChange={change}
        />

        <input
          name="location"
          placeholder="地區"
          className="border p-2 rounded"
          value={form.location}
          onChange={change}
        />

        <input
          name="price"
          placeholder="價格"
          className="border p-2 rounded"
          value={form.price}
          onChange={change}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          className="border p-2 rounded"
          onChange={handleImages}
        />

        {preview.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button className="bg-blue-600 text-white p-2 rounded">
          提交
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}

export default AddMachine;
