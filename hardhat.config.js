require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");
require("dotenv").config();

// Load environment variables or provide defaults
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY || "";
const MANTLE_API_KEY = process.env.MANTLE_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200  // Balance between size and gas efficiency
      },
      viaIR: true  // Enable IR compilation to fix "Stack too deep" errors
    }
  },
  networks: {
    // Local development network
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
      mining: {
        auto: true,
        interval: 5000
      }
    },
    // Local test network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    // Avalanche Fuji Testnet
    avalancheFuji: {
      chainId: 43113,
      url: process.env.AVALANCHE_RPC_URL_TESTNET || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: PRIVATE_KEY !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? [PRIVATE_KEY] : [],
    },
    // Avalanche Mainnet
    avalancheMainnet: {
      chainId: 43114,
      url: process.env.AVALANCHE_RPC_URL_MAINNET || "https://api.avax.network/ext/bc/C/rpc",
      accounts: PRIVATE_KEY !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? [PRIVATE_KEY] : [],
    },
    // Mantle Sepolia Testnet
    mantleTestnet: {
      chainId: 5003,
      url: process.env.MANTLE_RPC_URL_TESTNET || "https://rpc.sepolia.mantle.xyz",
      accounts: PRIVATE_KEY !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? [PRIVATE_KEY] : [],
      gasPrice: 100000000, // 0.1 gwei (very low for Mantle)
    },
    // Mantle Mainnet
    mantleMainnet: {
      chainId: 5000,
      url: process.env.MANTLE_RPC_URL_MAINNET || "https://rpc.mantle.xyz",
      accounts: PRIVATE_KEY !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? [PRIVATE_KEY] : [],
      gasPrice: 100000000, // 0.1 gwei (very low for Mantle)
    }
  },
  // Contract verification settings
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
      mantleTestnet: MANTLE_API_KEY,
      mantleMainnet: MANTLE_API_KEY,
    },
    customChains: [
      {
        network: "avalancheFujiTestnet",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io"
        }
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://snowtrace.io"
        }
      },
      {
        network: "mantleTestnet",
        chainId: 5003,
        urls: {
          apiURL: "https://api-sepolia.mantlescan.xyz/api",
          browserURL: "https://sepolia.mantlescan.xyz"
        }
      },
      {
        network: "mantleMainnet",
        chainId: 5000,
        urls: {
          apiURL: "https://api.mantlescan.xyz/api",
          browserURL: "https://mantlescan.xyz"
        }
      }
    ]
  },
  // Gas reporting for optimization
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    token: "MNT", // Changed from AVAX to MNT for Mantle
    gasPriceApi: "https://api.mantlescan.xyz/api?module=proxy&action=eth_gasPrice"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
    alwaysGenerateOverloads: false,
    externalArtifacts: ["node_modules/@openzeppelin/contracts/build/contracts/*.json"],
    dontOverrideCompile: false
  },
  mocha: {
    timeout: 40000
  }
};