import React, { useEffect, useState } from "react";
import Games from "../components/Games";
import Welcome from "../components/Welcome";
import "../styles/Dashboard.scss";
import handleGetUserDetails from "../api/GetUserDetailsApi";
import getAllGames from "../api/GetAllGamesApi";
import Background from "../components/background/background.component";
import joinGame from "../api/JoinGameApi";
import Playground from "../components/Playground";
import DashboardContext from "../context/DahsboardContext";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [games, setGames] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [name, setName] = useState("");
  const tokenName = localStorage.getItem("name");
  const [showGame, setShowGame] = useState(false);
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      const response = await handleGetUserDetails(token);
      setUserDetails(response);
    }
    getUserDetails();

    setName(tokenName.split("@")[0]);
  }, [userDetails, token, tokenName]);

  useEffect(() => {
    async function seeGames() {
      const gamesData = await getAllGames(token);
      setGames(gamesData);
    }
    seeGames();
  }, [games, token]);

  const handleJoinGame = (gameId) => {
    setGameId(gameId);
    const game = games.find((g) => g.id === gameId);

    if (!game) {
      alert("Game not found");
      return;
    }

    if (
      (game?.player1?.email?.split("@")[0] === name ||
        game?.player2?.email?.split("@")[0] === name) &&
      game?.status !== "FINISHED"
    ) {
      joinGame(token, gameId, setShowGame, showGame);
    } else if (game?.player1Id === null || game?.player2Id === null) {
      joinGame(token, gameId, setShowGame, showGame);
    } else if (
      (game?.player1?.email?.split("@")[0] === name ||
        game?.player2?.email?.split("@")[0] === name) &&
      game?.status === "FINISHED"
    ) {
      alert("This game finished");
    } else if (
      game?.player1?.email?.split("@")[0] !== name &&
      game?.player2?.email?.split("@")[0] !== name
    ) {
      alert("This game is full");
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        gameId,
        showGame,
        setShowGame,
        userDetails,
        token,
        games,
        name,
        handleJoinGame,
        setGames,
      }}
    >
      <Background showFlex={showGame}>
        {showGame ? (
          <Playground className="playground-reset" />
        ) : (
          <div className="dashboard">
            <Welcome token={token} userDetails={userDetails} name={name} />
            <div className="games-container-big">
              <Games />
            </div>
          </div>
        )}
      </Background>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
