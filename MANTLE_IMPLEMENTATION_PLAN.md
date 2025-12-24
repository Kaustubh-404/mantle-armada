# 🚢 AVAX Armada → Mantle: Complete Implementation Plan

## 🎯 Mission: Deploy Fully Functional Game on Mantle Testnet

**Timeline**: 7-10 days for complete implementation
**Goal**: Hackathon-winning submission with all features working on Mantle testnet

---

## 📋 Development Phases

### **PHASE 1: Network Migration & Core Setup** (Days 1-2)
**Status**: Ready to start
**Effort**: 4-6 hours

#### Tasks:
1. ✅ Configure Mantle testnet in Hardhat
2. ✅ Update deployment scripts for Mantle
3. ✅ Update frontend configuration for Mantle
4. ✅ Get Mantle testnet tokens from faucet
5. ✅ Test basic deployment on testnet

**Deliverables**:
- Mantle testnet configuration working
- Existing game contract deployed on Mantle testnet
- Frontend connected to Mantle testnet

---

### **PHASE 2: Smart Contracts Development** (Days 2-5)
**Status**: Pending Phase 1
**Effort**: 3-4 days

#### 2.1: $ARMADA Token Contract (4 hours)
**File**: `contracts/ArmadaToken.sol`

**Features**:
- ERC-20 standard token
- Mintable by authorized contracts (game, guild, battle pass)
- Initial supply: 1M tokens
- Owner can add/remove minters

**Integration Points**:
- Minted when players win battles
- Minted from battle pass rewards
- Used for premium features
- Staking for bonuses (future)

---

#### 2.2: Guild System Contract (8 hours)
**File**: `contracts/ArmadaGuild.sol`

**Features**:
- Create guild (500 gold cost)
- Join guild (invitation-based)
- Guild treasury (receives 10% of member battle wins)
- Claim guild dividends (proportional to contribution)
- Guild wars (weekly competitions)
- Guild leaderboards

**Integration Points**:
- Connects to main game contract
- Receives battle rewards automatically
- Distributes rewards to members

---

#### 2.3: Battle Pass Contract (8 hours)
**File**: `contracts/BattlePass.sol`

**Features**:
- Seasonal system (90-day seasons)
- 100 levels per season
- XP tracking (battles, check-ins, GPM claims)
- Free + Premium tiers (100 $ARMADA)
- Rewards: gold, diamonds, $ARMADA, cosmetics
- Auto-level up on XP gain

**Integration Points**:
- Game contract calls gainExperience()
- Players claim rewards by level
- Season resets

---

#### 2.4: Ship NFT Contract (6 hours)
**File**: `contracts/ShipNFT.sol`

**Features**:
- ERC-721 NFTs representing ships
- Yield-bearing (0.1-1% APY based on power)
- Battle power tracking
- Yield claiming mechanism
- Tradeable on secondary markets

**Integration Points**:
- Minted when player reaches certain level
- Generates passive $ARMADA income
- Foundation for RWA features

---

#### 2.5: Main Game Contract Updates (8 hours)
**File**: `contracts/MantleArmada.sol` (renamed from AvaxArmada)

**Updates Required**:
1. **Mantle Optimizations**:
   - Change GPM from 60-second to 10-second cycles
   - Add batch attack function
   - Optimize gas usage
   - Remove AVAX-specific code

2. **Integration with New Contracts**:
   - Store references to guild, token, battle pass contracts
   - Emit $ARMADA tokens on battle wins
   - Call battle pass XP gain on actions
   - Update guild treasury on battle wins

3. **New Events**:
   - Enhanced event emissions for analytics
   - Guild-related events
   - Token minting events
   - Battle pass XP events

---

#### 2.6: ZK Privacy Contract (6 hours) - OPTIONAL
**File**: `contracts/ZKShipStats.sol`

**Features**:
- Commit-reveal scheme for ship stats
- Private stat storage
- ZK proof verification (simplified)
- Selective disclosure during combat

**Why Include**:
- Addresses ZK & Privacy track
- Unique differentiator
- Shows technical sophistication

---

### **PHASE 3: Smart Contract Deployment** (Day 5)
**Status**: Pending Phase 2
**Effort**: 2-3 hours

#### Deployment Order:
```bash
1. Deploy ArmadaToken.sol
2. Deploy ArmadaGuild.sol (with game contract address)
3. Deploy BattlePass.sol (with token address)
4. Deploy ShipNFT.sol (with token address)
5. Deploy MantleArmada.sol (main game - with all contract addresses)
6. Set up permissions (add minters, etc.)
7. Initialize game data (upgrades, etc.)
8. Verify all contracts on explorer
```

#### Post-Deployment:
- Test all contract interactions
- Verify contract addresses
- Update frontend environment variables
- Create test accounts
- Run integration tests

---

### **PHASE 4: Frontend Development** (Days 6-8)
**Status**: Pending Phase 3
**Effort**: 2-3 days

#### 4.1: Guild System UI (8 hours)
**Files**: 
- `app/components/GuildHub.tsx`
- `app/components/GuildCard.tsx`
- `app/components/GuildLeaderboard.tsx`
- `app/components/GuildWarsPanel.tsx`

