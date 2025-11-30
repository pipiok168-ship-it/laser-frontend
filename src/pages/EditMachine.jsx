import React, { useEffect, useState } from "react";
import { getMachineById, updateMachine, deleteImage } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMachine() {
  const { id } = useParams();
  const nav = useNavigate();

  const [machine, setMachine] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    getMachineById(id).then((res) => setMachine(res.data));
  }, [id]);

  if (!machine) return <div className="text-white p-6">讀取中...</div>;

  const save = async () => {
    const fd = new FormData();
    fd.append("data", JSON.stringify(machine));
    newImages.forEach((img) => fd.append("images", img));

    await updateMachine(id, fd);
    nav("/admin/dashboard");
  };

  const removeImg = async (img) => {
    await deleteImage({ id: machine.id, img });
    setMachine({
      ...machine,
      images: machine.images.filter((i) => i !== img),
    });
  };

  return (
    <div className="min-h-screen bg-darkbg p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">編輯機器</h1>

      <div className="space-y-4 max-w-lg">
        <input
          className="dark-input w-full"
          value={machine.name}
          onChange={(e) => setMachine({ ...machine, name: e.target.value })}
        />

        <input
          className="dark-input w-full"
          value={machine.location}
          onChange={(e) =>
            setMachine({ ...machine, location: e.target.value })
          }
        />

        <input
          className="dark-input w-full"
          value={machine.price}
          onChange={(e) => setMachine({ ...machine, price: e.target.value })}
        />

        {/* 現有圖片 */}
        <div>
          <p className="mb-2 font-semibold">現有圖片：</p>
          <div className="flex flex-wrap gap-3">
            {machine.images?.map((img) => (
              <div key={img} className="relative">
                <img src={img} className="w-28 h-28 object-cover rounded" />
                <button
                  onClick={() => removeImg(img)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 新增圖片 */}
        <div>
          <p className="mb-2">新增圖片（可多選）</p>
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages([...e.target.files])}
            className="text-white"
          />
        </div>

        <button className="btn-dark w-full py-3 mt-4" onClick={save}>
          儲存修改
        </button>
      </div>
    </div>
  );
}
