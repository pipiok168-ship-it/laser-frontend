import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getMachineById,
  updateMachine,
  deleteImage,
} from "../api";

function EditMachine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [form, setForm] = useState({
    name: "",
    model: "",
    power: "",
    location: "",
    price: "",
  });

  const [newImages, setNewImages] = useState([]);
  const [newPreview, setNewPreview] = useState([]);
  const [msg, setMsg] = useState("");

  // 載入現有資料
  useEffect(() => {
    async function load() {
      try {
        const data = await getMachineById(id);
        setMachine(data);

        setForm({
          name: data.name,
          model: data.model,
          power: data.power,
          location: data.location,
          price: data.price,
        });
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setNewPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // 刪除舊圖片
  const handleDeleteImage = async (imgUrl) => {
    try {
      await deleteImage(id, imgUrl);

      setMachine({
        ...machine,
        images: machine.images.filter((img) => img !== imgUrl),
      });
    } catch (err) {
      console.error(err);
      alert("刪除失敗");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await updateMachine(id, form, newImages);

      setMsg("✔ 更新成功！");
      setTimeout(() => navigate(`/machine/${id}`), 800);
    } catch (err) {
      console.error(err);
      setMsg("❌ 更新失敗");
    }
  };

  if (!machine) return <p className="p-8">載入中...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <Link to={`/machine/${id}`} className="text-blue-600 underline">
        ← 回詳情頁
      </Link>

      <h1 className="text-3xl font-bold mb-6">編輯機台</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input name="name" className="border p-2 rounded" value={form.name} onChange={change} />
        <input name="model" className="border p-2 rounded" value={form.model} onChange={change} />
        <input name="power" className="border p-2 rounded" value={form.power} onChange={change} />
        <input name="location" className="border p-2 rounded" value={form.location} onChange={change} />
        <input name="price" className="border p-2 rounded" value={form.price} onChange={change} />

        {/* 舊圖片 */}
        <div>
          <p className="mb-2 font-semibold">現有圖片：</p>
          <div className="grid grid-cols-3 gap-2">
            {machine.images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded"
                >
                  刪
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 新圖片 */}
        <div>
          <p className="mb-2 font-semibold">新增圖片：</p>
          <input type="file" multiple accept="image/*" onChange={handleNewImages} />

          {newPreview.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {newPreview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <button className="bg-blue-600 text-white p-2 rounded">
          提交更新
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}

export default EditMachine;
