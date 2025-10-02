import { ethers } from 'ethers';
import axios from 'axios';
import { config } from 'dotenv';

config();

const provider = new ethers.JsonRpcProvider(process.env.MOCA_TESTNET_RPC);
const wallet = new ethers.Wallet(process.env.AGENT_PRIVATE_KEY || '', provider);

async function runBot() {
  console.log('Bot starting...');
  const vcResponse = await axios.post('http://localhost:3000/issue', {
    agentAddress: wallet.address,
    vcData: JSON.stringify({ compliance: 'aml_verified', reputation: 0.8 }),
  });
  console.log('VC Issued:', vcResponse.data.txHash);

  const verifierContract = new ethers.Contract(
    process.env.VERIFIER_ADDRESS || '',
    ['function verifyProof(uint[2], uint[2][2], uint[2], uint[1]) returns (bool)'],
    wallet
  );
  const proof = { a: [0, 0], b: [[0, 0], [0, 0]], c: [0, 0], input: [1] };
  const isValid = await verifierContract.verifyProof(proof.a, proof.b, proof.c, proof.input);
  console.log('Trade:', isValid ? 'Executed' : 'Failed');
}

runBot().catch(console.error);