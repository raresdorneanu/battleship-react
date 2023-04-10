import axios from "axios";

const getGameDetails = async (token, gameId, setShowGame) => {
  try {
    const response = await axios.get(
      `https://react-labs.softbinator.com/game/${gameId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const gameDetails = response.data;
      const email = localStorage.getItem("name");
      if (
        (gameDetails.player1?.email === email ||
          gameDetails.player2?.email === email) &&
        gameDetails.status !== "FINISHED"
      ) {
        setShowGame(true);
      } else if (gameDetails.status === "FINISHED") {
        alert("This game finished");
      } else {
        alert("This game is full!");
      }
      const result = {
        id: response.data.id,
        player1Id: response.data.player1Id,
        player1Email: response.data.player1?.email,
        player2Id: response.data.player2Id,
        player2Email: response.data.player2?.email,
        playerToMoveId: response.data.playerToMoveId,
        gameStatus: response.data.status,
        moves: gameDetails.moves,
        shipsCoord: gameDetails.shipsCoord,
      };

      return result;
    }
  } catch (error) {}
};

export default getGameDetails;
