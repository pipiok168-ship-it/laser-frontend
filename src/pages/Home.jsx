// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getMachines } from "../api";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getMachines();
      setMachines(res.data);
    } catch (err) {
      console.log("讀取機台失敗:", err);
    }
  };

  const filtered = machines.filter((m) => {
    const k = keyword.toLowerCase();
    return (
      m.name?.toLowerCase().includes(k) ||
      m.model?.toLowerCase().includes(k) ||
      m.location?.includes(keyword) ||
      String(m.price || "").includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HERO 區塊 */}
      <div className="relative h-[320px] md:h-[380px] bg-gradient-to-b from-black to-[#050505] flex items-center px-6">
        <div className="absolute inset-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1581091215367-59ab6dcef1fe')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00b4ff33,transparent_55%)]" />

        <div className="relative z-10 max-w-3xl">
          <p className="text-sm text-[#7ddcff] mb-2 tracking-[0.18em] uppercase">
            二手雷射機台交易平台
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4 drop-shadow-[0_0_12px_#00b4ff99]">
            Laser Market 暗黑專業版 v2.0
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            精選設備・嚴格上架・安心交易｜專為工廠、工作室與二手機台商打造的高品質平台。
          </p>
          <div className="flex flex-wrap gap-2 mt-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              高功率 CO₂ / 光纖機
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              實拍圖片・詳細規格
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              完整後台管理
            </span>
          </div>
        </div>
      </div>

      {/* 搜尋列 */}
      <div className="relative -mt-10 z-20 px-6">
        <div className="max-w-3xl mx-auto flex items-center bg-[#101010]/95 backdrop-blur-md border border-[#262626] shadow-[0_18px_45px_rgba(0,0,0,0.65)] rounded-2xl px-4 py-3">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜尋機台名稱 / 型號 / 地區 / 價格…"
            className="w-full bg-transparent text-gray-100 outline-none text-sm md:text-base"
          />
        </div>
      </div>

      {/* 列表區 */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <span>
            目前上架：{" "}
            <span className="text-[#8fe2ff]">
              {filtered.length} 台
            </span>
          </span>
          <button
            onClick={() => navigate("/admin/login")}
            className="text-xs px-3 py-1 rounded-full border border-[#333] hover:border-[#00b4ff] hover:text-[#8fe2ff] transition"
          >
            管理登入
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/detail/${m.id}`)}
              className="bg-[#101010] border border-[#1f1f1f] hover:border-[#00b4ff] hover:shadow-[0_0_16px_#00b4ff66] transition-all rounded-xl p-4 cursor-pointer flex flex-col"
            >
              <div className="relative mb-3">
                <img
                  src={m.images?.[0]}
                  className="w-full h-44 object-cover rounded-lg"
                  alt={m.name}
                />
                <div className="absolute left-2 top-2 px-2 py-0.5 rounded-full bg-black/60 text-xs text-gray-200">
                  {m.power || "功率未填"}
                </div>
              </div>
              <h3 className="text-lg font-semibold line-clamp-1">
                {m.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-1">
                {m.model}
              </p>

              <div className="flex justify-between mt-3 text-sm text-gray-300">
                <span>{m.location || "地點未填"}</span>
                <span className="text-[#00b4ff] font-semibold">
                  {m.price ? `NT$ ${m.price}` : "價格洽詢"}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              目前找不到符合條件的機台，可以試試看其他關鍵字 🔎
            </div>
          )}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}

