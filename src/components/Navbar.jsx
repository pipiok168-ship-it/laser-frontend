import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // 確保 UI 立即更新
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Laser Market</h1>

      <div className="flex gap-3">
        {/* 未登入 → 顯示登入 */}
        {!token && (
          <Link
            to="/admin/login"
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            管理登入
          </Link>
        )}

        {/* 已登入 → 顯示新增機台 + 登出 */}
        {token && (
          <>
            <Link
              to="/add"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ＋ 新增機台
            </Link>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              登出
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
