import React, { useEffect, useState } from "react";
import handleGetUserDetails from "../api/GetUserDetailsApi";
import "./Welcome.scss";

const Welcome = (props) => {
  return (
    <div className="welcome-message">
      <h1>
        Welcome, <span>{props.name}</span>
      </h1>
      <div className="player-info">
        <div className="player-games-info">
          <p>Games Played: {props.userDetails?.gamesPlayed}</p>
        </div>
        <div className="player-games-info">
          <p>Games Won: {props.userDetails?.gamesWon}</p>
        </div>
        <div className="player-games-info">
          <p>Games Lost: {props.userDetails?.gamesLost}</p>
        </div>
        <div className="player-games-info">
          <p>
            Currently Games Playing: {props.userDetails?.currentlyGamesPlaying}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
