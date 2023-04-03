import React, { useState, useEffect } from "react";
import "./GridMarks.scss";
const Grid = (props) => {
  const token = localStorage.getItem("token");
  const [shipsCoord, setShipsCoord] = useState([]);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    setShipsCoord(props.gameDetails?.shipsCoord);
    setMoves(props.gameDetails?.moves);
    console.log(props.gameDetails?.shipsCoord?.length);
  }, [props.gameDetails]);

  let tempRows = [];
  for (let i = 1; i <= 10; i++) {
    tempRows.push(i);
  }

  const [rows, setRows] = useState(tempRows);

  let tempCols = [];
  for (let i = 65; i <= 74; i++) {
    tempCols.push(String.fromCharCode(i));
  }

  const [cols, setCols] = useState(tempCols);

  const gridDisplay = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      gridDisplay.push(rows[i] + "-" + cols[j]);
    }
  }

  const [grid, setGrid] = useState(gridDisplay);

  const getCellBackgroundColor = (cellCoordinate) => {
    let backgroundColor = "";
    if (shipsCoord?.length > 0) {
      const [row, col] = cellCoordinate.split("-");
      const cellCoord = { x: col, y: parseInt(row) };

      shipsCoord.forEach((shipCoord) => {
        const { x, y } = shipCoord;
        if (x === cellCoord.x && y === cellCoord.y) {
          backgroundColor = "#800020";
        }
      });
    } else {
      props.ships?.forEach((ship) => {
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
    if (moves?.length > 0) {
      const [row, col] = cellCoordinate.split("-");
      const cellCoord = { x: col, y: parseInt(row) };
      const move = moves.find(
        (m) =>
          m.playerId !== props.myId &&
          m.x === cellCoord.x &&
          m.y === cellCoord.y
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

  if (props.gameDetails?.gameStatus === "FINISHED") {
    props.setFinishMessage(xCount === 31 ? "YOU LOST" : "YOU WIN");
  }

  return (
    <div
      className="grid-container-big"
      style={
        shipsCoord?.length > 0
          ? { transform: "rotateX(60deg) rotateY(0deg) rotateZ(-40deg)" }
          : null
      }
    >
      <h2>Your Grid:</h2>
      <div className="grid-container">
        {grid.map((elem, index) => (
          <div
            className={`cell ${
              props.gameDetails?.shipsCoord?.length <= 0 ? "cell-hover" : ""
            }`}
            key={index}
            onClick={() => props.onCellClick(elem)}
            style={{ backgroundColor: getCellBackgroundColor(elem) }}
          >
            {getCellContent(elem)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
