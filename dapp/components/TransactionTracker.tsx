import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TransactionTracker: React.FC<{ account?: string }> = ({ account }) => {
  const [txStatus, setTxStatus] = useState<string>('No transactions');

  useEffect(() => {
    if (!account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const watchTx = async () => {
      provider.on('block', (blockNumber) => {
        setTxStatus(`Last Block: ${blockNumber} | Checking for ${account.slice(0, 6)}...`);
      });
    };
    watchTx();
    return () => provider.off('block');
  }, [account]);

  return (
    <div className="mt-4 w-full max-w-md">
      <h3 className="text-xl text-moca-blue dark:text-moca-purple mb-2">Transaction Tracker</h3>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-sm text-gray-600 dark:text-gray-300">{txStatus}</p>
      </div>
    </div>
  );
};

export default TransactionTracker;