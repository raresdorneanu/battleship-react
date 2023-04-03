import { useEffect, useState } from "react";
import Grid from "./Grid";
import Ship from "./Ship";
import { handleCellClick } from "../utils/cellClick";
import { handleOrientation } from "../utils/orientation";
import ships from "../utils/shipData";
import getGameDetails from "../api/GetGameDetailsApi";
import GridAction from "./GridAction";
import handleSendMapConfig from "../api/SendMapConfigApi";
import "./Playground.scss";
import Button from "./button/button.component";
import "animate.css";

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
  const [finishMessage, setFinishMessage] = useState("");

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
    <div
      className={`playground-container ${
        shipsCoord?.length > 0 ? "ships-placed" : ""
      }`}
    >
      <h2 className="game-title">BATTLESHIP</h2>
      <div
        className="turn"
        style={{ display: shipsCoord?.length > 0 ? null : "none" }}
      >
        {finishMessage && <h3>{finishMessage}</h3>}
        {playerName === name && gameDetails?.gameStatus !== "FINISHED" ? (
          <h2>Your turn!</h2>
        ) : null}
      </div>
      {gameDetails?.player2Id ? null : (
        <p style={{ color: "#fff", fontSize: "24px" }}>Waiting for opponent</p>
      )}
      <div
        className="pg-flex-container"
        style={
          gameDetails?.shipsCoord?.length > 0
            ? { width: "100%" }
            : { width: "90%" }
        }
      >
        <div
          className="pg-flex-left"
          style={
            gameDetails?.shipsCoord?.length > 0
              ? { width: "50%" }
              : { width: "0" }
          }
        >
          {gameDetails?.shipsCoord?.length > 0 ? (
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
              shipsCoord={shipsCoord}
            />
          ) : null}
        </div>
        <div
          className="pg-flex-right"
          style={
            gameDetails?.shipsCoord?.length > 0
              ? { width: "80%" }
              : { width: "100%" }
          }
        >
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
            finishMessage={finishMessage}
            setFinishMessage={setFinishMessage}
          />
          {gameDetails?.shipsCoord?.length > 0 ? null : (
            <Button onClick={sendMapConfig}>READY</Button>
          )}
          {gameDetails?.shipsCoord?.length > 0 ? null : (
            <Button onClick={handleOrientationWrapper}>
              Change orientation
            </Button>
          )}
        </div>
      </div>
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
      <Button onClick={handleBackToAllGames}>Back To Lobby</Button>
    </div>
  );
};
export default Playground;
