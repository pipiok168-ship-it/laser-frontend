import React, { useEffect, useState } from "react";
import { fetchMachines, deleteMachine } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [machines, setMachines] = useState([]);
  const nav = useNavigate();

  const load = () => {
    fetchMachines().then((r) => setMachines(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!confirm("確定刪除這台機器？")) return;
    await deleteMachine(id);
    load();
  };

  return (
    <div className="min-h-screen bg-darkbg p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">後台管理</h1>
        <button
          className="btn-dark"
          onClick={() => nav("/admin/machines/new")}
        >
          + 新增機器
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((m) => (
          <div
            key={m.id}
            className="bg-darkcard p-4 border border-darkborder rounded-xl shadow hover:shadow-neon"
          >
            {m.images?.[0] && (
              <img
                src={m.images[0]}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <h2 className="text-xl font-bold">{m.name}</h2>
            <p className="text-gray-400">{m.location}</p>

            <div className="flex gap-3 mt-4">
              <button
                className="btn-dark flex-1"
                onClick={() => nav(`/admin/machines/${m.id}/edit`)}
              >
                編輯
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 flex-1"
                onClick={() => del(m.id)}
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
