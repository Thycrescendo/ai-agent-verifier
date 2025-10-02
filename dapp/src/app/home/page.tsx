"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import OptionCard from "../../components/OptionCard";
import TradeModal from "../../components/TradeModal";
import {
  initializeSynapse,
  getBalance,
  uploadData,
  downloadData,
  depositFunds,
  approveService,
  transferFIL,
} from "../../lib/ethersSetup";
import { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export interface Option {
  id: number;
  type: "Call" | "Put";
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<null | Option>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [dealId, setDealId] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([
    { id: 1, type: "Call", strikePrice: 6, expiry: "2025-09-15", premium: 0.5, liquidity: 1000 },
    { id: 2, type: "Put", strikePrice: 5, expiry: "2025-09-15", premium: 0.45, liquidity: 800 },
  ]);

  const connectWallet = useCallback(async (): Promise<void> => {
    if (!window.ethereum) {
      alert("Please install MetaMask to continue.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        setConnectionStatus("Connected to Filecoin Calibration Testnet");
        const balance = await getBalance();
        setWalletBalance(balance);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setConnectionStatus("Connection Failed");
    }
  }, []);

  const disconnectWallet = useCallback((): void => {
    setIsConnected(false);
    setWalletAddress("");
    setWalletBalance(0);
    setConnectionStatus("Disconnected");
  }, []);

  const handleTransfer = useCallback(async (): Promise<void> => {
    if (!isConnected || !transferTo || !transferAmount) {
      alert("Please connect wallet and enter recipient and amount.");
      return;
    }
    try {
      await transferFIL(transferTo, transferAmount);
      alert(`Transferred ${transferAmount} FIL to ${transferTo}`);
      setTransferTo("");
      setTransferAmount("");
      const balance = await getBalance();
      setWalletBalance(balance);
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Check console for details.");
    }
  }, [isConnected, transferTo, transferAmount]);

  const handleStoreData = useCallback(async (): Promise<void> => {
    if (!isConnected) {
      alert("Please connect your wallet to store data.");
      return;
    }
    try {
      const data = new TextEncoder().encode("Sample data for Filecoin storage");
      const pieceCid = await uploadData(data);
      setDealId(pieceCid);
      alert(`Data stored with PieceCID: ${pieceCid}`);
      await depositFunds("1"); // Deposit 1 USDFC for storage costs
      await approveService("0.1"); // Approve 0.1 USDFC rate allowance
    } catch (error) {
      console.error("Storage failed:", error);
      alert("Storage failed. Check console for details.");
    }
  }, [isConnected]);

  const handleRetrieveData = useCallback(async (): Promise<void> => {
    if (!dealId) {
      alert("No PieceCID available.");
      return;
    }
    try {
      const data = await downloadData(dealId);
      alert(`Retrieved Data: ${new TextDecoder().decode(data)}`);
    } catch (error) {
      console.error("Retrieval failed:", error);
      alert("Retrieval failed. Check console for details.");
    }
  }, [dealId]);

  useEffect(() => {
    if (isConnected) {
      const updateBalance = async () => {
        const balance = await getBalance();
        setWalletBalance(balance);
      };
      updateBalance();
    }
  }, [isConnected]);

  const executeTrade = useCallback(async (option: Option, quantity: number): Promise<void> => {
    if (!isConnected) {
      alert("Please connect your wallet to trade.");
      return;
    }
    try {
      alert(`Traded ${quantity} ${option.type} options successfully!`);
      // Add real trading logic with Filecoin contracts later
    } catch (error) {
      console.error("Trade failed:", error);
      alert("Trade failed. Check console for details.");
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-black text-white font-sans relative overflow-x-hidden">
      <div className="fixed left-0 top-16 h-screen w-64 bg-gray-800 bg-opacity-95 p-6 shadow-xl z-20 transition-all duration-300 hover:bg-opacity-100 md:block hidden">
        <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center border-b-2 border-teal-700 pb-2">Filecoin-Bim</h2>
        <nav className="space-y-4">
          {["Dashboard", "Trade", "Transfer", "Storage", "Settings"].map((navItem) => (
            <button
              key={navItem}
              onClick={() => setActiveNav(navItem)}
              className={`w-full p-3 rounded-lg text-white font-medium text-lg ${activeNav === navItem
                ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600 hover:text-teal-300"} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              {navItem}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-24 pl-72 pr-72 pb-12 md:pl-80 md:pr-80 sm:pl-6 sm:pr-6 min-h-screen transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-teal-400 mb-2 animate-pulse">Filecoin-Bim Dashboard</h1>
          {isConnected ? (
            <div className="text-teal-300 space-y-1">
              <p>Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
              <p>Balance: {walletBalance.toFixed(2)} FIL</p>
              <p className="text-sm">{connectionStatus}</p>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-purple-700 mt-4"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {isConnected && (
          <>
            {activeNav === "Dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Wallet Info */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                  <h3 className="text-2xl font-semibold text-teal-400 mb-4">Wallet Info</h3>
                  <p>Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                  <p>Balance: {walletBalance.toFixed(2)} FIL</p>
                </div>
                {/* Storage Status */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                  <h3 className="text-2xl font-semibold text-teal-400 mb-4">Storage Status</h3>
                  <p>Deal ID: {dealId || "None"}</p>
                </div>
              </div>
            )}

            {activeNav === "Trade" && (
              <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                <h3 className="text-2xl font-semibold text-teal-400 mb-6">Options Trading</h3>
                <div className="grid grid-cols-1 gap-4">
                  {options.map((option) => (
                    <div key={option.id} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                      <div>
                        <div className="font-medium text-white">{option.type} Option #{option.id}</div>
                        <div className="text-sm text-teal-300">Premium: {option.premium} FIL</div>
                      </div>
                      <button
                        onClick={() => { setSelectedOption(option); setIsModalOpen(true); }}
                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:from-teal-600 hover:to-purple-700"
                      >
                        Trade
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeNav === "Transfer" && (
              <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                <h3 className="text-2xl font-semibold text-teal-400 mb-6">Transfer FIL</h3>
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Amount (FIL)"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleTransfer}
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                >
                  Transfer
                </button>
              </div>
            )}

            {activeNav === "Storage" && (
              <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                <h3 className="text-2xl font-semibold text-teal-400 mb-6">Warm Storage</h3>
                <button
                  onClick={handleStoreData}
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-3 rounded-lg mb-4 shadow-md hover:from-teal-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                >
                  Store Data
                </button>
                <button
                  onClick={handleRetrieveData}
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                >
                  Retrieve Data
                </button>
                {dealId && <p className="mt-4 text-xl text-teal-300">Deal ID: {dealId}</p>}
              </div>
            )}

            {activeNav === "Settings" && (
              <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-teal-700">
                <h3 className="text-2xl font-semibold text-teal-400 mb-6">Settings</h3>
                <p className="text-xl text-teal-300 mb-4">Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                <button
                  onClick={disconnectWallet}
                  className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                >
                  Disconnect
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed right-0 top-16 h-screen w-64 bg-gray-800 bg-opacity-95 p-6 shadow-xl z-20 transition-all duration-300 hover:bg-opacity-100 md:block hidden">
        <h3 className="text-xl font-semibold text-teal-400 mb-6 border-b-2 border-teal-700 pb-2">Assets</h3>
        <div className="border border-teal-700 p-4 rounded-xl bg-gray-900">
          <ul className="space-y-3">
            {["Filecoin", "IPFS", "Ethereum", "Solana"].map((asset, index) => (
              <li key={index}>
                <Link href={`/assets/${asset.toLowerCase()}`} className="block p-2 text-teal-300 hover:text-white hover:bg-gray-700 rounded-lg transition duration-200">
                  {asset}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TradeModal
        option={selectedOption}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTrade={executeTrade}
      />
    </div>
  );
};

export default Home;