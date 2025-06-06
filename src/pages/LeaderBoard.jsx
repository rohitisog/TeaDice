import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LeaderBoard = ({ diceGameContract }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    if (!diceGameContract) return;
    try {
      const players = await diceGameContract.getPlayers();
      console.log(players)
      const scoresPromises = players.map(async (player) => {
        const score = await diceGameContract.getUserScore(player);
        return { player, score: Number(score) };
      });
      let scoresArray = await Promise.all(scoresPromises);
      scoresArray.sort((a, b) => b.score - a.score);
      setLeaderboard(scoresArray);
    } catch (error) {
      console.error("ERROR FETCHING LEADERBOARD:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(intervalId);
  }, [diceGameContract]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl mb-6">LEADERBOARD</h2>
      <div className="w-full max-w-4xl">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-white">
              <th className="py-2">RANK</th>
              <th className="py-2">PLAYER</th>
              <th className="py-2">POINTS</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((item, index) => (
                <tr key={item.player} className="border-b border-white">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <a
                      href={`https://sepolia.tea.xyz/address/${item.player}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  hover:underline shadow-white"
                    >
                      {item.player.slice(0, 6)}...{item.player.slice(-4)}
                    </a>
                  </td>
                  <td className="py-2">{item.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2" colSpan="3">NO PLAYERS FOUND</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LeaderBoard;