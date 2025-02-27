import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Dice5, Trophy, ShoppingCart, User, Menu, X } from "lucide-react";

const Header = ({ account, connectWallet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#6e54ff] py-4 shadow shadow-white tracking-wider">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold uppercase tracking-widest 
">MONADICE</div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="flex items-center gap-1 hover:text-[#f50db4] uppercase">
            <HomeIcon size={18} /> HOME
          </Link>
          <Link to="/play-dice" className="flex items-center gap-1 hover:text-[#f50db4] uppercase">
            <Dice5 size={18} /> PLAY
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-1 hover:text-[#f50db4] uppercase">
            <Trophy size={18} /> LEADERBOARD
          </Link>
          <Link to="/nft-marketplace" className="flex items-center gap-1 hover:text-[#f50db4] uppercase">
            <ShoppingCart size={18} /> NFT MARKETPLACE
          </Link>
          <Link to="/user-profile" className="flex items-center gap-1 hover:text-[#f50db4] uppercase">
            <User size={18} /> PROFILE
          </Link>
        </nav>
        <div className="flex items-center">
          {account ? (
            <button className="bg-[#f50db4] px-4 py-2 rounded uppercase">
              {account.slice(0, 6)}...{account.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWallet} className="bg-[#f50db4] px-4 py-2 rounded uppercase">
              CONNECT WALLET
            </button>
          )}
          <button className="ml-4 md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-[#6e54ff]">
          <ul className="flex flex-col space-y-2 px-4 py-2">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase"
              >
                <HomeIcon size={18} /> HOME
              </Link>
            </li>
            <li>
              <Link
                to="/play-dice"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase"
              >
                <Dice5 size={18} /> PLAY DICE
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase"
              >
                <Trophy size={18} /> LEADERBOARD
              </Link>
            </li>
            <li>
              <Link
                to="/nft-marketplace"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase"
              >
                <ShoppingCart size={18} /> NFT MARKETPLACE
              </Link>
            </li>
            <li>
              <Link
                to="/user-profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase"
              >
                <User size={18} /> PROFILE
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
