// Contract addresses configuration for Mantle Network
// Auto-generated from deployment

export const CONTRACT_ADDRESSES = {
  // Mantle Sepolia Testnet
  testnet: {
    MantleArmada: '0xBeCab77F91FFF82A0f6a37cf5D7e04a2e723D6Fc',
    ArmadaToken: '0x76C25bf63B05a286e967857080b230f762e29772',
    ArmadaGuild: '0x1dd10f7d8c5C558A936e62E2ace11F1353dc5a25',
    BattlePass: '0xa3a52de616052408F1F571B52aCAa7609487fc31',
    ShipNFT: '0xB6048f00925E89c6266D041Cc00f232715B59d1a',
  },
  // Mantle Mainnet (placeholder - deploy when ready)
  mainnet: {
    MantleArmada: '',
    ArmadaToken: '',
    ArmadaGuild: '',
    BattlePass: '',
    ShipNFT: '',
  },
} as const;

// Get contract addresses for active network
export function getContractAddresses() {
  const network = (process.env.NEXT_PUBLIC_NETWORK || 'testnet') as 'testnet' | 'mainnet';
  return CONTRACT_ADDRESSES[network];
}

// Network configuration
export const NETWORK_CONFIG = {
  testnet: {
    chainId: 5003,
    name: 'Mantle Sepolia',
    rpcUrl: 'https://rpc.sepolia.mantle.xyz',
    explorerUrl: 'https://sepolia.mantlescan.xyz',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18,
    },
  },
  mainnet: {
    chainId: 5000,
    name: 'Mantle',
    rpcUrl: 'https://rpc.mantle.xyz',
    explorerUrl: 'https://mantlescan.xyz',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18,
    },
  },
} as const;

// Get network config
export function getNetworkConfig() {
  const network = (process.env.NEXT_PUBLIC_NETWORK || 'testnet') as 'testnet' | 'mainnet';
  return NETWORK_CONFIG[network];
}

// Game constants (updated for Mantle)
export const GAME_CONSTANTS = {
  GPM_CYCLE_SECONDS: 10, // 10 seconds on Mantle (was 60 on AVAX)
  BASE_REPAIR_TIME: 5 * 3600, // 5 hours in seconds
  PORT_REPAIR_TIME: 1 * 3600, // 1 hour in seconds
  PORTS: [25, 55, 89] as const,
  MAX_LOCATION: 100,
  MIN_LOCATION: 0,
  DIAMOND_PACKAGES: [
    { mnt: 10, diamonds: 1 },
    { mnt: 45, diamonds: 5 },
    { mnt: 90, diamonds: 10 },
  ] as const,
  GUILD_CREATION_COST: 500, // gold
  BATTLE_PASS_PREMIUM_COST: 100, // ARMADA tokens
  SHIP_NFT_MIN_POWER: 10,
} as const;

// Reward constants
export const REWARDS = {
  ARMADA_PER_BATTLE_WIN: '1', // 1 ARMADA token
  ARMADA_PER_CHECKIN: '1', // 1 ARMADA token
  XP_PER_BATTLE_WIN: 10,
  XP_PER_CHECKIN: 5,
  XP_PER_GPM_CLAIM: 1,
  XP_PER_UPGRADE: 3,
} as const;

