import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createMachine } from "../api";
import AdminTopBar from "../components/AdminTopBar.jsx";

export default function AddMachine() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    model: "",
    location: "",
    power: "",
    price: "",
    year: "",
    condition: "",
    contact: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("laser_token")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleFiles = (e) => {
    const files = e.target.files;
    setImages(files);
    const list = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createMachine({ ...form, images });
      alert("新增成功！");
      navigate("/admin");
    } catch (err) {
      alert("新增失敗！");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminTopBar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">新增機台</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-4">
            {Object.keys(form).map((key) => (
              key !== "description" && (
                <Input
                  key={key}
                  label={key}
                  name={key}
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                />
              )
            ))}

            <div>
              <label className="block text-sm mb-1">描述</label>
              <textarea
                value={form.description}
                name="description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={6}
                className="w-full bg-[#101010] border border-[#262626] rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0b0b0b] border border-[#262626] p-4 rounded-xl">
              <label className="block mb-2">圖片（可多張）</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                className="text-xs"
              />

              {preview.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {preview.map((src, i) => (
                    <img
                      src={src}
                      key={i}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2 rounded-xl bg-[#00b4ff] text-black"
            >
              {saving ? "儲存中…" : "新增機台"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        {...rest}
        className="w-full bg-[#101010] border border-[#262626] rounded-xl px-3 py-2 text-sm"
      />
    </div>
  );
}
