import React, { useContext, useState } from "react";
import Slider from "react-slick";
import Button from "./button/button.component";
import LogoutButton from "./LogoutButton";
import "../styles/Playground.scss";
import createGame from "../api/CreateGameApi";
import DashboardContext from "../context/DahsboardContext";

const Games = () => {
  const { token, games, handleJoinGame, setGames } =
    useContext(DashboardContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = games.filter((game) => {
    if (!game.player1 && !game.player2) {
      return false;
    }
    return (
      game.player1?.email?.includes(searchTerm) ||
      game.player2?.email?.includes(searchTerm)
    );
  });
  const numSlides = filteredGames.length;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    rows: numSlides < 4 ? 1 : 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: searchTerm ? "slider-hide-cloned" : "",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          rows: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCreateGame = () => {
    const newGame = createGame(token);
    if (newGame) {
      setGames((prevGames) => [...prevGames, newGame]);
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <div className="games-container">
          <Slider {...settings}>
            {filteredGames?.map((game, index) => (
              <div className="game-wrapper" key={game.id}>
                <span className="game-number">{index + 1}</span>,{" "}
                <p className="game-status-now">
                  {game.status === "MAP_CONFIG"
                    ? "CONFIGURING..."
                    : game.status === "CREATED"
                    ? "JOIN NOW"
                    : game.status === "ACTIVE"
                    ? "PLAYING"
                    : "GAME ENDED"}
                </p>
                <div
                  style={numSlides < 4 ? { width: "300px" } : null}
                  className={`game-item ${
                    game.status === "FINISHED"
                      ? "game-finished"
                      : game.player1 !== null && game.player2 === null
                      ? "game-free"
                      : "game-full"
                  }`}
                  onClick={() => handleJoinGame(game.id)}
                >
                  <div className="game-info">
                    <div className="game-item-player1">
                      {game.player1 && game.player1.email && (
                        <p>{game.player1.email.split("@")[0]}</p>
                      )}
                    </div>
                    <div className="game-item-player2">
                      {game.player2 && game.player2.email && (
                        <p>{game.player2.email.split("@")[0]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="dash-bottom">
          <div className="search-for-player">
            <h3>Search for player:</h3>
            <input
              type="text"
              placeholder="Search player by name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Button className="create-button" onClick={handleCreateGame}>
            Create Game
          </Button>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Games;
