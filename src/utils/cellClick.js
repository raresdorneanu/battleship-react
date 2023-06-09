export const handleCellClick = (
  pos,
  activeShip,
  shipSet,
  setShipSet,
  mapConfigSent
) => {
  if (activeShip && !mapConfigSent) {
    const [row, col] = pos.split("-");
    const size = shipSet.find((ship) => ship.id === activeShip).size;
    const orientation = shipSet.find(
      (ship) => ship.id === activeShip
    ).orientation;
    const endRow =
      orientation === "vertical" ? parseInt(row) + size - 1 : parseInt(row);
    const endCol =
      orientation === "horizontal"
        ? String.fromCharCode(col.charCodeAt(0) + size - 1)
        : col;

    if (
      (endRow <= 10 && endCol.charCodeAt(0) <= 74) ||
      (endCol.charCodeAt(9) <= 75 && endRow <= 10)
    ) {
      const overlappingShip = shipSet.find((ship) => {
        if (ship.id !== activeShip && ship.position) {
          const [sRow, sCol] = ship.position.split("-");
          const sSize = ship.size;
          const sOrientation = ship.orientation;
          const sEndRow =
            sOrientation === "vertical"
              ? parseInt(sRow) + sSize - 1
              : parseInt(sRow);
          const sEndCol =
            sOrientation === "horizontal"
              ? String.fromCharCode(sCol.charCodeAt(0) + sSize - 1)
              : sCol;

          for (let i = parseInt(sRow); i <= sEndRow; i++) {
            for (let j = sCol.charCodeAt(0); j <= sEndCol.charCodeAt(0); j++) {
              if (
                orientation === "vertical" &&
                i >= parseInt(row) &&
                i <= endRow &&
                col === String.fromCharCode(j)
              ) {
                return true;
              } else if (
                orientation === "horizontal" &&
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
        setShipSet((prevShips) =>
          prevShips.map((ship) => {
            if (ship.id === activeShip) {
              return { ...ship, position: pos };
            } else {
              return ship;
            }
          })
        );
      } else {
        alert("You can't overlap ships");
      }
    } else {
      alert("Ship can't fit on this cell");
    }
  }
};
