import { useEffect, useState } from "react";
import api from "../api/axios";
import StoreCard from "../components/StoreCard";
import LogoutButton from "../components/LogoutButton";
import "../styles/dashboard.css";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const res = await api.get("/user/stores");
    setStores(res.data);
  };

  const updatePassword = async () => {
    try {
      await api.put("/auth/update-password", { newPassword });
      alert("Password updated");
      setNewPassword("");
    } catch {
      alert("Password update failed");
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>User Dashboard</h2>
        <LogoutButton />
      </div>

      <div className="card password-card">
        <h3>Update Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Update Password</button>
      </div>

      <div className="card search-card">
        <input
          type="text"
          placeholder="Search by store name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="store-grid">
        {stores
          .filter(
            (s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.address.toLowerCase().includes(search.toLowerCase())
          )
          .map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
      </div>
    </div>
  );
}
