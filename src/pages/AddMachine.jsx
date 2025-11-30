import React, { useState } from "react";
import { createMachine } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddMachine() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("data", JSON.stringify(form));
    images.forEach((img) => fd.append("images", img));

    await createMachine(fd);
    nav("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-darkbg p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">新增機器</h1>

      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input
          className="dark-input w-full"
          placeholder="機型名稱"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="dark-input w-full"
          placeholder="地區"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="dark-input w-full"
          placeholder="價格"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="text-white"
        />

        <button className="btn-dark w-full py-3">新增機器</button>
      </form>
    </div>
  );
}
