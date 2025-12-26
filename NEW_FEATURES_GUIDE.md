# 🎮 Mantle Armada: New Features Guide

## 🆕 **What's New on Mantle Network**

Your game now has **4 major new features** that make it competitive for the Mantle Hackathon:

---

## 1. 🪙 **ARMADA Token (ERC-20)**

### **What is it?**
ARMADA is the game's economy token - like V-Bucks in Fortnite or Robux in Roblox.

### **How to Earn ARMADA Tokens:**

| Action | Reward |
|--------|--------|
| **Win a Battle** | 1 ARMADA |
| **Daily Check-in** | 1 ARMADA |
| **Battle Pass Rewards** | Various amounts (5-50 ARMADA) |
| **Ship NFT Yield** | Passive income (0.1-1% APY) |

### **What Can You Do With ARMADA?**

1. **Buy Premium Battle Pass** (100 ARMADA)
2. **Upgrade to Premium Features** (future)
3. **Trade on DEX** (decentralized exchanges)
4. **Governance** (vote on game updates - future)
5. **Staking** (earn multipliers - future)

### **Current Balance:**
You have **1,000,001 ARMADA** (you received 1M as initial supply for testing!)

### **Why It Matters for Hackathon:**
- Creates sustainable token economics
- Shows engagement loops (play → earn → spend → play)
- Aligns with Mantle's "Token Incentive Design" priority

---

## 2. ⚔️ **Guild System**

### **What Are Guilds?**
Guilds are player organizations - like clans in Clash of Clans or guilds in WoW.

### **How to Create a Guild:**

**Cost:** 500 Gold

**Steps to Create:**
```solidity
// Contract call (will be available via UI soon)
createGuild("Your Guild Name", "optional_logo_url")
```

**Via Smart Contract:**
- Open MetaMask
- Connect to Mantle Sepolia
- Call `createGuild()` function on Guild contract: `0x1dd10f7d8c5C558A936e62E2ace11F1353dc5a25`

### **How to Join a Guild:**

**Requirements:**
- Guild leader must invite you
- You must accept invitation

**Steps:**
```solidity
joinGuild(guildId)
```

### **Guild Advantages:**

#### **1. Shared Treasury** 💰
- **10% of all member battle wins** go to guild treasury
- Example: You win 100 gold in battle → 10 gold goes to guild treasury

#### **2. Dividend System** 📈
- Treasury gets distributed proportionally to members
- Your share = (Your contribution / Total contributions) × Treasury
- Claim anytime!

#### **3. Guild Wars** ⚔️
- Weekly competitions between guilds
- Winning guild gets bonus rewards
- Guild levels up based on total member power

#### **4. Social Benefits** 👥
- Chat with guild members (future)
- Coordinate attacks
- Share strategies
- Network effects = more players join your guild

#### **5. Guild Leveling** 📊
- Guilds gain XP from member activities
- Higher level = better bonuses
- Unlock special perks

### **Guild Stats:**
- **Members:** Up to 50 members per guild
- **Treasury:** Shared gold pool
- **Level:** Based on total activity
- **Rank:** Compete on global leaderboard

### **Why It Matters for Hackathon:**
- **Network Effects:** Players invite friends to join guild (viral growth)
- **Social Layer:** Addresses "GameFi & Social" track
- **Retention:** Players stay for their guildmates
- **Competition:** Guild wars create ongoing content

---

## 3. 🎖️ **Battle Pass System**

### **What is Battle Pass?**
A seasonal progression system like Fortnite's Battle Pass - play to unlock rewards!

### **How It Works:**

#### **Seasons:**
- **Duration:** 90 days per season
- **Levels:** 100 levels total (0-99)
- **Tiers:** Free + Premium

#### **How to Get XP:**

| Action | XP Gained |
|--------|-----------|
| **Win Battle** | 10 XP |
| **Daily Check-in** | 5 XP |
| **Claim GPM** | 1 XP |
| **Complete Quests** | Variable (future) |

#### **Level Up Requirements:**
- Level 1: 100 XP
- Level 2: 200 XP
- Level 3: 300 XP
- ... (increases by 100 XP per level)
- Level 99: 10,000 XP

### **Free vs Premium:**

| Feature | Free Tier | Premium Tier |
|---------|-----------|--------------|
| **Cost** | FREE | 100 ARMADA |
| **Rewards** | Basic rewards | 50% MORE rewards |
| **Gold** | 100-500 per level | 150-750 per level |
| **ARMADA** | 1-5 per level | 2-10 per level |
| **Diamonds** | 0-1 (rare) | 1-2 per level |
| **Cosmetics** | Basic only | Exclusive items |

### **How to Create Your Battle Pass:**

**Steps:**
1. Call `createPass()` function (free)
2. You're now enrolled in current season
3. Earn XP by playing
4. Claim rewards when you level up

### **How to Upgrade to Premium:**

