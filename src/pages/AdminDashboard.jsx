import React, { useEffect, useState } from "react";
import { fetchMachines, deleteMachine } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

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

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!confirm("確定刪除這台機器？此動作無法復原。")) return;
    await deleteMachine(id);
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">後台管理 · 機台列表</h1>
            <p className="text-xs text-slate-400">
              你可以在此新增、編輯、刪除上架中的二手雷射機台。
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="text-xs px-4 py-2 rounded-full border border-slate-600 hover:bg-slate-800/60"
              onClick={() => {
                localStorage.removeItem("token");
                nav("/admin/login");
              }}
            >
              登出
            </button>
            <button
              className="btn-dark text-xs"
              onClick={() => nav("/admin/machines/new")}
            >
              + 新增機器
            </button>
          </div>
        </header>

        {loading ? (
          <p className="text-sm text-slate-300">載入中…</p>
        ) : machines.length === 0 ? (
          <div className="border border-dashed border-slate-700 rounded-xl p-6 text-center text-sm text-slate-400">
            尚未有上架機台，點右上角「新增機器」即可開始上架。
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {machines.map((m) => (
              <div
                key={m.id}
                className="bg-black/70 border border-slate-800 rounded-2xl overflow-hidden shadow hover:shadow-neon transition flex flex-col"
              >
                {m.images?.[0] && (
                  <img
                    src={m.images[0]}
                    alt={m.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold line-clamp-1">
                      {m.name || "未命名機台"}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      {m.location || "地區未填寫"}
                    </p>
                    <p className="text-sm font-bold text-blue-400 mt-1">
                      {m.price ? `${m.price} 元` : "價格洽詢"}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      className="btn-dark flex-1 text-xs"
                      onClick={() => nav(`/admin/machines/${m.id}/edit`)}
                    >
                      編輯
                    </button>
                    <button
                      className="flex-1 text-xs px-3 py-2 rounded bg-red-600 hover:bg-red-700"
                      onClick={() => del(m.id)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
