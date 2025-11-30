import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMachines, deleteMachine } from "../api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMachines = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchMachines();
      setMachines(data || []);
    } catch (err) {
      console.error("讀取機台失敗:", err);
      setError("讀取機台列表失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMachines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("確定要刪除這台機器嗎？此動作無法復原。")) return;

    try {
      await deleteMachine(id);
      await loadMachines();
    } catch (err) {
      console.error("刪除失敗:", err);
      alert("刪除失敗，請稍後再試。");
    }
  };

  const handleAdd = () => {
    navigate("/admin/machines/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/machines/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
      {/* Top Bar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Laser Market 後台管理</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium"
        >
          新增機台
        </button>
      </header>

      {/* Main */}
      <main className="px-6 py-6">
        <div className="max-w-6xl mx-auto bg-[#111218] border border-gray-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">機台列表</h2>
            <span className="text-sm text-gray-400">
              共 {machines.length} 筆
            </span>
          </div>

          {loading && (
            <p className="text-gray-400 text-sm">讀取中，請稍候...</p>
          )}

          {error && (
            <p className="text-red-400 text-sm mb-3">
              {error}
            </p>
          )}

          {!loading && machines.length === 0 && !error && (
            <p className="text-gray-400 text-sm">
              目前尚未有任何機台資料，請點右上角「新增機台」。
            </p>
          )}

          {!loading && machines.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="text-left py-2 pr-3">ID</th>
                    <th className="text-left py-2 pr-3">名稱</th>
                    <th className="text-left py-2 pr-3">型號</th>
                    <th className="text-left py-2 pr-3">功率</th>
                    <th className="text-left py-2 pr-3">價格</th>
                    <th className="text-left py-2 pr-3">地區</th>
                    <th className="text-right py-2 pl-3">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-gray-850 hover:bg-[#171822]"
                    >
                      <td className="py-2 pr-3 align-top text-gray-400">
                        {m.id}
                      </td>
                      <td className="py-2 pr-3 align-top">{m.name || "-"}</td>
                      <td className="py-2 pr-3 align-top">{m.model || "-"}</td>
                      <td className="py-2 pr-3 align-top">{m.power || "-"}</td>
                      <td className="py-2 pr-3 align-top">
                        {m.price ? `NT$ ${m.price}` : "-"}
                      </td>
                      <td className="py-2 pr-3 align-top">
                        {m.location || "-"}
                      </td>
                      <td className="py-2 pl-3 align-top text-right space-x-2">
                        <button
                          onClick={() => handleEdit(m.id)}
                          className="px-3 py-1 rounded-md text-xs bg-gray-700 hover:bg-gray-600"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="px-3 py-1 rounded-md text-xs bg-red-600 hover:bg-red-500"
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
