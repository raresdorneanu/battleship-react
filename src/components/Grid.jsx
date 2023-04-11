import React, { useContext } from "react";
import "../styles/GridMarks.scss";
import PlaygroundContext from "../context/PlaygroundContext";

const Grid = () => {
  const {
    shipSet,
    gameDetails,
    setFinishMessage,
    handleCellClickWrapper,
    myId,
  } = useContext(PlaygroundContext);

  let tempRows = [];
  for (let i = 1; i <= 10; i++) {
    tempRows.push(i);
  }

  const rows = tempRows;

  let tempCols = [];
  for (let i = 65; i <= 74; i++) {
    tempCols.push(String.fromCharCode(i));
  }

  const cols = tempCols;

  const gridDisplay = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      gridDisplay.push(rows[i] + "-" + cols[j]);
    }
  }

  const grid = gridDisplay;

  const getCellBackgroundColor = (cellCoordinate) => {
    let backgroundColor = "";
    if (gameDetails?.shipsCoord?.length > 0) {
      const [row, col] = cellCoordinate.split("-");
      const cellCoord = { x: col, y: parseInt(row) };

      gameDetails?.shipsCoord.forEach((shipCoord) => {
        const { x, y } = shipCoord;
        if (
          x === cellCoord.x &&
          y === cellCoord.y &&
          shipCoord.playerId === myId
        ) {
          backgroundColor = "#800020";
        }
      });
    } else {
      shipSet?.forEach((ship) => {
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
              backgroundColor = "#800020";
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
              backgroundColor = "#800020";
            }
          }
        }
      });
    }
    return backgroundColor;
  };

  const getCellContent = (cellCoordinate) => {
    if (gameDetails?.moves?.length > 0) {
      const [row, col] = cellCoordinate.split("-");
      const cellCoord = { x: col, y: parseInt(row) };
      const move = gameDetails?.moves?.find(
        (m) => m.playerId !== myId && m.x === cellCoord.x && m.y === cellCoord.y
      );
      if (move) {
        if (move.result) {
          return <div className="hit-mark"></div>;
        } else if (getCellBackgroundColor(cellCoordinate) !== "#800020") {
          return <div className="miss-mark"></div>;
        }
      }
    }
    return "";
  };

  const redCells = grid.filter(
    (cellCoordinate) => getCellBackgroundColor(cellCoordinate) === "#800020"
  );

  const xCount = redCells.reduce((count, cellCoordinate) => {
    const content = getCellContent(cellCoordinate);
    return count + (content && content.props.className === "hit-mark" ? 1 : 0);
  }, 0);

  if (gameDetails?.gameStatus === "FINISHED") {
    setFinishMessage(
      xCount === 31
        ? "Sorry, you lost. Better luck next time!"
        : "Congratulations, you won! Great job!"
    );
  }

  return (
    <>
      <div
        className={`grid-container-big ${
          gameDetails?.shipsCoord?.length <= 0 ||
          gameDetails?.gameStatus === "CREATED"
            ? "ships-not-placed"
            : ""
        }`}
        style={
          gameDetails?.shipsCoord?.length > 0
            ? { transform: "rotateX(60deg) rotateY(0deg) rotateZ(-40deg)" }
            : null
        }
      >
        <h2>Your Grid:</h2>
        <div className="grid-container">
          {grid.map((coord, index) => (
            <div
              className={`cell ${
                gameDetails?.shipsCoord?.length <= 0 ? "cell-hover" : ""
              }`}
              key={index}
              onClick={() => handleCellClickWrapper(coord)}
              style={{ backgroundColor: getCellBackgroundColor(coord) }}
            >
              {getCellContent(coord)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
