import "./howtostake.css";

export default function HowToStake() {
  return (
    <div className="main-container">
      {/* Header Section */}
      <header className="header-container">
        <div className="header-logo">
          <img src="/ape.png" alt="ApeSwap Logo for GCC Staking" />
          <a href="https://apeswap.finance/" target="_blank" rel="noopener noreferrer">
            Visit ApeSwap
          </a>
        </div>
        <nav className="header-nav">
          <a href="/">Home</a>
        </nav>
      </header>

      {/* Page Content */}
      <div className="content-container">
        <h1>How to Stake GCC-BNB LP Tokens</h1>
        <p>
          Follow this step-by-step guide to provide liquidity to the GCC-BNB pool on ApeSwap and stake your LP tokens to earn rewards.
        </p>

        {/* Step 1 */}
        <section className="step-section">
          <h2>Step 1: Connect Your Wallet</h2>
          <p>To start, connect your cryptocurrency wallet to the ApeSwap platform. Here’s how:</p>
          <ol>
            <li>Visit <a href="https://apeswap.finance/" target="_blank" rel="noopener noreferrer">ApeSwap</a>.</li>
            <li>Click the "Connect Wallet" button in the top-right corner of the page.</li>
            <li>Choose your preferred wallet (e.g., MetaMask, Trust Wallet) and follow the prompts to connect.</li>
          </ol>
        </section>

        {/* Step 2 */}
        <section className="step-section">
          <h2>Step 2: Add Liquidity to the GCC-BNB Pool</h2>
          <p>Once your wallet is connected, follow these steps to provide liquidity:</p>
          <ol>
            <li>Navigate to the <a href="https://apeswap.finance/add" target="_blank" rel="noopener noreferrer">Add Liquidity</a> page on ApeSwap.</li>
            <li>Select GCC as the first token and BNB as the second token in the liquidity pair.</li>
            <li>Enter the amount of GCC or BNB you want to provide. The other token amount will be calculated automatically based on the pool ratio.</li>
            <li>Approve the transaction for both GCC and BNB tokens in your wallet.</li>
            <li>Click "Supply" to confirm and provide liquidity.</li>
          </ol>
          <p>After the transaction is confirmed, you will receive GCC-BNB LP tokens in your wallet.</p>
        </section>

        {/* Step 3 */}
        <section className="step-section">
          <h2>Step 3: Stake Your GCC-BNB LP Tokens</h2>
          <p>Now that you have GCC-BNB LP tokens, you can stake them to earn rewards. Follow these steps:</p>
          <ol>
            <li>Return to this application and go to the "Stake Tokens" section.</li>
            <li>Connect your wallet using the "Connect Wallet" button.</li>
            <li>Enter the amount of GCC-BNB LP tokens you want to stake.</li>
            <li>Approve the staking transaction in your wallet.</li>
            <li>Click "Stake" to lock your LP tokens and start earning rewards.</li>
          </ol>
        </section>

        {/* Rewards Information */}
        <section className="step-section">
          <h2>Step 4: Claim Your Rewards</h2>
          <p>As you stake your GCC-BNB LP tokens, you will start earning rewards in GCC tokens. To claim your rewards:</p>
          <ol>
            <li>Go to the "Stake Tokens" section.</li>
            <li>Click the "Claim Rewards" button.</li>
            <li>Approve the transaction in your wallet to receive your rewards.</li>
          </ol>
        </section>

        {/* Additional Tips */}
        <section className="step-section">
          <h2>Additional Tips</h2>
          <ul>
            <li>Ensure you have enough BNB in your wallet to cover gas fees for all transactions.</li>
            <li>Regularly check your reward balance and claim your rewards when needed.</li>
            <li>If you need to withdraw your tokens, use the "Withdraw" option in the "Stake Tokens" section.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
