import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UserProfile = ({ account, diceGameContract }) => {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchUserData = async () => {
    if (diceGameContract && account) {
      try {
        const userScore = await diceGameContract.getUserScore(account);
        setScore(Number(userScore));
        const players = await diceGameContract.getPlayers();
        const scoresPromises = players.map(async (player) => {
          const score = await diceGameContract.getUserScore(player);
          return { player, score: Number(score) };
        });
        let scoresArray = await Promise.all(scoresPromises);
        scoresArray.sort((a, b) => b.score - a.score);
        const userRank = scoresArray.findIndex(
          (item) => item.player.toLowerCase() === account.toLowerCase()
        ) + 1;
        setRank(userRank);
      } catch (error) {
        console.error("ERROR FETCHING USER DATA:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch data immediately and poll every 5 seconds
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 5000);
    return () => clearInterval(intervalId);
  }, [diceGameContract, account]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl mb-6">YOUR PROFILE</h2>
      <p className="mb-4 text-2xl">WALLET: {account}</p>
      <p className="mb-4 text-2xl">SCORE: {score}</p>
      <p className="mb-8 text-2xl">RANK: {rank ? rank : "-"}</p>
      {/* <div className="w-full max-w-md">
        <h3 className="text-3xl mb-4">LAST 10 TRANSACTIONS</h3>
        {transactions.length === 0 ? (
          <p>NO TRANSACTIONS YET.</p>
        ) : (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>{tx}</li>
            ))}
          </ul>
        )}
      </div> */}
      <div className="w-full max-w-md mt-8">
        <h3 className="text-3xl mb-4">YOUR NFTS</h3>
        <p>NFTS YOU MINT WILL APPEAR HERE.</p>
      </div>
    </motion.div>
  );
};

export default UserProfile;