**Cost:** 100 ARMADA tokens

```solidity
upgradeToPremium()
```

**Benefits:**
- Retroactive! Get all premium rewards from previous levels
- 50% more rewards on all future levels
- Exclusive cosmetics

### **Claiming Rewards:**

**Single Level:**
```solidity
claimLevelReward(level)
```

**Multiple Levels:**
```solidity
claimMultipleLevelRewards([5, 6, 7, 8, 9])
```

### **Example Progression:**

**Day 1:**
- 3 battles won = 30 XP
- 1 check-in = 5 XP
- 2 GPM claims = 2 XP
- **Total: 37 XP** = No level up yet (need 100)

**Day 2:**
- +63 XP → Level 1! 🎉
- Claim reward: 100 gold + 1 ARMADA

**Day 10:**
- Level 5 reached
- Claim rewards: 500 gold + 5 ARMADA + cosmetic

### **Why It Matters for Hackathon:**
- **Retention:** Daily login habits (proven by Fortnite)
- **Engagement:** Players have goals to work towards
- **Monetization:** Premium pass (using ARMADA)
- **Seasons:** Content resets keep game fresh

---

## 4. 🚢 **Ship NFTs (Yield-Bearing Assets)**

### **What Are Ship NFTs?**
Your ship can become an **ERC-721 NFT** that generates **passive ARMADA income**!

### **How to Mint a Ship NFT:**

**Requirements:**
- Battle Power > 10 (Attack + Defense + Speed)
- You currently have: Power = 3 (need 7 more)

**Steps:**
1. Upgrade your ship until power > 10
2. Call `mintShipNFT()` function
3. Your ship stats get locked as an NFT
4. NFT starts generating passive yield!

**Current Requirements:**
```
Your Power: 3 (Atk: 1, Def: 1, Speed: 1)
Required: 10+
Solution: Buy 7+ total stat upgrades
```

### **Yield System:**

#### **APY (Annual Percentage Yield):**

Based on battle power:

| Battle Power | APY | Daily Yield (approx) |
|--------------|-----|---------------------|
| 10-25 | 0.1% | ~0.003 ARMADA/day |
| 26-50 | 0.25% | ~0.007 ARMADA/day |
| 51-100 | 0.5% | ~0.014 ARMADA/day |
| 100+ | 1.0% | ~0.027 ARMADA/day |

#### **Example:**
- Your ship power: 50
- NFT minted
- Base yield: 0.25% APY
- After 1 year: +0.25% ARMADA tokens

### **Enhanced Yield (Staking):**

**2x Multiplier:**
- Stake your ship NFT
- Can't transfer while staked
- Get 2x yield!

**Example:**
- Normal: 0.25% APY
- Staked: 0.5% APY

### **How to Claim Yield:**

**Single Ship:**
```solidity
claimYield(shipTokenId)
```

**All Ships:**
```solidity
claimMultipleYields([1, 2, 3])
```

### **Trading Ship NFTs:**

**Why Trade?**
- Ship NFTs are **tradeable on secondary markets**
- High-power ships = valuable assets
- Create a marketplace for ships

**Future Features:**
- List ship for sale
- Auction ships
- Fractional ownership (own % of a ship)

### **Ship Classes:**

Based on power level:

| Class | Power Range | Rarity |
|-------|-------------|--------|
| **Sloop** | 10-25 | Common |
| **Brigantine** | 26-50 | Uncommon |
| **Frigate** | 51-100 | Rare |
| **Man-of-War** | 100+ | Legendary |

### **Why This is HUGE for Hackathon:** 🔥

#### **RWA (Real-World Assets) Positioning:**
- Ships are **yield-bearing assets**
- Foundation for **bond issuance**
- Can be **collateralized** for loans
- Shows path from GameFi → RealFi

#### **Addresses Mantle's #1 Priority:**
- RWA/RealFi track (TOP PRIORITY)
- Shows vision beyond just gaming
- Demonstrates DeFi composability

#### **Future Roadmap:**
1. **Phase 1:** Ship NFTs with yield ✅ (Done!)
2. **Phase 2:** Ship bonds (future)
3. **Phase 3:** Fractional ownership (future)
4. **Phase 4:** KYC/AML compliance (future)
5. **Phase 5:** Integration with lending protocols (future)

---

## ❓ **ZK (Zero-Knowledge) Features**

### **Current Status:** NOT IMPLEMENTED

ZK features were planned but **not built** in the current version for time constraints.

### **What Was Planned:**

#### **1. Private Ship Stats** 🔒
- Hide your attack/defense from enemies
- Reveal only during combat
- Uses ZK proofs to verify stats without revealing them

#### **2. Selective Disclosure** 👁️
- Choose what stats to reveal
- Example: Show HP but hide Attack
- Useful for strategic gameplay

#### **3. ZK Matchmaking** 🎯
- Prove you're in certain power tier
- Without revealing exact stats
- Fair matchmaking