// Contract ABIs (simplified - just the functions we need)
export const CONTRACT_ABIS = {
  MantleArmada: [
    'function createAccount(string boatName, bool isPirate, uint256 startLocation)',
    'function accounts(address) view returns (tuple(string boatName, bool isPirate, uint256 gold, uint256 diamonds, uint256 hp, uint256 maxHp, uint256 speed, uint256 attack, uint256 defense, uint256 crew, uint256 maxCrew, uint256 location, uint256 gpm, uint256 lastCheckIn, uint256 checkInStreak, uint256 lastWrecked, uint256 travelEnd, uint256 lastGPMClaim, uint256 repairEnd))',
    'function checkIn()',
    'function claimGPM()',
    'function buyUpgrade(uint256 id)',
    'function attack(address defender)',
    'function batchAttack(address[] defenders)',
    'function travel(uint256 toLocation, bool fast) payable',
    'function repairShip(uint8 repairType)',
    'function completeRepair()',
    'function hireCrew()',
    'function getClaimableGold(address player) view returns (uint256)',
    'function getUpgradeCost(uint256 id, address player) view returns (uint256)',
    'function getRanking(uint256 n) view returns (address[], uint256[])',
    'function getShipsAt(uint256 location) view returns (address[], string[], uint256[])',
    'function getPlayerBattlePower(address player) view returns (uint256)',
  ],
  ArmadaToken: [
    'function balanceOf(address account) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function getTokenInfo() view returns (string, string, uint8, uint256, uint256)',
  ],
  ArmadaGuild: [
    'function createGuild(string name, string logo)',
    'function joinGuild(uint256 guildId)',
    'function leaveGuild()',
    'function claimGuildDividends()',
    'function startGuildWar(uint256 guild2)',
    'function transferLeadership(address newLeader)',
    'function promoteToOfficer(address member)',
    'function getGuild(uint256 guildId) view returns (tuple(string name, address leader, uint256 createdAt, uint256 memberCount, uint256 treasury, bool isActive, uint256 totalBattlesWon, string logo, uint256 level))',
    'function getGuildMembers(uint256 guildId) view returns (tuple(address memberAddress, uint256 joinedAt, uint256 contribution, bool isOfficer, uint256 lastDividendClaim)[])',
    'function getPlayerGuild(address player) view returns (uint256)',
    'function getMemberContribution(address member) view returns (uint256)',
    'function getClaimableDividends(address member) view returns (uint256)',
    'function getTopGuilds(uint256 count) view returns (uint256[], uint256[])',
    'function nextGuildId() view returns (uint256)',
  ],
  BattlePass: [
    'function createPass()',
    'function upgradeToPremium()',
    'function claimLevelReward(uint256 level)',
    'function claimMultipleLevelRewards(uint256[] levels)',
    'function getPlayerPass(address player) view returns (tuple(uint256 season, uint256 level, uint256 experience, bool isPremium, uint256 lastRewardClaimed, uint256 createdAt))',
    'function getPassLevel(uint256 level) view returns (tuple(uint256 experienceRequired, uint256 goldReward, uint256 diamondReward, uint256 armadaReward, string cosmeticReward, bool hasPremiumReward))',
    'function getSeasonInfo() view returns (uint256, uint256, uint256, uint256)',
    'function getUnclaimedRewards(address player) view returns (uint256[], uint256, uint256, uint256)',
    'function hasActivePass(address player) view returns (bool)',
    'function getXPForNextLevel(address player) view returns (uint256)',
    'function currentSeason() view returns (uint256)',
  ],
  ShipNFT: [
    'function mintShipNFT(address owner, uint256 battlePower) returns (uint256)',
    'function claimYield(uint256 tokenId)',
    'function claimMultipleYields(uint256[] tokenIds)',
    'function stakeShip(uint256 tokenId)',
    'function unstakeShip(uint256 tokenId)',
    'function getShipData(uint256 tokenId) view returns (tuple(uint256 tokenId, uint256 battlePower, uint256 yieldRate, uint256 lastYieldClaim, uint256 totalYieldGenerated, uint256 mintedAt, string shipClass, bool isStaked))',
    'function getClaimableYield(uint256 tokenId) view returns (uint256)',
    'function getShipsByOwner(address owner) view returns (uint256[])',
    'function getTotalClaimableYield(address owner) view returns (uint256)',
    'function getShipAPY(uint256 tokenId) view returns (uint256)',
    'function getContractStats() view returns (uint256, uint256, uint256)',
    'function balanceOf(address owner) view returns (uint256)',
  ],
} as const;

// Export types
export type NetworkType = 'testnet' | 'mainnet';
export type ContractName = keyof typeof CONTRACT_ADDRESSES.testnet;

