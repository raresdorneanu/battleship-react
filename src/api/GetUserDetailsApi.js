import axios from "axios";

const handleGetUserDetails = async (token) => {
  try {
    const response = await axios.get(
      "https://react-labs.softbinator.com/user/details/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      return {
        userId: response.data.user.id,
        email: response.data.user.email,
        gamesPlayed: response.data.gamesPlayed,
        gamesWon: response.data.gamesWon,
        gamesLost: response.data.gamesLost,
        gamesPlayed: response.data.gamesPlayed,
        currentlyGamesPlaying: response.data.currentlyGamesPlaying,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export default handleGetUserDetails;
