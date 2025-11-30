import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";

export default function AdminLogin() {
  const nav = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("token", res.data.token);
      nav("/admin/dashboard");
    } catch {
      setErr("帳號或密碼錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-900 flex items-center justify-center p-4">
      {/* 發光背景圓 */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-400 blur-3xl rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* LOGO & 標題 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 bg-black/40 backdrop-blur shadow-neon">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-wide text-blue-200">
              LASER MARKET ADMIN PANEL
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-white tracking-wide">
            後台管理登入
          </h1>
          <p className="mt-2 text-sm text-blue-200">
            僅限管理員使用 · 保護二手機台上架與資料安全
          </p>
        </div>

        {/* 外框卡片 */}
        <div className="bg-black/70 border border-slate-700/80 rounded-2xl shadow-neon backdrop-blur-xl p-6">
          {/* 跑馬燈 / 提示條 */}
          <div className="overflow-hidden whitespace-nowrap mb-4">
            <div className="animate-marquee text-xs text-blue-200/80">
              🔐 雙重驗證保護 · 所有操作將記錄於安全日誌 · Cloudinary 圖片管理 ·
              價格 / 地區 / 功率 管理 · 嚴格把關每一台機器…
            </div>
          </div>

          {/* 表單 */}
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs text-blue-200 mb-1">
                帳號（Username）
              </label>
              <input
                className="dark-input w-full bg-slate-900/80"
                placeholder="請輸入：admin"
                value={username}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs text-blue-200 mb-1">
                密碼（Password）
              </label>
              <input
                type="password"
                className="dark-input w-full bg-slate-900/80"
                placeholder="請輸入：123456"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            {err && (
              <p className="text-red-400 text-sm text-center font-medium">
                {err}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 font-bold text-sm tracking-widest text-black shadow-neon hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-wait"
            >
              {loading ? "驗證中…" : "登入後台"}
            </button>
          </form>

          {/* 底部小字 */}
          <div className="mt-4 text-[11px] text-slate-400 text-center">
            登入後即代表你同意記錄操作日誌。建議使用桌機瀏覽 ·
            若無法登入，請確認帳密：admin / 123456。
          </div>
        </div>
      </div>
    </div>
  );
}

