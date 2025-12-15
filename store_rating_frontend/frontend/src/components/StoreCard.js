import { useState } from "react";
import api from "../api/axios";

export default function StoreCard({ store }) {
  const [rating, setRating] = useState(store.userRating || 1);

  const submitRating = async () => {
    await api.post("/ratings", { storeId: store.id, rating });
    alert("Rating submitted");
  };

  return (
    <div>
      <h4>{store.name}</h4>
      <p>{store.address}</p>
      <p>Overall Rating: {store.avgRating}</p>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
      </select>
      <button onClick={submitRating}>Submit</button>
    </div>
  );
}
