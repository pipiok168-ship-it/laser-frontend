import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiPlusCircle, FiLogOut } from "react-icons/fi";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("none");

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 text-lg mt-10">{error}</div>
    );

  // Search + Sort
  let filtered = machines.filter((m) =>
    `${m.name} ${m.model} ${m.location} ${m.power} ${m.price}`
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  if (sortType === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "high") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100">

      {/* =========================== */}
      {/*  Hero Banner Section         */}
      {/* =========================== */}
      <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581091012184-5c8b8c4f07d4?auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-2xl">
            Laser Market
          </h1>
          <p className="mt-3 text-lg md:text-2xl text-gray-300 max-w-2xl">
            暗黑專業版・二手機台平台  
            高品質設備｜完整後台管理｜立即刊登您的機台！
          </p>
        </div>
      </div>

      {/* =========================== */}
      {/*   Navbar                    */}
      {/* =========================== */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">🔥 Laser Market</h1>

        <div className="flex gap-3">
          {!token && (
            <Link
              to="/admin/login"
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <FiLogIn /> 管理登入
            </Link>
          )}

          {token && (
            <>
              <Link
                to="/add"
                className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500"
              >
                <FiPlusCircle /> 新增機台
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
              >
                <FiLogOut /> 登出
              </button>
            </>
          )}
        </div>
      </div>

      {/* =========================== */}
      {/* Search Box                  */}
      {/* =========================== */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="搜尋機台名稱 / 型號 / 地區 / 價格..."
            className="w-full bg-gray-900 border border-gray-700 p-3 px-12 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none shadow-xl"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="flex justify-end mt-4">
          <select
            className="bg-gray-800 border border-gray-700 p-2 rounded-lg"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="none">排序方式</option>
            <option value="low">價格：低 → 高</option>
            <option value="high">價格：高 → 低</option>
          </select>
        </div>
      </div>

      {/* =========================== */}
      {/* Cards Section               */}
      {/* =========================== */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filtered.map((m) => (
          <Link
            key={m.id}
            to={`/machine/${m.id}`}
            className="group bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden hover:border-blue-500 hover:-translate-y-1 hover:shadow-blue-500/30 transition-all duration-300"
          >
            {m.images?.length ? (
              <img
                src={m.images[0]}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                無圖片
              </div>
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold">{m.name}</h2>
              <p className="text-sm text-gray-400">型號：{m.model}</p>
              <p className="text-sm text-gray-400">功率：{m.power}W</p>
              <p className="text-sm text-gray-400">地區：{m.location}</p>

              <div className="mt-3 text-2xl font-extrabold text-blue-400">
                ${m.price.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
