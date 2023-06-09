import { useNavigate } from "react-router-dom";
import Background from "../components/background/background.component";
import Button from "../components/button/button.component";
import "../styles/HomePage.scss";
const HomePage = () => {
  const navigate = useNavigate();
  const navigateSignIn = () => {
    navigate("/signin");
  };
  return (
    <Background>
      <div className="homepage-start">
        <div className="container">
          <h2 className="game-title">BATTLESHIP</h2>
          <Button onClick={navigateSignIn}>PLAY</Button>
        </div>
      </div>
    </Background>
  );
};
export default HomePage;
