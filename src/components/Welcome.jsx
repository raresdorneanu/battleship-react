import React, { useEffect, useState } from "react";
import handleGetUserDetails from "../api/GetUserDetailsApi";

const Welcome = () => {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const tokenName = localStorage.getItem("name");
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    async function getUserDetails() {
      const response = await handleGetUserDetails(token);
      setUserDetails(response);
    }
    getUserDetails();

    setName(tokenName.split("@")[0]);
  }, []);

  return (
    <div>
      <h1>
        Welcome, <span>{name}</span>
      </h1>
      <p style={{ color: "#fff" }}>Id: {userDetails.userId}</p>
      <p style={{ color: "#fff" }}>Email: {userDetails.email}</p>
      <p style={{ color: "#fff" }}>Games Played: {userDetails.gamesPlayed}</p>
      <p style={{ color: "#fff" }}>Games Won: {userDetails.gamesWon}</p>
      <p style={{ color: "#fff" }}>Games Lost: {userDetails.gamesLost}</p>
      <p style={{ color: "#fff" }}>
        Currently Games Playing: {userDetails.currentlyGamesPlaying}
      </p>
    </div>
  );
};

export default Welcome;
