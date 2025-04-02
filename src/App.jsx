import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import PlayDice from "./pages/PlayDice";
import LeaderBoard from "./pages/LeaderBoard";
import NFTMarketplace from "./pages/NFTMarketplace";
import UserProfile from "./pages/UserProfile";
import { contractAddress, abi } from "./contract";

const TEA_SEPOLIA_PARAMS = {
  chainId: "0x27eA", // 10218 in hexadecimal
  chainName: "Tea Sepolia",
  nativeCurrency: {
    name: "TEA",
    symbol: "TEA",
    decimals: 18,
  },
  rpcUrls: ["https://tea-sepolia.g.alchemy.com/public"],
  blockExplorerUrls: ["https://sepolia.tea.xyz"],

};

const App = () => {
  const [account, setAccount] = useState(null);
  const [diceGameContract, setDiceGameContract] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        setDiceGameContract(contractInstance);
        checkNetwork();
        toast.success(
          `Wallet Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(
            -4
          )}`
        );
      } catch (error) {
        toast.error("Wallet connection failed!");
        console.error("WALLET CONNECTION FAILED:", error);
      }
    } else {
      toast.warning("Please install MetaMask!");
    }
  };

  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setNetwork(chainId);

      if (chainId !== TEA_SEPOLIA_PARAMS.chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: TEA_SEPOLIA_PARAMS.chainId }],
          });
          setNetwork(TEA_SEPOLIA_PARAMS.chainId);
          toast.info("Switched to Tea Sepolia Testnet");
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [TEA_SEPOLIA_PARAMS],
              });
              toast.success("Tea Sepolia Testnet Added!");
            } catch (addError) {
              toast.error("Failed to add Tea Sepolia Testnet!");
              console.error("FAILED TO ADD Tea Sepolia TESTNET:", addError);
            }
          } else {
            toast.error("Error switching network!");
            console.error("ERROR SWITCHING NETWORK:", switchError);
          }
        }
      }
    }
  };

  // Disconnect wallet simply by clearing the account and contract state.
  const disconnectWallet = () => {
    toast.info("Wallet Disconnected");
    setAccount(null);
    setDiceGameContract(null);
  };

  useEffect(() => {
    // Auto-connect wallet on mount if already connected.
    if (window.ethereum && window.ethereum.selectedAddress) {
      connectWallet();
    }
  }, []);

  return (
    <Router>
      <Header
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/play-dice"
          element={
            <PlayDice diceGameContract={diceGameContract} account={account} />
          }
        />
        <Route
          path="/leaderboard"
          element={<LeaderBoard diceGameContract={diceGameContract} />}
        />
        <Route path="/nft-marketplace" element={<NFTMarketplace />} />
        <Route
          path="/user-profile"
          element={
            <UserProfile
              account={account}
              diceGameContract={diceGameContract}
            />
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Router>
  );
};

export default App;
