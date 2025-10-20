import React from 'react';

const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl text-moca-blue dark:text-moca-purple mb-4">Settings</h3>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Network</label>
          <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white">
            <option value="moca-testnet">Moca Testnet</option>
            <option value="ethereum-sepolia">Ethereum Sepolia</option>
            <option value="solana-devnet">Solana Devnet</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">API Endpoint</label>
          <input
            type="text"
            defaultValue="http://localhost:3000"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          className="bg-moca-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;