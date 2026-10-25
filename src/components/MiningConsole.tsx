import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Flame, 
  Activity, 
  Terminal, 
  Zap, 
  Share2, 
  Layers, 
  RefreshCw, 
  Power, 
  Server, 
  Sparkles,
  Award,
  Sliders,
  DollarSign,
  ShieldCheck,
  Wind,
  Volume2,
  VolumeX,
  Bell,
  BellOff
} from 'lucide-react';
import { Coin, COINS, MINING_RIGS, MiningRig } from '../data/coins';
import { VirtualHardwareHealth } from './VirtualHardwareHealth';
import { MarketSentiment } from './MarketSentiment';
import { AchievementsPanel } from './AchievementsPanel';

interface MiningConsoleProps {
  onOpenShareModal: () => void;
  soundEnabled: boolean;
}

export const MiningConsole: React.FC<MiningConsoleProps> = ({
  onOpenShareModal,
  soundEnabled
}) => {
  const [selectedRig, setSelectedRig] = useState<MiningRig>(MINING_RIGS[0]);
  const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeBooster, setActiveBooster] = useState<string | null>(null);
  const [consoleTab, setConsoleTab] = useState<'console' | 'hardware_health'>('console');
  const [isOverclocked, setIsOverclocked] = useState<boolean>(false);

  // Audio Controls State
  const [miningHumEnabled, setMiningHumEnabled] = useState<boolean>(true);
  const [transactionClickEnabled, setTransactionClickEnabled] = useState<boolean>(true);

  // Hash Power Leveling System State
  const [miningXp, setMiningXp] = useState<number>(450);
  const [miningLevel, setMiningLevel] = useState<number>(2);
  const levelEfficiencyBonus = 1 + (miningLevel - 1) * 0.08;

  // Mining Metrics State
  const [hashRate, setHashRate] = useState<number>(640);
  const [progressBar, setProgressBar] = useState<number>(20);
  const [blockHeight, setBlockHeight] = useState<number>(842901);
  const [difficulty, setDifficulty] = useState<number>(24.7);
  const [temp, setTemp] = useState<number>(48);
  const [fanSpeed, setFanSpeed] = useState<number>(55);
  const [sharesAccepted, setSharesAccepted] = useState<number>(14);

  // Multi-coin Balances
  const [balances, setBalances] = useState<Record<string, number>>({
    btc: 0.00000214,
    eth: 0.0000312,
    sol: 0.00142,
    doge: 1.45,
    kas: 2.18,
    ton: 0.045,
    xmr: 0.00092,
    ltc: 0.0018
  });

  // Terminal Logs
  const [logs, setLogs] = useState<string[]>([
    '> Initializing worldwide node clusters (42 languages)...',
    '> Connected to hashforgelab.co.uk global pool #104 [UK-LON-01]',
    '> Algorithm initialized: SHA-256 / Dual Multi-Chain Simulator',
    '> [SHARE ACCEPTED] Nonce 0x7f48ac29 verified by Global Validator #1294 ✅'
  ]);

  // Audio tone generation for transaction click SFX
  const playBeep = () => {
    if (!soundEnabled || !transactionClickEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Periodic ASIC Mining Hum audio simulation
  useEffect(() => {
    if (!soundEnabled || !miningHumEnabled || isPaused) return;

    const humInterval = setInterval(() => {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isOverclocked ? 72 : 55, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch {
        // Audio restriction
      }
    }, 3500);

    return () => clearInterval(humInterval);
  }, [soundEnabled, miningHumEnabled, isPaused, isOverclocked]);

  // Toggle simulated overclock (+20% hashrate boost & high power UI)
  const toggleOverclock = () => {
    setIsOverclocked((prev) => {
      const next = !prev;
      if (next) {
        setLogs((l) => [
          '> ⚡ [SIMULATED OVERCLOCK ENABLED] Clocks boosted +20%! High Power Mode active (Safe 0W Virtual Load).',
          ...l.slice(0, 15)
        ]);
        playBeep();
      } else {
        setLogs((l) => [
          '> ⚡ [SIMULATED OVERCLOCK DISABLED] Core clocks reverted to standard baseline (Balanced Mode).',
          ...l.slice(0, 15)
        ]);
      }
      return next;
    });
  };

  // Handle claiming achievement XP reward
  const handleClaimReward = (rewardXp: number) => {
    setMiningXp((prev) => {
      const nextXp = prev + rewardXp;
      playBeep();
      setLogs((l) => [
        `> 🏆 [ACHIEVEMENT REWARD CLAIMED!] +${rewardXp} XP added to your rig!`,
        ...l.slice(0, 15)
      ]);
      return nextXp;
    });
  };

  // Main mining loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Calculate multiplier
      let boostMult = 1;
      if (activeBooster === 'turbo') boostMult = 1.35;
      if (activeBooster === 'overclock') boostMult = 1.75;
      if (activeBooster === 'quantum') boostMult = 2.5;

      // Simulated Overclock multiplier: +20% boost
      const overclockMult = isOverclocked ? 1.20 : 1.0;

      const baseHash = (Math.random() * 400 + 450) * selectedRig.multiplier * boostMult * overclockMult * levelEfficiencyBonus;
      setHashRate(baseHash);
      setProgressBar((prev) => (prev + 4.5) % 100);

      // Accumulate Hash Power Experience Points (XP)
      setMiningXp((prevXp) => {
        const nextXp = prevXp + 1;
        const currentGoal = miningLevel * 500;
        if (nextXp >= currentGoal) {
          setMiningLevel((lvl) => {
            const nextLvl = lvl + 1;
            setLogs((l) => [
              `> 🏆 [LEVEL UP!] Rig reached Level ${nextLvl}! Efficiency multiplier increased to +${(nextLvl - 1) * 8}%.`,
              ...l.slice(0, 15)
            ]);
            playBeep();
            return nextLvl;
          });
        }
        return nextXp;
      });

      // Fluctuate hardware stats with overclock boost
      setTemp(45 + Math.floor(Math.random() * 12) + (activeBooster ? 6 : 0) + (isOverclocked ? 8 : 0));
      setFanSpeed(50 + Math.floor(Math.random() * 20) + (activeBooster ? 15 : 0) + (isOverclocked ? 16 : 0));

      // Increment balances
      setBalances((prev) => {
        const next = { ...prev };
        COINS.forEach((coin) => {
          const delta = (coin.baseRewardRate * (baseHash / 500) * (Math.random() * 0.5 + 0.75));
          next[coin.id] = (next[coin.id] || 0) + delta;
        });
        return next;
      });

      // Periodic logs and share discovery
      if (Math.random() > 0.65) {
        const randomCoin = COINS[Math.floor(Math.random() * COINS.length)];
        const nodeId = Math.floor(Math.random() * 9000 + 1000);
        const newLog = `> [${randomCoin.symbol}] Share found! Node #${nodeId} solved target in ${Math.floor(Math.random() * 40 + 10)}ms ✅`;
        
        setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
        setSharesAccepted((s) => s + 1);
        playBeep();
      }
    }, 160);

    return () => clearInterval(interval);
  }, [isPaused, selectedRig, activeBooster, isOverclocked, soundEnabled]);

  // Block & Difficulty tick
  useEffect(() => {
    if (isPaused) return;
    const blockInterval = setInterval(() => {
      setBlockHeight((b) => b + 1);
      setDifficulty((d) => parseFloat((d + (Math.random() * 0.08 - 0.03)).toFixed(2)));
      setLogs((prev) => [
        `> ⛓️ Block #${blockHeight + 1} finalized! Reward pool distributed to 1,284,902 active miners.`,
        ...prev.slice(0, 15)
      ]);
    }, 4500);

    return () => clearInterval(blockInterval);
  }, [blockHeight, isPaused]);

  // Calculate total USD
  const totalUsdValue = COINS.reduce((acc, coin) => {
    const amount = balances[coin.id] || 0;
    return acc + (amount * coin.usdPrice);
  }, 0);

  const formatHash = (h: number) => {
    if (h >= 1000000) return `${(h / 1000000).toFixed(2)} GH/s`;
    if (h >= 1000) return `${(h / 1000).toFixed(2)} MH/s`;
    return `${h.toFixed(2)} KH/s`;
  };

  return (
    <div className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Header Controls */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 rounded-2xl border transition-all duration-500 ${
        isOverclocked
          ? 'bg-gradient-to-r from-orange-950/40 via-[#120804] to-black/60 border-orange-500/40 shadow-[0_0_30px_rgba(255,107,0,0.15)]'
          : 'bg-white/[0.04] border-white/10'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
              ⛏️ Worldwide Mining Console
            </h2>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors ${
              isOverclocked
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                : 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/30'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isOverclocked ? 'bg-orange-400' : 'bg-[#00ff88]'}`} />
              {isOverclocked ? 'HIGH POWER' : 'LIVE'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Connected to <span className={isOverclocked ? 'text-orange-400 font-semibold' : 'text-[#00ff88]'}>hashforgelab.co.uk</span> Global Pool • 180+ Country Sync
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Simulated Overclock Toggle Button */}
          <button
            id="toggle-simulated-overclock"
            onClick={toggleOverclock}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-orbitron font-bold text-xs border transition-all cursor-pointer ${
              isOverclocked 
                ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-black border-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.6)] font-extrabold hover:brightness-110' 
                : 'bg-white/[0.05] text-gray-300 border-white/10 hover:border-orange-500/40 hover:text-white'
            }`}
            aria-pressed={isOverclocked}
            title="Toggle Simulated Overclock (+20% Hashrate and High Power Mode)"
          >
            <Zap className={`w-3.5 h-3.5 ${isOverclocked ? 'fill-black text-black animate-pulse' : 'text-orange-400'}`} />
            <span>{isOverclocked ? 'OVERCLOCK ACTIVE (+20%)' : 'SIMULATE OVERCLOCK'}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
              isOverclocked ? 'bg-black/30 text-black font-black' : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
            }`}>
              {isOverclocked ? 'HIGH POWER' : '+20%'}
            </span>
          </button>

          <button
            id="toggle-pause-mining"
            onClick={() => setIsPaused(!isPaused)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-orbitron font-bold text-xs border transition-all ${
              isPaused 
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30' 
                : 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {isPaused ? 'RESUME MINING' : 'PAUSE ENGINE'}
          </button>

          <button
            id="share-console-btn"
            onClick={onOpenShareModal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-orbitron font-extrabold text-xs shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            SHARE &amp; EARN $$$
          </button>
        </div>
      </div>

      {/* Audio Controls Section */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3.5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88]">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-orbitron font-bold text-xs text-white">SIMULATION AUDIO CONTROLS</h4>
            <p className="text-[10px] text-gray-400">Toggle immersive sound effects for mining rigs and share success.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Mining Hum Toggle */}
          <button
            onClick={() => setMiningHumEnabled(!miningHumEnabled)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold border transition-all cursor-pointer ${
              miningHumEnabled
                ? 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/40 shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                : 'bg-black/30 text-gray-400 border-white/10 hover:border-white/20'
            }`}
            title="Toggle Continuous ASIC Mining Hum / Fan Drone"
          >
            {miningHumEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00ff88]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
            <span>Mining Hum: {miningHumEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Transaction Click Toggle */}
          <button
            onClick={() => setTransactionClickEnabled(!transactionClickEnabled)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold border transition-all cursor-pointer ${
              transactionClickEnabled
                ? 'bg-[#00d4ff]/15 text-[#00d4ff] border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                : 'bg-black/30 text-gray-400 border-white/10 hover:border-white/20'
            }`}
            title="Toggle Share Success & Transaction Click Chime"
          >
            {transactionClickEnabled ? <Bell className="w-3.5 h-3.5 text-[#00d4ff]" /> : <BellOff className="w-3.5 h-3.5 text-gray-500" />}
            <span>Tx Click: {transactionClickEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation Tabs: Console vs Virtual Hardware Health */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
        <button
          onClick={() => setConsoleTab('console')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all cursor-pointer ${
            consoleTab === 'console'
              ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]'
              : 'text-gray-400 hover:text-white bg-white/[0.04]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>MINING CONSOLE &amp; YIELDS</span>
        </button>

        <button
          onClick={() => setConsoleTab('hardware_health')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all cursor-pointer ${
            consoleTab === 'hardware_health'
              ? 'bg-[#00d4ff] text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]'
              : 'text-gray-400 hover:text-white bg-white/[0.04]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
          <span>VIRTUAL HARDWARE HEALTH (0% LOAD)</span>
        </button>
      </div>

      {/* TAB 1: Main Console & Yields */}
      {consoleTab === 'console' ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Rig Selector, Speedometer & Terminal */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Rig Display Card with High Power Color Shift */}
              <div className={`border rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-500 ${
                isOverclocked
                  ? 'bg-gradient-to-br from-[#1c0d04]/95 via-[#100602]/95 to-black/95 border-orange-500/50 shadow-[0_0_45px_rgba(255,107,0,0.25)] ring-1 ring-orange-500/30'
                  : 'bg-white/[0.05] border-white/12 shadow-none'
              }`}>
                {/* Ambient Aura */}
                <div className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
                  isOverclocked ? 'bg-orange-500/25' : 'bg-[#00ff88]/10'
                }`} />

                {/* High Power Top Energy Glow line */}
                {isOverclocked && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    isOverclocked ? 'text-orange-300' : 'text-gray-400'
                  }`}>
                    <Activity className={`w-4 h-4 ${isOverclocked ? 'text-orange-400 animate-pulse' : 'text-[#00ff88]'}`} />
                    GLOBAL SIMULATED HASHRATE
                  </span>

                  <div className="flex items-center gap-2">
                    {isOverclocked && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-bold bg-orange-500/20 text-orange-300 border border-orange-500/50 flex items-center gap-1 animate-pulse">
                        <Zap className="w-3 h-3 fill-orange-400 text-orange-400" />
                        HIGH POWER (+20%)
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-[11px] font-orbitron font-bold border transition-colors ${
                      isOverclocked 
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/40' 
                        : 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                    }`}>
                      {selectedRig.tag}
                    </span>
                  </div>
                </div>

                {/* Massive Hashrate Readout */}
                <div className="my-3">
                  <div className={`font-orbitron font-black text-4xl sm:text-5xl md:text-6xl tracking-tight transition-all duration-300 text-transparent bg-clip-text ${
                    isOverclocked
                      ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                      : 'bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#8a2be2]'
                  }`}>
                    {formatHash(hashRate)}
                  </div>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Active Rig: <span className="text-white font-semibold">{selectedRig.name}</span> • Est. Efficiency: <span className={isOverclocked ? 'text-orange-400 font-bold' : 'text-[#00ff88]'}>{selectedRig.efficiency}</span>
                    {isOverclocked && (
                      <span className="text-amber-300 font-bold ml-2">(+20% Overclock Boost Applied)</span>
                    )}
                  </p>
                </div>

                {/* Glowing Mining Progress Bar */}
                <div className="my-5">
                  <div className="flex justify-between text-xs font-mono text-gray-400 mb-1.5">
                    <span>Proof-of-Work Block Hash Calculation {isOverclocked && <span className="text-orange-400 font-bold">[High Power]</span>}</span>
                    <span className={`font-bold ${isOverclocked ? 'text-orange-400' : 'text-[#00ff88]'}`}>{progressBar.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-150 ${
                        isOverclocked
                          ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 shadow-[0_0_20px_rgba(255,107,0,0.85)]'
                          : 'bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#8a2be2] shadow-[0_0_15px_rgba(0,255,136,0.8)]'
                      }`}
                      style={{ width: `${progressBar}%` }}
                    />
                  </div>
                </div>

                {/* Block & Difficulty Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block">Current Block</span>
                    <b className="font-orbitron text-sm text-white">#{blockHeight.toLocaleString()}</b>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block">Difficulty</span>
                    <b className="font-orbitron text-sm text-[#00d4ff]">{difficulty}T</b>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block">Shares Accepted</span>
                    <b className="font-orbitron text-sm text-[#00ff88]">{sharesAccepted} ✅</b>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block">Eco Electricity</span>
                    <b className="font-orbitron text-sm text-purple-300">0 Watts (Free)</b>
                  </div>
                </div>
              </div>

              {/* Hash Power Leveling System Widget */}
              <div className="bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-black/60 border border-purple-500/30 rounded-3xl p-5 relative overflow-hidden shadow-[0_0_25px_rgba(138,43,226,0.15)]">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                      🏆
                    </span>
                    <div>
                      <h4 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                        HASH POWER LEVELING <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500 text-black font-extrabold">LEVEL {miningLevel}</span>
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Active Efficiency Bonus: <span className="text-[#00ff88] font-bold">+{(miningLevel - 1) * 8}% Multiplier</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs text-purple-300 font-bold">{miningXp} / {miningLevel * 500} XP</span>
                  </div>
                </div>

                {/* Level XP Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-purple-500 shadow-[0_0_15px_rgba(138,43,226,0.7)] transition-all duration-300"
                      style={{ width: `${Math.min(100, (miningXp / (miningLevel * 500)) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>Progress to Level {miningLevel + 1}</span>
                    <span>{Math.round((miningXp / (miningLevel * 500)) * 100)}% Complete</span>
                  </div>
                </div>
              </div>

              {/* Achievements & Digital Badges Panel */}
              <AchievementsPanel 
                miningLevel={miningLevel}
                miningXp={miningXp}
                sharesAccepted={sharesAccepted}
                isOverclocked={isOverclocked}
                hashRate={hashRate}
                activeBooster={activeBooster}
                onClaimReward={handleClaimReward}
              />

              {/* Rig Selectors */}
              <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">
                <h3 className="font-orbitron text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00ff88]" /> Select Virtual Mining Hardware:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MINING_RIGS.map((rig) => (
                    <button
                      key={rig.id}
                      onClick={() => setSelectedRig(rig)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        selectedRig.id === rig.id
                          ? 'bg-[#00ff88]/10 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.25)]'
                          : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{rig.name}</span>
                        <span className={`text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-md ${
                          selectedRig.id === rig.id ? 'bg-[#00ff88] text-black' : 'bg-white/10 text-gray-400'
                        }`}>
                          {rig.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-1">{rig.description}</p>
                      <div className="text-[10px] font-mono text-[#00d4ff]">
                        Est. Speed: {rig.hashRange}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Boosters Row */}
              <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">
                <h3 className="font-orbitron text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00d4ff]" /> Virtual Rig Boosters (Free):
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setActiveBooster(activeBooster === 'turbo' ? null : 'turbo')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeBooster === 'turbo'
                        ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-[#00ff88]/40'
                    }`}
                  >
                    <Flame className="w-4 h-4 mx-auto mb-1 text-[#00ff88]" />
                    <span className="text-[11px] block font-bold">Turbo Fan</span>
                    <span className="text-[9px] text-gray-400">+35% Hash</span>
                  </button>

                  <button
                    onClick={() => setActiveBooster(activeBooster === 'overclock' ? null : 'overclock')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeBooster === 'overclock'
                        ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff] font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-[#00d4ff]/40'
                    }`}
                  >
                    <Sliders className="w-4 h-4 mx-auto mb-1 text-[#00d4ff]" />
                    <span className="text-[11px] block font-bold">Overclock</span>
                    <span className="text-[9px] text-gray-400">+75% Hash</span>
                  </button>

                  <button
                    onClick={() => setActiveBooster(activeBooster === 'quantum' ? null : 'quantum')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeBooster === 'quantum'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold shadow-[0_0_15px_rgba(138,43,226,0.3)]'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-purple-400/40'
                    }`}
                  >
                    <Zap className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                    <span className="text-[11px] block font-bold">Quantum AI</span>
                    <span className="text-[9px] text-gray-400">+150% Hash</span>
                  </button>
                </div>
              </div>

              {/* Terminal Console Logs */}
              <div className="bg-black/80 border border-white/15 rounded-3xl p-4 font-mono-code text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span className="font-bold text-gray-200">WORLDWIDE MINER LOGS</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Auto-scrolling stream</span>
                </div>
                
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-[11px]">
                  {logs.map((log, index) => {
                    const isSuccess = log.includes('✅') || log.includes('reward') || log.includes('finalized');
                    return (
                      <div 
                        key={index}
                        className={`leading-relaxed transition-all ${
                          index === 0 ? 'text-[#00ff88] font-semibold' : isSuccess ? 'text-gray-300' : 'text-gray-400'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Multi-Coin Live Balances & Earnings */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Total Value Banner Card */}
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#00ff88]/40 rounded-3xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,136,0.15)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#00ff88]" /> TOTAL SIMULATED BALANCE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00ff88]/20 text-[#00ff88]">
                    REAL-TIME LIVE
                  </span>
                </div>

                <div className="font-orbitron font-extrabold text-3xl sm:text-4xl text-[#00ff88] drop-shadow-[0_0_12px_rgba(0,255,136,0.5)] my-2">
                  ${totalUsdValue.toFixed(4)} USD
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  All 12+ simulated coins are actively mined and converted at live simulated spot market rates.
                </p>

                <button
                  onClick={onOpenShareModal}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#00ff88] text-black font-orbitron font-black text-xs tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_35px_rgba(0,255,136,0.7)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  🚀 SHARE &amp; EARN REAL $$$ (MONETIZED)
                </button>
              </div>

              {/* Individual Coins List */}
              <div className="bg-white/[0.05] border border-white/12 rounded-3xl p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <h3 className="font-orbitron text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00d4ff]" /> Free Mining Crypto Yields
                  </h3>
                  <span className="text-[11px] text-[#00ff88] font-mono">Click to view sentiment</span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {COINS.map((coin) => {
                    const amount = balances[coin.id] || 0;
                    const usdVal = amount * coin.usdPrice;
                    const isSelected = selectedCoin.id === coin.id;

                    return (
                      <div
                        key={coin.id}
                        onClick={() => setSelectedCoin(coin)}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white/10 border shadow-lg'
                            : 'bg-black/40 border border-white/5 hover:border-white/25 hover:bg-black/60'
                        }`}
                        style={{
                          borderColor: isSelected ? coin.color : undefined,
                          boxShadow: isSelected ? `0 0 16px ${coin.color}35` : undefined
                        }}
                        title={`Click to inspect ${coin.name} (${coin.symbol}) market sentiment & sparkline chart`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shadow-sm transition-transform hover:scale-105"
                            style={{ backgroundColor: `${coin.color}25`, color: coin.color, border: `1px solid ${coin.color}50` }}
                          >
                            {coin.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-white">{coin.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono uppercase">({coin.symbol})</span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#00ff88]/20 text-[#00ff88]">
                                  CHARTED
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono block">
                              {coin.algorithm}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-xs text-white">
                            {amount.toFixed(coin.decimals)} <span className="text-gray-400 text-[10px]">{coin.symbol}</span>
                          </div>
                          <div className="text-[11px] font-mono text-[#00ff88]">
                            ≈ ${usdVal.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Telemetry Strip (Clickable to switch tab) */}
              <div 
                onClick={() => setConsoleTab('hardware_health')}
                className="group cursor-pointer grid grid-cols-2 gap-3 bg-white/[0.04] hover:bg-white/[0.07] p-4 rounded-3xl border border-white/10 hover:border-[#00ff88]/40 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Core Temp (Sim)</span>
                    <b className="text-white font-mono">{temp}°C (Safe)</b>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30">
                  <RefreshCw className="w-4 h-4 text-[#00d4ff] animate-spin" style={{ animationDuration: '4s' }} />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Virtual Fan</span>
                    <b className="text-white font-mono">{fanSpeed}% RPM</b>
                  </div>
                </div>

                <div className="col-span-2 text-center text-[11px] text-[#00ff88] group-hover:underline flex items-center justify-center gap-1 font-mono pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open Virtual Hardware Health &amp; Zero-Load Proof →</span>
                </div>
              </div>

            </div>

          </div>

          {/* Market Sentiment & Sparkline Chart Component */}
          <MarketSentiment 
            selectedCoin={selectedCoin}
            onSelectCoin={setSelectedCoin}
            isOverclocked={isOverclocked}
          />

          {/* Integrated Virtual Hardware Health Component */}
          <VirtualHardwareHealth 
            isMining={!isPaused}
            activeBooster={isOverclocked ? (activeBooster || 'overclock') : activeBooster}
          />
        </div>
      ) : (
        /* TAB 2: Full Dedicated Virtual Hardware Health Dashboard */
        <div className="animate-in fade-in duration-200">
          <VirtualHardwareHealth 
            isMining={!isPaused}
            activeBooster={isOverclocked ? (activeBooster || 'overclock') : activeBooster}
          />
        </div>
      )}

    </div>
  );
};
