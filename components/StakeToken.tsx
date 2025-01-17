"use client";

import { BrowserProvider, Contract, formatEther } from "ethers"; // For ethers v6
import { useState, useEffect } from "react";
import { STAKING_CONTRACT_ABI } from "../utils/stakingContractABI";

const STAKING_CONTRACT_ADDRESS = "0x0B7DB663300949fB7Ec18F63cf44DEB6AAD3F165";

export const StakeToken = () => {
  const [stakingInfo, setStakingInfo] = useState<null | {
    _tokensStaked: string;
    _rewards: string;
  }>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchStakingInfo = async () => {
      try {
        if (!window.ethereum) {
          console.error("No Ethereum provider found. Install MetaMask.");
          return;
        }

        // Initialize provider and signer
        const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider for ethers v6
        const signer = await provider.getSigner();
        const stakingContract = new Contract(
          STAKING_CONTRACT_ADDRESS,
          STAKING_CONTRACT_ABI,
          signer
        );

        // Get connected wallet address
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Fetch staking info using the connected wallet address
        const info = await stakingContract.getStakeInfo(address);
        setStakingInfo(info);
      } catch (error) {
        console.error("Error fetching staking info:", error);
      }
    };

    fetchStakingInfo();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "0 auto",
        color: "black", // Set font color to black
      }}
    >
      <h3>Staking Information</h3>
      {walletAddress ? (
        <p style={{ color: "black" }}>Connected Wallet: {walletAddress}</p>
      ) : (
        <p style={{ color: "black" }}>Loading wallet address...</p>
      )}
      {stakingInfo ? (
        <div>
          <p style={{ color: "black" }}>Tokens Staked: {formatEther(stakingInfo._tokensStaked)}</p>
          <p style={{ color: "black" }}>Rewards: {formatEther(stakingInfo._rewards)}</p>
        </div>
      ) : (
        <p style={{ color: "black" }}>Loading staking information...</p>
      )}
    </div>
  );
};
