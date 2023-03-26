import axios from "axios";

const createGame = async (token, setGames) => {
  try {
    const response = await axios.post(
      "https://react-labs.softbinator.com/game",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      setGames((prevGames) => [...prevGames, response.data]);
    }
  } catch (error) {
    console.log(error);
  }
};
export default createGame;
