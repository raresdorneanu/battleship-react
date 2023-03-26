import React, { useState, useEffect } from "react";
import "../styles/Grid.scss";

const Grid = ({ onCellClick, ships }) => {
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

  useEffect(() => {
    // update grid state whenever rows or cols change
    const newGrid = [];
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < cols.length; j++) {
        newGrid.push(rows[i] + "-" + cols[j]);
      }
    }
    setGrid(newGrid);
  }, [rows, cols]);

  const getCellBackgroundColor = (cellCoordinate) => {
    let backgroundColor = "";
    ships.forEach((ship) => {
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
    return backgroundColor;
  };

  return (
    <div className="grid-container">
      {grid.map((elem, index) => (
        <div
          className="cell"
          key={index}
          onClick={() => onCellClick(elem)}
          style={{ backgroundColor: getCellBackgroundColor(elem) }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
