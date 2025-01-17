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
    params: ["your_wallet_address"],
  });

  return (
    <div className="token-balances">
      <p>Staking Token Balance: {stakingTokenBalance ? toEther(stakingTokenBalance) : "Loading..."} GCC</p>
      <p>Reward Token Balance: {rewardTokenBalance ? toEther(rewardTokenBalance) : "Loading..."} GCC</p>
    </div>
  );
};

export default TokenBalances;
