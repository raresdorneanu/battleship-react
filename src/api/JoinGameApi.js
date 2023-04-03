import axios from "axios";
import getGameDetails from "./GetGameDetailsApi";

const joinGame = async (token, gameId, setShowGame, showGame, name) => {
  try {
    const response = await axios.post(
      `https://react-labs.softbinator.com/game/join/${gameId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setShowGame(true);
    }
  } catch (error) {
    await getGameDetails(token, gameId, setShowGame, showGame);
  }
};

export default joinGame;
