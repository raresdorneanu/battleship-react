import axios from "axios";

const getGameDetails = async (token, gameId, setShowGame, showGame) => {
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
      }
      const result = {
        id: response.data.id,
        player1Id: response.data.player1Id,
        player1Email: response.data.player1?.email,
        player2Id: response.data.player2Id,
        player2Email: response.data.player2?.email,
        playerToMoveId: response.data.playerToMoveId,
        gameStatus: response.data.status,
      };

      if (Array.isArray(gameDetails.moves)) {
        result.moves = gameDetails.moves;
      }

      if (Array.isArray(gameDetails.shipsCoord)) {
        result.shipsCoord = gameDetails.shipsCoord;
      }

      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getGameDetails;
