import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMachineById, deleteMachine } from "../api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getMachineById(id);
        setMachine(data);
      } catch (err) {
        console.error(err);
        setMsg("無法載入機台資料！");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("確定刪除此機台？")) return;

    try {
      await deleteMachine(id);
      alert("刪除成功！");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("刪除失敗（可能未登入）");
    }
  };

  if (loading) {
    return <div className="text-center p-6">載入中...</div>;
  }

  if (!machine) {
    return <div className="text-center p-6">找不到機台。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{machine.name}</h1>

      {/* 圖片輪播 */}
      {machine.images && machine.images.length > 0 && (
        <Swiper spaceBetween={10} slidesPerView={1}>
          {machine.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="w-full h-64 object-cover rounded shadow"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="mt-6 bg-white shadow p-4 rounded">
        <p className="text-lg">📌 型號：{machine.model}</p>
        <p className="text-lg">⚡ 功率：{machine.power} W</p>
        <p className="text-lg">📍 地區：{machine.location}</p>
        <p className="text-lg font-bold mt-2">
          💲 價格：{machine.price?.toLocaleString()} 元
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-4 mt-6">
        <Link
          to={`/edit/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          編輯
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          刪除機台
        </button>
      </div>

      {msg && <p className="mt-4 text-red-500">{msg}</p>}
    </div>
  );
}

export default MachineDetail;
