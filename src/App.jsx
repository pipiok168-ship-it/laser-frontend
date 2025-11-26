import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddMachine from "./pages/AddMachine.jsx";
import MachineDetail from "./pages/MachineDetail.jsx";
import EditMachine from "./pages/EditMachine.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公開頁面 */}
        <Route path="/" element={<Home />} />
        <Route path="/machine/:id" element={<MachineDetail />} />

        {/* 管理者登入 */}
        <Route path="/admin/login" element={<Login />} />

        {/* 需要登入的管理功能 */}
        <Route path="/add" element={<AddMachine />} />
        <Route path="/edit/:id" element={<EditMachine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

