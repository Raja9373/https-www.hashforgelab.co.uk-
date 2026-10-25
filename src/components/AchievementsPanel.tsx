import React, { useState } from 'react';
import { Award, Lock, CheckCircle2, Star, Zap, ShieldCheck, Flame, Trophy } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardXp: number;
  category: 'mining' | 'level' | 'overclock' | 'shares';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pioneer',
    title: 'Crypto Pioneer',
    description: 'Initialized global hash nodes and started the simulation.',
    icon: '🚀',
    rewardXp: 100,
    category: 'mining'
  },
  {
    id: 'club_100',
    title: '100 MH/s Club',
    description: 'Achieved a global simulated hashrate of 100 MH/s or higher.',
    icon: '⚡',
    rewardXp: 250,
    category: 'mining'
  },
  {
    id: 'overclock_master',
    title: 'Overclock Master',
    description: 'Engaged Simulated Overclock (+20% High Power Mode).',
    icon: '🔥',
    rewardXp: 300,
    category: 'overclock'
  },
  {
    id: 'level_3',
    title: 'Elite Rig Commander',
    description: 'Reached Mining Level 3 with efficiency multipliers.',
    icon: '🏆',
    rewardXp: 500,
    category: 'level'
  },
  {
    id: 'share_master',
    title: 'Block Solver',
    description: 'Successfully verified and accepted 25 proof-of-work shares.',
    icon: '✅',
    rewardXp: 400,
    category: 'shares'
  },
  {
    id: 'quantum_adept',
    title: 'Quantum Voyager',
    description: 'Activated the Quantum AI booster for maximum efficiency.',
    icon: '🔮',
    rewardXp: 450,
    category: 'overclock'
  }
];

interface AchievementsPanelProps {
  miningLevel: number;
  miningXp: number;
  sharesAccepted: number;
  isOverclocked: boolean;
  hashRate: number;
  activeBooster: string | null;
  onClaimReward: (rewardXp: number) => void;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  miningLevel,
  miningXp,
  sharesAccepted,
  isOverclocked,
  hashRate,
  activeBooster,
  onClaimReward
}) => {
  const [claimedIds, setClaimedIds] = useState<string[]>(['pioneer']);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Check achievement unlock conditions
  const isUnlocked = (achId: string) => {
    switch (achId) {
      case 'pioneer':
        return true;
      case 'club_100':
        return hashRate >= 100;
      case 'overclock_master':
        return isOverclocked;
      case 'level_3':
        return miningLevel >= 3;
      case 'share_master':
        return sharesAccepted >= 25;
      case 'quantum_adept':
        return activeBooster === 'quantum';
      default:
        return false;
    }
  };

  const unlockedCount = ACHIEVEMENTS.filter((a) => isUnlocked(a.id)).length;

  const handleClaim = (achId: string, reward: number) => {
    if (claimedIds.includes(achId)) return;
    setClaimedIds((prev) => [...prev, achId]);
    onClaimReward(reward);
  };

  const filteredAchievements = ACHIEVEMENTS.filter((ach) => {
    const unlocked = isUnlocked(ach.id);
    if (filter === 'unlocked') return unlocked;
    if (filter === 'locked') return !unlocked;
    return true;
  });

  return (
    <div className="bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-black/80 border border-white/12 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden shadow-[0_0_35px_rgba(0,255,136,0.1)]">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#00ff88]/20 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                ACHIEVEMENTS &amp; DIGITAL BADGES
              </h3>
              <p className="text-xs text-gray-400">
                Unlock milestone badges, earn bonus XP, and prove your mining mastery.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs">
            <span className="text-[#00ff88] font-bold">{unlockedCount}</span>
            <span className="text-gray-400"> / {ACHIEVEMENTS.length} Unlocked</span>
          </div>

          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
                filter === 'all' ? 'bg-[#00ff88] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
                filter === 'unlocked' ? 'bg-[#00ff88] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Unlocked
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
                filter === 'locked' ? 'bg-[#00ff88] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Locked
            </button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((ach) => {
          const unlocked = isUnlocked(ach.id);
          const claimed = claimedIds.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                unlocked
                  ? claimed
                    ? 'bg-white/[0.03] border-white/15'
                    : 'bg-gradient-to-br from-[#00ff88]/10 via-white/[0.04] to-black/60 border-[#00ff88]/50 shadow-[0_0_20px_rgba(0,255,136,0.15)] ring-1 ring-[#00ff88]/30'
                  : 'bg-black/40 border-white/5 opacity-60'
              }`}
            >
              {unlocked && !claimed && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff88]/20 rounded-full blur-xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                    unlocked ? 'bg-white/10 border border-white/20' : 'bg-black/60 border border-white/5 grayscale'
                  }`}>
                    {ach.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/50 border border-white/10 text-purple-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                      +{ach.rewardXp} XP
                    </span>

                    {unlocked ? (
                      <span className="w-6 h-6 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/50 flex items-center justify-center text-[#00ff88]" title="Unlocked!">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-gray-500" title="Locked">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-orbitron font-bold text-sm text-white mb-1 flex items-center gap-1.5">
                  {ach.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div>
                {unlocked ? (
                  claimed ? (
                    <div className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-center font-orbitron font-bold text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" />
                      REWARD CLAIMED
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClaim(ach.id, ach.rewardXp)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-orbitron font-extrabold text-xs shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.7)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      CLAIM +{ach.rewardXp} XP REWARD
                    </button>
                  )
                ) : (
                  <div className="w-full py-2 rounded-xl bg-black/40 border border-white/5 text-center font-orbitron font-bold text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    LOCKED MILESTONE
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
