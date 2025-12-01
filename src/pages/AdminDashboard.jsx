// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMachines, deleteMachine } from "../api";
import AdminTopBar from "../components/AdminTopBar.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("laser_token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  const load = async () => {
    try {
      const res = await getMachines();
      setMachines(res.data);
    } catch (err) {
      console.log("讀取失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("確定要刪除嗎？")) return;
    try {
      await deleteMachine(id);
      load();
    } catch (err) {
      console.log("刪除失敗:", err);
      alert("刪除失敗，請稍後再試。");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminTopBar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              機台列表管理
            </h2>
            <p className="text-xs text-gray-400">
              目前共有 {machines.length} 台機器在平台上架
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add")}
            className="px-3 py-1.5 rounded-full bg-[#00b4ff] text-black text-sm font-semibold hover:bg-[#35c9ff] transition"
          >
            ＋ 新增機台
          </button>
        </div>

        <div className="bg-[#0b0b0b] border border-[#222] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 text-xs px-4 py-2 border-b border-[#222] text-gray-400">
            <div className="col-span-4">名稱 / 型號</div>
            <div className="col-span-2">地區</div>
            <div className="col-span-2">功率</div>
            <div className="col-span-2">價格</div>
            <div className="col-span-2 text-right">操作</div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              載入中…
            </div>
          ) : machines.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              目前尚未有任何資料
            </div>
          ) : (
            machines.map((m) => {
              const thumb = m.thumbs?.[0] || m.images?.[0] || "";

              return (
                <div
                  key={m.id}
                  className="grid grid-cols-12 items-center text-xs px-4 py-3 border-b border-[#191919] hover:bg-white/5"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg bg-[#151515] overflow-hidden flex-shrink-0">
                      {thumb && (
                        <img
                          src={thumb}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-[13px] line-clamp-1">
                        {m.name}
                      </div>
                      <div className="text-gray-400 line-clamp-1">
                        {m.model}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-gray-200">
                    {m.location}
                  </div>

                  <div className="col-span-2 text-gray-200">
                    {m.power}
                  </div>

                  <div className="col-span-2 text-[#00b4ff] font-semibold">
                    {m.price ? `NT$ ${m.price}` : "洽詢"}
                  </div>

                  <div className="col-span-2 flex justify-end gap-2">
                    <button
                      onClick={() => window.open(`/detail/${m.id}`, "_blank")}
                      className="px-2 py-1 rounded-full border border-[#333] text-[11px] hover:border-[#00b4ff] hover:text-[#8fe2ff] transition"
                    >
                      檢視
                    </button>

                    <button
                      onClick={() => remove(m.id)}
                      className="px-2 py-1 rounded-full border border-red-600/70 text-[11px] text-red-300 hover:bg-red-900/40 transition"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}
