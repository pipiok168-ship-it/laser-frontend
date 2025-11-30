import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiPlusCircle, FiLogOut, FiStar, FiBox, FiCpu } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const [machines, setMachines] = useState([]);
  const [filter, setFilter] = useState("全部");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchMachines();
      setMachines(data);
    } catch (err) {
      console.log("讀取失敗", err);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const categories = ["全部", "光纖雷射", "CO2 雷射", "桌上型", "手持式"];

  const filteredMachines =
    filter === "全部"
      ? machines
      : machines.filter((m) => (m.category || "").includes(filter));

  return (
    <div className="min-h-screen bg-darkbg text-gray-200">

      {/* 🔥 Hero Banner（豪華版） */}
      <div className="relative h-[420px] w-full banner-fadein overflow-hidden">
        <img
          className="h-full w-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1581091870627-3f9c0c35d5b1?q=80"
          alt="laser"
        />

        {/* 動態光線 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/70" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-extrabold text-white text-glow drop-shadow-xl">
            Laser Market
          </h1>
          <p className="mt-4 text-gray-300 text-xl">
            高品質二手雷射機台｜精選設備 × 嚴格上架 × 安心交易
          </p>

          {/* 搜尋列 */}
          <div className="flex items-center gap-3 mt-8 w-full max-w-xl bg-black/40 border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-xl">
            <FiSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="搜尋名稱 / 型號 / 地區 / 價格..."
              className="w-full bg-transparent outline-none text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* ---------------------------- */}
      {/* 三大特色區塊 */}
      {/* ---------------------------- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-14">
        <div className="p-6 bg-darkcard rounded-2xl border border-darkborder shadow-lg hover:shadow-blue-600/20 transition card-hover flex flex-col items-center text-center">
          <FiStar className="text-4xl text-blue-400 mb-3" />
          <h4 className="text-xl font-semibold mb-1">精選設備</h4>
          <p className="text-gray-400 text-sm">所有機台均由人工審核，排除瑕疵問題。</p>
        </div>

        <div className="p-6 bg-darkcard rounded-2xl border border-darkborder shadow-lg hover:shadow-blue-600/20 transition card-hover flex flex-col items-center text-center">
          <FiCpu className="text-4xl text-blue-400 mb-3" />
          <h4 className="text-xl font-semibold mb-1">高效能機種</h4>
          <p className="text-gray-400 text-sm">各品牌光纖雷射、CO2、桌上型全面涵蓋。</p>
        </div>

        <div className="p-6 bg-darkcard rounded-2xl border border-darkborder shadow-lg hover:shadow-blue-600/20 transition card-hover flex flex-col items-center text-center">
          <FiBox className="text-4xl text-blue-400 mb-3" />
          <h4 className="text-xl font-semibold mb-1">快速交易</h4>
          <p className="text-gray-400 text-sm">安全、透明、快速的交易流程。</p>
        </div>
      </div>

      {/* ---------------------------- */}
      {/* 精選機台輪播 */}
      {/* ---------------------------- */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold mb-4">🔥 精選機台</h2>

        <Swiper spaceBetween={20} slidesPerView={1.2} breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}>
          {machines.slice(0, 6).map((m) => (
            <SwiperSlide key={m.id}>
              <Link
                to={`/detail/${m.id}`}
                className="bg-darkcard border border-darkborder rounded-xl p-4 card-hover shadow-md hover:shadow-xl block"
              >
                <div className="h-48 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center mb-3">
                  {m.images && m.images.length > 0 ? (
                    <img src={m.images[0]} className="h-full w-full object-cover" alt={m.name} />
                  ) : (
                    <p className="text-gray-500 text-sm">無圖片</p>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-gray-400 text-sm">型號：{m.model}</p>
                <p className="text-primary text-lg font-semibold mt-2">
                  NT$ {m.price?.toLocaleString()}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ---------------------------- */}
      {/* 分類快速篩選 */}
      {/* ---------------------------- */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold mb-4">分類瀏覽</h2>

        <div className="flex gap-3 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full border transition ${
                filter === c
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-600 text-gray-300 hover:border-white hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------------------- */}
      {/* 商品瀑布式網格 */}
      {/* ---------------------------- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-10 pb-20">
        {filteredMachines.map((m) => (
          <Link
            key={m.id}
            to={`/detail/${m.id}`}
            className="bg-darkcard border border-darkborder rounded-xl p-5 card-hover cursor-pointer shadow-md hover:shadow-xl transition"
          >
            <div className="h-48 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center mb-4">
              {m.images && m.images.length > 0 ? (
                <img src={m.images[0]} className="h-full w-full object-cover" alt={m.name} />
              ) : (
                <p className="text-gray-500 text-sm">無圖片</p>
              )}
            </div>

            <h3 className="text-xl font-bold text-white">{m.name}</h3>
            <p className="text-gray-400 text-sm mt-1">型號：{m.model}</p>
            <p className="text-gray-400 text-sm">地區：{m.location || "-"}</p>
            <p className="text-primary text-lg font-semibold mt-3">
              NT$ {m.price?.toLocaleString() || "-"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
