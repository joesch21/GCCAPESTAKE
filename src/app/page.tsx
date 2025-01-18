"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { StakeToken } from "../../components/StakeToken";
import StakeActions from "../../components/StakeActions";
import ApeLpBalance from "../../components/ApeLpBalance";
import { ConnectEmbed } from "thirdweb/react";
import { client } from "./client";
import { chain } from "./chain";

// Importing ABIs and contract details
import stakeTokenABI from "../../utils/stake_token_abi.json"; // LP Token ABI
import { STAKING_CONTRACT_ABI } from "../../utils/stakingContractABI"; // Staking Contract ABI
import { STAKING_CONTRACT } from "../../utils/contracts"; // Contract addresses

export default function Home() {
  // State to manage stake and withdraw amounts
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  // State to store staking balance
  const [stakingBalance, setStakingBalance] = useState<string>("0");

  // Fetch Staking Balance
  const fetchStakingBalance = async () => {
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
      const balance = await stakingContract.balanceOf(userAddress); // Replace with your staking balance method
      setStakingBalance(ethers.formatEther(balance)); // Convert to human-readable format
    } catch (error) {
      console.error("Failed to fetch staking balance:", error);
    }
  };

  useEffect(() => {
    fetchStakingBalance();
  }, [stakeAmount, withdrawAmount]); // Fetch balance whenever stake or withdraw occurs

  // Approve LP Tokens for Staking
  const handleApprove = async () => {
    if (!window.ethereum) {
      console.error("No Ethereum provider found!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakeTokenContract = new ethers.Contract(
        "0xYourLPTokenAddressHere", // Replace with the actual LP token address
        stakeTokenABI,
        signer
      );

      const tx = await stakeTokenContract.approve(
        STAKING_CONTRACT.address, // Address of the staking contract
        ethers.parseEther(stakeAmount.toString())
      );

      console.log("Approval transaction sent:", tx);
      await tx.wait();
      console.log("Approval successful!");
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        backgroundImage: "url('/logo192.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        color: "white",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/ape.png" alt="ApeSwap Logo" style={{ height: "40px", width: "auto" }} />
          <a
            href="https://apeswap.finance/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffd700",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Visit ApeSwap
          </a>
          <span style={{ fontSize: "0.9rem", color: "#fff" }}>GCC Staking with Ape Swap</span>
        </div>
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link
            href="/howtostake"
            style={{
              color: "#ffd700",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            How to Stake
          </Link>
          <a
            href="#staking"
            style={{
              color: "#ffd700",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            GCC Site
          </a>
        </nav>
      </header>

      {/* Wallet Connection Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>Connect Your Wallet</h2>
        <p>To start staking, please connect your wallet using the embedded connect button below.</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ConnectEmbed client={client} chain={chain} />
        </div>
      </div>

      {/* Staking Balance Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>Your Staking Balance</h2>
        <p>{stakingBalance} GCC-BNB LP Tokens</p>
      </div>

      {/* Instructions Section */}
      <div
        style={{
          margin: "20px 0",
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          color: "black",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>How to Stake APE GCC-BNB LP Tokens</h2>
        <ol style={{ paddingLeft: "20px", textAlign: "left" }}>
          <li>
            <strong>Step 1:</strong> Approve the staking contract to use your LP tokens.
          </li>
          <li>
            <strong>Step 2:</strong> Enter the amount you want to stake and click "Stake."
          </li>
          <li>
            <strong>Step 3:</strong> Monitor your staking balance and withdraw if needed.
          </li>
        </ol>
      </div>

      {/* Embedded Staking Panel */}
      <div
        id="staking"
        style={{
          marginTop: "50px",
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.9)",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>Staking Panel</h2>
        <p>Manage your staking operations below:</p>
        <button onClick={handleApprove}>Approve Tokens</button>
        <StakeToken />
        <StakeActions
          stakeAmount={stakeAmount}
          setStakeAmount={setStakeAmount}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
        />
      </div>
    </div>
  );
}
