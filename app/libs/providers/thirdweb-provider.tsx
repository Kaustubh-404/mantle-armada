"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import type { ReactNode } from "react";

interface ThirdwebProviderWrapperProps {
  children: ReactNode;
}

// Create Thirdweb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// Define Mantle Mainnet chain
const mantleMainnet = defineChain({
  id: 5000,
  name: "Mantle",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantlescan",
      url: "https://mantlescan.xyz",
    },
  },
  testnet: false,
});

// Define Mantle Sepolia Testnet chain
const mantleTestnet = defineChain({
  id: 5003,
  name: "Mantle Sepolia",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantlescan Testnet",
      url: "https://sepolia.mantlescan.xyz",
    },
  },
  testnet: true,
});

export function ThirdwebProviderWrapper({ children }: ThirdwebProviderWrapperProps) {
  if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
    console.error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
    return <>{children}</>;
  }

  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}

// Export the client and chains for use in other components
export { client, mantleMainnet, mantleTestnet };

// Helper to get active chain based on environment
export const getActiveChain = () => {
  const network = process.env.NEXT_PUBLIC_NETWORK || 'testnet';
  return network === 'mainnet' ? mantleMainnet : mantleTestnet;
}; 