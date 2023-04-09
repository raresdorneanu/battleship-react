import axios from "axios";

const handleSendMapConfig = async (
  shipSet,
  token,
  setMapConfigSent,
  gameId
) => {
  const requestBody = {
    ships: shipSet
      .filter((ship) => ship.position !== null)
      .map((ship) => ({
        x: ship.position?.split("-")[1],
        y: parseInt(ship.position?.split("-")[0]),
        size: ship.size,
        direction: ship.orientation?.toUpperCase(),
      })),
  };

  try {
    const response = await axios.patch(
      `https://react-labs.softbinator.com/game/${gameId}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      setMapConfigSent(true);
    }
  } catch (error) {
    alert("You need to place your ships first");
  }
};

export default handleSendMapConfig;
