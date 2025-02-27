import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LeaderBoard = ({ diceGameContract }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    if (!diceGameContract) return;
    try {
      const players = await diceGameContract.getPlayers();
      const scoresPromises = players.map(async (player) => {
        const score = await diceGameContract.getUserScore(player);
        return { player, score: score.toNumber() };
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
    if (!diceGameContract) return;
    // Update leaderboard in realtime by listening to DiceRolled events.
    const listener = () => fetchLeaderboard();
    diceGameContract.on("DiceRolled", listener);
    return () => {
      diceGameContract.off("DiceRolled", listener);
    };
  }, [diceGameContract]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
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
            {leaderboard.map((item, index) => (
              <tr key={item.player} className="border-b border-white">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.player.slice(0, 6)}...{item.player.slice(-4)}</td>
                <td className="py-2">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LeaderBoard;
