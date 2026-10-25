import React, { useState, useEffect } from 'react';
import { Activity, Zap, CheckCircle2, Globe, Flame, Radio, Pause, Play, ChevronRight } from 'lucide-react';

export interface MiningEvent {
  id: string;
  flag: string;
  location: string;
  action: string;
  coin?: string;
  coinIcon?: string;
  coinColor?: string;
  amount?: string;
  timestamp: string;
}

const INITIAL_EVENTS: MiningEvent[] = [
  {
    id: 'evt-1',
    flag: '🇧🇷',
    location: 'São Paulo, Brazil',
    action: 'solved block #842,912',
    coin: 'BTC',
    coinIcon: '₿',
    coinColor: '#F7931A',
    amount: '+0.000042 BTC',
    timestamp: 'just now'
  },
  {
    id: 'evt-2',
    flag: '🇮🇳',
    location: 'Mumbai, India',
    action: 'verified Kaspa kHeavyHash share',
    coin: 'KAS',
    coinIcon: '⚡',
    coinColor: '#70C7BA',
    amount: '+12.4 KAS',
    timestamp: '2s ago'
  },
  {
    id: 'evt-3',
    flag: '🇩🇪',
    location: 'Berlin, Germany',
    action: 'boosted hash with Turbo Fan',
    coin: 'ETH',
    coinIcon: '♦',
    coinColor: '#627EEA',
    amount: '4.8 MH/s',
    timestamp: '4s ago'
  },
  {
    id: 'evt-4',
    flag: '🇯🇵',
    location: 'Tokyo, Japan',
    action: 'submitted Solana PoH block',
    coin: 'SOL',
    coinIcon: '◎',
    coinColor: '#14F195',
    amount: '+0.018 SOL',
    timestamp: '7s ago'
  },
  {
    id: 'evt-5',
    flag: '🇺🇸',
    location: 'Austin, USA',
    action: 'connected Quantum Neural Node',
    coin: 'BTC',
    coinIcon: '₿',
    coinColor: '#F7931A',
    amount: '45.2 MH/s',
    timestamp: '9s ago'
  },
  {
    id: 'evt-6',
    flag: '🇳🇬',
    location: 'Lagos, Nigeria',
    action: 'found Dogecoin dual share',
    coin: 'DOGE',
    coinIcon: 'Ð',
    coinColor: '#C2A633',
    amount: '+45.0 DOGE',
    timestamp: '12s ago'
  },
  {
    id: 'evt-7',
    flag: '🇬🇧',
    location: 'London, UK',
    action: 'reached 50,000 accepted shares',
    coin: 'TON',
    coinIcon: '💎',
    coinColor: '#0088CC',
    amount: '+0.42 TON',
    timestamp: '15s ago'
  },
  {
    id: 'evt-8',
    flag: '🇫🇷',
    location: 'Paris, France',
    action: 'solved zero-load block challenge',
    coin: 'ETH',
    coinIcon: '♦',
    coinColor: '#627EEA',
    amount: '+0.0035 ETH',
    timestamp: '18s ago'
  },
  {
    id: 'evt-9',
    flag: '🇦🇪',
    location: 'Dubai, UAE',
    action: 'synced WebNode with Global Pool',
    coin: 'XMR',
    coinIcon: 'ɱ',
    coinColor: '#FF6600',
    amount: '850 KH/s',
    timestamp: '21s ago'
  },
  {
    id: 'evt-10',
    flag: '🇰🇷',
    location: 'Seoul, South Korea',
    action: 'verified 0% hardware load test',
    coin: 'SOL',
    coinIcon: '◎',
    coinColor: '#14F195',
    amount: 'Safe 0.0W',
    timestamp: '25s ago'
  }
];

const POOL_CITIES = [
  { flag: '🇨🇦', location: 'Toronto, Canada' },
  { flag: '🇦🇺', location: 'Sydney, Australia' },
  { flag: '🇪🇸', location: 'Madrid, Spain' },
  { flag: '🇮🇹', location: 'Milan, Italy' },
  { flag: '🇲🇽', location: 'Mexico City, Mexico' },
  { flag: '🇮🇩', location: 'Jakarta, Indonesia' },
  { flag: '🇻🇳', location: 'Hanoi, Vietnam' },
  { flag: '🇹🇷', location: 'Istanbul, Turkey' },
  { flag: '🇵🇱', location: 'Warsaw, Poland' },
  { flag: '🇸🇦', location: 'Riyadh, Saudi Arabia' },
  { flag: '🇿🇦', location: 'Johannesburg, South Africa' },
  { flag: '🇸🇬', location: 'Singapore' },
  { flag: '🇧🇩', location: 'Dhaka, Bangladesh' },
  { flag: '🇵🇰', location: 'Karachi, Pakistan' }
];

