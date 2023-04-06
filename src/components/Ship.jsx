import React, { useEffect, useState } from "react";
import getGameDetails from "../api/GetGameDetailsApi";
import submarine from "../images/submarine.png";
import carrier from "../images/carrier.png";
import destroyer from "../images/destroyer.png";
import cruiser from "../images/cruiser.png";
import battleship from "../images/battleship.png";

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
    <div className="ship-item-container-big">
      {shipsCoord?.length > 0 ? null : (
        <div className="ship-item-container">
          {props.ships.map((ship) => (
            <div
              key={ship.id}
              className={`ship-item ${ship.id === activeShip ? "active" : ""}`}
              onClick={() => handleShipClick(ship.id)}
            >
              <div className="ship-name">
                <p>{ship?.size ? ship.shipName : null}</p>
              </div>
              <div className="ship-position">
                <span>{ship.position !== null ? <p>PLACED</p> : null}</span>
              </div>
              <div className="ship-size">
                <p>Size: {ship.size}</p>
              </div>
              <img
                src={
                  ship.size === 2
                    ? destroyer
                    : ship.size === 3
                    ? submarine
                    : ship.size === 4
                    ? battleship
                    : carrier
                }
                alt={
                  ship.size === 2
                    ? "destroyer"
                    : ship.size === 3
                    ? "submarine"
                    : ship.size === 4
                    ? "battleship"
                    : "carrier"
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ship;
