import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import Ship from "./Ship";
import { handleCellClick } from "../utils/cellClick";
import { handleOrientation } from "../utils/orientation";
import ships from "../utils/shipData";
import getGameDetails from "../api/GetGameDetailsApi";
import handleGetUserDetails from "../api/GetUserDetailsApi";

const Playground = ({ gameId, showGame, setShowGame }) => {
  const [shipSet, setShipSet] = useState(ships);
  const [userDetails, setUserDetails] = useState("");
  const [gameDetails, setGameDetails] = useState("");
  const [activeShip, setActiveShip] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUserDetails() {
      const userDetails = await handleGetUserDetails(token);
      setUserDetails(userDetails);
    }
    getUserDetails();

    const interval = setInterval(async () => {
      try {
        const gameDetails = await getGameDetails(
          token,
          gameId,
          setShowGame,
          showGame
        );
        setGameDetails(gameDetails);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [token, gameId, setShowGame, showGame]);
  const handleCellClickWrapper = (pos) => {
    // create a wrapper function to pass as the callback to the Grid component
    handleCellClick(pos, activeShip, shipSet, setShipSet); // call the imported handleCellClick function with the required arguments
  };

  const handleOrientationWrapper = () => {
    // create a wrapper function to pass as the callback to the Grid component
    handleOrientation(activeShip, setShipSet); // call the imported handleCellClick function with the required arguments
  };

  // const handleCellClick = (cellCoordinate) => {
  //   if (activeShip) {
  //     setShips((prevShips) =>
  //       prevShips.map((ship) =>
  //         ship.id === activeShip ? { ...ship, position: cellCoordinate } : ship
  //       )
  //     );
  //   }
  // };

  const handleBackToAllGames = () => {
    setShowGame(false);
  };

  const handleSendMapConfig = async () => {
    const requestBody = {
      ships: shipSet
        .filter((ship) => ship.position !== null)
        .map((ship) => ({
          x: ship.position?.split("-")[1],
          y: parseInt(ship.position?.split("-")[0]),
          size: ship.size,
          direction: ship.orientation?.toUpperCase(),
        })),
    };

    try {
      const response = await axios.patch(
        `https://react-labs.softbinator.com/game/${gameId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Grid
        ships={shipSet}
        onCellClick={handleCellClickWrapper}
        activeShip={activeShip}
      />
      <Ship ships={shipSet} setActiveShip={setActiveShip} />
      <button onClick={handleOrientationWrapper}>Change orientation</button>
      <button onClick={handleSendMapConfig}>READY</button>
      <button onClick={handleBackToAllGames}>Back To All Games</button>
      {gameDetails.player2Id ? (
        <div className="game-details">
          <p style={{ color: "#000" }}>Id: {gameDetails?.id}</p>
          <p style={{ color: "#000" }}>Player1Id: {gameDetails?.player1Id}</p>
          <p style={{ color: "#000" }}>
            Player1 Email: {gameDetails?.player1Email}
          </p>
          <p style={{ color: "#000" }}>Player2Id: {gameDetails?.player2Id}</p>
          <p style={{ color: "#000" }}>
            Player2 Email: {gameDetails?.player2Email}
          </p>
          <p style={{ color: "#000" }}>
            Player to move: {gameDetails?.playerToMoveId}
          </p>
          <p>Moves: {JSON.stringify(gameDetails?.moves)}</p>
          <p>Ships Coord: {JSON.stringify(gameDetails?.shipsCoord)}</p>
          <p style={{ color: "#000" }}>
            Game Status: {gameDetails?.gameStatus}
          </p>
          <p>
            It is{" "}
            {gameDetails?.playerToMoveId
              ? gameDetails?.player1Email?.split("@")[0]
              : gameDetails?.player2Email?.split("@")[0]}{" "}
            turn
          </p>
        </div>
      ) : (
        <p style={{ color: "#fff", fontSize: "24px" }}>Waiting for opponent</p>
      )}
    </div>
  );
};
export default Playground;
