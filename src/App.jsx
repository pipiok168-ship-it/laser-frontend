import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddMachine from "./pages/AddMachine.jsx";
import EditMachine from "./pages/EditMachine.jsx";

/* 後台保護機制 */
function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* 前台首頁 */}
      <Route path="/" element={<Home />} />

      {/* 後台登入（這裡絕對不能放到 AdminProtectedRoute 裡） */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 後台：需要 token 才能進入 */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/machines/new"
        element={
          <AdminProtectedRoute>
            <AddMachine />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/machines/:id/edit"
        element={
          <AdminProtectedRoute>
            <EditMachine />
          </AdminProtectedRoute>
        }
      />

      {/* 其他頁面全部導回首頁 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
