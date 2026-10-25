export interface CryptoMinuteData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  usdPrice: number;
  rank: number;
  predictedDirection: 'UP' | 'DOWN';
  status: 'RISING' | 'FALLING';
  confidenceScore: number; // 60 to 95%
  change1mPercent: number; // e.g. +0.34% or -0.28%
  predictedTargetPrice: number;
  supportLevel: number;
  resistanceLevel: number;
  rsi14: number; // 0 to 100
  macdSignal: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'STRONG_MOMENTUM' | 'OVERSOLD_BOUNCE' | 'OVERBOUGHT_DUMP';
  orderbookRatio: number; // Buy pressure % (e.g. 68% buy vs 32% sell)
  volume24h: string;
  marketCap: string;
  momentumBars: number[]; // 5 recent 1-minute candle relative variations (-2 to +2)
}

export const TOP_20_COINS_BASE: Omit<CryptoMinuteData, 'predictedDirection' | 'status' | 'confidenceScore' | 'change1mPercent' | 'predictedTargetPrice' | 'supportLevel' | 'resistanceLevel' | 'rsi14' | 'macdSignal' | 'orderbookRatio' | 'momentumBars'>[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    usdPrice: 68450.0,
    rank: 1,
    volume24h: '$38.2B',
    marketCap: '$1.35T'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '♦',
    color: '#627EEA',
    usdPrice: 3520.0,
    rank: 2,
    volume24h: '$18.9B',
    marketCap: '$424B'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    color: '#14F195',
    usdPrice: 178.5,
    rank: 3,
    volume24h: '$6.7B',
    marketCap: '$84.2B'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    icon: '🔶',
    color: '#F3BA2F',
    usdPrice: 595.2,
    rank: 4,
    volume24h: '$1.8B',
    marketCap: '$87.1B'
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    icon: '✕',
    color: '#23292F',
    usdPrice: 0.584,
    rank: 5,
    volume24h: '$1.4B',
    marketCap: '$32.8B'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '₳',
    color: '#0033AD',
    usdPrice: 0.425,
    rank: 6,
    volume24h: '$410M',
    marketCap: '$15.2B'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: 'Ð',
    color: '#C2A633',
    usdPrice: 0.165,
    rank: 7,
    volume24h: '$2.1B',
    marketCap: '$24.1B'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    icon: '🔺',
    color: '#E84142',
    usdPrice: 28.4,
    rank: 8,
    volume24h: '$390M',
    marketCap: '$11.4B'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    icon: '●',
    color: '#E6007A',
    usdPrice: 5.12,
    rank: 9,
    volume24h: '$210M',
    marketCap: '$7.4B'
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    icon: '⬡',
    color: '#375BD2',
    usdPrice: 13.85,
    rank: 10,
    volume24h: '$340M',
    marketCap: '$8.4B'
  },
  {
    id: 'tron',
    name: 'Tron',
    symbol: 'TRX',
    icon: 'TRX',
    color: '#FF0013',
    usdPrice: 0.162,
    rank: 11,
    volume24h: '$480M',
    marketCap: '$14.1B'
  },
  {
    id: 'polygon',
    name: 'Polygon Ecosystem',
    symbol: 'POL',
    icon: '🟣',
    color: '#8247E5',
    usdPrice: 0.418,
    rank: 12,
    volume24h: '$180M',
    marketCap: '$3.3B'
  },
  {
    id: 'toncoin',
    name: 'Toncoin',
    symbol: 'TON',
    icon: '💎',
    color: '#0088CC',
    usdPrice: 6.85,
    rank: 13,
    volume24h: '$840M',
    marketCap: '$17.4B'
  },
  {
    id: 'kaspa',
    name: 'Kaspa',
    symbol: 'KAS',
    icon: '⚡',
    color: '#70C7BA',
    usdPrice: 0.142,
    rank: 14,
    volume24h: '$94M',
    marketCap: '$3.5B'
  },
  {
    id: 'near',
    name: 'NEAR Protocol',
    symbol: 'NEAR',
    icon: 'Ⓝ',
    color: '#000000',
    usdPrice: 5.62,
    rank: 15,
    volume24h: '$460M',
    marketCap: '$6.8B'
  },
  {
    id: 'shiba',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    icon: '🐕',
    color: '#FFA409',
    usdPrice: 0.0000185,
    rank: 16,
    volume24h: '$390M',
    marketCap: '$10.9B'
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    icon: 'Ł',
    color: '#345D9D',
    usdPrice: 84.6,
    rank: 17,
    volume24h: '$720M',
    marketCap: '$6.3B'
  },
  {
    id: 'monero',
    name: 'Monero',
    symbol: 'XMR',
    icon: 'ɱ',
    color: '#FF6600',
    usdPrice: 154.2,
    rank: 18,
    volume24h: '$162M',
    marketCap: '$2.8B'
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    symbol: 'UNI',
    icon: '🦄',
    color: '#FF007A',
    usdPrice: 8.74,
    rank: 19,
    volume24h: '$230M',
    marketCap: '$5.2B'
  },
  {
    id: 'bitcoincash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    icon: 'Ƀ',
    color: '#0AC18E',
    usdPrice: 382.4,
    rank: 20,
    volume24h: '$310M',
    marketCap: '$7.5B'
  }
];

