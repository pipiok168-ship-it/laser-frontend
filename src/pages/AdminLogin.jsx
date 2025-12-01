// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 如果已經登入就直接進後台
  useEffect(() => {
    const token = localStorage.getItem("laser_token");
    if (token) navigate("/admin");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("laser_token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.log(err);
      setError("登入失敗，請確認帳號密碼或稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00b4ff33,transparent_60%)] opacity-70" />
      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a]/95 border border-[#262626] rounded-3xl p-7 shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        <div className="mb-6 text-center">
          <p className="text-xs text-[#7ddcff] tracking-[0.25em] uppercase mb-2">
            Admin Console
          </p>
          <h1 className="text-2xl font-semibold mb-2">
            Laser Market 後台登入
          </h1>
          <p className="text-xs text-gray-400">
            暗黑專業版 v2.0 ・ 僅限管理者存取
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-gray-300">
              帳號
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#101010] border border-[#262626] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00b4ff]"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">
              密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#101010] border border-[#262626] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00b4ff]"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-2xl bg-[#00b4ff] text-black font-semibold text-sm hover:bg-[#33c8ff] disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "登入中…" : "登入後台"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-2 py-2 rounded-2xl border border-[#333] text-xs text-gray-300 hover:border-[#00b4ff] hover:text-[#8fe2ff] transition"
          >
            回到前台首頁
          </button>
        </form>
      </div>
    </div>
  );
}

