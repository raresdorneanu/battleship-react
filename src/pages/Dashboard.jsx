import React, { useState } from "react";
import Games from "../components/Games";
import Welcome from "../components/Welcome";
import "../styles/Dashboard.scss";
import Playground from "../components/Playground";
import LogoutButton from "../components/LogoutButton";
import joinGame from "../api/JoinGameApi";
import createGame from "../api/CreateGameApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [games, setGames] = useState([]);

  const handleCreateGame = () => {
    createGame(token, setGames);
  };
  return (
    <div className="dashboard">
      <Welcome />
      <div className="games-container-big">
        <Games />
      </div>
      <form onSubmit={handleCreateGame}>
        <button>Create Game</button>
      </form>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