**Features**:
- Create guild modal
- Join guild interface
- Guild member list
- Treasury display and dividend claiming
- Guild wars visualization
- Guild chat (on-chain messages)

---

#### 4.2: Battle Pass UI (6 hours)
**Files**:
- `app/components/BattlePassPanel.tsx`
- `app/components/BattlePassLevel.tsx`
- `app/components/SeasonTracker.tsx`

**Features**:
- Season progress bar
- Level progression display
- XP tracking
- Reward claiming interface
- Free vs Premium comparison
- Season countdown timer

---

#### 4.3: Ship NFT UI (4 hours)
**Files**:
- `app/components/ShipNFTCard.tsx`
- `app/components/NFTMarketplace.tsx`
- `app/components/YieldDashboard.tsx`

**Features**:
- Ship NFT minting interface
- Yield display and claiming
- NFT gallery
- Marketplace integration (basic)
- Power level visualization

---

#### 4.4: Token Integration (4 hours)
**Files**:
- `app/components/ArmadaTokenDisplay.tsx`
- `app/components/TokenStaking.tsx` (future)
- Update existing components to show $ARMADA

**Features**:
- Token balance display
- Token transaction history
- Minting notifications
- Token use cases UI

---

#### 4.5: Analytics Dashboard (4 hours)
**Files**:
- `app/components/AnalyticsDashboard.tsx`
- `app/api/analytics/route.ts`

**Features**:
- Daily Active Users (DAU)
- Total battles fought
- Guilds created
- $ARMADA minted
- Battle pass participants
- Real-time stats

---

### **PHASE 5: Testing & Polish** (Days 8-9)
**Status**: Pending Phase 4
**Effort**: 1-2 days

#### Testing Checklist:
- [ ] Create 5-10 test accounts
- [ ] Test complete user flow (create account → join guild → battle → earn XP)
- [ ] Test all guild functions (create, join, treasury, wars)
- [ ] Test battle pass progression
- [ ] Test ship NFT minting and yield
- [ ] Test $ARMADA token minting and transfers
- [ ] Test edge cases (wrecked ships, guild leaving, etc.)
- [ ] Performance testing (batch operations)
- [ ] Mobile responsiveness
- [ ] Browser compatibility

#### Bug Fixes & Polish:
- Fix any bugs discovered
- Improve UI/UX based on testing
- Add loading states
- Add error handling
- Improve animations
- Add sound effects (optional)

---

### **PHASE 6: Documentation & Submission** (Day 10)
**Status**: Final phase
**Effort**: 6-8 hours

#### Documentation:
1. **README.md Update**:
   - Mantle-specific instructions
   - New features documentation
   - Guild system guide
   - Battle pass guide
   - RWA roadmap reference

2. **Technical Documentation**:
   - Contract architecture diagram
   - Function documentation
   - Integration guide
   - API documentation

3. **User Guide**:
   - How to play
   - Guild guide
   - Battle pass guide
   - Token economics

#### Submission Materials:
1. **Demo Video** (5 minutes):
   - Game overview
   - Guild system demo
   - Battle pass progression
   - Ship NFTs and yield
   - RWA vision
   - Why Mantle?

2. **Pitch Deck** (15 slides):
   - Problem statement
   - Solution overview
   - Technical architecture
   - Mantle integration benefits
   - RWA roadmap
   - Market opportunity
   - Team & vision
   - Metrics & traction

3. **GitHub Repository**:
   - Clean, organized code
   - Comprehensive README
   - All documentation
   - Contract addresses
   - Deployment instructions

---

## 🛠️ Technical Stack

### Smart Contracts:
- Solidity ^0.8.24
- OpenZeppelin Contracts v5.0
- Hardhat development environment
- Mantle testnet deployment

### Frontend:
- Next.js 15.3.2
- React 19
- TypeScript
- Thirdweb SDK v5
- Viem for contract interactions
- TailwindCSS for styling
- PixiJS for game graphics

### Testing:
- Hardhat tests
- Integration tests
- Manual testing on testnet

---

## 📊 Success Metrics

### Technical Metrics:
- ✅ All contracts deployed on Mantle testnet
- ✅ All features functional
- ✅ Gas optimization (10-sec GPM working)
- ✅ Zero critical bugs
- ✅ Mobile responsive

### User Metrics (for judges):
- Target: 50+ test users
- Target: 10+ guilds created
- Target: 100+ battles fought
- Target: 500+ $ARMADA minted
- Target: 20+ battle pass participants

### Submission Quality:
- ✅ Professional demo video
- ✅ Comprehensive documentation
- ✅ Clean, auditable code
- ✅ RWA roadmap included
- ✅ Analytics dashboard showing traction

---

## 🚀 Quick Start Commands

### Phase 1: Setup
```bash
# Update Hardhat config for Mantle
# Get testnet tokens from faucet
# Deploy existing contract to test
pnpm deploy:mantle-testnet
```

