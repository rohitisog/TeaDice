import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Dice5,
  Trophy,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { ethers } from "ethers";

const Header = ({ account, connectWallet, disconnectWallet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(null);

  // Fetch wallet balance whenever account changes.
  useEffect(() => {
    const fetchBalance = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balanceBigNumber = await provider.getBalance(account);
          const formattedBalance = ethers.formatEther(balanceBigNumber);
          setBalance(formattedBalance);
        } catch (error) {
          console.error("ERROR FETCHING BALANCE", error);
        }
      }
    };
    fetchBalance();
    // Optionally poll balance every 10 seconds.
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [account]);

  return (
    <header className="bg-[#6e54ff] py-4 tracking-wide"
    style={{
      backgroundImage: "url('/header-bg.svg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Mobile Header: Logo, Wallet Info, and Toggle */}
        <div className="w-full flex items-center justify-between md:hidden">
          <Link to={"/"} className="text-3xl font-bold uppercase tracking-widest">
            MONADICE
          </Link>
          <div className="flex items-center gap-2">
            {account ? (
              <button
                onClick={disconnectWallet}
                className="border border-[#f50db4] px-3 py-2 rounded uppercase flex items-center gap-2 bg-white"
                title="Click to disconnect wallet"
              >
                <span className="text-[#f50db4] text-lg">
                  {balance ? `${Number(balance).toFixed(2)} MON` : "0.00 MON"}
                </span>
                <span className="text-[#6e54ff] font-semibold tracking-wide text-lg">
                  {account.slice(0, 3)}...{account.slice(-3)}
                </span>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-[#f50db4] px-3 py-2 rounded uppercase text-lg"
              >
                CONNECT
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="ml-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Desktop Header: Logo, Nav Links, Wallet Info */}
        <div className="hidden md:flex w-full items-center justify-between">
          <Link to={"/"} className="text-3xl font-bold uppercase tracking-widest">
            MONADICE
          </Link>
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
            >
              <HomeIcon size={20} /> HOME
            </Link>
            <Link
              to="/play-dice"
              className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
            >
              <Dice5 size={20} /> PLAY DICE
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
            >
              <Trophy size={20} /> LEADERBOARD
            </Link>
            <Link
              to="/nft-marketplace"
              className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
            >
              <ShoppingCart size={20} /> BUY NFTs
            </Link>
            <Link
              to="/user-profile"
              className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
            >
              <User size={20} /> PROFILE
            </Link>
          </nav>
          <div className="flex items-center">
            {account ? (
              <button
                onClick={disconnectWallet}
                className="border border-[#f50db4] px-4 py-2 rounded uppercase flex items-center gap-2 bg-white"
                title="Click to disconnect wallet"
              >
                <span className="text-[#f50db4] text-lg">
                  {balance ? `${Number(balance).toFixed(2)} MON` : "0.00 MON"}
                </span>
                <span className="text-[#6e54ff] font-semibold tracking-wide text-lg">
                  {account.slice(0, 4)}...{account.slice(-4)}
                </span>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-[#f50db4] px-4 py-2 rounded uppercase text-lg"
              >
                CONNECT WALLET
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#6e54ff] mt-2">
          <ul className="flex flex-col space-y-2 px-4 py-2">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
              >
                <HomeIcon size={20} /> HOME
              </Link>
            </li>
            <li>
              <Link
                to="/play-dice"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
              >
                <Dice5 size={20} /> PLAY DICE
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
              >
                <Trophy size={20} /> LEADERBOARD
              </Link>
            </li>
            <li>
              <Link
                to="/nft-marketplace"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
              >
                <ShoppingCart size={20} /> BUY NFTs
              </Link>
            </li>
            <li>
              <Link
                to="/user-profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:text-[#f50db4] uppercase text-lg"
              >
                <User size={20} /> PROFILE
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
