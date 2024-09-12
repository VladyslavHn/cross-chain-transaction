import { ethers } from "ethers";
import { provider, wallet } from "../ethers-setup";
import { 
  BRIDGE_NAME, 
  TOKEN_NAME, 
  TOKEN_DECIMALS, 
  TOKEN_CONTRACT_ETH, 
  TOKEN_CONTRACT_BASE,
  TX_SAMPLE_ETH_TO_BASE,
  TX_SAMPLE_BASE_TO_ETH
} from "./config";

const swapContractAddress = "0xcA74F404E0C7bfA35B13B511097df966D5a65597"; 
const bridgeContractAddress = "0xeff2A458E464b07088bDB441C21A42AB4b61e07E"; 

const swapABI = [
  "function swapTokens(address recipient, uint256 amount) public returns (bool)"
];

const bridgeABI = [
  "function bridgeTokens(address recipient, uint256 amount) public returns (bool)"
];

const swapContract = new ethers.Contract(swapContractAddress, swapABI, wallet);
const bridgeContract = new ethers.Contract(bridgeContractAddress, bridgeABI, wallet);

async function sendSwapAndBridgeTransaction() {
  console.log(`Bridge Name: ${BRIDGE_NAME}`);
  console.log(`Token Name: ${TOKEN_NAME}`);

  try {
    const swapTx = await swapContract.swapTokens("0xrecipientAddress", ethers.utils.parseUnits("10", TOKEN_DECIMALS));

    const swapReceipt = await swapTx.wait();
    if (swapReceipt.status === 1) {
      console.log("Swap transaction confirmed!");

      console.log(`Initiating token bridge...`);
      const bridgeTx = await bridgeContract.bridgeTokens("0xrecipientAddress", ethers.utils.parseUnits("10", TOKEN_DECIMALS));
      console.log(`Bridge Transaction sent with hash: ${bridgeTx.hash}`);

      const bridgeReceipt = await bridgeTx.wait();
      if (bridgeReceipt.status === 1) {
        console.log("Bridge transaction confirmed!");
      } else {
        console.error("Bridge transaction failed!");
      }
    } else {
      console.error("Swap transaction failed!");
    }
  } catch (error) {
    console.error("Error during transactions:", error);
  }
}

export { sendSwapAndBridgeTransaction };
