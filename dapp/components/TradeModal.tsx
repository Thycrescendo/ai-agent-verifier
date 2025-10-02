import React, { useState } from "react";

// Define Option interface locally
interface Option {
  id: number;
  type: "Call" | "Put";
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

interface TradeModalProps {
  option: null | Option;
  isOpen: boolean;
  onClose: () => void;
  onTrade: (option: Option, quantity: number) => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ option, isOpen, onClose, onTrade }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !option) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-700 w-96">
        <h2 className="text-xl font-semibold text-teal-400 mb-4">Trade Option #{option.id}</h2>
        <p>Type: {option.type}</p>
        <p>Premium: {option.premium} FIL per unit</p>
        <div className="mt-4">
          <label className="block text-teal-300 mb-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full p-2 bg-gray-700 text-white rounded-lg border border-teal-700"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => onTrade(option, quantity)}
            className="bg-gradient-to-r from-teal-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-purple-700"
          >
            Confirm Trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;