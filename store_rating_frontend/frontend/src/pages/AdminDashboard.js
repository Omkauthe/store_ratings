import { useEffect, useState } from "react";
import api from "../api/axios";
import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users:0, stores:0, ratings:0 });

  useEffect(() => {
    api.get("/admin/dashboard").then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Stores: {stats.stores}</p>
      <p>Total Ratings: {stats.ratings}</p>
      <LogoutButton />
    </div>
  );
}
