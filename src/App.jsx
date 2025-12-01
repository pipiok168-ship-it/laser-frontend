import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MachineDetail from "./pages/MachineDetail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddMachine from "./pages/AddMachine.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MachineDetail />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddMachine />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}


