import React, { useState } from 'react';

const TradePanel: React.FC<{ onTrade: (pair: string) => void; tradeStatus: string }> = ({ onTrade, tradeStatus }) => {
  const [selectedPair, setSelectedPair] = useState<string>('MOCA/ETH');

  const handleTrade = () => {
    onTrade(selectedPair);
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <h3 className="text-xl text-moca-blue mb-2">Trade Simulation</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <select
          className="w-full p-2 mb-2 border rounded-lg"
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          <option value="MOCA/ETH">MOCA/ETH</option>
          <option value="MOCA/USDC">MOCA/USDC</option>
        </select>
        <button
          className="bg-moca-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full"
          onClick={handleTrade}
        >
          Execute Trade
        </button>
        {tradeStatus && <p className="text-sm text-gray-600 mt-2">{tradeStatus}</p>}
      </div>
    </div>
  );
};

export default TradePanel;