import { useEffect, useState } from "react";
import api from "../api/axios";
import StoreCard from "../components/StoreCard";
import LogoutButton from "../components/LogoutButton";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
     fetchStores();
  }, []);

  const fetchStores = async () => {
    const res = await api.get("/stores");
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
    <div>
      <h2>Stores</h2>
      {stores.map(store => <StoreCard key={store.id} store={store} />)}
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Update Password</button>
      </div>

    
      <input
        type="text"
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {stores
        .filter(
          (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.address.toLowerCase().includes(search.toLowerCase())
        )
        .map((store) => (
          <div key={store.id}>
            <h4>{store.name}</h4>
            <p>{store.address}</p>
            <p>Rating: {store.rating}</p>
          </div>
        ))}
    
      <LogoutButton />
    </div>
  );
}
