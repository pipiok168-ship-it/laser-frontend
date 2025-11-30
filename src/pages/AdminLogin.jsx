import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";

export default function AdminLogin() {
  console.log("目前前端 API BaseURL =", api.defaults.baseURL);
  const nav = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await adminLogin(username, password);
      localStorage.setItem("token", res.data.token);
      nav("/admin/dashboard");
    } catch {
      setErr("帳號或密碼錯誤");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg p-6">
      <div className="w-full max-w-md bg-darkcard border border-darkborder p-8 rounded-xl shadow-neon">
        <h1 className="text-center text-3xl font-bold mb-4">Laser Market 後台</h1>

        <form onSubmit={login} className="space-y-4">
          <input
            className="dark-input w-full"
            placeholder="帳號：admin"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            className="dark-input w-full"
            placeholder="密碼：123456"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          {err && <p className="text-red-500">{err}</p>}

          <button className="btn-dark w-full py-3 text-lg">登入</button>
        </form>
      </div>
    </div>
  );
}

