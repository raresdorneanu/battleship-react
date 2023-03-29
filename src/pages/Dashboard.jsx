import React, { useEffect, useState } from "react";
import Games from "../components/Games";
import Welcome from "../components/Welcome";
import "./Dashboard.scss";
import LogoutButton from "../components/LogoutButton";
import createGame from "../api/CreateGameApi";
import handleGetUserDetails from "../api/GetUserDetailsApi";
import getAllGames from "../api/GetAllGamesApi";
import Background from "../components/background/background.component";
import Button from "../components/button/button.component";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [games, setGames] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [name, setName] = useState("");
  const tokenName = localStorage.getItem("name");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredGames = games.filter((game) => {
    if (!game.player1 && !game.player2) {
      return false;
    }
    return (
      game.player1?.email?.includes(searchTerm) ||
      game.player2?.email?.includes(searchTerm)
    );
  });

  return (
    <Background>
      <div className="dashboard">
        <Welcome token={token} userDetails={userDetails} name={name} />
        <div className="games-container-big">
          <Games
            token={token}
            games={games}
            handleCreateGame={handleCreateGame}
            filteredGames={filteredGames}
          />
        </div>
        <div className="dash-bottom">
          <div className="search-for-player">
            <h3>Search for player:</h3>
            <input
              type="text"
              placeholder="Search games by player name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <form onSubmit={handleCreateGame}>
            <Button>Create Game</Button>
          </form>
        </div>
        <LogoutButton />
      </div>
    </Background>
  );
};

export default Dashboard;
