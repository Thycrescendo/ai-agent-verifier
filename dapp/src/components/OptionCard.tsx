import React from "react";

interface Option {
  id: number;
  type: "Call" | "Put";
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

interface OptionCardProps {
  option: Option;
  onTrade: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onTrade }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-teal-700">
      <h3 className="text-lg font-semibold text-teal-400">Option #{option.id}</h3>
      <p>Type: {option.type}</p>
      <p>Strike Price: {option.strikePrice} FIL</p>
      <p>Expiry: {option.expiry}</p>
      <p>Premium: {option.premium} FIL</p>
      <p>Liquidity: {option.liquidity} FIL</p>
      <button
        onClick={onTrade}
        className="mt-4 w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-2 rounded-lg hover:from-teal-600 hover:to-purple-700"
      >
        Trade
      </button>
    </div>
  );
};

export default OptionCard;