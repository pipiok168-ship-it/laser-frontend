import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("none");
  const [filterArea, setFilterArea] = useState("");
  const [filterPower, setFilterPower] = useState("");

  // 🔥 Banner 幻燈片
  const banners = [
    "https://images.unsplash.com/photo-1581092334396-df7bd79b5e2a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
  ];
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 取得資料
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMachines();
        setMachines(data);
      } catch (err) {
        console.error(err);
        setError("無法連線後端 API");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  if (loading) return <div className="text-center p-8 text-xl">載入中...</div>;
  if (error) return <div className="text-center p-8 text-xl text-red-600">{error}</div>;

  /* ------------------ 🔍 搜尋 / 排序 / 篩選邏輯 ------------------ */
  let filtered = machines.filter((m) => {
    const text = `${m.name} ${m.model} ${m.location} ${m.power} ${m.price}`.toLowerCase();

    const kw = keyword.toLowerCase();
    const areaOk = filterArea ? m.location === filterArea : true;
    const powerOk = filterPower ? Number(m.power) >= Number(filterPower) : true;

    return text.includes(kw) && areaOk && powerOk;
  });

  if (sortType === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "high") filtered.sort((a, b) => b.price - a.price);
  if (sortType === "newest") filtered.sort((a, b) => b.id - a.id);

  /* ------------------ 🔥 UI 開始 ------------------ */
  return (
    <div className="max-w-7xl mx-auto text-white">

      {/* 🔥 Banner（暗黑 + 跑馬燈 + 自動輪播） */}
      <div className="relative w-full h-44 md:h-64 rounded-xl overflow-hidden shadow-xl mb-8 bg-black">

        {/* 背景圖片（透明黑） */}
        <img
          src={banners[bannerIndex]}
          className="w-full h-full object-cover opacity-40"
        />

        {/* 遮罩文字內容 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            Laser Market
          </h1>

          {/* 跑馬燈 */}
          <div className="overflow-hidden whitespace-nowrap mt-2 w-full">
            <span className="animate-marquee text-gray-200 text-sm md:text-lg font-medium">
              🔥 Laser Market 暗黑專業版・二手機台平台・高品質設備・後台管理完備・立即刊登您的機台！
              ｜🔥 精選設備・嚴格上架・全台買賣・Cloudinary 圖片上傳・支援後台登入管理！
            </span>
          </div>
        </div>

        {/* 點點切換 */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                i === bannerIndex ? "bg-white" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔥 導覽列 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Laser Market</h1>

        <div className="flex gap-4 items-center">
          {!token && (
            <Link className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600" to="/admin/login">
              管理登入
            </Link>
          )}

          {token && (
            <>
              <Link className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500" to="/add">
                ＋ 新增機台
              </Link>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                onClick={logout}
              >
                登出
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔍 搜尋 + 篩選列 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 text-black">
        <input
          type="text"
          placeholder="搜尋名稱 / 型號 / 地區 / 價格..."
          className="border p-3 rounded-lg shadow-sm col-span-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg shadow-sm"
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">地區（全部）</option>
          <option>台北</option>
          <option>新北</option>
          <option>桃園</option>
          <option>台中</option>
          <option>台南</option>
          <option>高雄</option>
        </select>

        <select
          className="border p-3 rounded-lg shadow-sm"
          value={filterPower}
          onChange={(e) => setFilterPower(e.target.value)}
        >
          <option value="">功率（不限）</option>
          <option value="500">≥ 500W</option>
          <option value="1000">≥ 1000W</option>
          <option value="3000">≥ 3000W</option>
        </select>
      </div>

      {/* 排序 */}
      <div className="flex justify-end mb-6 text-black">
        <select
          className="border p-3 rounded-lg shadow-sm w-52"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">排序方式</option>
          <option value="newest">最新上架</option>
          <option value="low">價格：低 → 高</option>
          <option value="high">價格：高 → 低</option>
        </select>
      </div>

      {/* 🔥 卡片列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((m) => (
          <Link
            key={m.id}
            to={`/machine/${m.id}`}
            className="group transform hover:-translate-y-1 transition-all duration-200 text-white"
          >
            <div className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl border border-gray-700 overflow-hidden relative">

              {/* 熱賣標籤 */}
              {m.price < 100000 && (
                <div className="absolute bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-xl">
                  熱賣
                </div>
              )}

              {m.images?.length ? (
                <img
                  src={m.images[0]}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                  無圖片
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-bold mb-1">{m.name}</h2>
                <p className="text-sm text-gray-400">型號：{m.model}</p>
                <p className="text-sm text-gray-400">功率：{m.power}W</p>
                <p className="text-sm text-gray-400">地區：{m.location}</p>

                <div className="mt-3 text-xl font-extrabold text-blue-400">
                  ${m.price.toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Home;
import "./index.css";

