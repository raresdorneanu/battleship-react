import React, { useEffect, useState } from "react";
import getGameDetails from "../api/GetGameDetailsApi";

const Ship = (props) => {
  const [activeShip, setActiveShip] = useState(null);
  const [shipsCoord, setShipsCoord] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const gameDetails = await getGameDetails(
        props.token,
        props.gameId,
        props.setShowGame,
        props.showGame
      );
      setShipsCoord(gameDetails.shipsCoord);
    };

    fetchData();
  }, []);

  const handleShipClick = (shipId) => {
    props.setActiveShip(shipId);
    setActiveShip(shipId);
    console.log(activeShip);
  };

  return (
    <div>
      {shipsCoord?.length > 0 ? (
        <div></div>
      ) : (
        <div>
          {props.ships.map((ship) => (
            <div
              key={ship.id}
              className={ship.id === activeShip ? "active" : ""}
              onClick={() => handleShipClick(ship.id)}
              style={{
                border: "1px solid red",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <p>Size: {ship.size}</p>
              <p>Position: {ship.position}</p>
              <p>Position: {ship.orientation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ship;
