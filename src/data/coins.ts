export interface Coin {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  algorithm: string;
  usdPrice: number;
  baseRewardRate: number; // Base coins mined per hash unit
  decimals: number;
}

export const COINS: Coin[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    algorithm: 'SHA-256 (Free Sim)',
    usdPrice: 68450.0,
    baseRewardRate: 0.000000012,
    decimals: 8
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '♦',
    color: '#627EEA',
    algorithm: 'Ethash (Free Sim)',
    usdPrice: 3520.0,
    baseRewardRate: 0.000000174,
    decimals: 6
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    color: '#14F195',
    algorithm: 'PoH Turbo Engine',
    usdPrice: 178.5,
    baseRewardRate: 0.0000054,
    decimals: 4
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: 'Ð',
    color: '#C2A633',
    algorithm: 'Scrypt Dual-Mining',
    usdPrice: 0.165,
    baseRewardRate: 0.0042,
    decimals: 4
  },
  {
    id: 'kas',
    name: 'Kaspa',
    symbol: 'KAS',
    icon: '⚡',
    color: '#70C7BA',
    algorithm: 'kHeavyHash GHOSTDAG',
    usdPrice: 0.142,
    baseRewardRate: 0.0088,
    decimals: 4
  },
  {
    id: 'ton',
    name: 'Toncoin',
    symbol: 'TON',
    icon: '💎',
    color: '#0088CC',
    algorithm: 'TON PoW Giver Node',
    usdPrice: 6.85,
    baseRewardRate: 0.00018,
    decimals: 5
  },
  {
    id: 'xmr',
    name: 'Monero',
    symbol: 'XMR',
    icon: 'ɱ',
    color: '#FF6600',
    algorithm: 'RandomX CPU Engine',
    usdPrice: 154.2,
    baseRewardRate: 0.0000062,
    decimals: 6
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    icon: 'Ł',
    color: '#345D9D',
    algorithm: 'Scrypt Lightning',
    usdPrice: 84.6,
    baseRewardRate: 0.000011,
    decimals: 5
  }
];

export interface MiningRig {
  id: string;
  name: string;
  multiplier: number;
  hashRange: string;
  tag: string;
  description: string;
  efficiency: string;
}

export const MINING_RIGS: MiningRig[] = [
  {
    id: 'browser',
    name: 'Browser WebNode v4',
    multiplier: 1.0,
    hashRange: '450 - 950 KH/s',
    tag: 'FREE STANDARD',
    description: 'Instant zero-configuration browser CPU simulation',
    efficiency: '99.4%'
  },
  {
    id: 'multigpu',
    name: 'Octa-GPU Rig Matrix',
    multiplier: 3.5,
    hashRange: '2.8 - 4.5 MH/s',
    tag: 'BOOSTED x3.5',
    description: 'High-throughput parallelized virtual CUDA cores',
    efficiency: '99.8%'
  },
  {
    id: 'asic',
    name: 'Antminer S21 Pro Sim',
    multiplier: 8.0,
    hashRange: '8.5 - 15.2 MH/s',
    tag: 'ULTRA SPEED x8',
    description: 'Specialized virtual ASIC chip architecture simulation',
    efficiency: '99.9%'
  },
  {
    id: 'quantum',
    name: 'Quantum Neural Node',
    multiplier: 25.0,
    hashRange: '35.0 - 75.0 MH/s',
    tag: 'MAX POWER x25',
    description: 'Experimental next-gen quantum hashing algorithm',
    efficiency: '100.0%'
  }
];
