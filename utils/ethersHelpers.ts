import { BrowserProvider, Contract } from "ethers";
import { STAKING_CONTRACT_ABI } from "./stakingContractABI";

const STAKING_CONTRACT_ADDRESS = "0x0B7DB663300949fB7Ec18F63cf44DEB6AAD3F165";

export const getStakingContract = async () => {
  // Use `BrowserProvider` to connect with MetaMask
  if (!window.ethereum) {
    throw new Error("No Ethereum provider found. Please install MetaMask.");
  }
  const provider = new BrowserProvider(window.ethereum); // Updated for ethers v6
  const signer = await provider.getSigner(); // Await the async method to resolve the promise

  return new Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer); // Pass the resolved signer
};

export const fetchStakeInfo = async (stakerAddress: string) => {
  const stakingContract = await getStakingContract(); // Await the async function
  try {
    const stakeInfo = await stakingContract.getStakeInfo(stakerAddress);
    return stakeInfo;
  } catch (error) {
    console.error("Error fetching stake info:", error);
    throw error;
  }
};

export const claimRewards = async () => {
  const stakingContract = await getStakingContract(); // Await the async function
  try {
    const tx = await stakingContract.claimRewards();
    await tx.wait();
    console.log("Rewards claimed successfully!");
  } catch (error) {
    console.error("Error claiming rewards:", error);
    throw error;
  }
};
