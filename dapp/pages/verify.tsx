import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import TradePanel from '../components/TradePanel';
import TradeHistory from '../components/TradeHistory';

const Verify: React.FC<{ addNotification: (message: string) => void }> = ({ addNotification }) => {
  const [proofStatus, setProofStatus] = useState<string>('Not Verified');
  const [vcData, setVcData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeStatus, setTradeStatus] = useState<string>('');
  const [tradeHistory, setTradeHistory] = useState<string[]>([]);

  useEffect(() => {
    if (tradeStatus) setTradeHistory([`${tradeStatus} at ${new Date().toLocaleTimeString()}`, ...tradeHistory]);
  }, [tradeStatus]);

  const fetchVC = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const res = await axios.get(`http://localhost:3000/vc/${accounts[0]}`);
        setVcData(res.data.vcData || 'No VC found');
        addNotification('VC fetched successfully!');
      } catch (error) {
        setVcData('Error fetching VC. Retry or check network.');
        addNotification('Error fetching VC.');
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyAndTrade = async (tokenPair: string) => {
    if (!window.ethereum) return setProofStatus('Please install MetaMask');
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_VERIFIER_ADDRESS || '',
        ['function verifyProof(uint[2], uint[2][2], uint[2], uint[1]) returns (bool)'],
        signer
      );
      const proof = { a: [0, 0], b: [[0, 0], [0, 0]], c: [0, 0], input: [1] }; // Mock
      const isValid = await contract.verifyProof(proof.a, proof.b, proof.c, proof.input);
      if (isValid) {
        setProofStatus('Proof Valid');
        setTradeStatus(`Trade Executed: ${tokenPair} swapped`);
        addNotification('Trade executed successfully!');
      } else {
        setProofStatus('Proof Invalid');
        addNotification('Trade verification failed.');
      }
    } catch (error) {
      setProofStatus('Error verifying proof. Retry or check contract.');
      addNotification('Error verifying proof.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {loading && <div className="text-lg text-gray-600 mb-4">Loading...</div>}
        <h1 className="text-3xl md:text-4xl font-bold text-moca-blue dark:text-moca-purple mb-4 text-center">
          Verify Credential & Trade
        </h1>
        <button
          className="bg-moca-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4"
          onClick={fetchVC}
          disabled={loading}
        >
          Fetch VC
        </button>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">VC Data: {vcData}</p>
        <TradePanel onTrade={verifyAndTrade} tradeStatus={tradeStatus} />
        <TradeHistory history={tradeHistory} />
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">{proofStatus}</p>
      </div>
    </div>
  );
};

export default Verify;