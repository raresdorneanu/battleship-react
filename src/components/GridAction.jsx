import React, { useEffect, useState } from "react";
import axios from "axios";

const GridAction = (props) => {
  const [alreadyStruckCells, setAlreadyStruckCells] = useState([]);
  const [strikeResults, setStrikeResults] = useState({});
  const [moves, setMoves] = useState(props.gameDetails?.moves);

  const token = localStorage.getItem("token");

  const getStrikeResults = (moves) => {
    return moves?.reduce((acc, move) => {
      const cellCoordinate = `${move.y}-${move.x}`;
      acc[cellCoordinate] = move.result;
      return acc;
    }, {});
  };

  useEffect(() => {
    setStrikeResults(getStrikeResults(moves));
  }, [moves]);

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
    if (
      props.gameDetails &&
      props.gameDetails.moves &&
      props.gameDetails.moves.some(
        (move) =>
          move.y + "-" + move.x === cellCoordinate &&
          move.playerId === props.myId &&
          move.result === false
      )
    ) {
      return "blue";
    }
    if (
      props.gameDetails &&
      props.gameDetails.moves &&
      props.gameDetails.moves.some(
        (move) =>
          move.y + "-" + move.x === cellCoordinate &&
          move.playerId === props.myId &&
          move.result === true
      )
    ) {
      return "red";
    }
    return "";
  };

  const onStrike = async (cellCoordinate) => {
    const [row, col] = cellCoordinate.split("-");
    const requestBody = {
      x: col,
      y: parseInt(row),
    };
    try {
      const response = await axios.post(
        `https://react-labs.softbinator.com/game/strike/${props.gameId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        props.setOpen(false);
        console.log(response.data);
        props.setGridData([
          ...props.gridData,
          { cellCoordinate, result: response.data.result },
        ]);
        setAlreadyStruckCells([...alreadyStruckCells, cellCoordinate]);
        setStrikeResults({
          ...strikeResults,
          [cellCoordinate]: response.data.result,
        });
        console.log(strikeResults); // check whether the object was updated correctly
      }
    } catch (error) {
      if (props.gameDetails?.shipsCoord?.length > 0) {
        alert("Wait for other player to be ready!");
      } else alert("Please place your ships and get ready before attack!");
    }
  };
  return (
    <div className="grid-container action-grid">
      {grid.map((elem, index) => {
        if (
          props.gameDetails &&
          props.gameDetails.moves &&
          props.gameDetails.moves.map(
            (move) =>
              move.y + "-" + move.x === elem && move.playerId === props.myId
          )
        ) {
          return (
            <div>
              <div
                className="cell"
                key={index}
                onClick={() => onStrike(elem)}
                style={{ backgroundColor: getCellBackgroundColor(elem) }}
              ></div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default GridAction;