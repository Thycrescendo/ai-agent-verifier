import React from 'react';

const CredentialLog: React.FC<{ history: string[] }> = ({ history }) => {
  return (
    <div className="mt-4 w-full max-w-md">
      <h3 className="text-xl text-moca-blue mb-2">Credential History</h3>
      <div className="bg-white p-4 rounded-lg shadow-md h-32 overflow-y-auto">
        {history.length > 0 ? (
          <ul className="list-disc pl-5">
            {history.map((entry, index) => (
              <li key={index} className="text-sm text-gray-600">{entry}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No credentials issued yet.</p>
        )}
      </div>
    </div>
  );
};

export default CredentialLog;