/**
 * Generates dynamic 1-minute prediction telemetry for each of the top 20 coins
 * based on cycle seed and technical indicators
 */
export function generateMinutePredictions(cycleSeed: number): CryptoMinuteData[] {
  return TOP_20_COINS_BASE.map((coin, index) => {
    // Deterministic pseudo-random seed per coin per minute
    const coinSeed = (cycleSeed * 37 + index * 19 + coin.symbol.charCodeAt(0) * 11) % 1000;
    const normalizedSeed = coinSeed / 1000; // 0.0 to 1.0

    // Algorithmic momentum calculation: ~58% rising bias (crypto typical trend) with dynamic rotation
    const isRising = normalizedSeed > 0.42;
    const status: 'RISING' | 'FALLING' = isRising ? 'RISING' : 'FALLING';
    const predictedDirection: 'UP' | 'DOWN' = isRising ? 'UP' : 'DOWN';

    // Confidence score: 65% to 94%
    const confidenceScore = Math.floor(68 + (normalizedSeed * 25));

    // 1-minute price change prediction: ±0.15% to ±0.85%
    const magnitude = 0.15 + ((coinSeed % 70) / 100);
    const change1mPercent = parseFloat((isRising ? magnitude : -magnitude).toFixed(2));

    // Dynamic spot price fluctuation
    const priceDelta = coin.usdPrice * (change1mPercent / 100);
    const currentPrice = parseFloat((coin.usdPrice + (priceDelta * 0.4)).toFixed(coin.usdPrice < 0.01 ? 8 : coin.usdPrice < 1 ? 4 : 2));
    const predictedTargetPrice = parseFloat((currentPrice * (1 + (change1mPercent / 100))).toFixed(coin.usdPrice < 0.01 ? 8 : coin.usdPrice < 1 ? 4 : 2));

    const supportLevel = parseFloat((currentPrice * 0.985).toFixed(coin.usdPrice < 0.01 ? 8 : coin.usdPrice < 1 ? 4 : 2));
    const resistanceLevel = parseFloat((currentPrice * 1.015).toFixed(coin.usdPrice < 0.01 ? 8 : coin.usdPrice < 1 ? 4 : 2));

    // RSI(14)
    const rsi14 = isRising
      ? Math.floor(52 + (normalizedSeed * 26)) // 52 to 78 (Bullish territory)
      : Math.floor(30 + (normalizedSeed * 25)); // 30 to 55 (Bearish territory)

    // MACD Signal
    let macdSignal: CryptoMinuteData['macdSignal'] = 'STRONG_MOMENTUM';
    if (isRising && rsi14 > 70) macdSignal = 'STRONG_MOMENTUM';
    else if (isRising) macdSignal = 'BULLISH_CROSS';
    else if (!isRising && rsi14 < 35) macdSignal = 'OVERSOLD_BOUNCE';
    else if (!isRising) macdSignal = 'BEARISH_CROSS';

    // Orderbook ratio (% Buy wall)
    const orderbookRatio = isRising ? Math.floor(58 + (normalizedSeed * 32)) : Math.floor(30 + (normalizedSeed * 25));

    // 5-bar mini-momentum history (-2 to +2 relative values)
    const momentumBars = [
      isRising ? 0.4 : -0.3,
      isRising ? 0.8 : -0.6,
      isRising ? 1.2 : -1.0,
      isRising ? 1.6 : -1.4,
      change1mPercent
    ];

    return {
      ...coin,
      usdPrice: currentPrice,
      predictedDirection,
      status,
      confidenceScore,
      change1mPercent,
      predictedTargetPrice,
      supportLevel,
      resistanceLevel,
      rsi14,
      macdSignal,
      orderbookRatio,
      momentumBars
    };
  });
}
