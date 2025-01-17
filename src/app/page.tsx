"use client";

import Link from "next/link";
import { StakeToken } from "../../components/StakeToken";
import { ConnectEmbed } from "thirdweb/react"; // Import ConnectEmbed
import { client } from "./client";
import { chain } from "./chain";

export default function Home() {
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
            style={{ color: "#ffd700", textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}
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

      {/* Section: Why Staking */}
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
        <h2>What is Staking?</h2>
        <p>
          Staking is a way to earn rewards by locking up your tokens to support the network's
          security and operations. By staking GCC-BNB LP tokens, you contribute liquidity to the
          GCC-BNB pool and earn rewards over time.
        </p>
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
            <strong>Step 1:</strong> Visit{" "}
            <a
              href="https://apeswap.finance/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066cc", textDecoration: "underline" }}
            >
              ApeSwap
            </a>{" "}
            to add liquidity to the GCC-BNB pool.
          </li>
          <li>
            <strong>Step 2:</strong> Connect your wallet using the button above.
          </li>
          <li>
            <strong>Step 3:</strong> Stake your GCC-BNB LP tokens to start earning rewards.
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
        <StakeToken />
      </div>
    </div>
  );
}
