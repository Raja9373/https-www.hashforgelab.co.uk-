import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  RefreshCw, 
  Search, 
  Zap, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  Gauge,
  BarChart2,
  Sparkles,
  Info
} from 'lucide-react';
import { CryptoMinuteData, generateMinutePredictions } from '../data/top20Coins';

interface CryptoMinutePredictionsProps {
  onSelectCoinForMining?: (symbol: string) => void;
}

export const CryptoMinutePredictions: React.FC<CryptoMinutePredictionsProps> = ({
  onSelectCoinForMining
}) => {
  // Cycle seed based on current timestamp in minutes
  const [cycleSeed, setCycleSeed] = useState<number>(() => Math.floor(Date.now() / 60000));
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [filterMode, setFilterMode] = useState<'ALL' | 'RISING' | 'FALLING' | 'HIGH_CONFIDENCE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>(() => new Date().toLocaleTimeString());
  const [isManualSpinning, setIsManualSpinning] = useState<boolean>(false);

  // 1-minute countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Trigger next minute cycle
          setCycleSeed((s) => s + 1);
          setLastRefreshedAt(new Date().toLocaleTimeString());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Compute prediction dataset
  const predictions: CryptoMinuteData[] = useMemo(() => {
    return generateMinutePredictions(cycleSeed);
  }, [cycleSeed]);

  // Handle manual force refresh
  const handleForceRefresh = () => {
    setIsManualSpinning(true);
    setCycleSeed((s) => s + 1);
    setSecondsRemaining(60);
    setLastRefreshedAt(new Date().toLocaleTimeString());
    setTimeout(() => setIsManualSpinning(false), 600);
  };

  // Filtered dataset
  const filteredCoins = useMemo(() => {
    return predictions.filter((coin) => {
      const matchesSearch = 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterMode === 'RISING') return coin.status === 'RISING';
      if (filterMode === 'FALLING') return coin.status === 'FALLING';
      if (filterMode === 'HIGH_CONFIDENCE') return coin.confidenceScore >= 80;

      return true;
    });
  }, [predictions, filterMode, searchQuery]);

  // Aggregate stats
  const risingCount = predictions.filter((c) => c.status === 'RISING').length;
  const fallingCount = predictions.filter((c) => c.status === 'FALLING').length;
  const avgConfidence = Math.round(
    predictions.reduce((acc, c) => acc + c.confidenceScore, 0) / predictions.length
  );
  const isMarketBullish = risingCount >= fallingCount;

  // Format currency helper
  const formatPrice = (val: number) => {
    if (val >= 1000) return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (val >= 1) return `$${val.toFixed(2)}`;
    if (val >= 0.01) return `$${val.toFixed(4)}`;
    return `$${val.toFixed(8)}`;
  };

  return (
    <section 
      id="crypto-minute-predictions" 
      aria-label="Real-time 1-Minute Crypto Price Prediction Engine"
      className="py-12 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30">
              <Zap className="w-3.5 h-3.5 fill-[#00ff88]" />
              TOP 20 CRYPTO 1-MINUTE SIGNALS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30">
              EVERY MINUTE LIVE UPDATE
            </span>
          </div>

          <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            1-Minute Crypto Price Prediction &amp; Status
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1 max-w-2xl">
            Real-time algorithmic momentum signals forecasting which top 20 cryptocurrencies will rise (▲) or fall (▼) in the next 60 seconds.
          </p>
        </div>

        {/* 60-Second Real-Time Countdown Widget */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-black/80 via-white/[0.04] to-black/80 border border-white/15 p-3 rounded-2xl backdrop-blur-xl shadow-lg w-full md:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            {/* Circular Timer Visual */}
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00ff88] transition-all duration-1000 ease-linear"
                  strokeDasharray={`${(secondsRemaining / 60) * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-orbitron font-bold text-xs text-white">
                {secondsRemaining}s
              </span>
            </div>

            <div>
              <div className="text-[11px] font-mono text-gray-400">Next 1m Signal Batch</div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                Refreshed {lastRefreshedAt}
              </div>
            </div>
          </div>

          <button
            onClick={handleForceRefresh}
            disabled={isManualSpinning}
            title="Recalculate 1-Minute Momentum Signals Now"
            className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-gray-300 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isManualSpinning ? 'animate-spin text-[#00ff88]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Aggregate Market Pulse Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        
        {/* Metric 1: Rising Coins */}
        <div className="bg-gradient-to-br from-[#00ff88]/10 via-black/40 to-black/60 border border-[#00ff88]/30 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#00ff88] mb-1">
            <span className="flex items-center gap-1 font-bold">
              <TrendingUp className="w-4 h-4" /> RISING COINS (BULLISH)
            </span>
            <span className="text-[10px] bg-[#00ff88]/20 px-1.5 py-0.5 rounded">NEXT 60S</span>
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {risingCount} <span className="text-xs text-gray-400 font-mono">/ 20 Coins</span>
          </div>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            Orderbook buy walls exceeding sell resistance
          </div>
        </div>

        {/* Metric 2: Falling Coins */}
        <div className="bg-gradient-to-br from-red-500/10 via-black/40 to-black/60 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-1">
            <span className="flex items-center gap-1 font-bold">
              <TrendingDown className="w-4 h-4" /> FALLING COINS (BEARISH)
            </span>
            <span className="text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded">NEXT 60S</span>
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {fallingCount} <span className="text-xs text-gray-400 font-mono">/ 20 Coins</span>
          </div>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            Short-term profit-taking or supply distribution
          </div>
        </div>

        {/* Metric 3: Average Confidence */}
        <div className="bg-gradient-to-br from-[#00d4ff]/10 via-black/40 to-black/60 border border-[#00d4ff]/30 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#00d4ff] mb-1">
            <span className="flex items-center gap-1 font-bold">
              <Gauge className="w-4 h-4" /> MOMENTUM CONFIDENCE
            </span>
            <span className="text-[10px] bg-[#00d4ff]/20 px-1.5 py-0.5 rounded">AVG SCORE</span>
          </div>
          <div className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            {avgConfidence}% <span className="text-xs text-gray-400 font-mono">Precision</span>
          </div>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            Calculated across RSI, MACD &amp; EMA crosses
          </div>
        </div>

        {/* Metric 4: Market Consensus */}
        <div className="bg-gradient-to-br from-purple-500/10 via-black/40 to-black/60 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-1">
            <span className="flex items-center gap-1 font-bold">
              <Activity className="w-4 h-4" /> 1-MIN MARKET BIAS
            </span>
            <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded">CONSENSUS</span>
          </div>
          <div className="font-orbitron font-extrabold text-lg sm:text-xl text-white">
            {isMarketBullish ? '🟢 BULLISH BIAS' : '🔴 BEARISH PRESSURE'}
          </div>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            {isMarketBullish ? 'Dominant buyers lifting micro-ticks' : 'Sellers testing localized support'}
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-black/50 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all shrink-0 cursor-pointer ${
              filterMode === 'ALL'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/[0.05] text-gray-400 hover:text-white'
            }`}
          >
            ALL TOP 20
          </button>

          <button
            onClick={() => setFilterMode('RISING')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all shrink-0 cursor-pointer ${
              filterMode === 'RISING'
                ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                : 'bg-white/[0.05] text-[#00ff88] hover:bg-[#00ff88]/10'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            RISING ONLY ({risingCount})
          </button>

          <button
            onClick={() => setFilterMode('FALLING')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all shrink-0 cursor-pointer ${
              filterMode === 'FALLING'
                ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'bg-white/[0.05] text-red-400 hover:bg-red-500/10'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            FALLING ONLY ({fallingCount})
          </button>

          <button
            onClick={() => setFilterMode('HIGH_CONFIDENCE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all shrink-0 cursor-pointer ${
              filterMode === 'HIGH_CONFIDENCE'
                ? 'bg-[#00d4ff] text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                : 'bg-white/[0.05] text-[#00d4ff] hover:bg-[#00d4ff]/10'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            &gt;80% CONFIDENCE
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coin (BTC, SOL, DOGE)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-[#00ff88] transition-colors"
          />
        </div>

      </div>

      {/* Top 20 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCoins.map((coin) => {
          const isUp = coin.status === 'RISING';

          return (
            <div
              key={coin.id}
              className={`rounded-2xl border p-4.5 backdrop-blur-xl transition-all duration-300 relative overflow-hidden group hover:translate-y-[-2px] ${
                isUp
                  ? 'bg-gradient-to-br from-[#0b1b13]/80 via-black/90 to-black/90 border-[#00ff88]/30 hover:border-[#00ff88]/70 hover:shadow-[0_0_25px_rgba(0,255,136,0.18)]'
                  : 'bg-gradient-to-br from-[#1d0d0f]/80 via-black/90 to-black/90 border-red-500/30 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]'
              }`}
            >
              {/* Top ambient color dot */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-25"
                style={{ backgroundColor: coin.color }}
              />

              {/* Coin Identification Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm"
                    style={{ backgroundColor: `${coin.color}25`, color: coin.color, border: `1px solid ${coin.color}50` }}
                  >
                    {coin.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{coin.name}</span>
                      <span className="text-[10px] font-mono text-gray-400">#{coin.rank}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-300">
                      {coin.symbol}
                    </span>
                  </div>
                </div>

                {/* 1-Minute Prediction Status Badge */}
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-orbitron font-extrabold flex items-center gap-1 border shadow-sm ${
                  isUp
                    ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/50 animate-pulse'
                    : 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                }`}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{isUp ? 'RISING ▲' : 'FALLING ▼'}</span>
                </div>
              </div>

              {/* Price and Projected Move */}
              <div className="bg-black/50 p-3 rounded-xl border border-white/5 mb-3">
                <div className="flex items-baseline justify-between">
                  <div className="font-orbitron font-black text-lg text-white">
                    {formatPrice(coin.usdPrice)}
                  </div>
                  <div className={`flex items-center font-mono font-bold text-xs ${
                    isUp ? 'text-[#00ff88]' : 'text-red-400'
                  }`}>
                    {isUp ? '+' : ''}{coin.change1mPercent}%
                    <span className="text-[9px] text-gray-500 ml-1">/ 1m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono mt-1 pt-1 border-t border-white/5">
                  <span className="text-gray-400">1m Target:</span>
                  <span className={`font-bold ${isUp ? 'text-[#00ff88]' : 'text-red-400'}`}>
                    {formatPrice(coin.predictedTargetPrice)}
                  </span>
                </div>
              </div>

              {/* 5-Bar Mini-Momentum Visualizer */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>1-Min Micro Momentum</span>
                  <span className={isUp ? 'text-[#00ff88]' : 'text-red-400'}>
                    {coin.macdSignal.replace('_', ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1 h-5 items-end bg-black/40 p-1 rounded-lg border border-white/5">
                  {coin.momentumBars.map((val, idx) => {
                    const barHeight = Math.min(100, Math.max(25, Math.abs(val) * 60));
                    const barIsUp = val >= 0;
                    return (
                      <div
                        key={idx}
                        className={`w-full rounded-sm transition-all ${
                          barIsUp ? 'bg-[#00ff88]' : 'bg-red-500'
                        }`}
                        style={{ height: `${barHeight}%` }}
                        title={`Candle ${idx + 1}: ${val > 0 ? '+' : ''}${val}%`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Technical Indicator Telemetry */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-black/30 p-2.5 rounded-xl border border-white/5 mb-3">
                <div>
                  <span className="text-gray-500 block">RSI (14):</span>
                  <b className={coin.rsi14 > 65 ? 'text-[#00ff88]' : coin.rsi14 < 35 ? 'text-red-400' : 'text-white'}>
                    {coin.rsi14} {coin.rsi14 > 65 ? '(Overbought)' : coin.rsi14 < 35 ? '(Oversold)' : '(Neutral)'}
                  </b>
                </div>
                <div>
                  <span className="text-gray-500 block">Orderbook:</span>
                  <b className="text-[#00d4ff]">
                    {coin.orderbookRatio}% Buy Wall
                  </b>
                </div>
                <div>
                  <span className="text-gray-500 block">Support:</span>
                  <span className="text-gray-300">{formatPrice(coin.supportLevel)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Resistance:</span>
                  <span className="text-gray-300">{formatPrice(coin.resistanceLevel)}</span>
                </div>
              </div>

              {/* Confidence Score Bar & Footer */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-gray-400">Momentum Confidence:</span>
                  <b className="text-white font-bold">{coin.confidenceScore}%</b>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden p-0.2 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUp 
                        ? 'bg-gradient-to-r from-emerald-500 to-[#00ff88]' 
                        : 'bg-gradient-to-r from-rose-500 to-red-500'
                    }`}
                    style={{ width: `${coin.confidenceScore}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Educational & Algorithmic Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#00d4ff] shrink-0" />
          <span>
            <strong>Algorithmic Telemetry Disclosure:</strong> Status updates automatically every 60 seconds using real-time simulated orderbook volume, RSI momentum oscillators, and EMA crossover dynamics.
          </span>
        </div>
        <div className="text-[11px] text-gray-500 shrink-0">
          Refreshed: {lastRefreshedAt} • Next in {secondsRemaining}s
        </div>
      </div>
    </section>
  );
};
