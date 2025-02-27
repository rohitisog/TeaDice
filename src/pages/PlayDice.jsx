import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PlayDice = ({ diceGameContract, account }) => {
  const [displayedDice, setDisplayedDice] = useState(null);
  const [finalDice, setFinalDice] = useState(null);
  const [score, setScore] = useState(0);
  const [rolling, setRolling] = useState(false);

  // Listen for the DiceRolled event to update the score in real time.
  useEffect(() => {
    if (!diceGameContract) return;
    const listener = (player, diceResult, newScore) => {
      if (player.toLowerCase() === account.toLowerCase()) {
        setFinalDice(diceResult.toNumber());
        setScore(newScore.toNumber());
        Swal.fire("DICE ROLLED!", `YOUR NEW SCORE IS ${newScore.toNumber()}`, "success");
      }
    };
    diceGameContract.on("DiceRolled", listener);
    return () => {
      diceGameContract.off("DiceRolled", listener);
    };
  }, [diceGameContract, account]);

  const rollDice = async () => {
    if (!diceGameContract) {
      toast.error("CONTRACT NOT CONNECTED!");
      return;
    }
    try {
      setRolling(true);
      setFinalDice(null);
      // Start dice rolling animation (simulate by updating displayedDice every 100ms)
      const animationInterval = setInterval(() => {
        const randomDisplay = Math.floor(Math.random() * 39);
        setDisplayedDice(randomDisplay);
      }, 100);

      // Call the contract function immediately (optimistic UI update)
      const tx = await diceGameContract.rollDice();
      // No need to wait for tx.wait() since we update via event listener.
      // Stop animation after 2 seconds.
      setTimeout(() => {
        clearInterval(animationInterval);
        setRolling(false);
        // The final result will be updated via the event listener.
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("DICE ROLL FAILED!");
      setRolling(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl mb-6">PLAY DICE</h2>
      <div className="mb-4 text-3xl">
        {rolling ? displayedDice : finalDice !== null ? finalDice : "-"}
      </div>
      <div className="mb-6 text-2xl">YOUR SCORE: {score}</div>
      <motion.button
        onClick={rollDice}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#f50db4] px-6 py-3 rounded uppercase text-xl"
      >
        ROLL DICE
      </motion.button>
    </motion.div>
  );
};

export default PlayDice;
