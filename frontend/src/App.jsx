import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
      return;
    }
    navigate("/home");
  }, []);

  return <div>ha!</div>;
}
