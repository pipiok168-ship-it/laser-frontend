import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", form);

      // 儲存 Token
      localStorage.setItem("token", res.data.token);

      setMsg("登入成功！");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.error(err);
      setMsg("帳號或密碼不正確");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">管理者登入</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="帳號"
          className="border p-2 rounded"
          value={form.username}
          onChange={change}
        />

        <input
          type="password"
          name="password"
          placeholder="密碼"
          className="border p-2 rounded"
          value={form.password}
          onChange={change}
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          登入
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}

export default Login;
