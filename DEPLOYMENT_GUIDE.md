# 🚀 Seven Seas Protocol: Deployment Guide

## ✅ Prerequisites Completed

- [x] Hardhat configured for Mantle
- [x] All contracts created and compiled
- [x] Deployment scripts ready
- [x] Test scripts ready

---

## 🔑 Step 1: Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# Private Key (WITHOUT 0x prefix)
PRIVATE_KEY=a6c1193992335ec11636ad80ba8149a63e656f4073b7436b2612ff22a29c2281

# Mantle Configuration
MANTLE_RPC_URL_TESTNET=https://rpc.sepolia.mantle.xyz
MANTLE_RPC_URL_MAINNET=https://rpc.mantle.xyz
MANTLE_API_KEY=  # Optional - for contract verification

# Thirdweb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=60b7be2e0e51fae98a8a170846ae0437
THIRDWEB_SECRET_KEY=HBy50XaRHFwboGPvzuR9PuTqoPWPTuPEHmsryiUAZbdylt5DGBVcu256XTZyx7Ja373Cud5e0xtnoVU2j0G3Mw

# Network Selection
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CHAIN_ID=5003
```

**⚠️ IMPORTANT:** Never commit the `.env` file to GitHub!

---

## 💰 Step 2: Get Mantle Testnet Tokens

1. Visit the Mantle faucet: https://faucet.sepolia.mantle.xyz
2. Connect your MetaMask wallet
3. Make sure you're on Mantle Sepolia Testnet (Chain ID: 5003)
4. Request testnet MNT tokens
5. Wait for confirmation (~30 seconds)

**Check your balance:**
```bash
pnpm run check-balance --network mantleTestnet
```

You should see something like:
```
Network: mantleTestnet
Account: 0x...
Balance: 1.0 tokens
```

---

## 🚀 Step 3: Deploy All Contracts

Run the complete deployment script:

```bash
npx hardhat run scripts/deploy-mantle-full.js --network mantleTestnet
```

**What this does:**
1. Deploys ArmadaToken (ERC-20)
2. Deploys ArmadaGuild
3. Deploys BattlePass
4. Deploys ShipNFT (ERC-721)
5. Deploys MantleArmada (main game)
6. Sets up all permissions
7. Links all contracts together
8. Initializes game with upgrades
9. Saves contract addresses to `deployed-addresses-mantleTestnet.json`

**Expected output:**
```
🚀 Starting Seven Seas Protocol Complete Deployment...

Deploying contracts with account: 0x...
Account balance: 1.0 MNT

📦 [1/5] Deploying ArmadaToken...
✅ ArmadaToken deployed to: 0x...

📦 [2/5] Deploying ArmadaGuild...
✅ ArmadaGuild deployed to: 0x...

... (continues with all 5 contracts)

⚙️  Configuring contracts and permissions...
   [1/7] Setting ecosystem contracts in MantleArmada...
   ✅ Ecosystem contracts linked
   
... (continues with all configurations)

🎮 Initializing game with default upgrades...
   ✅ Added: Hull Reinforcement (50 gold)
   ✅ Added: Crew Training (100 gold)
   ... (5 upgrades total)

🎉 DEPLOYMENT COMPLETE!

📋 CONTRACT ADDRESSES:
ArmadaToken     : 0x...
ArmadaGuild     : 0x...
BattlePass      : 0x...
ShipNFT         : 0x...
MantleArmada    : 0x...
```

**If deployment fails:**
- Check you have enough MNT tokens
- Make sure PRIVATE_KEY is correct in .env
- Check network connection
- Try again (deployment is idempotent)

---

## 🧪 Step 4: Test Deployment

Verify everything is working:

```bash
npx hardhat run scripts/test-deployment.js --network mantleTestnet
```

**Expected output:**
```
🧪 Testing Seven Seas Protocol Deployment...

TEST 1: Token Configuration
✅ Token Name: Armada Token
✅ Token Symbol: ARMADA
✅ Total Supply: 1000000.0 ARMADA
✅ MantleArmada is minter: true
✅ BattlePass is minter: true
✅ ShipNFT is minter: true

... (all tests pass)

🎉 ALL TESTS COMPLETED!
📊 DEPLOYMENT STATUS: ✅ READY FOR USE
```

---

## 🎮 Step 5: Create Test Account

Open Hardhat console:

```bash
npx hardhat console --network mantleTestnet
```

Create a test account:

```javascript
// Load contract
const addresses = require('./deployed-addresses-mantleTestnet.json');
const game = await ethers.getContractAt("MantleArmada", addresses.MantleArmada);

// Create account
const tx = await game.createAccount("TestShip", false, 50);
await tx.wait();

