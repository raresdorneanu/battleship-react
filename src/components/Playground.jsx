import { useContext, useEffect, useState } from "react";
import Grid from "./Grid";
import Ship from "./Ship";
import { handleCellClick } from "../utils/cellClick";
import { handleOrientation } from "../utils/orientation";
import ships from "../utils/shipData";
import getGameDetails from "../api/GetGameDetailsApi";
import GridAction from "./GridAction";
import handleSendMapConfig from "../api/SendMapConfigApi";
import "../styles/Playground.scss";
import Button from "./button/button.component";
import ProgressBar from "./ProgressBar";
import AccuracyBar from "./AccuracyBar";
import PlaygroundContext from "../context/PlaygroundContext";
import DashboardContext from "../context/DahsboardContext";

const Playground = () => {
  const { gameId, showGame, setShowGame, setGameId, name, token } =
    useContext(DashboardContext);
  const [shipSet, setShipSet] = useState(ships);
  const [gameDetails, setGameDetails] = useState("");
  const [activeShip, setActiveShip] = useState(null);
  const [mapConfigSent, setMapConfigSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [myId, setMyId] = useState("");
  const [finishMessage, setFinishMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const handleCellClickWrapper = (pos) => {
    handleCellClick(pos, activeShip, shipSet, setShipSet, mapConfigSent);
  };

  const handleOrientationWrapper = () => {
    handleOrientation(activeShip, setShipSet, mapConfigSent);
  };

  const handleBackToAllGames = () => {
    setShowGame(false);
  };

  const sendMapConfig = () => {
    handleSendMapConfig(shipSet, token, setMapConfigSent, gameId);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

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
    const handleMyId = () => {
      if (gameDetails) {
        gameDetails?.player1Email?.split("@")[0] === name
          ? setMyId(gameDetails?.player1Id)
          : setMyId(gameDetails?.player2Id);
      }
    };
    handleMyId();
  }, [myId, gameDetails, name]);

  useEffect(() => {
    if (
      gameDetails &&
      gameDetails?.shipsCoord?.length > 0 &&
      gameDetails?.playerToMoveId === myId
    ) {
      setOpen(true);
    }
  }, [gameDetails, myId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const gameDetails = await getGameDetails(
          token,
          gameId,
          setShowGame,
          showGame
        );
        setGameDetails(gameDetails);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameDetails, gameId, showGame, setShowGame, token]);

  return (
    <PlaygroundContext.Provider
      value={{
        shipSet,
        setShipSet,
        gameDetails,
        setGameDetails,
        activeShip,
        setActiveShip,
        mapConfigSent,
        setMapConfigSent,
        open,
        setOpen,
        name,
        playerName,
        setPlayerName,
        token,
        gameId,
        setGameId,
        myId,
        setMyId,
        finishMessage,
        setFinishMessage,
        loading,
        setLoading,
        handleCellClickWrapper,
      }}
    >
      <div
        className={`playground-container ${
          gameDetails?.shipsCoord?.length > 0 ? "ships-placed" : ""
        }`}
        style={loading ? { position: "absolute" } : { position: "relative" }}
      >
        <div
          style={loading ? { display: "flex" } : { display: "none" }}
          className="loading-game"
        >
          <span>Loading...</span>
        </div>

        <h2 className="game-title">BATTLESHIP</h2>
        <div
          className="turn"
          style={{
            display: gameDetails?.shipsCoord?.length > 0 ? null : "none",
          }}
        >
          {finishMessage && <h3>{finishMessage}</h3>}
          {playerName === name && gameDetails?.gameStatus !== "FINISHED" ? (
            <h2>Your turn!</h2>
          ) : null}
        </div>
        <div
          className="bars-container"
          style={
            gameDetails?.shipsCoord?.length <= 0 ||
            gameDetails?.gameStatus === "CREATED"
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div className="op-name">
            <p>
              Your opponent:{" "}
              <span>
                {gameDetails?.player1Email?.split("@")[0] === name
                  ? gameDetails?.player2Email?.split("@")[0]
                  : gameDetails?.player1Email?.split("@")[0]}
              </span>
            </p>
            <div
              className="turn"
              style={{
                display: gameDetails?.shipsCoord?.length > 0 ? null : "none",
              }}
            >
              <h2
                style={
                  playerName === name && gameDetails?.gameStatus !== "FINISHED"
                    ? { display: "none" }
                    : null
                }
              >
                It is {playerName}'s Turn
              </h2>
            </div>
          </div>
          <div className="bars">
            <ProgressBar myId={myId} gameDetails={gameDetails} />
            <AccuracyBar myId={myId} gameDetails={gameDetails} />
          </div>
        </div>
        {gameDetails?.player2Id ? null : (
          <p className="waiting">Waiting for opponent</p>
        )}
        {gameDetails?.shipsCoord?.length > 0 ? null : (
          <>
            <Ship />
            <div className="ships-not-placed-button-flex">
              <Button
                className="change-orientation"
                onClick={handleOrientationWrapper}
              >
                Change orientation
              </Button>

              {gameDetails?.shipsCoord?.length > 0 ||
              gameDetails.player1Id === null ||
              gameDetails.player2Id === null ? null : (
                <Button onClick={sendMapConfig}>READY</Button>
              )}
            </div>
          </>
        )}
        <div className="pg-flex-container">
          <div
            className="pg-flex-left"
            style={
              gameDetails?.shipsCoord?.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {gameDetails?.shipsCoord?.length > 0 ? <GridAction /> : null}
          </div>
          <div
            className="pg-flex-right"
            style={
              gameDetails?.shipsCoord?.length > 0
                ? { paddingRight: "200px" }
                : { paddingRight: "0" }
            }
          >
            <Grid />
          </div>
        </div>
        <Button onClick={handleBackToAllGames}>Back To Lobby</Button>
      </div>
    </PlaygroundContext.Provider>
  );
};
export default Playground;
