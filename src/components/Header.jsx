import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Dice5, Trophy, ShoppingCart, User } from "lucide-react";

const Header = ({ account, connectWallet }) => {
  return (
    <header className="bg-[#6e54ff] py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold uppercase">MONADICE</div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-[#f50db4]">
                <HomeIcon size={18} /> HOME
              </Link>
            </li>
            <li>
              <Link to="/play-dice" className="flex items-center gap-1 hover:text-[#f50db4]">
                <Dice5 size={18} /> PLAY DICE
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="flex items-center gap-1 hover:text-[#f50db4]">
                <Trophy size={18} /> LEADERBOARD
              </Link>
            </li>
            <li>
              <Link to="/nft-marketplace" className="flex items-center gap-1 hover:text-[#f50db4]">
                <ShoppingCart size={18} /> NFT MARKETPLACE
              </Link>
            </li>
            <li>
              <Link to="/user-profile" className="flex items-center gap-1 hover:text-[#f50db4]">
                <User size={18} /> PROFILE
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          {account ? (
            <button className="bg-[#f50db4] px-4 py-2 rounded uppercase">
              {account.slice(0, 6)}...{account.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWallet} className="bg-[#f50db4] px-4 py-2 rounded uppercase">
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
