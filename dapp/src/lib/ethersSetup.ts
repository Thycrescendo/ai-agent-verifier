import { ethers } from "ethers";
import { Synapse, RPC_URLS, TOKENS } from "@filoz/synapse-sdk";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Filecoin Calibration Testnet Configuration
const FILECOIN_TESTNET = {
  chainId: "0x4cb30", // 314159 in hex
  chainName: "Filecoin Calibration Testnet",
  nativeCurrency: { name: "FIL", symbol: "FIL", decimals: 18 },
  rpcUrls: [RPC_URLS.calibration.http],
  blockExplorerUrls: ["https://calibration.filscan.io"],
};

let synapse: Synapse | null = null;

export const initializeSynapse = async (): Promise<Synapse> => {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  if (!synapse) {
    synapse = await Synapse.create({ provider: provider });
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [FILECOIN_TESTNET],
    });
  }
  return synapse;
};

export const getBalance = async (): Promise<number> => {
  const synapseInstance = await initializeSynapse();
  const address = await (await synapseInstance.getProvider()).getSigner().getAddress();
  const balance = await synapseInstance.payments.walletBalance();
  return Number(ethers.formatEther(balance));
};

export const uploadData = async (data: Uint8Array): Promise<string> => {
  const synapseInstance = await initializeSynapse();
  const result = await synapseInstance.storage.upload(data);
  return result.pieceCid.toString();
};

export const downloadData = async (pieceCid: string): Promise<Uint8Array> => {
  const synapseInstance = await initializeSynapse();
  return await synapseInstance.storage.download(pieceCid);
};

export const depositFunds = async (amount: string): Promise<void> => {
  const synapseInstance = await initializeSynapse();
  const amountInWei = ethers.parseUnits(amount, 18);
  await synapseInstance.payments.deposit(amountInWei, TOKENS.USDFC);
};

export const approveService = async (amount: string): Promise<void> {
  const synapseInstance = await initializeSynapse();
  const warmStorageAddress = await synapseInstance.getWarmStorageAddress();
  const amountInWei = ethers.parseUnits(amount, 18);
  await synapseInstance.payments.approveService(
    warmStorageAddress,
    amountInWei, // Rate allowance
    amountInWei.mul(100), // Lockup allowance (100x rate)
    86400n // 30 days max lockup period
  );
};

export const transferFIL = async (to: string, amount: string): Promise<void> => {
  const synapseInstance = await initializeSynapse();
  const amountInWei = ethers.parseUnits(amount, 18);
  const tx = await synapseInstance.getProvider().getSigner().sendTransaction({
    to,
    value: amountInWei,
  });
  await tx.wait();
};