import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AddMachine from "./pages/AddMachine";
import EditMachine from "./pages/EditMachine";
import MachineDetail from "./pages/MachineDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/add" element={<AddMachine />} />
          <Route path="/edit/:id" element={<EditMachine />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
