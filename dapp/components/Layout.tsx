import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-moca-blue text-white p-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">AI-Agent Credential Verifier</h2>
      </header>
      <main className="p-4 md:p-6">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        <p>Built for Moca Chain Buildathon 2025 | © xAI</p>
      </footer>
    </div>
  );
};

export default Layout;