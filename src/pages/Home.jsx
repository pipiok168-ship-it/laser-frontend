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

  // ----------------------------------
  // 跑馬燈文字
  // ----------------------------------
  const marqueeText =
    "🚀 Laser Market 暗黑專業版・二手機台平台・高品質設備・後台管理完備・立即刊登您的機台！";

  // 載入資料
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
  if (error) return <div className="text-center p-8 text-xl text-red-500">{error}</div>;

  // ----------------------------------
  // 搜尋 + 篩選 + 排序
  // ----------------------------------
  let filtered = machines.filter((m) => {
    const t = `${m.name} ${m.model} ${m.location} ${m.power} ${m.price}`.toLowerCase();
    const kw = keyword.toLowerCase();

    const areaOk = filterArea ? m.location === filterArea : true;
    const powerOk = filterPower ? Number(m.power) >= Number(filterPower) : true;

    return t.includes(kw) && areaOk && powerOk;
  });

  if (sortType === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "high") filtered.sort((a, b) => b.price - a.price);
  if (sortType === "newest") filtered.sort((a, b) => b.id - a.id);

  return (
    <div className="max-w-7xl mx-auto">

      {/* 🔥 跑馬燈（Dark Theme） */}
      <div className="w-full bg-blue-600 text-white overflow-hidden h-10 flex items-center shadow-lg rounded-b-lg">
        <div className="animate-marquee whitespace-nowrap text-sm md:text-base font-medium">
          {marqueeText}
        </div>
      </div>

      {/* 🔥 導覽列 */}
      <div className="flex justify-between items-center my-8 px-2">
        <h1 className="text-3xl font-bold text-white">Laser Market</h1>

        <div className="flex gap-4">
          {!token && (
            <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500" to="/admin/login">
              管理登入
            </Link>
          )}

          {token && (
            <>
              <Link className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500" to="/add">
                ＋ 新增機台
              </Link>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500" onClick={logout}>
                登出
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔍 搜尋 + 篩選 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 px-2">
        <input
          type="text"
          placeholder="搜尋名稱 / 型號 / 地區..."
          className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg shadow"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg shadow"
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
          className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg shadow"
          value={filterPower}
          onChange={(e) => setFilterPower(e.target.value)}
        >
          <option value="">功率（不限）</option>
          <option value="500">≥ 500W</option>
          <option value="1000">≥ 1000W</option>
          <option value="3000">≥ 3000W</option>
        </select>

        <select
          className="border border-gray-700 bg-[#1a1a1a] text-white p-3 rounded-lg shadow"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">排序方式</option>
          <option value="newest">最新上架</option>
          <option value="low">價格：低 → 高</option>
          <option value="high">價格：高 → 低</option>
        </select>
      </div>

      {/* 🟦 卡片（Dark） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 pb-10">
        {filtered.map((m) => (
          <Link
            key={m.id}
            to={`/machine/${m.id}`}
            className="group transform hover:-translate-y-1 transition duration-200"
          >
            <div className="card-dark rounded-xl shadow-lg hover:shadow-2xl overflow-hidden">

              {m.images?.length ? (
                <img
                  src={m.images[0]}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-300">
                  無圖片
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-1">{m.name}</h2>
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
