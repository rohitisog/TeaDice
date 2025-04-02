import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-5xl mb-4">WELCOME TO TeaDice</h1>
      <p className="text-xl mb-8 text-center">
        ROLL THE DICE, EARN POINTS, CLIMB THE TIERS, AND MINT EXCLUSIVE NFTS!
      </p>
      <Link to="/play-dice">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#10b981] px-6 py-3 rounded uppercase text-xl"
        >
          PLAY NOW
        </motion.button>
      </Link>
      <div className="mt-12 p-4 border border-white rounded">
        <h2 className="text-3xl mb-4">HOW TO PLAY</h2>
        <motion.ul
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <li className="mb-2">CONNECT YOUR WALLET</li>
          <li className="mb-2">ROLL THE DICE TO EARN POINTS</li>
          <li className="mb-2">REACH MILESTONES TO MINT NFTS</li>
          <li className="mb-2">CHECK THE LEADERBOARD FOR YOUR RANK</li>
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default Home;
