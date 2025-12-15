import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => {
      localStorage.clear();
      navigate("/");
    }}>
      Logout
    </button>
  );
}
