import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { getContract } from "thirdweb";
import { STAKING_CONTRACT_ABI } from "./stakingContractABI";

export const STAKE_TOKEN_CONTRACT = getContract({
  client,
  chain,
  address: "0x5d5Af3462348422B6A6b110799FcF298CFc041D3",
});

export const REWARD_TOKEN_CONTRACT = getContract({
  client,
  chain,
  address: "0x092aC429b9c3450c9909433eB0662c3b7c13cF9A",
});

export const STAKING_CONTRACT = getContract({
  client,
  chain,
  address: "0x0B7DB663300949fB7Ec18F63cf44DEB6AAD3F165",
  abi: STAKING_CONTRACT_ABI,
});
