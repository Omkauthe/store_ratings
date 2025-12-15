import { useState } from "react";
import api from "../api/axios";

export default function UpdatePassword() {
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");

  const update = async () => {
    await api.put("/user/update-password", {
      oldPassword: oldPass,
      newPassword: newPass
    });
    alert("Password updated");
  };

  return (
    <div>
      <input type="password" placeholder="Old Password"
        onChange={e => setOld(e.target.value)} />
      <input type="password" placeholder="New Password"
        onChange={e => setNew(e.target.value)} />
      <button onClick={update}>Update</button>
    </div>
  );
}
