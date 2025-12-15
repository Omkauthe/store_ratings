import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/user" element={
        <ProtectedRoute role="USER">
          <UserDashboard />
        </ProtectedRoute>
      } />

      <Route path="/owner" element={
        <ProtectedRoute role="OWNER">
          <OwnerDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
