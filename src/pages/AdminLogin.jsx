import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (err) {
      setError("帳號或密碼不正確");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg px-6">

      {/* 外層容器 */}
      <div className="w-full max-w-md bg-darkcard p-8 rounded-2xl shadow-neon border border-darkborder">

        {/* Logo 區域 */}
        <h1 className="text-center text-4xl font-extrabold text-white text-glow mb-3">
          Laser Market 管理後台
        </h1>

        {/* 跑馬燈 */}
        <div className="overflow-hidden whitespace-nowrap w-full text-center mb-6">
          <span className="animate-marquee text-gray-400 text-sm">
            🔐 專業管理平台・Cloudinary 圖片管理・安全登入・高品質二手機台資料庫
            ｜🔥 全站暗黑模式・後台一鍵管理・立即登入！
          </span>
        </div>

        {/* 表單 */}
        <form onSubmit={login} className="space-y-5">

          <div>
            <label className="text-gray-300 text-sm">帳號</label>
            <input
              type="text"
              className="dark-input w-full mt-1"
              placeholder="請輸入 admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">密碼</label>
            <input
              type="password"
              className="dark-input w-full mt-1"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full btn-dark bg-primary text-white font-bold py-3 rounded-lg hover:shadow-neon transition"
          >
            登入
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Laser Market Admin Panel  
        </p>
      </div>
    </div>
  );
}
