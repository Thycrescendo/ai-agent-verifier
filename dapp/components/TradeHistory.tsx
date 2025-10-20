import React from 'react';

const TradeHistory: React.FC<{ history: string[] }> = ({ history }) => {
  return (
    <div className="mt-4 w-full max-w-md">
      <h3 className="text-xl text-moca-blue dark:text-moca-purple mb-2">Trade History</h3>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-32 overflow-y-auto">
        {history.length > 0 ? (
          <ul className="list-disc pl-5">
            {history.map((entry, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{entry}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No trades executed yet.</p>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;