# AI-Agent Credential Verifier

The **AI-Agent Credential Verifier** is a decentralized application (DApp) built on **Moca Chain**, enabling AI agents (e.g., trading bots) to hold, manage, and present verifiable credentials (VCs) for autonomous DeFi actions. Leveraging **zkProofs**, it ensures privacy-preserving, trustless compliance checks, aligning with **Moca Network’s vision** for a unified identity network.

---

## 🌍 Overview

This project empowers AI agents to securely **issue, verify, and use credentials** (e.g., KYC/AML status) to execute trades on DeFi platforms **without exposing sensitive data**.

The **Wave 1 demo** includes:

* A **Next.js frontend**
* A **Node.js backend**
* **Solidity smart contracts**
* An **AI agent simulation** of a trade flow on **Moca Chain testnet**

---

## ⚡ What it Does

* **Issue Verifiable Credentials:** Mint credentials like `"AML verified"` via a decentralized issuer.
* **Verify with zkProofs:** Generate and validate zero-knowledge proofs for compliance checks.
* **Execute Autonomous Trades:** Simulate DeFi actions (mock trade in Wave 1) post-verification.

---

## 🛠 The Problem it Solves

* Removes **fragmented AI identities** in DeFi.
* Eliminates repeated KYC/AML hurdles.
* Reduces **privacy leaks** with zkProofs.
* Enables **trustless, reusable credentials** across blockchain ecosystems.
* Scales the **agentic economy** by empowering AI agents.

---

## 🧑‍💻 Technologies Used

* **Frontend:** Next.js, Tailwind CSS, TypeScript, ethers.js, axios
* **Backend:** Node.js, Express, ethers.js
* **Smart Contracts:** Solidity, Moca Network AIR Kit SDK
* **zkProofs:** circomlibjs (open-source)
* **Blockchain:** Moca Chain testnet
* **AI Agent:** Node.js, ethers.js

---

## 🚀 How We Built It

* **Day 1:** Setup Next.js + Tailwind, configured Moca testnet wallet, forked AIR Kit template.
* **Day 2:** Built `CredentialIssuer.sol` and `zkVerifier.sol`, deployed to testnet.
* **Day 3-4:** Express API for VC issuance/verification.
* **Day 5-7:** Frontend UI for wallet interaction, VC issuance, and verification.
* **Day 8:** AI Agent (Node.js bot) for autonomous trade simulation.
* **Day 9-10:** End-to-end testing, deploy to Vercel/testnet, record demo.

---

## ⛓️ Challenges We Ran Into

* Complex **zkProof integration** on Moca Chain due to limited testnet docs.
* Used **mock proofs** initially.
* **Time constraints** limited full end-to-end debugging of contract interactions.

---

## 📚 What We Learned

* Mastered **Moca’s AIR Kit SDK**.
* Gained hands-on **zkProof implementation** experience.
* Improved **Web3 UI/UX** with Tailwind.
* Collaborated effectively with **Moca docs & dev resources**.

---

## 🔮 What’s Next

* **Wave 2:** Add cross-chain verification (Ethereum, Solana) + live DEX integration (e.g., Uniswap).
* **Wave 3:** Expand to IoT device identities + build a **data marketplace**.
* **Post-Buildathon:** Apply for **Moca grants**, enhance SDK for broader use cases, target Animoca ecosystem.

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v18+)
* MetaMask wallet
* Moca Chain testnet tokens ([request via docs.moca.network](https://docs.moca.network))

### Steps

1. **Clone Repository**

```bash
git clone https://github.com/<your-username>/ai-agent-verifier.git
cd ai-agent-verifier
```

2. **Install Dependencies**

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install

# Agent
cd agent && npm install
```

3. **Configure Environment**
   Create `.env` files in `/backend` and `/agent` with:

```
MOCA_TESTNET_RPC=https://testnet.moca.network
PRIVATE_KEY=<your-private-key>
ISSUER_ADDRESS=<deployed-issuer-address>
VERIFIER_ADDRESS=<deployed-verifier-address>
AGENT_PRIVATE_KEY=<agent-private-key>
```

In `/frontend/.env.local`:

```
NEXT_PUBLIC_VERIFIER_ADDRESS=<deployed-verifier-address>
```

4. **Deploy Contracts**

* Use **Remix IDE** with Moca testnet to deploy:

  * `/contracts/CredentialIssuer.sol`
  * `/contracts/zkVerifier.sol`
* Update `.env` files with deployed addresses.

5. **Run the Project**

```bash
# Backend
cd backend && npm start

# Frontend (http://localhost:3000)
cd frontend && npm run dev

# Agent
cd agent && npm start
```

6. **Test**

* Connect **MetaMask**
* Issue a VC
* Verify with zkProof
* Run AI agent to simulate a trade

---
