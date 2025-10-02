import express from 'express';
import { ethers } from 'ethers';
import { config } from 'dotenv';
import cors from 'cors';

config();
const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.MOCA_TESTNET_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const issuerContract = new ethers.Contract(
  process.env.ISSUER_ADDRESS || '',
  ['function issueVC(address agent, bytes memory vcData) external', 'function getVC(address agent) view returns (bytes)'],
  wallet
);

app.post('/issue', async (req, res) => {
  const { agentAddress, vcData } = req.body;
  try {
    const tx = await issuerContract.issueVC(agentAddress, ethers.toUtf8Bytes(vcData));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/vc/:agentAddress', async (req, res) => {
  try {
    const vcData = await issuerContract.getVC(req.params.agentAddress);
    res.json({ vcData: ethers.toUtf8String(vcData) });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));