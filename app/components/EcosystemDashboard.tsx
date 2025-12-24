"use client";

import { useActiveAccount } from 'thirdweb/react';
import { usePlayer } from '../libs/providers/player-provider';
import {
  useTokenBalance,
  usePlayerGuild,
  usePlayerBattlePass,
  usePlayerShips,
  useClaimableDividends,
  useUnclaimedRewards
} from '../libs/hooks/useContracts';
import { formatEther } from 'viem';

/**
 * EcosystemDashboard - Shows all player stats across the entire ecosystem
 * Displays: Account, ARMADA tokens, Guild, Battle Pass, Ship NFTs
 */
export function EcosystemDashboard() {
  const account = useActiveAccount();
  const { playerAccount } = usePlayer(); // Use existing player provider
  const { balance: tokenBalance } = useTokenBalance();
  const { guildData, inGuild } = usePlayerGuild();
  const { passData, hasActivePass } = usePlayerBattlePass();
  const { shipCount, totalYield } = usePlayerShips();
  const { dividends } = useClaimableDividends();
  const { totalArmada: unclaimedArmada } = useUnclaimedRewards();

  if (!account) {
    return null; // Don't show anything if not connected
  }

  if (!playerAccount) {
    return null; // Don't show anything if no account - WelcomeScreen will handle this
  }

  return (
    <div className="space-y-4">
      {/* Main Stats Card */}
      <div className="bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>⚓</span>
          {playerAccount.boatName || 'Ship'}
          <span className="text-sm font-normal text-white/60">
            {playerAccount.isPirate ? '🏴‍☠️ Pirate' : '⚔️ Navy'}
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Gold */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-yellow-400 text-sm font-semibold mb-1">Gold</div>
            <div className="text-2xl font-bold text-white">
              {playerAccount.gold}
            </div>
          </div>

          {/* Diamonds */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-cyan-400 text-sm font-semibold mb-1">Diamonds</div>
            <div className="text-2xl font-bold text-white">
              💎 {playerAccount.diamonds}
            </div>
          </div>

          {/* HP */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-red-400 text-sm font-semibold mb-1">Health</div>
            <div className="text-2xl font-bold text-white">
              {playerAccount.hp}/{playerAccount.maxHp}
            </div>
          </div>

          {/* Battle Power */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-semibold mb-1">Power</div>
            <div className="text-2xl font-bold text-white">
              {playerAccount.attack + playerAccount.defense + playerAccount.speed}
            </div>
            <div className="text-xs text-white/60 mt-1">
              Atk {playerAccount.attack} | Def {playerAccount.defense}
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* ARMADA Token */}
        <div className="bg-gradient-to-br from-orange-900/70 to-red-900/70 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🪙</span>
            ARMADA Token
          </h3>
          <div className="text-3xl font-bold text-orange-400 mb-2">
            {parseFloat(formatEther(tokenBalance)).toFixed(2)}
          </div>
          <div className="text-xs text-white/60">
            Game economy token
          </div>
          {unclaimedArmada > 0n && (
            <div className="mt-2 text-xs text-green-400">
              +{parseFloat(formatEther(unclaimedArmada)).toFixed(2)} from Battle Pass
            </div>
          )}
        </div>

        {/* Guild */}
        <div className="bg-gradient-to-br from-indigo-900/70 to-blue-900/70 backdrop-blur-sm rounded-lg p-6 border border-indigo-500/30">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>⚔️</span>
            Guild
          </h3>
          {inGuild && guildData ? (
            <>
              <div className="text-xl font-bold text-indigo-400 mb-1 truncate">
                {guildData[0]}
              </div>
              <div className="text-sm text-white/60 mb-2">
                Level {guildData[8].toString()} | {guildData[3].toString()} members
              </div>
              <div className="text-xs text-white/60">
                Treasury: {guildData[4].toString()} gold
              </div>
              {dividends > 0n && (
                <div className="mt-2 text-xs text-green-400">
                  +{dividends.toString()} dividends
                </div>
              )}
            </>
          ) : (
            <div className="text-white/60">
              <div className="text-sm mb-2">No guild</div>
              <div className="text-xs">Join or create one!</div>
            </div>
          )}
        </div>

        {/* Battle Pass */}
        <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🎖️</span>
            Battle Pass
          </h3>
          {hasActivePass && passData ? (
            <>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                Lvl {passData[1].toString()}
              </div>
              <div className="text-sm text-white/60 mb-2">
                {passData[3] ? '⭐ Premium' : 'Free'}
              </div>
              <div className="text-xs text-white/60">
                Season {passData[0].toString()}
              </div>
            </>
          ) : (
            <div className="text-white/60">
              <div className="text-sm mb-2">No pass</div>
              <div className="text-xs">Create one for rewards!</div>
            </div>
          )}
        </div>

        {/* Ship NFTs */}
        <div className="bg-gradient-to-br from-teal-900/70 to-cyan-900/70 backdrop-blur-sm rounded-lg p-6 border border-teal-500/30">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🚢</span>
            Ship NFTs
          </h3>
          <div className="text-3xl font-bold text-teal-400 mb-2">
            {shipCount}
          </div>
          <div className="text-xs text-white/60 mb-2">
            Yield-bearing assets
          </div>
          {totalYield > 0n && (
            <div className="text-xs text-green-400">
              +{parseFloat(formatEther(totalYield)).toFixed(4)} ARMADA yield
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
        <div className="flex flex-wrap gap-4 justify-center text-sm text-white/80">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⚡</span>
            <span>GPM: {playerAccount.gpm}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">👥</span>
            <span>Crew: {playerAccount.crew}/{playerAccount.maxCrew}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">📍</span>
            <span>Location: {playerAccount.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">🔥</span>
            <span>Streak: {playerAccount.checkInStreak} days</span>
          </div>
        </div>
      </div>

      {/* Network Info */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-lg p-3 border border-green-500/20">
        <div className="text-center text-xs text-green-400">
          <span className="font-semibold">🌐 Mantle Sepolia Testnet</span>
          <span className="mx-2">|</span>
          <span>⚡ 10-second GPM cycles</span>
          <span className="mx-2">|</span>
          <span>🔗 All contracts integrated</span>
        </div>
      </div>
    </div>
  );
}

