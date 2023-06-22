import { useNavigate } from "react-router-dom"

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/register");
  }
  
  return (
    <button className="logout" onClick={logout}>Logout</button>
  )
}

export default Logout;