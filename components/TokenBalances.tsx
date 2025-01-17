"use client";

import { ethers } from "ethers";
import { useReadContract } from "thirdweb/react";
import { STAKE_TOKEN_CONTRACT, REWARD_TOKEN_CONTRACT } from "../utils/contracts";
import { toEther } from "thirdweb";

const TokenBalances = () => {
  const { data: stakingTokenBalance } = useReadContract({
    contract: STAKE_TOKEN_CONTRACT,
    method: "balanceOf",
    params: ["your_wallet_address"], // Replace dynamically
  });

  const { data: rewardTokenBalance } = useReadContract({
    contract: REWARD_TOKEN_CONTRACT,
    method: "balanceOf",
    params: ["your_wallet_address"], // Replace dynamically
  });

  // Type narrowing and parsing the values
  const formattedStakingTokenBalance = stakingTokenBalance && Array.isArray(stakingTokenBalance)
    ? toEther(BigInt(stakingTokenBalance[0].toString()))
    : "Loading...";

  const formattedRewardTokenBalance = rewardTokenBalance && Array.isArray(rewardTokenBalance)
    ? toEther(BigInt(rewardTokenBalance[0].toString()))
    : "Loading...";

  return (
    <div className="token-balances">
      <p>Staking Token Balance: {formattedStakingTokenBalance} GCC</p>
      <p>Reward Token Balance: {formattedRewardTokenBalance} GCC</p>
    </div>
  );
};

export default TokenBalances;
