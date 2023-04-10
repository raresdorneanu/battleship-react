import React, { useContext } from "react";
import submarine from "../images/submarine.png";
import carrier from "../images/carrier.png";
import destroyer from "../images/destroyer.png";
import battleship from "../images/battleship.png";
import PlaygroundContext from "../context/PlaygroundContext";

const Ship = () => {
  const { shipSet, setActiveShip, activeShip, gameDetails } =
    useContext(PlaygroundContext);

  const handleShipClick = (shipId) => {
    if (gameDetails?.player2Id) {
      setActiveShip(shipId);
    } else {
      alert("Wait for other player to join");
    }
  };

  return (
    <div className="ship-item-container-big">
      {gameDetails?.shipsCoord?.length > 0 ? null : (
        <div className="ship-item-container">
          {shipSet.map((ship) => (
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
