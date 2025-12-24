"use client";

import { useActiveAccount, useActiveWallet, useWalletBalance } from "thirdweb/react";
import { client, mantleMainnet, mantleTestnet, getActiveChain } from "../providers/thirdweb-provider";

/**
 * Custom hook to simplify Thirdweb usage in the Mantle Armada app
 * Provides wallet connection state, balance, and network information
 */
export function useThirdweb() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  // Get active chain (Mantle Mainnet or Testnet)
  const activeChain = getActiveChain();

  // Get wallet balance for the active chain
  const { data: balance, isLoading: isLoadingBalance } = useWalletBalance({
    client,
    chain: activeChain,
    address: account?.address,
  });

  // Helper functions
  const isConnected = !!account && !!wallet;
  const address = account?.address;
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  const isMainnet = activeChain.id === mantleMainnet.id;
  const isTestnet = activeChain.id === mantleTestnet.id;

  const networkName = isMainnet ? "Mantle Mainnet" : "Mantle Sepolia Testnet";
  const explorerUrl = isMainnet
    ? "https://mantlescan.xyz"
    : "https://sepolia.mantlescan.xyz";

  return {
    // Connection state
    isConnected,
    account,
    wallet,
    address,
    shortAddress,

    // Balance
    balance,
    isLoadingBalance,

    // Network info
    activeChain,
    isMainnet,
    isTestnet,
    networkName,
    explorerUrl,

    // Thirdweb client
    client,

    // Available chains
    chains: {
      mainnet: mantleMainnet,
      testnet: mantleTestnet,
    },
  };
} 