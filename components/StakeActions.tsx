"use client";

import { TransactionButton } from "thirdweb/react";
import { STAKING_CONTRACT } from "../utils/contracts";
import { prepareContractCall, toWei } from "thirdweb";

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
  const handleStake = async () => {
    if (!stakeAmount) return;
    await prepareContractCall({
      contract: STAKING_CONTRACT,
      method: "stake",
      params: [toWei(stakeAmount.toString())],
    });
    setStakeAmount(0);
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    await prepareContractCall({
      contract: STAKING_CONTRACT,
      method: "withdraw",
      params: [toWei(withdrawAmount.toString())],
    });
    setWithdrawAmount(0);
  };

  return (
    <div className="stake-actions">
      <div className="stake-input">
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
          placeholder="Enter amount to stake"
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      <div className="stake-input">
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          placeholder="Enter amount to withdraw"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default StakeActions;
