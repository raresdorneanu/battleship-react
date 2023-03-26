import React, { useEffect, useState } from "react";
import "../styles/Game.scss";
import { useNavigate } from "react-router-dom";
import getAllGames from "../api/GetAllGamesApi";
import joinGame from "../api/JoinGameApi";
import Playground from "./Playground";

const Games = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGame, setShowGame] = useState(false);
  const token = localStorage.getItem("token");
  const [gameId, setGameId] = useState("");
  const navigate = useNavigate();

  const handleJoinGame = (gameId) => {
    setGameId(gameId); // set the selected gameId
    joinGame(token, gameId, setShowGame, showGame);
  };

  useEffect(() => {
    async function seeGames() {
      const gamesData = await getAllGames(token);
      setGames(gamesData);
    }
    seeGames();
  }, []);

  const filteredGames = games.filter((game) => {
    if (!game.player1 && !game.player2) {
      return false; // Ignore games with missing players
    }
    return (
      game.player1?.email?.includes(searchTerm) ||
      game.player2?.email?.includes(searchTerm)
    );
  });

  return (
    <div className="games-container">
      {showGame ? (
        <Playground
          gameId={gameId}
          showGame={showGame}
          setShowGame={setShowGame}
        />
      ) : (
        <div className="games-container">
          <input
            type="text"
            placeholder="Search games by player name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {filteredGames.map((game) => (
            <div
              className={`game-item ${
                game.player1 !== null && game.player2 === null
                  ? "game-free"
                  : "game-full"
              }`}
              key={game.id}
              onClick={() => handleJoinGame(game.id)}
            >
              <div className="game-item-players">
                {game.player1 && game.player1.email && (
                  <p>{game.player1.email.split("@")[0]}</p>
                )}
                {game.player2 && game.player2.email && (
                  <p>{game.player2.email.split("@")[0]}</p>
                )}
              </div>
              <div className="game-vs">
                <h2>VS</h2>
                <p>id: {game.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Games;
