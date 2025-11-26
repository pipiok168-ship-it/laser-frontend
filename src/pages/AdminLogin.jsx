// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { adminLogin } from "../api"; // ★ 使用你的 axios instance
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  // 表單輸入更新
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 登入處理
  const login = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await adminLogin(form);

      // 儲存 token
      localStorage.setItem("token", res.data.token);

      // 導向後台首頁
      navigate("/admin");
    } catch (err) {
      console.log(err);
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
          {/* 帳號 */}
          <input
            name="username"
            placeholder="帳號"
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            value={form.username}
            onChange={change}
            required
          />

          {/* 密碼 */}
          <input
            name="password"
            type="password"
            placeholder="密碼"
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            value={form.password}
            onChange={change}
            required
          />

          {/* 登入按鈕 */}
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            登入
          </button>
        </form>

        {/* 錯誤訊息 */}
        {msg && (
          <div className="text-red-600 mt-3 text-center text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
