import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/router';
import CredentialLog from '../components/CredentialLog';
import SettingsModal from '../components/SettingsModal';
import TransactionTracker from '../components/TransactionTracker';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Home: React.FC<{ addNotification: (message: string) => void }> = ({ addNotification }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [vcStatus, setVcStatus] = useState<string>('Not Issued');
  const [loading, setLoading] = useState<boolean>(false);
  const [vcHistory, setVcHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (account) fetchVcHistory();
  }, [account]);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setVcStatus('Wallet Connected');
        addNotification('Wallet connected successfully!');
      } catch (error) {
        setVcStatus('Wallet connection failed. Retry or check MetaMask.');
        addNotification('Wallet connection failed.');
      } finally {
        setLoading(false);
      }
    } else {
      setVcStatus('Please install MetaMask');
    }
  };

  const issueVC = async () => {
    if (!account) return setVcStatus('Connect wallet first');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/issue', {
        agentAddress: account,
        vcData: JSON.stringify({ compliance: 'aml_verified', reputation: 0.8 }),
      });
      const newVc = `VC Issued: ${res.data.txHash.slice(0, 10)}... at ${new Date().toLocaleTimeString()}`;
      setVcHistory([newVc, ...vcHistory]);
      setVcStatus(newVc);
      addNotification('VC issued successfully!');
    } catch (error) {
      setVcStatus('Error issuing VC. Check network or retry.');
      addNotification('Error issuing VC.');
    } finally {
      setLoading(false);
    }
  };

  const fetchVcHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/vc/${account}`);
      if (res.data.vcData) {
        setVcHistory([`Fetched: ${res.data.vcData} at ${new Date().toLocaleTimeString()}`, ...vcHistory]);
      }
    } catch (error) {
      console.error('Error fetching VC history:', error);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="container mx-auto p-4">
        {loading && <div className="text-lg text-gray-600 mb-4">Loading...</div>}
        <div className="flex justify-end mb-4">
          <button
            className="bg-moca-blue text-white px-2 py-1 rounded-lg hover:bg-blue-700 mr-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            className="bg-moca-blue text-white px-2 py-1 rounded-lg hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            Settings
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-moca-blue dark:text-moca-purple mb-4 text-center">
          AI-Agent Credential Verifier
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <button
            className="bg-moca-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={connectWallet}
            disabled={loading}
          >
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            onClick={issueVC}
            disabled={!account || loading}
          >
            Issue VC
          </button>
          <button
            className="bg-moca-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => router.push('/verify')}
            disabled={!account || loading}
          >
            Verify & Trade
          </button>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">{vcStatus}</p>
        <CredentialLog history={vcHistory} />
        <TransactionTracker account={account} />
        <AnalyticsDashboard vcCount={vcHistory.length} />
        <SettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;