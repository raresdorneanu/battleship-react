export const getCellBackgroundColor = (cellCoordinate, shipsCoord, ships) => {
  let backgroundColor = "";
  if (shipsCoord?.length > 0) {
    const [row, col] = cellCoordinate.split("-");
    const cellCoord = { x: col, y: parseInt(row) };

    shipsCoord.forEach((shipCoord) => {
      const { x, y } = shipCoord;
      if (x === cellCoord.x && y === cellCoord.y) {
        backgroundColor = "yellow";
      }
    });
  } else {
    ships?.forEach((ship) => {
      if (ship.position) {
        const [row, col] = ship.position.split("-");
        const size = ship.size;

        if (ship.orientation === "vertical") {
          const cellRow = parseInt(cellCoordinate.split("-")[0]);
          const shipHeadRow = parseInt(row);
          const shipTailRow = shipHeadRow + size - 1;

          if (
            col === cellCoordinate.split("-")[1] &&
            cellRow >= shipHeadRow &&
            cellRow <= shipTailRow
          ) {
            backgroundColor = "yellow";
          }
        } else {
          const cellCol = cellCoordinate.split("-")[1].charCodeAt(0);
          const shipHeadCol = col.charCodeAt(0);
          const shipTailCol = shipHeadCol + size - 1;

          if (
            row === cellCoordinate.split("-")[0] &&
            cellCol >= shipHeadCol &&
            cellCol <= shipTailCol
          ) {
            backgroundColor = "yellow";
          }
        }
      }
    });
  }
  return backgroundColor;
};
