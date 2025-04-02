import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const nftThresholds = [
  { tier: "BRONZE NFT", points: "1,000", passes: "2,500,000" },
  { tier: "SILVER NFT", points: "5,000", passes: "1,250,000" },
  { tier: "GOLD NFT", points: "20,000", passes: "500,000" },
  { tier: "PLATINUM NFT", points: "40,000", passes: "250,000" },
  { tier: "DIAMOND NFT", points: "60,000", passes: "125,000" },
  { tier: "MASTER NFT", points: "80,000", passes: "50,000" },
  { tier: "GRANDMASTER NFT", points: "150,000", passes: "25,000" },
  { tier: "LEGENDARY NFT", points: "300,000", passes: "15,000" },
  { tier: "MYTHIC NFT", points: "500,000", passes: "5,000" },
  { tier: "OG NFT", points: "1,000,000", passes: "1,000" },
  { tier: "TeaDice OG", points: "100,000,000", passes: "UNLIMITED" },
];

const PlayDice = ({ diceGameContract, account }) => {
  const [displayedDice, setDisplayedDice] = useState(null);
  const [finalDice, setFinalDice] = useState(null);
  const [score, setScore] = useState(0);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (diceGameContract && account) {
      diceGameContract
        .getUserScore(account)
        .then((result) => setScore(Number(result)))
        .catch(console.error);
    }
  }, [diceGameContract, account]);

  const rollDice = async () => {
    if (!diceGameContract) {
      toast.error("WALLET NOT CONNECTED!");
      return;
    }
    try {
      setRolling(true);
      setFinalDice(null);

      const animationInterval = setInterval(() => {
        const randomDisplay = Math.floor(Math.random() * 39);
        setDisplayedDice(randomDisplay);
      }, 100);

      const tx = await diceGameContract.rollDice();
      const receipt = await tx.wait();

      let newScore;
      if (receipt.logs) {
        for (const log of receipt.logs) {
          try {
            const parsedLog = diceGameContract.interface.parseLog(log);
            if (parsedLog && parsedLog.name === "DiceRolled") {
              newScore = parsedLog.args.newScore;
            }
          } catch (e) {}
        }
      }

      clearInterval(animationInterval);
      setRolling(false);

      if (newScore) {
        setScore(Number(newScore));
        Swal.fire(
          "DICE ROLLED!",
          `YOUR NEW SCORE IS ${Number(newScore)}`,
          "success"
        );
      } else {
        const updatedScore = await diceGameContract.getUserScore(account);
        setScore(Number(updatedScore));
      }
    } catch (error) {
      console.error(error);
      toast.error("DICE ROLL FAILED!");
      setRolling(false);
    }
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-8">
      <h2 className="text-4xl mb-6">PLAY DICE</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-3xl">
          {rolling ? displayedDice : finalDice !== null ? finalDice : "-"}
        </div>
        <div className="text-2xl">YOUR SCORE: {score} XP</div>
        <motion.button
          onClick={rollDice}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#10b981] px-6 py-3 rounded uppercase text-xl"
        >
          ROLL DICE
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlayDice;
