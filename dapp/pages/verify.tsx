import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const Verify: React.FC = () => {
  const [proofStatus, setProofStatus] = useState<string>('Not Verified');
  const [vcData, setVcData] = useState<string>('');

  const fetchVC = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      try {
        const res = await axios.get(`http://localhost:3000/vc/${accounts[0]}`);
        setVcData(res.data.vcData || 'No VC found');
      } catch (error) {
        setVcData('Error fetching VC');
      }
    }
  };

  const verifyAndTrade = async () => {
    if (!window.ethereum) return setProofStatus('Please install MetaMask');
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
      setProofStatus(isValid ? 'Proof Valid: Trade Executed' : 'Proof Invalid');
    } catch (error) {
      setProofStatus('Error verifying proof');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Verify Credential & Trade</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4"
        onClick={fetchVC}
      >
        Fetch VC
      </button>
      <p className="text-lg text-gray-700 mb-4">VC Data: {vcData}</p>
      <button
        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mb-4"
        onClick={verifyAndTrade}
      >
        Verify & Execute Trade
      </being>
      <p className="text-lg text-gray-700">{proofStatus}</p>
    </div>
  );
};

export default Verify;