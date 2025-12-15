import { useEffect, useState } from "react";
import api from "../api/axios";
import LogoutButton from "../components/LogoutButton";

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    api.get("/owner/dashboard").then(res => {
      setRatings(res.data.ratings);
      setAvg(res.data.avgRating);
    });
  }, []);

  return (
    <div>
      <h2>Store Rating: {avg}</h2>
      {ratings.map(r => (
        <p key={r.id}>{r.userName} → {r.rating}</p>
      ))}
      <LogoutButton />
    </div>
  );
}
