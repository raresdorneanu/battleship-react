import React, { useEffect, useState } from "react";
import Games from "../components/Games";
import Welcome from "../components/Welcome";
import "./Dashboard.scss";
import createGame from "../api/CreateGameApi";
import handleGetUserDetails from "../api/GetUserDetailsApi";
import getAllGames from "../api/GetAllGamesApi";
import Background from "../components/background/background.component";
import joinGame from "../api/JoinGameApi";
import Playground from "../components/Playground";

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
  }, [userDetails]);

  useEffect(() => {
    async function seeGames() {
      const gamesData = await getAllGames(token);
      setGames(gamesData);
    }
    seeGames();
  }, [games]);

  const handleCreateGame = () => {
    createGame(token, setGames);
  };

  const handleJoinGame = (gameId) => {
    setGameId(gameId);
    joinGame(token, gameId, setShowGame, showGame, name);
  };

  return (
    <Background showFlex={showGame}>
      {showGame ? (
        <Playground
          gameId={gameId}
          showGame={showGame}
          setShowGame={setShowGame}
          userDetails={userDetails}
          className="playground-reset"
        />
      ) : (
        <div className="dashboard">
          <Welcome token={token} userDetails={userDetails} name={name} />
          <div className="games-container-big">
            <Games
              token={token}
              games={games}
              handleCreateGame={handleCreateGame}
              name={name}
              handleJoinGame={handleJoinGame}
              gameId={gameId}
            />
          </div>
        </div>
      )}
    </Background>
  );
};

export default Dashboard;