const POOL_ACTIONS = [
  { action: 'solved block nonce', coin: 'BTC', icon: '₿', color: '#F7931A', amount: '+0.000035 BTC' },
  { action: 'verified Scrypt share', coin: 'LTC', icon: 'Ł', color: '#345D9D', amount: '+0.012 LTC' },
  { action: 'received mining reward', coin: 'SOL', icon: '◎', color: '#14F195', amount: '+0.024 SOL' },
  { action: 'mined GHOSTDAG share', coin: 'KAS', icon: '⚡', color: '#70C7BA', amount: '+18.5 KAS' },
  { action: 'found block hash', coin: 'ETH', icon: '♦', color: '#627EEA', amount: '+0.0028 ETH' },
  { action: 'hit 10,000 shares goal', coin: 'DOGE', icon: 'Ð', color: '#C2A633', amount: '+38 DOGE' },
  { action: 'completed PoW cycle', coin: 'TON', icon: '💎', color: '#0088CC', amount: '+0.65 TON' }
];

export const LiveMiningFeed: React.FC = () => {
  const [events, setEvents] = useState<MiningEvent[]>(INITIAL_EVENTS);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useState<'normal' | 'fast'>('normal');

  // Randomly generate and prepend new events every few seconds to simulate real-time worldwide network
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const city = POOL_CITIES[Math.floor(Math.random() * POOL_CITIES.length)];
      const act = POOL_ACTIONS[Math.floor(Math.random() * POOL_ACTIONS.length)];

      const newEvent: MiningEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        flag: city.flag,
        location: city.location,
        action: act.action,
        coin: act.coin,
        coinIcon: act.icon,
        coinColor: act.color,
        amount: act.amount,
        timestamp: 'just now'
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative z-40 bg-[#050913]/95 border-y border-[#00ff88]/20 backdrop-blur-md overflow-hidden select-none py-2 px-3 sm:px-6"
      role="region"
      aria-label="Live Global Mining Activity Ticker"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Badge: Live Ticker Indicator */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-white/10">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
            <span className="absolute w-4 h-4 rounded-full bg-[#00ff88]/30 animate-ping" />
          </div>
          <span className="font-orbitron font-extrabold text-[11px] tracking-wider text-white hidden sm:inline">
            LIVE MINING FEED
          </span>
          <span className="font-orbitron font-extrabold text-[10px] tracking-wider text-[#00ff88] sm:hidden">
            LIVE FEED
          </span>
        </div>

        {/* Center: Marquee Scrolling Stream */}
        <div 
          className="relative flex-1 overflow-hidden mask-gradient-fade"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`animate-marquee flex items-center gap-6 ${
              activeSpeed === 'fast' ? '[animation-duration:20s]' : '[animation-duration:38s]'
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Double the list to ensure seamless endless loop without jarring jumps */}
            {[...events, ...events].map((evt, idx) => (
              <div
                key={`${evt.id}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00ff88]/40 transition-all text-xs whitespace-nowrap cursor-default shadow-sm"
              >
                <span className="text-sm">{evt.flag}</span>
                <span className="font-semibold text-gray-200">{evt.location}</span>
                <span className="text-gray-400 font-mono text-[11px]">{evt.action}</span>
                {evt.coin && (
                  <span 
                    className="font-mono font-bold text-[11px] px-1.5 py-0.2 rounded"
                    style={{ color: evt.coinColor, backgroundColor: `${evt.coinColor}18` }}
                  >
                    {evt.amount}
                  </span>
                )}
                <span className="text-[10px] text-gray-500 font-mono ml-0.5">({evt.timestamp})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Controls: Pause / Play & Speed */}
        <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-white/10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume live ticker' : 'Pause ticker'}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#00ff88]" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setActiveSpeed(activeSpeed === 'normal' ? 'fast' : 'normal')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
              activeSpeed === 'fast' 
                ? 'bg-[#00d4ff]/20 text-[#00d4ff] font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Toggle ticker scroll speed"
          >
            {activeSpeed === 'fast' ? '2X' : '1X'}
          </button>
        </div>

      </div>
    </div>
  );
};
