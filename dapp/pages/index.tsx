import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [vcStatus, setVcStatus] = useState<string>('Not Issued');
  const router = useRouter();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (error) {
        setVcStatus('Wallet connection failed');
      }
    } else {
      setVcStatus('Please install MetaMask');
    }
  };

  const issueVC = async () => {
    if (!account) return setVcStatus('Connect wallet first');
    try {
      const res = await axios.post('http://localhost:3000/issue', {
        agentAddress: account,
        vcData: JSON.stringify({ compliance: 'aml_verified', reputation: 0.8 }),
      });
      setVcStatus(`VC Issued: ${res.data.txHash.slice(0, 10)}...`);
    } catch (error) {
      setVcStatus('Error issuing VC');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">AI-Agent Credential Verifier</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4"
        onClick={connectWallet}
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-4 disabled:opacity-50"
        onClick={issueVC}
        disabled={!account}
      >
        Issue VC
      </button>
      <p className="text-lg text-gray-700 mb-4">{vcStatus}</p>
      <button
        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
        onClick={() => router.push('/verify')}
        disabled={!account}
      >
        Verify & Trade
      </button>
    </div>
  );
};

export default Home;