"use client"; // Client Component for the button interactivity

import React from "react";

const IntroPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-purple-800 text-white font-sans relative overflow-x-hidden">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-teal-300 mb-6 animate-pulse">
          Welcome to Filecoin-Bim
        </h1>

        {/* What It Does Section */}
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-700 mb-10">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4">What It Does</h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Filecoin-Bim is a cutting-edge decentralized application that empowers users to trade
            options, manage wallets, transfer FIL tokens, and store data securely using Filecoin's
            on-chain cloud services. It features a sleek interface with real-time market charts, warm
            storage via FilecoinWarmStorageService, seamless payments with Filecoin Pay, and fast
            retrieval through FilCDN, all integrated with the Synapse SDK for a seamless user
            experience.
          </p>
        </section>

        {/* The Problem It Solves Section */}
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-700 mb-10">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4">The Problem It Solves</h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Filecoin-Bim addresses the challenges of centralized cloud storage by offering a
            decentralized alternative that ensures data sovereignty, reliability, and cost-efficiency.
            It tackles the lack of composable on-chain services by providing warm storage and payment
            solutions, solving accessibility issues for developers and users in the Web3 ecosystem who
            need secure, scalable, and incentivized data storage and financial transactions.
          </p>
        </section>

        {/* Challenges I Ran Into Section */}
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-700 mb-10">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4">Challenges I Ran Into</h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Integrating Filecoin's complex on-chain infrastructure with a user-friendly UI proved
            difficult, especially simulating contract interactions without real deployments. Ensuring
            compatibility with the Filecoin Mainnet and handling simulated data retrieval posed
            technical hurdles. Additionally, aligning the teal-to-purple gradient design with
            Filecoin's branding while maintaining performance under Next.js was a creative challenge
            that required iterative adjustments.
          </p>
        </section>

        {/* Technologies I Used Section */}
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-700 mb-10">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4">Technologies I Used</h2>
          <ul className="text-lg text-teal-100 max-w-2xl mx-auto list-disc list-inside space-y-2">
            <li>Next.js: For a fast, server-side rendered frontend.</li>
            <li>TypeScript: To ensure type safety and scalability.</li>
            <li>Tailwind CSS: For a responsive, customizable UI with a dark theme and gradients.</li>
            <li>Ethers.js: To interact with Filecoin's Ethereum-compatible smart contracts.</li>
            <li>Chart.js: For real-time market price visualizations.</li>
            <li>Filecoin Onchain Cloud: Leveraging FilecoinWarmStorageService, Filecoin Pay, FilCDN, and Synapse SDK for decentralized storage and payments.</li>
          </ul>
        </section>

        {/* How We Built It Section */}
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg border border-teal-700">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4">How We Built It</h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            We started by rebranding the existing "citrea-vim" codebase into "Filecoin-Bim" using
            Next.js and Tailwind CSS, preserving the UI's dark, gradient-rich aesthetic. We integrated
            Filecoin-specific contracts via Ethers.js, simulating warm storage and payment
            functionalities. The Synapse SDK was incorporated as a placeholder, with market feeds and
            charts built using Chart.js. Iterative testing with MetaMask ensured wallet connectivity,
            while creative design tweaks aligned the app with Filecoin's decentralized ethos.
          </p>
          {/* Navigation to Home */}
          <button
            onClick={() => {
              window.location.href = "/home";
            }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Explore Filecoin-Bim
          </button>
        </section>
      </div>
    </div>
  );
};

export default IntroPage;