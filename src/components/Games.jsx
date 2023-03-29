import React, { useState } from "react";
import "../styles/Game.scss";
import joinGame from "../api/JoinGameApi";
import Playground from "./Playground";
import Slider from "react-slick";

const Games = (props) => {
  const [showGame, setShowGame] = useState(false);
  const [gameId, setGameId] = useState("");
  const numSlides = props.filteredGames.length;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    rows: numSlides < 4 ? 1 : 2,
    slidesToShow: numSlides < 4 ? numSlides : 4,
    slidesToScroll: numSlides < 4 ? numSlides : 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: numSlides < 4 ? numSlides : 3,
          slidesToScroll: numSlides < 4 ? numSlides : 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: numSlides < 3 ? numSlides : 2,
          slidesToScroll: numSlides < 3 ? numSlides : 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: numSlides < 3 ? numSlides : 1,
          slidesToScroll: numSlides < 3 ? numSlides : 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const handleJoinGame = (gameId) => {
    setGameId(gameId);
    joinGame(props.token, gameId, setShowGame, showGame);
  };

  return (
    <div className="dashboard-container">
      {showGame ? (
        <Playground
          gameId={gameId}
          showGame={showGame}
          setShowGame={setShowGame}
          userDetails={props.userDetails}
        />
      ) : (
        <div>
          <div className="games-container">
            <Slider {...settings}>
              {props.filteredGames.map((game) => (
                <div className="game-wrapper">
                  <div
                    style={numSlides < 4 ? { width: "300px" } : null}
                    className={`game-item ${
                      game.player1 !== null && game.player2 === null
                        ? "game-free"
                        : "game-full"
                    }`}
                    key={game.id}
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
        </div>
      )}
    </div>
  );
};

export default Games;
