import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Flame, 
  Gauge, 
  Compass, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Info,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Layers
} from 'lucide-react';
import { Coin, COINS } from '../data/coins';

interface MarketSentimentProps {
  selectedCoin: Coin;
  onSelectCoin?: (coin: Coin) => void;
  isOverclocked?: boolean;
}

interface PriceDataPoint {
  timeLabel: string;
  price: number;
  volume: number; // in USD
  isUp: boolean;
}

interface CoinSentimentProfile {
  fearGreedScore: number;
  fearGreedLabel: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  bullishPercent: number;
  volatility24h: string;
  dominance: string;
  simulatedVolume24h: string;
  signal: 'STRONG BUY' | 'BULLISH ACCUMULATION' | 'HOLD / MINE' | 'MODERATE VOLATILITY';
}

export const MarketSentiment: React.FC<MarketSentimentProps> = ({
  selectedCoin,
  onSelectCoin,
  isOverclocked = false
}) => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
  const [hoveredPoint, setHoveredPoint] = useState<PriceDataPoint | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [userVote, setUserVote] = useState<'bull' | 'bear' | null>(null);
  const [tickCounter, setTickCounter] = useState<number>(0);

  // Periodic subtle micro-fluctuation to make the market feel alive and data-driven
  useEffect(() => {
    const timer = setInterval(() => {
      setTickCounter((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Compute sentiment profile deterministically based on coin
  const sentimentProfile: CoinSentimentProfile = useMemo(() => {
    // Deterministic pseudo-seed based on coin id length and char codes
    const seed = selectedCoin.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const baseScore = 55 + (seed % 35); // 55 to 89
    const fearGreedScore = Math.min(94, Math.max(38, baseScore + (isOverclocked ? 4 : 0)));

    let fearGreedLabel: CoinSentimentProfile['fearGreedLabel'] = 'Greed';
    if (fearGreedScore >= 80) fearGreedLabel = 'Extreme Greed';
    else if (fearGreedScore >= 60) fearGreedLabel = 'Greed';
    else if (fearGreedScore >= 45) fearGreedLabel = 'Neutral';
    else fearGreedLabel = 'Fear';

    const bullishPercent = Math.min(88, Math.max(45, 52 + (seed % 32)));

    // Simulated volume formatted string
    let volumeStr = '$24.8B';
    if (selectedCoin.symbol === 'BTC') volumeStr = '$38.45B';
    else if (selectedCoin.symbol === 'ETH') volumeStr = '$19.20B';
    else if (selectedCoin.symbol === 'SOL') volumeStr = '$6.84B';
    else if (selectedCoin.symbol === 'DOGE') volumeStr = '$2.15B';
    else if (selectedCoin.symbol === 'TON') volumeStr = '$840M';
    else if (selectedCoin.symbol === 'XMR') volumeStr = '$162M';
    else if (selectedCoin.symbol === 'KAS') volumeStr = '$94M';
    else if (selectedCoin.symbol === 'LTC') volumeStr = '$720M';

    let signal: CoinSentimentProfile['signal'] = 'BULLISH ACCUMULATION';
    if (fearGreedScore >= 78) signal = 'STRONG BUY';
    else if (bullishPercent > 70) signal = 'BULLISH ACCUMULATION';
    else if (fearGreedScore >= 60) signal = 'HOLD / MINE';
    else signal = 'MODERATE VOLATILITY';

    return {
      fearGreedScore,
      fearGreedLabel,
      bullishPercent,
      volatility24h: (2.4 + ((seed % 10) * 0.4)).toFixed(1) + '%',
      dominance: selectedCoin.symbol === 'BTC' ? '54.2%' : selectedCoin.symbol === 'ETH' ? '17.8%' : '4.1%',
      simulatedVolume24h: volumeStr,
      signal
    };
  }, [selectedCoin, isOverclocked]);

  // Generate synthetic historical price & volume points for the selected coin & timeframe
  const chartData = useMemo(() => {
    const pointsCount = timeframe === '1H' ? 20 : timeframe === '24H' ? 24 : timeframe === '7D' ? 28 : 30;
    const data: PriceDataPoint[] = [];

    const basePrice = selectedCoin.usdPrice;
    // Volatility swing range (±3% to ±6%)
    const volatilityFactor = (timeframe === '1H' ? 0.012 : timeframe === '24H' ? 0.045 : 0.08);

    // Seeded random walk starting from historical price to current price
    let currentWalkPrice = basePrice * (1 - (volatilityFactor * 0.7));
    
    // Deterministic pseudo-random helper based on coin and tick
    const hashSeed = (idx: number) => {
      const charVal = selectedCoin.symbol.charCodeAt(idx % selectedCoin.symbol.length);
      return Math.sin(idx * 9301 + charVal * 49297 + (tickCounter % 5) * 0.1) * 0.5 + 0.5;
    };

    for (let i = 0; i < pointsCount; i++) {
      const progress = i / (pointsCount - 1);
      const rand = hashSeed(i);
      
      // Upward trend with realistic wave motion
      const trend = (rand - 0.44) * (basePrice * volatilityFactor * 0.35);
      const wave = Math.sin(progress * Math.PI * 3) * (basePrice * volatilityFactor * 0.2);
      
      currentWalkPrice = Math.max(basePrice * 0.6, currentWalkPrice + trend + wave);

      // On the final point, match current simulated spot price closely
      if (i === pointsCount - 1) {
        currentWalkPrice = basePrice * (1 + (hashSeed(999) - 0.5) * 0.004);
      }

      // Generate time label
      let label = '';
      if (timeframe === '1H') {
        const minsAgo = Math.round((pointsCount - 1 - i) * (60 / pointsCount));
        label = minsAgo === 0 ? 'Now' : `-${minsAgo}m`;
      } else if (timeframe === '24H') {
        const hoursAgo = Math.round((pointsCount - 1 - i) * (24 / pointsCount));
        label = hoursAgo === 0 ? 'Now' : `-${hoursAgo}h`;
      } else if (timeframe === '7D') {
        const daysAgo = Math.round((pointsCount - 1 - i) * (7 / pointsCount));
        label = daysAgo === 0 ? 'Today' : `-${daysAgo}d`;
      } else {
        const daysAgo = Math.round((pointsCount - 1 - i));
        label = daysAgo === 0 ? 'Today' : `-${daysAgo}d`;
      }

      // Simulated volume per slice
      const volBase = (basePrice * 1000) * (0.6 + rand * 0.8);
      const isUp = i === 0 ? true : currentWalkPrice >= (data[i - 1]?.price || currentWalkPrice);

      data.push({
        timeLabel: label,
        price: currentWalkPrice,
        volume: volBase,
        isUp
      });
    }

    return data;
  }, [selectedCoin, timeframe, tickCounter]);

  // Derived calculations: 24h change %, High, Low
  const firstPrice = chartData[0]?.price || selectedCoin.usdPrice;
  const latestPrice = chartData[chartData.length - 1]?.price || selectedCoin.usdPrice;
  const priceChange = latestPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100);
  const isPositive = priceChangePercent >= 0;

  const minPrice = Math.min(...chartData.map((d) => d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.price));
  const maxVolume = Math.max(...chartData.map((d) => d.volume));

  // SVG Coordinates calculation
  const svgWidth = 600;
  const svgHeight = 160;
  const paddingX = 16;
  const paddingY = 20;
  const volumeBarHeight = 45; // Height reserved for volume bars at bottom
  const priceChartHeight = svgHeight - volumeBarHeight - paddingY;

  const priceRange = maxPrice - minPrice || 1;

  // Build sparkline coordinates
  const points = chartData.map((d, index) => {
    const x = paddingX + (index / (chartData.length - 1)) * (svgWidth - paddingX * 2);
    // Invert Y so highest price is near top
    const normalizedPrice = (d.price - minPrice) / priceRange;
    const y = paddingY + (1 - normalizedPrice) * priceChartHeight;
    return { x, y, data: d, index };
  });

  // Generate smooth SVG curve path using cubic bezier segments
  const pathD = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  // Closed area path for gradient fill
  const areaD = useMemo(() => {
    if (points.length < 2) return '';
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const baselineY = svgHeight - volumeBarHeight;
    return `${pathD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [pathD, points]);

  // Active highlighted point (hovered or last)
  const activePoint = hoveredPoint || chartData[chartData.length - 1];
  const activeIndex = hoverIndex !== null ? hoverIndex : points.length - 1;
  const activeCoord = points[activeIndex] || points[points.length - 1];

  // Number format helper
  const formatCurrency = (val: number) => {
    if (val >= 1000) {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (val >= 1) {
      return `$${val.toFixed(3)}`;
    }
    return `$${val.toFixed(6)}`;
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 relative overflow-hidden ${
      isOverclocked
        ? 'bg-gradient-to-br from-[#180903]/95 via-[#0e0603]/95 to-black/95 border-orange-500/40 shadow-[0_0_35px_rgba(255,107,0,0.18)]'
        : 'bg-gradient-to-br from-[#0b1220]/95 via-[#080d19]/95 to-black/95 border-white/12 shadow-[0_0_30px_rgba(0,212,255,0.08)]'
    }`}>
      
      {/* Ambient background glow matching coin brand color */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: selectedCoin.color }}
      />

      {/* Header: Title, Coin Pill Selector & Timeframe Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
        
        {/* Left: Title & Subtitle */}
        <div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm"
              style={{ 
                backgroundColor: `${selectedCoin.color}25`, 
                color: selectedCoin.color, 
                border: `1px solid ${selectedCoin.color}60` 
              }}
            >
              {selectedCoin.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white">
                  Market Sentiment &amp; Price Action
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-gray-300 border border-white/15">
                  SIMULATED SPOT
                </span>
                {isOverclocked && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-orbitron font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1 animate-pulse">
                    <Zap className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                    VOLATILITY BOOST
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Simulated real-time exchange orderbook &amp; volume telemetry for <span className="text-white font-semibold">{selectedCoin.name} ({selectedCoin.symbol})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Timeframe Selector */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 self-end md:self-center">
          {(['1H', '24H', '7D', '30D'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-[11px] font-orbitron font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

      </div>

      {/* Coin Switcher Ribbon (Pill selector) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-thin scrollbar-thumb-white/10">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Layers className="w-3.5 h-3.5 text-[#00d4ff]" /> Select Coin:
        </span>
        {COINS.map((c) => {
          const isSelected = c.id === selectedCoin.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCoin && onSelectCoin(c)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-white/15 text-white shadow-md'
                  : 'bg-black/30 text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200'
              }`}
              style={{
                borderColor: isSelected ? c.color : undefined,
                boxShadow: isSelected ? `0 0 14px ${c.color}40` : undefined
              }}
            >
              <span style={{ color: c.color }} className="font-bold">{c.icon}</span>
              <span>{c.symbol}</span>
              <span className="text-[10px] text-gray-500 font-normal">
                {c.usdPrice >= 1 ? `$${Math.round(c.usdPrice).toLocaleString()}` : `$${c.usdPrice.toFixed(3)}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Stats Row: Price, 24h Change, Fear & Greed Index, Bullish Ratio */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
        
        {/* Stat 1: Simulated Spot Price & 24h Change */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono mb-1">
            <span>Simulated Spot Price</span>
            <span className="text-[10px] text-gray-500">USD</span>
          </div>
          <div className="font-orbitron font-extrabold text-lg sm:text-2xl text-white tracking-tight">
            {formatCurrency(activePoint?.price || selectedCoin.usdPrice)}
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
              isPositive 
                ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30' 
                : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </span>
            <span className="text-[10px] text-gray-500 font-mono">({timeframe})</span>
          </div>
        </div>

        {/* Stat 2: Fear & Greed Index */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono mb-1">
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#00d4ff]" /> Fear &amp; Greed
            </span>
            <span className="text-[10px] text-gray-500">Global Score</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <div className="font-orbitron font-black text-xl sm:text-2xl text-[#00ff88]">
              {sentimentProfile.fearGreedScore}
            </div>
            <span className="text-xs text-gray-400 font-mono">/ 100</span>
          </div>

          <div className="mt-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1">
              <span className="text-[#00ff88] font-bold">{sentimentProfile.fearGreedLabel}</span>
              <span className="text-gray-500">Signal: {sentimentProfile.signal}</span>
            </div>
            {/* Meter Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-[#00ff88] rounded-full transition-all duration-500"
                style={{ width: `${sentimentProfile.fearGreedScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stat 3: Community Sentiment (Bullish vs Bearish) */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono mb-1">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" /> Sentiment Ratio
            </span>
            <span className="text-[10px] text-gray-500">1.2M Miners</span>
          </div>

          <div className="flex items-center justify-between font-mono text-xs mb-1">
            <span className="text-[#00ff88] font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {sentimentProfile.bullishPercent}% Bull
            </span>
            <span className="text-red-400 font-bold flex items-center gap-1">
              {100 - sentimentProfile.bullishPercent}% Bear <TrendingDown className="w-3 h-3" />
            </span>
          </div>

          {/* Dual Segmented Bar */}
          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden flex p-0.5 border border-white/10">
            <div 
              className="h-full bg-[#00ff88] rounded-l-full transition-all duration-300"
              style={{ width: `${sentimentProfile.bullishPercent}%` }}
            />
            <div 
              className="h-full bg-red-500 rounded-r-full transition-all duration-300"
              style={{ width: `${100 - sentimentProfile.bullishPercent}%` }}
            />
          </div>

          {/* Quick Vote Pills */}
          <div className="flex items-center justify-between gap-1.5 mt-2">
            <button
              onClick={() => setUserVote('bull')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                userVote === 'bull'
                  ? 'bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]'
                  : 'bg-white/[0.04] text-gray-400 hover:text-[#00ff88]'
              }`}
            >
              <ThumbsUp className="w-2.5 h-2.5" /> Bullish
            </button>
            <button
              onClick={() => setUserVote('bear')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                userVote === 'bear'
                  ? 'bg-red-500/30 text-red-400 border border-red-500'
                  : 'bg-white/[0.04] text-gray-400 hover:text-red-400'
              }`}
            >
              <ThumbsDown className="w-2.5 h-2.5" /> Bearish
            </button>
          </div>
        </div>

        {/* Stat 4: 24h High / Low & Volume */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Range &amp; Volume
            </span>
            <span className="text-[10px] text-gray-500">24H High/Low</span>
          </div>

          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">High:</span>
              <span className="text-white font-bold">{formatCurrency(maxPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Low:</span>
              <span className="text-white font-bold">{formatCurrency(minPrice)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-gray-400">Sim. 24h Vol:</span>
              <span className="text-[#00d4ff] font-bold">{sentimentProfile.simulatedVolume24h}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Sparkline & Volume Interactive SVG Chart Canvas */}
      <div className="bg-black/60 border border-white/10 rounded-2xl p-4 relative overflow-hidden">
        
        {/* Floating crosshair tooltip */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedCoin.color }} />
            <span className="text-gray-300 font-bold">
              {activePoint.timeLabel === 'Now' || activePoint.timeLabel === 'Today' ? 'LIVE ORDERBOOK' : `HISTORICAL TICK (${activePoint.timeLabel})`}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-gray-400">
              Price: <b className="text-white">{formatCurrency(activePoint.price)}</b>
            </span>
            <span className="text-gray-400 hidden sm:inline">
              Sim. Volume: <b className="text-[#00d4ff]">${(activePoint.volume / 1000).toFixed(1)}K</b>
            </span>
            <span className="text-gray-400">
              Trend: <b className={isPositive ? 'text-[#00ff88]' : 'text-red-400'}>{isPositive ? '▲ UP' : '▼ DOWN'}</b>
            </span>
          </div>
        </div>

        {/* SVG Sparkline Container */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/7] max-h-[190px]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Sparkline Area Gradient */}
              <linearGradient id={`grad-${selectedCoin.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedCoin.color} stopOpacity="0.45" />
                <stop offset="60%" stopColor={selectedCoin.color} stopOpacity="0.10" />
                <stop offset="100%" stopColor={selectedCoin.color} stopOpacity="0.0" />
              </linearGradient>

              {/* Volume Bar Gradient */}
              <linearGradient id="vol-green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="vol-red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="sparkline-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line 
              x1={paddingX} 
              y1={paddingY} 
              x2={svgWidth - paddingX} 
              y2={paddingY} 
              stroke="rgba(255,255,255,0.06)" 
              strokeDasharray="4 4" 
            />
            <line 
              x1={paddingX} 
              y1={paddingY + priceChartHeight / 2} 
              x2={svgWidth - paddingX} 
              y2={paddingY + priceChartHeight / 2} 
              stroke="rgba(255,255,255,0.06)" 
              strokeDasharray="4 4" 
            />
            <line 
              x1={paddingX} 
              y1={svgHeight - volumeBarHeight} 
              x2={svgWidth - paddingX} 
              y2={svgHeight - volumeBarHeight} 
              stroke="rgba(255,255,255,0.12)" 
            />

            {/* Volume Histogram Bars underneath */}
            {points.map((pt, i) => {
              const barWidth = Math.max(3, (svgWidth - paddingX * 2) / points.length - 3);
              const volRatio = pt.data.volume / (maxVolume || 1);
              const barHeight = Math.max(4, volRatio * (volumeBarHeight - 10));
              const barY = svgHeight - barHeight;
              const barX = pt.x - barWidth / 2;

              return (
                <rect
                  key={`vol-${i}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  rx="1.5"
                  fill={pt.data.isUp ? 'url(#vol-green)' : 'url(#vol-red)'}
                  opacity={hoverIndex === i ? 1 : 0.6}
                  className="transition-opacity"
                />
              );
            })}

            {/* Sparkline Area Fill */}
            <path
              d={areaD}
              fill={`url(#grad-${selectedCoin.id})`}
            />

            {/* Main Sparkline Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke={selectedCoin.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#sparkline-glow)"
            />

            {/* Active Vertical Crosshair Line */}
            {activeCoord && (
              <line
                x1={activeCoord.x}
                y1={paddingY}
                x2={activeCoord.x}
                y2={svgHeight}
                stroke={selectedCoin.color}
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.8"
              />
            )}

            {/* Active Point Circle / Pulse */}
            {activeCoord && (
              <g>
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="5"
                  fill={selectedCoin.color}
                  stroke="#000"
                  strokeWidth="2"
                />
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="9"
                  fill="none"
                  stroke={selectedCoin.color}
                  strokeWidth="1.5"
                  opacity="0.6"
                  className="animate-ping"
                />
              </g>
            )}

            {/* Transparent Overlay Rectangles for easy mouse scrub & touch */}
            {points.map((pt, i) => {
              const colWidth = (svgWidth - paddingX * 2) / points.length;
              return (
                <rect
                  key={`hit-${i}`}
                  x={pt.x - colWidth / 2}
                  y={0}
                  width={colWidth}
                  height={svgHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => {
                    setHoveredPoint(pt.data);
                    setHoverIndex(i);
                  }}
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    setHoverIndex(null);
                  }}
                  onTouchStart={() => {
                    setHoveredPoint(pt.data);
                    setHoverIndex(i);
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Chart Bottom Label Legend */}
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-white/5 mt-1">
          <span>{chartData[0]?.timeLabel || 'Past'}</span>
          <span className="flex items-center gap-1 text-gray-400">
            <span className="inline-block w-2.5 h-1.5 rounded-sm bg-[#00ff88]/60" /> Volume Bars
            <span className="inline-block w-2.5 h-1.5 rounded-sm bg-white/40 ml-2" /> Price Sparkline
          </span>
          <span>{chartData[chartData.length - 1]?.timeLabel || 'Now'}</span>
        </div>

      </div>

      {/* Footer Insight Strip: Mining Correlation */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#00ff88]" />
          <span>
            Proof-of-Work Mining Yield Synergy: <span className="text-white font-bold">{selectedCoin.algorithm}</span>
          </span>
        </div>
        <div className="text-[11px] text-gray-400">
          Estimated Reward Index: <span className="text-[#00d4ff] font-bold">1 {selectedCoin.symbol} ≈ ${selectedCoin.usdPrice.toLocaleString()} USD</span>
        </div>
      </div>

    </div>
  );
};