### Phase 2: Development
```bash
# Compile all contracts
pnpm compile

# Generate TypeScript types
pnpm generate-types

# Run tests
pnpm test
```

### Phase 3: Deployment
```bash
# Deploy all contracts in order
pnpm deploy:mantle-testnet

# Verify contracts
pnpm verify:mantle-testnet
```

### Phase 4: Frontend
```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Deploy to Vercel
vercel deploy
```

---

## 📝 Daily Progress Tracker

### Day 1: ✅ Network Migration
- [ ] Mantle config complete
- [ ] Testnet tokens acquired
- [ ] Basic deployment tested
- [ ] Frontend connected

### Day 2-3: 🔨 Token & Guild Contracts
- [ ] ArmadaToken.sol deployed
- [ ] ArmadaGuild.sol deployed
- [ ] Integration tested
- [ ] Events working

### Day 4-5: 🎮 Battle Pass & NFTs
- [ ] BattlePass.sol deployed
- [ ] ShipNFT.sol deployed
- [ ] Main contract updated
- [ ] All contracts integrated

### Day 6-7: 🎨 Frontend Development
- [ ] Guild UI complete
- [ ] Battle pass UI complete
- [ ] NFT UI complete
- [ ] All integrated and working

### Day 8: 🧪 Testing
- [ ] 10+ test users onboarded
- [ ] All features tested
- [ ] Bugs fixed
- [ ] Polish complete

### Day 9: 📚 Documentation
- [ ] README updated
- [ ] Technical docs complete
- [ ] User guide written
- [ ] RWA roadmap polished

### Day 10: 🎬 Submission
- [ ] Demo video recorded
- [ ] Pitch deck created
- [ ] GitHub cleaned up
- [ ] Submission sent

---

## 🎯 Priority Features for Hackathon Win

### MUST HAVE (Critical):
1. ✅ Guild system working
2. ✅ $ARMADA token minting
3. ✅ Battle pass functional
4. ✅ Deployed on Mantle testnet
5. ✅ Basic UI for all features

### SHOULD HAVE (Important):
1. ✅ Ship NFTs with yield
2. ✅ RWA roadmap document
3. ✅ Analytics dashboard
4. ✅ 50+ test users
5. ✅ Professional demo video

### NICE TO HAVE (Bonus):
1. ⭐ ZK privacy features
2. ⭐ Guild chat system
3. ⭐ Advanced cosmetics
4. ⭐ Tournament system
5. ⭐ Cross-chain vision

---

## 🔗 Important Links

### Mantle Network:
- **Testnet RPC**: https://rpc.sepolia.mantle.xyz
- **Mainnet RPC**: https://rpc.mantle.xyz
- **Faucet**: https://faucet.sepolia.mantle.xyz
- **Explorer**: https://sepolia.mantlescan.xyz
- **Docs**: https://docs.mantle.xyz

### Development Resources:
- **Thirdweb**: https://thirdweb.com/mantle
- **OpenZeppelin**: https://docs.openzeppelin.com/contracts
- **Hardhat**: https://hardhat.org/docs

### Hackathon:
- **Mantle Hackathon Page**: https://www.mantle.xyz/hackathon
- **Submission Portal**: TBD
- **Discord**: https://discord.gg/mantle

---

## ✅ Pre-Launch Checklist

### Technical:
- [ ] All contracts deployed and verified
- [ ] Frontend deployed to production
- [ ] All features tested and working
- [ ] No critical bugs
- [ ] Mobile responsive
- [ ] Performance optimized

### Content:
- [ ] README comprehensive
- [ ] Technical docs complete
- [ ] User guide written
- [ ] Demo video recorded (5 min)
- [ ] Pitch deck created (15 slides)
- [ ] RWA roadmap included

### Testing:
- [ ] 50+ test users signed up
- [ ] 10+ guilds created
- [ ] 100+ battles fought
- [ ] All user flows tested
- [ ] Edge cases handled

### Submission:
- [ ] GitHub repository public
- [ ] All code commented
- [ ] Contract addresses documented
- [ ] Deployment guide written
- [ ] Team info included
- [ ] License file added

---

## 🎉 Expected Outcome

With this implementation plan, you will have:

✅ **Fully functional game** on Mantle testnet with:
- Guild system (network effects)
- $ARMADA token (engagement loop)
- Battle pass (retention)
- Ship NFTs (RWA foundation)
- Optimized for Mantle (speed showcase)

✅ **Competitive advantages**:
- Social features (guilds)
- Token economics
- RWA vision
- Real user traction
- Professional presentation

✅ **Hackathon positioning**:
- Addresses 3 tracks: GameFi & Social, RWA/RealFi, Infrastructure
- Shows Mantle's advantages
- Has roadmap for growth
- Demonstrates technical excellence

**Estimated Score**: 85-95/100
**Expected Placement**: Top 3 Finalist → Potential Winner

---

## 🚦 Let's Get Started!

The plan is set. Let's begin with **Phase 1: Network Migration** and work our way through systematically.

**Ready to start coding? Let me know and I'll help you implement each phase! ⚓🚀**

