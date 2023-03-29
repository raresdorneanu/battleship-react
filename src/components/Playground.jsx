import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import Ship from "./Ship";
import { handleCellClick } from "../utils/cellClick";
import { handleOrientation } from "../utils/orientation";
import ships from "../utils/shipData";
import getGameDetails from "../api/GetGameDetailsApi";
import GridAction from "./GridAction";
import handleSendMapConfig from "../api/SendMapConfigApi";

const Playground = (props) => {
  const [shipSet, setShipSet] = useState(ships);
  const [gameDetails, setGameDetails] = useState("");
  const [activeShip, setActiveShip] = useState(null);
  const [mapConfigSent, setMapConfigSent] = useState(false);
  const [open, setOpen] = useState(false);
  const name = localStorage.getItem("name").split("@")[0];
  const [shipsCoord, setShipsCoord] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const token = localStorage.getItem("token");
  const [gameId, setGameId] = useState(props.gameId);
  const [myId, setMyId] = useState("");

  const handleMyId = () => {
    if (gameDetails) {
      gameDetails?.player1Email?.split("@")[0] === name
        ? setMyId(gameDetails?.player1Id)
        : setMyId(gameDetails?.player2Id);
    }
  };

  useEffect(() => {
    if (gameDetails) {
      setPlayerName(
        gameDetails.playerToMoveId === gameDetails.player1Id
          ? gameDetails.player1Email?.split("@")[0]
          : gameDetails.player2Email?.split("@")[0]
      );
    }
  }, [gameDetails]);

  useEffect(() => {
    handleMyId();
  }, [myId, gameDetails]);

  useEffect(() => {
    handleMyId();
  }, [myId, gameDetails]);

  useEffect(() => {
    if (
      gameDetails &&
      shipsCoord?.length > 0 &&
      gameDetails?.playerToMoveId === myId
    ) {
      setOpen(true);
    }
  }, [shipsCoord, gameDetails]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const gameDetails = await getGameDetails(
          token,
          gameId,
          props.setShowGame,
          props.showGame
        );
        setGameDetails(gameDetails);
        setShipsCoord(gameDetails.shipsCoord);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameDetails]);

  const handleCellClickWrapper = (pos) => {
    // create a wrapper function to pass as the callback to the Grid component
    handleCellClick(pos, activeShip, shipSet, setShipSet, mapConfigSent); // call the imported handleCellClick function with the required arguments
  };

  const handleOrientationWrapper = () => {
    // create a wrapper function to pass as the callback to the Grid component
    handleOrientation(activeShip, setShipSet, mapConfigSent); // call the imported handleCellClick function with the required arguments
  };

  const handleBackToAllGames = () => {
    props.setShowGame(false);
  };

  const sendMapConfig = async () => {
    handleSendMapConfig(shipSet, token, setMapConfigSent, gameId);
  };

  return (
    <div>
      <Grid
        ships={shipSet}
        onCellClick={handleCellClickWrapper}
        activeShip={activeShip}
        setShowGame={props.setShowGame}
        gameId={gameId}
        showGame={props.showGame}
        setShips={setShipSet}
        gameDetails={gameDetails}
        myId={myId}
      />
      <div>{playerName === name ? <h2>Your turn!</h2> : null}</div>;
      <GridAction
        showGame={props.showGame}
        setShowGame={props.setShowGame}
        gameId={gameId}
        onCellClick={handleCellClickWrapper}
        gameDetails={gameDetails}
        open={open}
        setOpen={setOpen}
        gridData={gridData}
        setGridData={setGridData}
        myId={myId}
        playerName={playerName}
        name={name}
      />
      {gameDetails?.shipsCoord?.length > 0 ? null : (
        <Ship
          ships={shipSet}
          setActiveShip={setActiveShip}
          token={token}
          gameId={gameId}
          showGame={props.showGame}
          setShowGame={props.setShowGame}
        />
      )}
      <button onClick={handleOrientationWrapper}>Change orientation</button>
      <button onClick={sendMapConfig}>READY</button>
      <button onClick={handleBackToAllGames}>Back To All Games</button>
      {gameDetails?.player2Id ? (
        <div className="game-details">
          <p style={{ color: "#000" }}>Id: {gameDetails?.id}</p>
          <p style={{ color: "#000" }}>Player1Id: {gameDetails?.player1Id}</p>
          <p style={{ color: "#000" }}>
            Player1 Email: {gameDetails?.player1Email}
          </p>
          <p style={{ color: "#000" }}>Player2Id: {gameDetails?.player2Id}</p>
          <p style={{ color: "#000" }}>
            Player2 Email: {gameDetails?.player2Email}
          </p>
          <p style={{ color: "#000" }}>
            Player to move:{" "}
            {gameDetails?.playerToMoveId
              ? gameDetails.player1Email.split("@")[0]
              : gameDetails.player2Email.split("@")[0]}
          </p>
          <p>Moves: {JSON.stringify(gameDetails?.moves)}</p>
          <p>Ships Coord: {JSON.stringify(gameDetails?.shipsCoord)}</p>
          <p style={{ color: "#000" }}>
            Game Status: {gameDetails?.gameStatus}
          </p>
          <p>It is {playerName}'s turn</p>
        </div>
      ) : (
        <p style={{ color: "#fff", fontSize: "24px" }}>Waiting for opponent</p>
      )}
    </div>
  );
};
export default Playground;
