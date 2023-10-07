import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }
  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/buy">Buy Transaction</Link>
      <Link to="/sell">Sell Transaction</Link>
      <Link to="/summary">Summary</Link>
      <Link to="#" onClick={logout}>
        Logout
      </Link>
    </>
  );
}
