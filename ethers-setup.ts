import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

export const provider = new ethers.providers.InfuraProvider("homestead", process.env.INFURA_API_KEY);

export const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
