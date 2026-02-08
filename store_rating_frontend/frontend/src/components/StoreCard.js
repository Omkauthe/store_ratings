import { useState } from "react";
import api from "../api/axios";
import "../styles/dashboard.css";

export default function StoreCard({ store }) {
  const [rating, setRating] = useState(store.userRating || 1);
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    try {
      setLoading(true);
      await api.post("/user/rate", {
        store_id: store.id,
        rating
      });
      alert("Rating submitted successfully ");
    } catch (err) {
      alert("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card store-card">
      <h4>{store.name}</h4>
      <p className="address">{store.address}</p>

      <p className="rating">
        ⭐ Overall Rating:{" "}
        <strong>{store.rating ? store.rating.toFixed(1) : "No ratings yet"}</strong>
      </p>

      <div className="rate-section">
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 && "s"}
            </option>
          ))}
        </select>

        <button onClick={submitRating} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
