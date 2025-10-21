import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TransactionTracker: React.FC<{ account: string | null }> = ({ account }) => {
  const [txStatus, setTxStatus] = useState<string>('No transactions');

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const setupTracker = async () => {
      if (!account || !window.ethereum) {
        if (isMounted) setTxStatus('No account or MetaMask detected');
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        provider.on('block', (blockNumber) => {
          if (isMounted) {
            setTxStatus(`Last Block: ${blockNumber} | Checking for ${account.slice(0, 6)}...`);
          }
        });

        // Initial block number fetch
        const blockNumber = await provider.getBlockNumber();
        if (isMounted) {
          setTxStatus(`Last Block: ${blockNumber} | Checking for ${account.slice(0, 6)}...`);
        }
      } catch (error) {
        if (isMounted) {
          setTxStatus('Error tracking transactions. Check MetaMask connection.');
        }
      }
    };

    setupTracker();

    // Cleanup function to remove event listener
    return () => {
      isMounted = false;
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        provider.off('block');
      }
    };
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