import React, { useEffect, useState } from "react";
import { getMachines, deleteMachine } from "../api";
import { useNavigate } from "react-router-dom";
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
    } catch {
      alert("刪除失敗！");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminTopBar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">機台列表管理</h2>

        <div className="bg-[#0b0b0b] border border-[#222] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2 text-gray-400 border-b border-[#222] text-xs">
            <div className="col-span-4">名稱 / 型號</div>
            <div className="col-span-2">地區</div>
            <div className="col-span-2">功率</div>
            <div className="col-span-2">價格</div>
            <div className="col-span-2 text-right">操作</div>
          </div>

          {loading ? (
            <div className="p-6 text-center">載入中…</div>
          ) : machines.length === 0 ? (
            <div className="p-6 text-center">目前尚未有任何資料</div>
          ) : (
            machines.map((m) => {
              const thumb = m.thumbs?.[0] || m.images?.[0] || "";

              return (
                <div
                  key={m.id}
                  className="grid grid-cols-12 px-4 py-3 border-b border-[#191919] hover:bg-white/5 transition"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-12 h-10 rounded bg-[#151515] overflow-hidden">
                      {thumb && (
                        <img
                          src={thumb}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-gray-400 text-xs">{m.model}</div>
                    </div>
                  </div>

                  <div className="col-span-2">{m.location}</div>
                  <div className="col-span-2">{m.power}</div>
                  <div className="col-span-2 text-[#00b4ff] font-semibold">
                    {m.price ? `NT$ ${m.price}` : "洽詢"}
                  </div>

                  <div className="col-span-2 flex justify-end gap-2">
                    <button
                      onClick={() =>
                        window.open(`/detail/${m.id}`, "_blank")
                      }
                      className="px-2 py-1 border border-[#333] rounded text-[11px] hover:border-[#00b4ff]"
                    >
                      檢視
                    </button>

                    <button
                      onClick={() => remove(m.id)}
                      className="px-2 py-1 rounded text-[11px] border border-red-500 text-red-400"
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