// Check account
const account = await game.accounts((await ethers.getSigners())[0].address);
console.log("Boat Name:", account.boatName);
console.log("Gold:", account.gold.toString());
console.log("HP:", account.hp.toString(), "/", account.maxHp.toString());
```

---

## 🔍 Step 6: Verify Contracts on Explorer

Visit Mantle Sepolia Explorer:
https://sepolia.mantlescan.xyz/address/YOUR_CONTRACT_ADDRESS

**Manual verification** (if auto-verify doesn't work):
1. Go to the contract page
2. Click "Contract" tab
3. Click "Verify and Publish"
4. Select:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: 0.8.24
   - License: MIT
5. Copy-paste the contract code
6. Submit

---

## 📝 Step 7: Update Frontend Environment

Copy contract addresses to your frontend `.env.local`:

```bash
# Copy from deployed-addresses-mantleTestnet.json
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARMADA_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_GUILD_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_BATTLE_PASS_ADDRESS=0x...
NEXT_PUBLIC_SHIP_NFT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=5003
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=60b7be2e0e51fae98a8a170846ae0437
```

---

## 🎯 Deployed Contracts Overview

### 1. **ArmadaToken** (ERC-20)
- Symbol: ARMADA
- Initial Supply: 1,000,000 tokens
- Earned through gameplay
- Used for premium features

### 2. **ArmadaGuild**
- Create/join guilds
- Guild treasury (10% of battle wins)
- Guild wars
- Dividend distribution

### 3. **BattlePass**
- 90-day seasons
- 100 levels
- Free + Premium tiers
- Rewards: gold, diamonds, ARMADA

### 4. **ShipNFT** (ERC-721)
- Yield-bearing ships
- 0.1-1% APY based on power
- Tradeable on secondary markets
- RWA foundation

### 5. **MantleArmada** (Main Game)
- All original gameplay
- 10-second GPM cycles (optimized for Mantle)
- Batch operations
- Integrated with all ecosystem contracts

---

## 🚨 Troubleshooting

### Error: "Insufficient funds"
**Solution:** Get more testnet MNT from faucet

### Error: "Network mismatch"
**Solution:** Make sure MetaMask is on Mantle Sepolia (Chain ID: 5003)

### Error: "Transaction reverted"
**Solution:** Check gas settings, may need to increase gas limit

### Error: "Contract not found"
**Solution:** Verify deployment completed successfully, check contract addresses

### Error: "Nonce too high"
**Solution:** Reset MetaMask account (Settings → Advanced → Clear activity data)

---

## 📊 What to Test

### Basic Gameplay:
- [ ] Create account
- [ ] Check in daily
- [ ] Claim GPM
- [ ] Buy upgrades
- [ ] Travel to locations
- [ ] Attack other players

### New Features:
- [ ] Create a guild (costs 500 gold)
- [ ] Join a guild
- [ ] Earn battle rewards → guild treasury
- [ ] Claim guild dividends
- [ ] Check battle pass XP
- [ ] Claim battle pass rewards
- [ ] Check ARMADA token balance
- [ ] Mint ship NFT (when power > 10)
- [ ] Claim ship NFT yield

---

## 🎉 Success Criteria

Your deployment is successful if:
- ✅ All 5 contracts deployed
- ✅ All tests pass
- ✅ Can create account
- ✅ Can perform basic actions
- ✅ ARMADA tokens minted on actions
- ✅ XP gained on actions
- ✅ Can create/join guilds
- ✅ Contracts visible on explorer

---

## 📞 Next Steps After Deployment

1. **Update Frontend:**
   - Add contract addresses to .env
   - Update contract ABIs
   - Test frontend connection
   - Deploy frontend to Vercel

2. **Create Content:**
   - Record demo video (5 minutes)
   - Create pitch deck (15 slides)
   - Write documentation
   - Prepare for hackathon submission

3. **Get Test Users:**
   - Share with friends
   - Create test guilds
   - Get battle metrics
   - Generate leaderboard data

4. **Monitor & Improve:**
   - Track contract interactions
   - Monitor gas usage
   - Fix any bugs
   - Gather user feedback

---

## 🏆 You're Ready for the Hackathon!

With all contracts deployed and tested on Mantle testnet, you now have:

✅ **GameFi & Social Track**: Guild system with network effects  
✅ **RWA/RealFi Track**: Yield-bearing ship NFTs  
✅ **Infrastructure Track**: Optimized for Mantle's speed  
✅ **Complete Ecosystem**: All contracts integrated  
✅ **Professional Code**: Security best practices  
✅ **Clear Vision**: RWA roadmap included  

**Good luck with the hackathon! 🚀**

---

## 📱 Quick Reference Commands

```bash
# Check balance
npx hardhat run scripts/check-balance.js --network mantleTestnet

# Deploy all contracts
npx hardhat run scripts/deploy-mantle-full.js --network mantleTestnet

# Test deployment
npx hardhat run scripts/test-deployment.js --network mantleTestnet

# Open console
npx hardhat console --network mantleTestnet

# Verify contract
npx hardhat verify --network mantleTestnet CONTRACT_ADDRESS

# Run frontend
pnpm dev
```

---

**Deployment Guide Version**: 1.0  
**Last Updated**: Current session  
**Target**: Mantle Global Hackathon 2025

