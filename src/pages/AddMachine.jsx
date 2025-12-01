import React, { useState } from "react";
import { createMachine } from "../api";
import { useNavigate } from "react-router-dom";
import AdminTopBar from "../components/AdminTopBar.jsx";

export default function AddMachine() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    model: "",
    location: "",
    power: "",
    price: "",
    images: null,
  });

  const submit = async () => {
    try {
      await createMachine(form);
      alert("新增成功");
      nav("/admin");
    } catch (err) {
      alert("新增失敗");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminTopBar />

      <div className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">新增機台</h2>

        {["name", "model", "location", "power", "price"].map((k) => (
          <input
            key={k}
            placeholder={k}
            className="w-full mb-3 px-3 py-2 bg-[#111] border border-[#333] rounded"
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        ))}

        <input
          type="file"
          multiple
          onChange={(e) => setForm({ ...form, images: e.target.files })}
          className="w-full mb-4"
        />

        <button
          onClick={submit}
          className="w-full py-2 bg-[#00b4ff] text-black rounded font-semibold"
        >
          新增
        </button>
      </div>
    </div>
  );
}
