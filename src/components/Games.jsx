import React, { useState } from "react";
import Slider from "react-slick";
import Button from "./button/button.component";
import LogoutButton from "./LogoutButton";

const Games = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState(props.name);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    rows: searchTerm ? 1 : 2,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const filteredGames = props.games.filter((game) => {
    if (!game.player1 && !game.player2) {
      return false;
    }
    return (
      game.player1?.email?.includes(searchTerm) ||
      game.player2?.email?.includes(searchTerm)
    );
  });
  const numSlides = filteredGames.length;

  return (
    <div className="dashboard-container">
      <div>
        <div className="games-container">
          <Slider {...settings}>
            {filteredGames?.map((game) => (
              <div className="game-wrapper" key={game.id}>
                <div
                  style={numSlides < 4 ? { width: "300px" } : null}
                  className={`game-item ${
                    game.player1 !== null && game.player2 === null
                      ? "game-free"
                      : "game-full"
                  }`}
                  onClick={() => props.handleJoinGame(game.id)}
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
          <form onSubmit={props.handleCreateGame}>
            <Button>Create Game</Button>
          </form>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Games;
