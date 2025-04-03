import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
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
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    const web3ModalInstance = new Web3Modal({
      cacheProvider: true, // Auto-connect if the user was previously connected
    });
    setWeb3Modal(web3ModalInstance);

    // Auto-connect if a provider was cached
    if (web3ModalInstance.cachedProvider) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3Modal) return;
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);

      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        setDiceGameContract(contractInstance);
        checkNetwork();
        toast.success(`Wallet Connected: ${accounts[0].address.slice(0, 6)}...${accounts[0].address.slice(-4)}`);
      }
    } catch (error) {
      toast.error("Wallet connection failed!");
      console.error("WALLET CONNECTION FAILED:", error);
    }
  };

  const checkNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setNetwork(network.chainId);

      if (network.chainId !== parseInt(TEA_SEPOLIA_PARAMS.chainId, 16)) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: TEA_SEPOLIA_PARAMS.chainId }],
          });
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
            }
          } else {
            toast.error("Error switching network!");
          }
        }
      }
    } catch (error) {
      console.error("Network check failed:", error);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    setAccount(null);
    setDiceGameContract(null);
    toast.info("Wallet Disconnected");
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Header account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play-dice" element={<PlayDice diceGameContract={diceGameContract} account={account} />} />
        <Route path="/leaderboard" element={<LeaderBoard diceGameContract={diceGameContract} />} />
        <Route path="/nft-marketplace" element={<NFTMarketplace />} />
        <Route path="/user-profile" element={<UserProfile account={account} diceGameContract={diceGameContract} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
};

export default App;
