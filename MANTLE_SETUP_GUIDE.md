# 🚀 Mantle Network Setup Guide

## Phase 1: Network Migration & Setup

This guide will help you deploy your game to Mantle testnet step-by-step.

---

## ✅ Step 1: Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example` if available):

```bash
# Private Key
PRIVATE_KEY=your_private_key_here_without_0x

# Mantle Configuration
MANTLE_RPC_URL_TESTNET=https://rpc.sepolia.mantle.xyz
MANTLE_RPC_URL_MAINNET=https://rpc.mantle.xyz
MANTLE_API_KEY=  # Optional, for contract verification

# Thirdweb (if using)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id

# Network Selection
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CHAIN_ID=5003
```

### 🔑 Getting Your Private Key

**From MetaMask:**
1. Open MetaMask
2. Click three dots → Account details
3. Click "Export Private Key"
4. Enter your password
5. Copy the private key (64 characters, no 0x prefix needed for .env)

**⚠️ SECURITY WARNING:**
- NEVER commit your `.env` file to git
- NEVER share your private key
- Use a test wallet for development
- Add `.env` to `.gitignore` (should already be there)

---

## ✅ Step 2: Get Mantle Testnet Tokens

You need MNT tokens to deploy contracts and pay for gas.

### Method 1: Official Mantle Faucet
1. Visit: https://faucet.sepolia.mantle.xyz
2. Connect your MetaMask wallet
3. Switch to Mantle Sepolia Testnet
4. Request testnet MNT tokens
5. Wait for confirmation (~30 seconds)

### Method 2: Add Mantle Sepolia to MetaMask Manually

**Network Details:**
```
Network Name: Mantle Sepolia Testnet
RPC URL: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Currency Symbol: MNT
Block Explorer: https://sepolia.mantlescan.xyz
```

**Add to MetaMask:**
1. Open MetaMask
2. Click network dropdown → Add Network
3. Enter the details above
4. Save

### Verify You Have Tokens
```bash
# Check your balance
npx hardhat run scripts/check-balance.js --network mantleTestnet
```

---

## ✅ Step 3: Test Hardhat Configuration

Make sure everything is configured correctly:

```bash
# Compile contracts
pnpm compile

# This should compile without errors
```

**Expected output:**
```
Compiled 5 Solidity files successfully
```

---

## ✅ Step 4: Deploy to Mantle Testnet

Now deploy your existing game contract to Mantle:

```bash
# Deploy to Mantle testnet
pnpm deploy:mantle-testnet
```

**Expected output:**
```
Deploying contracts with the account: 0x...
Account balance: 1000000000000000000
SeasOfLinkardia Contract deployed to: 0x...
Contract owner: 0x...
✅ All contracts deployed!
```

### What This Does:
1. Deploys your `SeasOfLinkardia` contract to Mantle testnet
2. Sets up initial ship upgrades
3. Verifies the contract is working
4. Saves the contract address

**📝 Save the contract address!** You'll need it for frontend configuration.

---

## ✅ Step 5: Verify Contract on Block Explorer (Optional)

Verify your contract so others can see the code:

```bash
# Verify contract (replace with your contract address)
pnpm verify:mantle-testnet 0xYourContractAddress
```

**View on Explorer:**
Visit: https://sepolia.mantlescan.xyz/address/YOUR_CONTRACT_ADDRESS

---

## ✅ Step 6: Update Frontend Configuration

Update your frontend to connect to Mantle testnet.

### Update Thirdweb Provider

Find your Thirdweb provider configuration (likely in `app/libs/providers/thirdweb-provider.tsx`):

```typescript
import { defineChain } from "thirdweb";

// Define Mantle Sepolia testnet
export const mantleSepolia = defineChain({
  id: 5003,
  rpc: "https://rpc.sepolia.mantle.xyz",
  nativeCurrency: {
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
  },
});

// In your ThirdwebProvider:
<ThirdwebProvider 
  activeChain={mantleSepolia}
  clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
>
  {children}
</ThirdwebProvider>
```

### Update Contract Address

Update your contract addresses with the deployed address:

```typescript
// In your contract hook or config file
export const GAME_CONTRACT_ADDRESS = "0xYourDeployedAddress";
```

---

## ✅ Step 7: Test Your Game on Mantle

1. **Start the frontend:**
```bash
pnpm dev
```

2. **Open your browser:**
```
http://localhost:3000
```

3. **Connect MetaMask:**
   - Make sure you're on Mantle Sepolia Testnet
   - Connect your wallet
   - You should have MNT tokens

4. **Test basic functions:**
   - Create an account
   - Check your ship stats
   - Try claiming GPM
   - Travel to a location
   - Attack another player (if available)

---

## ✅ Step 8: Verify Everything Works

### Test Checklist:
- [ ] Contract deployed successfully
- [ ] Contract address saved
- [ ] Frontend connects to Mantle testnet
- [ ] Can create account
- [ ] Can view ship stats
- [ ] Can claim GPM (if you have any)
- [ ] Can buy upgrades
- [ ] Can travel between locations
- [ ] MetaMask prompts show MNT (not AVAX)

### Common Issues:

**Issue: "Insufficient funds"**
- Solution: Get more testnet MNT from the faucet

**Issue: "Network mismatch"**
- Solution: Switch MetaMask to Mantle Sepolia (Chain ID: 5003)

**Issue: "Contract not found"**
- Solution: Check that the contract address in your frontend matches the deployed address

**Issue: "Transaction reverts"**
- Solution: Check the error message in MetaMask or block explorer
- Make sure your account has enough MNT for gas

---

## 🎉 Success!

If everything works, you've successfully migrated to Mantle testnet!

**You've completed:**
- ✅ Hardhat configured for Mantle
- ✅ Contract deployed to Mantle testnet
- ✅ Frontend connected to Mantle
- ✅ Basic game functions tested

---

## 📊 Next Steps

Now that your game is on Mantle, you're ready for **Phase 2: Building New Features**

The next steps are:
1. Create ArmadaToken.sol (ERC-20)
2. Create ArmadaGuild.sol (Guild system)
3. Create BattlePass.sol (Progression system)
4. Create ShipNFT.sol (RWA foundation)
5. Update main game contract to integrate everything

---

## 🔗 Useful Links

### Mantle Network:
- **Testnet RPC**: https://rpc.sepolia.mantle.xyz
- **Faucet**: https://faucet.sepolia.mantle.xyz
- **Explorer**: https://sepolia.mantlescan.xyz
- **Docs**: https://docs.mantle.xyz

### Tools:
- **Hardhat**: https://hardhat.org/docs
- **Thirdweb**: https://portal.thirdweb.com
- **OpenZeppelin**: https://docs.openzeppelin.com

### Support:
- **Mantle Discord**: https://discord.gg/mantle
- **GitHub Issues**: https://github.com/mantle-xyz

---

## 📝 Troubleshooting Commands

```bash
# Check your network configuration
npx hardhat networks

# Check account balance
npx hardhat run scripts/check-balance.js --network mantleTestnet

# View deployed contract info
npx hardhat run scripts/contract-info.js --network mantleTestnet

# Clean and recompile
pnpm compile

# Run tests on testnet (careful - costs gas!)
pnpm test --network mantleTestnet
```

---

## 🎯 Current Status

- [x] Phase 1: Network Migration ← **YOU ARE HERE**
- [ ] Phase 2: Smart Contracts Development
- [ ] Phase 3: Contract Deployment
- [ ] Phase 4: Frontend Development
- [ ] Phase 5: Testing & Polish
- [ ] Phase 6: Documentation & Submission

**Let's move to Phase 2 when you're ready! 🚀**

