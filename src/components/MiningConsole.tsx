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
  DollarSign
} from 'lucide-react';
import { Coin, COINS, MINING_RIGS, MiningRig } from '../data/coins';

interface MiningConsoleProps {
  onOpenShareModal: () => void;
  soundEnabled: boolean;
}

export const MiningConsole: React.FC<MiningConsoleProps> = ({
  onOpenShareModal,
  soundEnabled
}) => {
  const [selectedRig, setSelectedRig] = useState<MiningRig>(MINING_RIGS[0]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeBooster, setActiveBooster] = useState<string | null>(null);

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

  // Audio tone generation for mining SFX
  const playBeep = () => {
    if (!soundEnabled) return;
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

  // Main mining loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Calculate multiplier
      let boostMult = 1;
      if (activeBooster === 'turbo') boostMult = 1.35;
      if (activeBooster === 'overclock') boostMult = 1.75;
      if (activeBooster === 'quantum') boostMult = 2.5;

      const baseHash = (Math.random() * 400 + 450) * selectedRig.multiplier * boostMult;
      setHashRate(baseHash);
      setProgressBar((prev) => (prev + 4.5) % 100);

      // Fluctuate hardware stats
      setTemp(45 + Math.floor(Math.random() * 12) + (activeBooster ? 6 : 0));
      setFanSpeed(50 + Math.floor(Math.random() * 20) + (activeBooster ? 15 : 0));

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
  }, [isPaused, selectedRig, activeBooster, soundEnabled]);

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
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white/[0.04] p-4 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
              ⛏️ Worldwide Mining Console
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              LIVE
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Connected to <span className="text-[#00ff88]">hashforgelab.co.uk</span> Global Pool • 180+ Country Sync
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
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
            SHARE & EARN $$$
          </button>
        </div>
      </div>

      {/* Main Grid: Left Console + Right Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left Column: Rig Selector, Speedometer & Terminal */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Rig Display Card */}
          <div className="bg-white/[0.05] border border-white/12 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#00ff88]" /> GLOBAL SIMULATED HASHRATE
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-orbitron font-bold bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                {selectedRig.tag}
              </span>
            </div>

            {/* Massive Hashrate Readout */}
            <div className="my-3">
              <div className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#8a2be2] tracking-tight">
                {formatHash(hashRate)}
              </div>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Active Rig: <span className="text-white font-semibold">{selectedRig.name}</span> • Est. Efficiency: <span className="text-[#00ff88]">{selectedRig.efficiency}</span>
              </p>
            </div>

            {/* Glowing Mining Progress Bar */}
            <div className="my-5">
              <div className="flex justify-between text-xs font-mono text-gray-400 mb-1.5">
                <span>Proof-of-Work Block Hash Calculation</span>
                <span className="text-[#00ff88] font-bold">{progressBar.toFixed(0)}%</span>
              </div>
              <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#8a2be2] shadow-[0_0_15px_rgba(0,255,136,0.8)] transition-all duration-150"
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
              🚀 SHARE & EARN REAL $$$ (MONETIZED)
            </button>
          </div>

          {/* Individual Coins List */}
          <div className="bg-white/[0.05] border border-white/12 rounded-3xl p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <h3 className="font-orbitron text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00d4ff]" /> Free Mining Crypto Yields
              </h3>
              <span className="text-[11px] text-gray-400 font-mono">8 Active Coins</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {COINS.map((coin) => {
                const amount = balances[coin.id] || 0;
                const usdVal = amount * coin.usdPrice;

                return (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shadow-sm"
                        style={{ backgroundColor: `${coin.color}25`, color: coin.color, border: `1px solid ${coin.color}50` }}
                      >
                        {coin.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white">{coin.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono uppercase">({coin.symbol})</span>
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

          {/* Virtual Rig Telemetry Sensors */}
          <div className="grid grid-cols-2 gap-3 bg-white/[0.04] p-4 rounded-3xl border border-white/10 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <span className="text-[10px] text-gray-400 block">Core Temp</span>
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
          </div>

        </div>

      </div>

    </div>
  );
};
