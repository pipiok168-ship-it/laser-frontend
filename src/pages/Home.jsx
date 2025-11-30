import React, { useEffect, useState } from "react";
import { fetchMachines } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMachines();
        setMachines(res.data || []);
      } catch (e) {
        console.error("讀取機台失敗:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
      {/* 頂部導覽列 */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-black/60 backdrop-blur sticky top-0 z-20">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => nav("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-neon">
            <span className="text-sm font-extrabold text-black">LM</span>
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide">
              LASER MARKET
            </div>
            <div className="text-[11px] text-slate-400">
              二手雷射機台嚴選平台
            </div>
          </div>
        </div>

        <button
          onClick={() => nav("/admin/login")}
          className="text-xs px-4 py-2 rounded-full border border-blue-500/60 text-blue-100 hover:bg-blue-500/10 transition"
        >
          管理登入
        </button>
      </nav>

      {/* Hero 區塊 */}
      <section className="px-6 pt-10 pb-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-blue-300 mb-3">
              PREMIUM USED LASER PLATFORM
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              精選二手雷射機台，
              <span className="text-blue-400"> 嚴格上架 · 安心交易</span>
            </h1>
            <p className="text-sm text-slate-300 mb-5">
              每一台機器皆由人工審核 · 支援圖片多張上傳 ·
              後台管理可快速調整價格、地區、功率等關鍵資訊。
            </p>

            <div className="flex flex-wrap gap-3 text-xs">
              <div className="px-3 py-2 rounded-full bg-blue-500/15 border border-blue-500/50">
                ✅ 實體店家優先上架
              </div>
              <div className="px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/40">
                🔍 支援地區 / 價格篩選
              </div>
              <div className="px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/40">
                🖼 多圖片 Cloudinary 管理
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-neon">
              <div className="flex gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="aspect-video bg-black/60 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                Laser Cutting · Engraving · Marking · Welding
              </div>
              <p className="mt-3 text-[11px] text-slate-300">
                從 CO₂、光纖到半導體雷射，我們專注於中高階與工業用設備，
                讓買賣雙方都能在同一平台安心匹配。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 列表區塊 */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">最新上架機台</h2>
              <p className="text-[11px] text-slate-400">
                由後台管理者手動上架 · 不展示來源不明機器
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-slate-300 text-sm">載入中…</div>
          ) : machines.length === 0 ? (
            <div className="text-sm text-slate-400 border border-dashed border-slate-700 rounded-xl p-6 text-center">
              目前尚未有上架機台，請至後台新增。
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {machines.map((m) => (
                <div
                  key={m.id}
                  className="bg-black/60 border border-slate-800 rounded-2xl overflow-hidden shadow hover:shadow-neon transition"
                >
                  {m.images?.[0] && (
                    <img
                      src={m.images[0]}
                      alt={m.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {m.name || "未命名機台"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {m.location || "地區未填寫"}
                    </p>
                    <p className="text-sm font-bold text-blue-400">
                      {m.price ? `${m.price} 元` : "價格洽詢"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
