import React, { useState } from "react";
import { adminLogin } from "../api"; // ★ 使用你的 api.js
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // ★ 使用 api.js 的 adminLogin()
      const res = await adminLogin(form);

      // ★ 存 token
      localStorage.setItem("token", res.data.token);

      // ★ 導向後台
      navigate("/admin");
    } catch (err) {
      setMsg("帳號或密碼不正確");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white w-96 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          管理登入
        </h2>

        <form onSubmit={login} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="帳號"
            className="border p-2 rounded"
            value={form.username}
            onChange={change}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="密碼"
            className="border p-2 rounded"
            value={form.password}
            onChange={change}
            required
          />

          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            登入
          </button>
        </form>

        {msg && (
          <div className="text-red-600 mt-3 text-center">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
