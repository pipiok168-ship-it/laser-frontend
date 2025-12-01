import React, { useState } from "react";
import { adminLogin } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const submit = async () => {
    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("laser_token", res.data.token);
      nav("/admin");
    } catch {
      alert("登入失敗！");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white px-4">
      <div className="w-full max-w-sm bg-[#0d0d0d] p-6 rounded-xl border border-[#222]">
        <h2 className="text-xl font-bold mb-4">管理員登入</h2>

        <input
          placeholder="帳號"
          value={username}
          onChange={(e) => setU(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-[#111] border border-[#333] rounded"
        />

        <input
          placeholder="密碼"
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-[#111] border border-[#333] rounded"
        />

        <button
          onClick={submit}
          className="w-full py-2 bg-[#00b4ff] text-black rounded font-semibold"
        >
          登入
        </button>
      </div>
    </div>
  );
}


