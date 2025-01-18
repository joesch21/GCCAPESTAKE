"use client";

import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { STAKING_CONTRACT_ABI } from "../utils/stakingContractABI";
import { STAKING_CONTRACT } from "../utils/contracts";

interface StakeActionsProps {
  stakeAmount: number;
  setStakeAmount: (value: number) => void;
  withdrawAmount: number;
  setWithdrawAmount: (value: number) => void;
}

const StakeActions = ({
  stakeAmount,
  setStakeAmount,
  withdrawAmount,
  setWithdrawAmount,
}: StakeActionsProps) => {
  const [stakeBalance, setStakeBalance] = useState<string>("0");

  const fetchStakeBalance = async () => {
    if (!window.ethereum) {
      console.error("No Ethereum provider found!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakingContract = new ethers.Contract(
        STAKING_CONTRACT.address,
        STAKING_CONTRACT_ABI,
        signer
      );

      const userAddress = await signer.getAddress();
      console.log("Fetching stake balance for:", userAddress);

      if (stakingContract.balanceOf) {
        const balance = await stakingContract.balanceOf(userAddress);
        setStakeBalance(ethers.formatEther(balance));
      } else {
        console.error("'balanceOf' method not found in staking contract!");
      }
    } catch (error) {
      console.error("Failed to fetch stake balance:", error);
    }
  };

  useEffect(() => {
    fetchStakeBalance();
  }, [stakeAmount, withdrawAmount]);

  const handleWithdraw = async () => {
    if (!window.ethereum || withdrawAmount <= 0) {
      console.error("Invalid withdraw amount or no Ethereum provider!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakingContract = new ethers.Contract(
        STAKING_CONTRACT.address,
        STAKING_CONTRACT_ABI,
        signer
      );

      const withdrawAmountWei = ethers.parseEther(withdrawAmount.toString());

      console.log("Withdrawing tokens...");
      const tx = await stakingContract.withdraw(withdrawAmountWei);
      await tx.wait();
      console.log("Withdraw successful!");

      setWithdrawAmount(0);
      fetchStakeBalance();
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  return (
    <div className="stake-actions">
      <div style={{ marginBottom: "20px" }}>
        <strong>Your Stake Balance:</strong> {stakeBalance} Tokens
      </div>
      <div className="stake-input">
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
          placeholder="Enter amount to stake"
          style={{ marginRight: "10px", padding: "5px" }}
        />
      </div>
      <div className="withdraw-input">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          placeholder="Enter amount to withdraw"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={handleWithdraw}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default StakeActions;
