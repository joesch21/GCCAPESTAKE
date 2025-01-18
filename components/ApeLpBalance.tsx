"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { STAKE_TOKEN_CONTRACT } from "../utils/contracts";
import { useActiveAccount } from "thirdweb/react";

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "decimals", type: "uint8" }],
    type: "function",
  },
];

const ApeLpBalance = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const account = useActiveAccount(); // Get the active account (connected wallet)

  const fetchBalance = async () => {
    if (!account) {
      console.error("No wallet connected!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);

    const signer = await provider.getSigner(account.address); // Get the signer

    // Create contract instance for APE LP token
    const apeLpContract = new ethers.Contract(STAKE_TOKEN_CONTRACT.address, ERC20_ABI, signer);

    try {
      // Fetch raw balance and decimals
      const rawBalance = await apeLpContract.balanceOf(account.address);
      const decimals = await apeLpContract.decimals();

      // Format balance to human-readable form
      const formattedBalance = ethers.formatUnits(rawBalance, decimals);
      setBalance(formattedBalance); // Update state
    } catch (error) {
      console.error("Error fetching APE LP token balance:", error);
    }
  };

  // Fetch balance on component load and wallet changes
  useEffect(() => {
    fetchBalance();
  }, [account]);

  return (
    <div>
      <h3>Your APE LP Token Balance:</h3>
      {balance !== null ? (
        <p>{balance} APE LP</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default ApeLpBalance;
