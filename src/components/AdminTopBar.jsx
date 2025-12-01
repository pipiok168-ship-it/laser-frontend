import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminTopBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("laser_token");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#222] bg-[#050505]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div
          className="cursor-pointer font-semibold"
          onClick={() => navigate("/admin")}
        >
          Laser Market 後台<br/>
          <span className="text-xs text-[#8fe2ff]">暗黑專業版</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-[#00b4ff] transition"
          >
            機台管理
          </button>
          <button
            onClick={() => navigate("/admin/add")}
            className="hover:text-[#00b4ff] transition"
          >
            新增機台
          </button>
          <button
            onClick={logout}
            className="px-3 py-1 rounded-full border border-[#333] hover:border-red-500 hover:text-red-400 text-xs transition"
          >
            登出
          </button>
        </div>
      </div>
    </header>
  );
}

