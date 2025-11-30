import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");
      window.location.reload();
    } catch (err) {
      setError("帳號或密碼不正確");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-darkbg overflow-hidden">

      {/* ⭐ 霓虹流光背景（絕美） */}
      <div className="absolute inset-0">
        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-[120px] animate-pulse opacity-60" />
        <div className="absolute top-0 left-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-marquee" />
      </div>

      {/* 主卡片 */}
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-primary/20 backdrop-blur-xl bg-white/5 shadow-neon animate-fadein">

        {/* 光線掃描效果 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-marquee" />
        </div>

        {/* 標題 */}
        <h1 className="text-center text-4xl mb-4 font-extrabold text-white drop-shadow-lg animate-float">
          Laser Market Admin
        </h1>

        {/* 跑馬燈 */}
        <div className="overflow-hidden whitespace-nowrap w-full text-center mb-6">
          <span className="animate-marquee text-gray-300 text-sm">
            🔐 後台系統・安全架構・Cloudinary 圖片控管・高效登入平台 ｜ Cyberpunk Admin Panel ✨
          </span>
        </div>

        {/* 表單 */}
        <form onSubmit={login} className="space-y-5">

          {/* 帳號欄位 */}
          <div className="relative">
            <label className="text-gray-300 text-sm">帳號</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />

              <input
                type="text"
                placeholder="請輸入 admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-darkborder/40 border border-darkborder rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>
          </div>

          {/* 密碼欄位 */}
          <div className="relative">
            <label className="text-gray-300 text-sm">密碼</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />

              <input
                type={showPwd ? "text" : "password"}
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-darkborder/40 border border-darkborder rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />

              {/* 顯示/隱藏密碼 icon */}
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* 錯誤提示 */}
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {/* 霓虹登入按鈕 */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:shadow-neon active:scale-95 transition"
          >
            立即登入
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Laser Market Admin Panel
        </p>
      </div>
    </div>
  );
}
