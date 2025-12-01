// src/pages/MachineDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMachineById } from "../api";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMachineById(id);
        setMachine(res.data);
        setActiveIndex(0);
      } catch (err) {
        console.log("讀取單一機台失敗:", err);
      }
    };
    load();
  }, [id]);

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-gray-300">
        載入機台資料中…
      </div>
    );
  }

  const largeList =
    (Array.isArray(machine.images) && machine.images) || [];
  const thumbList =
    (Array.isArray(machine.thumbs) && machine.thumbs) ||
    largeList;

  const mainImg =
    largeList[activeIndex] || largeList[0] || thumbList[0] || "";

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* 頂部返回 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-[#8fe2ff] transition"
          >
            ← 返回
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-400 hover:text-[#8fe2ff] transition"
          >
            Laser Market
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左：圖片區（大圖 + 縮圖輪播） */}
          <div>
            <div className="bg-[#101010] border border-[#222] rounded-2xl p-3 mb-3 card-fade-in">
              {mainImg && (
                <img
                  src={mainImg}
                  loading="lazy"
                  alt={machine.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
              )}
            </div>

            {thumbList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {thumbList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`border rounded-lg overflow-hidden h-20 min-w-[90px] ${
                      activeIndex === idx
                        ? "border-[#00b4ff]"
                        : "border-[#222]"
                    }`}
                  >
                    <img
                      src={img}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      alt={`thumb-${idx}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右：資訊區 */}
          <div className="card-fade-in">
            <p className="text-xs text-[#7ddcff] tracking-[0.22em] uppercase mb-2">
              Machine Detail
            </p>
            <h1 className="text-3xl font-semibold mb-2">
              {machine.name}
            </h1>
            <p className="text-gray-400 mb-4">
              {machine.model || "型號未填"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              <InfoItem label="地區" value={machine.location} />
              <InfoItem label="功率" value={machine.power} />
              <InfoItem label="年份" value={machine.year} />
              <InfoItem label="狀況" value={machine.condition} />
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-1">價格</div>
              <div className="text-2xl font-bold text-[#00b4ff]">
                {machine.price
                  ? `NT$ ${machine.price}`
                  : "價格洽詢"}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">
                機台描述
              </div>
              <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">
                {machine.description || "尚未提供詳細描述"}
              </p>
            </div>

            <div className="mb-8">
              <div className="text-sm text-gray-400 mb-1">
                聯絡方式
              </div>
              <div className="text-sm text-gray-100">
                {machine.contact || "尚未提供聯絡資訊"}
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-full bg-[#00b4ff] text-black text-sm font-semibold hover:bg-[#34cfff] transition"
            >
              回到列表
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-[#101010] border border-[#222] rounded-xl px-3 py-2">
      <div className="text-[11px] text-gray-400 mb-1">
        {label}
      </div>
      <div className="text-sm text-gray-100">
        {value || "—"}
      </div>
    </div>
  );
}
