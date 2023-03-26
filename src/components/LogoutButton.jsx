import { useNavigate } from "react-router-dom";
import Button from "./button/button.component";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
