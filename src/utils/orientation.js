export const handleOrientation = (activeShip, setShipSet, mapConfigSent) => {
  if (activeShip && !mapConfigSent) {
    setShipSet((prevShips) =>
      prevShips.map((ship) => {
        if (ship.id === activeShip) {
          const position = ship.position;
          if (!position) {
            // ship has not been placed on grid yet, do nothing
            return ship;
          }
          const [row, col] = position.split("-");
          const size = ship.size;
          const currentOrientation = ship.orientation;
          const newOrientation =
            currentOrientation === "horizontal" ? "vertical" : "horizontal";
          const endRow =
            parseInt(row) + (newOrientation === "vertical" ? size - 1 : 0);
          const endCol = String.fromCharCode(
            col.charCodeAt(0) + (newOrientation === "horizontal" ? size - 1 : 0)
          );

          // Check if ship can fit in new orientation
          if (endRow > 10 || endCol.charCodeAt(0) > 74) {
            alert("Ship can't fit in new orientation");
            return ship;
          }

          // Check if new ship will overlap with any existing ship
          const overlappingShip = prevShips.find((s) => {
            if (s.id !== activeShip && s.position) {
              const [sRow, sCol] = s.position.split("-");
              const sSize = s.size;
              const sOrientation = s.orientation;
              const sEndRow =
                parseInt(sRow) + (sOrientation === "vertical" ? sSize - 1 : 0);
              const sEndCol = String.fromCharCode(
                sCol.charCodeAt(0) +
                  (sOrientation === "horizontal" ? sSize - 1 : 0)
              );

              for (let i = parseInt(sRow); i <= sEndRow; i++) {
                for (
                  let j = sCol.charCodeAt(0);
                  j <= sEndCol.charCodeAt(0);
                  j++
                ) {
                  if (
                    newOrientation === "vertical" &&
                    i >= parseInt(row) &&
                    i <= endRow &&
                    col === String.fromCharCode(j)
                  ) {
                    return true;
                  } else if (
                    newOrientation === "horizontal" &&
                    row === `${i}` &&
                    j >= col.charCodeAt(0) &&
                    j <= endCol.charCodeAt(0)
                  ) {
                    return true;
                  }
                }
              }
            }
            return false;
          });

          if (!overlappingShip) {
            return { ...ship, orientation: newOrientation };
          } else {
            alert("You can't overlap ships");
            return ship;
          }
        } else {
          return ship;
        }
      })
    );
  }
};
