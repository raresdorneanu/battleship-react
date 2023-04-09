import axios from "axios";

const getAllGames = async (token) => {
  try {
    const response = await axios.get(
      "https://react-labs.softbinator.com/game",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      return response.data.games;
    }
  } catch (error) {}
};

export default getAllGames;
