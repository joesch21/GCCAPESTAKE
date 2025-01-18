'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { STAKING_CONTRACT_ABI } from '../utils/stakingContractABI';
import stakingTokenABI from '../utils/stake_token_abi.json';
import { STAKING_CONTRACT, STAKE_TOKEN_CONTRACT } from '../utils/contracts';

export const StakeToken = () => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [isStaking, setIsStaking] = useState(false);

  const handleApprove = async () => {
    if (!window.ethereum || !stakeAmount) {
      console.error('No Ethereum provider found, or invalid stake amount.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create ERC20 contract instance for LP token
      const stakingTokenContract = new ethers.Contract(
        STAKE_TOKEN_CONTRACT.address,
        stakingTokenABI,
        signer
      );

      console.log('Approving LP tokens...');
      const tx = await stakingTokenContract.approve(
        STAKING_CONTRACT.address,
        ethers.parseEther(stakeAmount.toString()) // Approve the specified stake amount
      );
      console.log('Approval in progress...', tx);

      await tx.wait();
      console.log('Approval successful!');
    } catch (error) {
      console.error('Approval failed!', error);
    }
  };

  const handleStake = async () => {
    if (!window.ethereum || !stakeAmount) {
      console.error('No Ethereum provider found, or invalid stake amount.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create staking contract instance
      const stakingContract = new ethers.Contract(
        STAKING_CONTRACT.address,
        STAKING_CONTRACT_ABI,
        signer
      );

      console.log('Staking tokens...');
      const tx = await stakingContract.stake(
        ethers.parseEther(stakeAmount.toString())
      );
      console.log('Staking in progress...', tx);

      await tx.wait();
      console.log('Stake successful!');
      setStakeAmount(0);
    } catch (error) {
      console.error('Staking failed!', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
      <h2>Stake Your LP Tokens</h2>
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
        placeholder="Enter amount to stake"
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '80%',
          marginBottom: '10px',
        }}
      />
      <div>
        <button
          onClick={handleApprove}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#ffd700',
            color: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Approve
        </button>
        <button
          onClick={handleStake}
          disabled={isStaking}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isStaking ? 'not-allowed' : 'pointer',
          }}
        >
          Stake
        </button>
      </div>
    </div>
  );
};

export default StakeToken;