#### **4. Guild Treasury Privacy** 💰
- Hide guild wealth from competitors
- Verify treasury exists without showing amount

### **Why Not Implemented?**

**Priority Focus:**
- Guild system = Higher priority (network effects)
- RWA positioning = Critical for hackathon
- Battle Pass = Retention mechanism
- Time constraints

**Complexity:**
- ZK circuits require significant development
- Would need ZK library integration
- Testing complexity increases

### **Should We Add It?**

**Pros:**
- Addresses "ZK & Privacy" track
- Unique differentiator
- Shows technical sophistication

**Cons:**
- 2-3 days of development
- Adds complexity
- May not be essential for winning

**Recommendation:**
- **Focus on current features first**
- Add ZK if you have extra time (optional)
- Current features already cover 3 tracks:
  1. ✅ GameFi & Social (Guild)
  2. ✅ RWA / RealFi (Ship NFTs)
  3. ✅ Infrastructure (Mantle optimizations)

---

## 🎯 **Quick Action Guide**

### **What You Should Do First:**

#### **1. Earn ARMADA Tokens** (Easy)
- Win battles: +1 ARMADA each
- Daily check-in: +1 ARMADA

#### **2. Create Battle Pass** (Free)
- Call `createPass()` function
- Start earning XP
- Claim rewards as you level up

#### **3. Upgrade Your Ship** (Important)
- Buy 7+ total stat upgrades
- Get battle power > 10
- Then mint Ship NFT

#### **4. Consider Creating a Guild** (500 gold)
- If you have 500 gold
- Create guild
- Invite friends
- Start earning guild dividends

### **Long-term Strategy:**

**Week 1:**
- Earn ARMADA from battles
- Create Battle Pass
- Upgrade ship to power 10+

**Week 2:**
- Mint Ship NFT
- Start earning passive yield
- Create or join guild

**Week 3:**
- Upgrade to Premium Battle Pass (100 ARMADA)
- Level up Battle Pass to 10+
- Grow guild membership

**Month 1:**
- Ship NFT generating daily yield
- Guild treasury growing
- Battle Pass level 30+
- Multiple revenue streams!

---

## 📊 **Feature Comparison**

| Feature | Old Game | New Game (Mantle) |
|---------|----------|-------------------|
| **Network** | Avalanche | Mantle |
| **GPM Cycle** | 60 seconds | 10 seconds ⚡ |
| **Token** | None | ARMADA (ERC-20) |
| **Social** | None | Guild System |
| **Progression** | Linear | Battle Pass |
| **Assets** | In-game only | NFTs (tradeable) |
| **Yield** | None | Passive income |
| **Tracks Covered** | 1 (GameFi) | 3 (GameFi, RWA, Infrastructure) |

---

## 🔗 **Contract Addresses (Mantle Sepolia)**

All features are **LIVE** on Mantle Sepolia Testnet:

```
Main Game:    0xBeCab77F91FFF82A0f6a37cf5D7e04a2e723D6Fc
ARMADA Token: 0x76C25bf63B05a286e967857080b230f762e29772
Guild:        0x1dd10f7d8c5C558A936e62E2ace11F1353dc5a25
Battle Pass:  0xa3a52de616052408F1F571B52aCAa7609487fc31
Ship NFT:     0xB6048f00925E89c6266D041Cc00f232715B59d1a
```

**Explorers:**
- [Main Game](https://sepolia.mantlescan.xyz/address/0xBeCab77F91FFF82A0f6a37cf5D7e04a2e723D6Fc)
- [ARMADA Token](https://sepolia.mantlescan.xyz/address/0x76C25bf63B05a286e967857080b230f762e29772)
- [Guild](https://sepolia.mantlescan.xyz/address/0x1dd10f7d8c5C558A936e62E2ace11F1353dc5a25)
- [Battle Pass](https://sepolia.mantlescan.xyz/address/0xa3a52de616052408F1F571B52aCAa7609487fc31)
- [Ship NFT](https://sepolia.mantlescan.xyz/address/0xB6048f00925E89c6266D041Cc00f232715B59d1a)

---

## 🎉 **Summary**

You now have a **complete ecosystem** that addresses **3 hackathon tracks**:

1. ✅ **GameFi & Social** - Guild system with network effects
2. ✅ **RWA / RealFi** - Yield-bearing Ship NFTs
3. ✅ **Infrastructure** - Mantle-optimized (10-sec GPM)

**All features are deployed and working!** 🚀

The UI integration is minimal (compact dashboard), but the **smart contracts are fully functional** and ready for the hackathon!

---

**Next Steps:**
1. Play the game and test features
2. Upgrade ship to power 10+ to mint NFT
3. Create Battle Pass and start earning XP
4. Consider creating a guild (500 gold)
5. Earn ARMADA tokens through gameplay!
