import React, { useState } from "react";
import api, { getMachines, adminLogin } from "../api";

export default function TestSite() {
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    setLog((prev) => [...prev, msg]);
  };

  // 測試 API 連線
  const testApi = async () => {
    addLog("🟡 測試 Render API 中...");
    try {
      const res = await api.get("/status"); // 你後端可以加一個簡單的 status 回傳
      addLog("🟢 API 連線成功：" + JSON.stringify(res.data));
    } catch (err) {
      addLog("🔴 API 連線失敗：" + err.message);
    }
  };

  // 測試機台 API
  const testMachines = async () => {
    addLog("🟡 測試 /machines 中...");
    try {
      const res = await getMachines();
      addLog("🟢 抓取成功，筆數：" + res.data.length);
    } catch (err) {
      addLog("🔴 /machines 失敗：" + err.message);
    }
  };

  // 測試登入
  const testLogin = async () => {
    addLog("🟡 測試 admin login...");
    try {
      const res = await adminLogin({
        username: "admin",
        password: "123456",
      });

      addLog("🟢 登入成功，token：" + res.data.token.substring(0, 20) + "...");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      addLog("🔴 登入失敗：" + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">測試網站（健康檢查）</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={testApi}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          測試 API 連線
        </button>

        <button
          onClick={testMachines}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          測試 /machines
        </button>

        <button
          onClick={testLogin}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          測試 Login
        </button>
      </div>

      <div className="bg-black text-green-400 p-3 rounded h-72 overflow-y-auto">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
