import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaygroundContext from "../context/PlaygroundContext";

const GridAction = () => {
  const { gameDetails, gameId, setOpen, myId, token } =
    useContext(PlaygroundContext);
  const [alreadyStruckCells, setAlreadyStruckCells] = useState([]);

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

  const getCellStrikeRes = (cellCoordinate) => {
    if (
      gameDetails &&
      gameDetails.moves &&
      gameDetails.moves.some(
        (move) =>
          move.y + "-" + move.x === cellCoordinate &&
          move.playerId === myId &&
          move.result === false
      )
    ) {
      return false;
    }
    if (
      gameDetails &&
      gameDetails.moves &&
      gameDetails.moves.some(
        (move) =>
          move.y + "-" + move.x === cellCoordinate &&
          move.playerId === myId &&
          move.result === true
      )
    ) {
      return true;
    }
    return;
  };
  useEffect(() => {
    const playerMoves = gameDetails?.moves?.filter(
      (move) => move.playerId === myId
    );
    const newStruckCells = playerMoves.map((move) => `${move.y}-${move.x}`);

    const uniqueStruckCells = newStruckCells.filter(
      (cell) => !alreadyStruckCells.includes(cell)
    );

    if (uniqueStruckCells.length > 0) {
      setAlreadyStruckCells((prev) => [...prev, ...uniqueStruckCells]);
    }
  }, [gameDetails?.moves, myId, alreadyStruckCells]);

  const onStrike = async (cellCoordinate) => {
    if (alreadyStruckCells.includes(cellCoordinate)) {
      alert("That cell has been struck");
      return;
    }

    const [row, col] = cellCoordinate.split("-");
    const requestBody = {
      x: col,
      y: parseInt(row),
    };
    try {
      const response = await axios.post(
        `https://react-labs.softbinator.com/game/strike/${gameId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpen(false);
        if (!alreadyStruckCells.includes(cellCoordinate)) {
          setAlreadyStruckCells((prev) => [...prev, cellCoordinate]);
        }
      }
    } catch (error) {
      if (gameDetails?.shipsCoord?.length > 0) {
        alert("Wait for other player to take their turn!");
      } else {
        alert("Please place your ships and get ready before attacking!");
      }
    }
  };

  return (
    <>
      <div
        className="grid-container-big"
        style={
          gameDetails?.shipsCoord?.length > 0
            ? { transform: "rotateX(60deg) rotateY(0deg) rotateZ(-40deg)" }
            : null
        }
      >
        <h2>Opponent Grid:</h2>
        <div className="grid-container action-grid">
          {grid.map((elem, index) => {
            if (
              gameDetails &&
              gameDetails.moves &&
              gameDetails.moves.map(
                (move) =>
                  move.y + "-" + move.x === elem && move.playerId === myId
              )
            ) {
              return (
                <div key={index}>
                  <div
                    className={`cell ${
                      gameDetails?.shipsCoord?.length > 0 &&
                      gameDetails?.gameStatus !== "FINISHED"
                        ? "cell-hover"
                        : ""
                    }`}
                    key={index}
                    onClick={() => onStrike(elem)}
                  >
                    {getCellStrikeRes(elem) === true ? (
                      <div className="hit-mark-op"></div>
                    ) : getCellStrikeRes(elem) === false ? (
                      <div className="miss-mark-op"></div>
                    ) : null}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default GridAction;
