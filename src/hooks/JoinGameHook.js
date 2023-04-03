// import { useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import getGameDetails from "./GetGameDetailsApi";

// const useJoinGame = () => {
//   const { token, setShowGame, setGameId, showGame } = useContext(AppContext);

//   const joinGame = async (gameId) => {
//     try {
//       const response = await axios.post(
//         `https://react-labs.softbinator.com/game/join/${gameId}`,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data); // Add this line to check the response data
//       if (response.status === 200) {
//         setShowGame(true);
//       }
//     } catch (error) {
//       await getGameDetails(token, gameId, setShowGame, showGame);
//     }
//   };

//   return { joinGame };
// };

// export default useJoinGame;
