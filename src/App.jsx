import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddMachine from "./pages/AddMachine.jsx";
import EditMachine from "./pages/EditMachine.jsx";

// Admin 保護路由
function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* 首頁 */}
      <Route path="/" element={<Home />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* 新增機器 */}
      <Route
        path="/admin/machines/new"
        element={
          <AdminProtectedRoute>
            <AddMachine />
          </AdminProtectedRoute>
        }
      />

      {/* 編輯機器 */}
      <Route
        path="/admin/machines/:id/edit"
        element={
          <AdminProtectedRoute>
            <EditMachine />
          </AdminProtectedRoute>
        }
      />

      {/* 所有不存在路徑 → 導回首頁 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
