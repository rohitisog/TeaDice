import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UserProfile = ({ account, diceGameContract }) => {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchUserData = async () => {
    if (diceGameContract && account) {
      try {
        // Get the user's score from the contract.
        const userScore = await diceGameContract.getUserScore(account);
        setScore(Number(userScore));

        // Get all players and determine the user's rank.
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

  const fetchTransactions = async () => {
    if (diceGameContract && account) {
      try {
        // Create a filter for DiceRolled events for this account.
        const filter = diceGameContract.filters.DiceRolled(account);
        // Query for all events matching the filter.
        const events = await diceGameContract.queryFilter(filter);
        // Get the last 10 events, reversing so the most recent appears first.
        const last10Events = events.slice(-10).reverse();
        const txs = last10Events.map((event) => ({
          diceResult: event.args.diceResult.toString(),
          newScore: event.args.newScore.toString(),
          txHash: event.transactionHash,
          blockNumber: event.blockNumber,
        }));
        setTransactions(txs);
      } catch (error) {
        console.error("ERROR FETCHING TRANSACTIONS:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch user data and transactions immediately, then poll every 5 seconds.
    fetchUserData();
    fetchTransactions();
    const intervalId = setInterval(() => {
      fetchUserData();
      fetchTransactions();
    }, 5000);
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
      <div className="w-full max-w-md">
        <h3 className="text-3xl mb-4">LAST 10 TRANSACTIONS</h3>
        {transactions.length === 0 ? (
          <p>NO TRANSACTIONS YET.</p>
        ) : (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index} className="mb-2">
                TX: {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)} | DICE: {tx.diceResult} | SCORE: {tx.newScore} | BLOCK: {tx.blockNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full max-w-md mt-8">
        <h3 className="text-3xl mb-4">YOUR NFTS</h3>
        <p>NFTS YOU MINT WILL APPEAR HERE.</p>
      </div>
    </motion.div>
  );
};

export default UserProfile;
