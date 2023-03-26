import React, { useState } from "react";

const Ship = (props) => {
  const [activeShip, setActiveShip] = useState(null);

  const handleShipClick = (shipId) => {
    props.setActiveShip(shipId);
    setActiveShip(shipId);
    console.log(activeShip);
  };

  return (
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
  );
};

export default Ship;
