import axios from "axios";

const createGame = async (token) => {
  try {
    const response = await axios.post(
      "https://react-labs.softbinator.com/game",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {}
};
export default createGame;
