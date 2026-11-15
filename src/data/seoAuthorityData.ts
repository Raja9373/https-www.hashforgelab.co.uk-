export interface KeywordCluster {
  id: string;
  clusterName: string;
  searchIntent: 'Informational' | 'Tool / Interactive' | 'Comparison' | 'Problem-Solving' | 'Question-Based';
  targetRoute: string;
  targetSectionId: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  questionKeywords: string[];
  rationale: string;
}

export interface AlgorithmProfile {
  id: string;
  slug: string;
  algorithmName: string;
  primaryCoins: string[];
  hashFunctionStandard: string;
  blockTimeTarget: string;
  typicalHardwareClass: string;
  physicalPowerDrawWatts: number;
  networkConsensusType: string;
  technicalSummary: string;
  cryptographicMechanics: string;
  educationalTakeaway: string;
  authoritativeSource: {
    title: string;
    citation: string;
    url: string;
  };
  lastVerified: string;
}

export interface PillarArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Pillar Guide' | 'Technical Comparison' | 'Step-by-Step Tutorial' | 'Original Research';
  readTime: string;
  lastUpdated: string;
  lastVerified: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  reviewer: {
    name: string;
    role: string;
  };
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  citations: {
    label: string;
    reference: string;
    url: string;
  }[];
  relatedSectionId: string;
}

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: 'cluster-simulator',
    clusterName: 'Crypto Mining Simulation & Zero-Load Learning',
    searchIntent: 'Tool / Interactive',
    targetRoute: 'https://www.hashforgelab.co.uk/#simulator',
    targetSectionId: 'simulator',
    primaryKeyword: 'free crypto mining simulator',
    longTailKeywords: [
      'browser based bitcoin mining simulator without hardware',
      'educational proof of work mining terminal online',
      'simulate sha256 hash calculation in browser free',
      'virtual crypto mining rig overclock simulator'
    ],
    questionKeywords: [
      'how to practice crypto mining without buying an asic',
      'can you simulate bitcoin mining on a laptop safely'
    ],
    rationale: 'Targets users seeking hands-on interactive mining mechanics without risking physical GPU/CPU wear or capital outlay.'
  },
  {
    id: 'cluster-calculator',
    clusterName: 'Mining Profitability, Wattage & Hashrate Math',
    searchIntent: 'Problem-Solving',
    targetRoute: 'https://www.hashforgelab.co.uk/#mining-calculator',
    targetSectionId: 'mining-calculator',
    primaryKeyword: 'crypto mining electricity cost vs simulation calculator',
    longTailKeywords: [
      'asic miner kwh electricity bill calculator',
      'sha256 difficulty to nonce probability calculator',
      'antminer s21 power consumption cost per day',
      'gpu vs asic energy efficiency j/th comparison'
    ],
    questionKeywords: [
      'how much electricity does a bitcoin miner use per month',
      'why is home crypto mining unprofitable with high kwh rates'
    ],
    rationale: 'Solves the core mathematical question beginners face: why physical mining costs thousands in electricity and how difficulty scales.'
  },
  {
    id: 'cluster-algorithms',
    clusterName: 'Cryptographic Hashing Algorithms (SHA-256, Scrypt, kHeavyHash, RandomX)',
    searchIntent: 'Informational',
    targetRoute: 'https://www.hashforgelab.co.uk/#algorithm-research-hub',
    targetSectionId: 'algorithm-research-hub',
    primaryKeyword: 'proof of work mining algorithms explained',
    longTailKeywords: [
      'sha256 vs scrypt vs randomx technical comparison',
      'kaspa kheavyhash ghostdag blockdag consensus mechanics',
      'monero randomx cpu cache memory hard mining explained',
      'how nonce and target difficulty work in bitcoin blocks'
    ],
    questionKeywords: [
      'what is the difference between sha256 and scrypt mining',
      'why can monero be mined on cpus while bitcoin requires asics'
    ],
    rationale: 'Builds deep topical authority across computer science and cryptographic consensus mechanisms.'
  },
  {
    id: 'cluster-comparisons',
    clusterName: 'Physical Hardware vs. Cloud Mining vs. Browser Simulation',
    searchIntent: 'Comparison',
    targetRoute: 'https://www.hashforgelab.co.uk/#authority-guides',
    targetSectionId: 'authority-guides',
    primaryKeyword: 'cloud mining vs hardware mining vs mining simulator',
    longTailKeywords: [
      'risks of cloud mining contracts vs educational simulators',
      'why browser mining scripts were replaced by safe simulations',
      'asic hardware depreciation and thermal management guide'
    ],
    questionKeywords: [
      'is cloud mining worth it or a scam compared to learning free',
      'does browser crypto simulation use my real cpu or gpu'
    ],
    rationale: 'Captures high-intent comparison traffic and protects users by contrasting risky cloud contracts against transparent zero-load education.'
  },
  {
    id: 'cluster-momentum',
    clusterName: 'Short-Term Crypto Technical Indicators (RSI, EMA, Orderbook)',
    searchIntent: 'Question-Based',
    targetRoute: 'https://www.hashforgelab.co.uk/#crypto-minute-predictions',
    targetSectionId: 'crypto-minute-predictions',
    primaryKeyword: '1 minute crypto momentum indicators rsi ema',
    longTailKeywords: [
      'real time top 20 crypto rsi 14 and macd signal tracker',
      'how orderbook buy walls affect 1 minute crypto price action',
      'short term bullish and bearish micro trend analysis'
    ],
    questionKeywords: [
      'how do rsi and ema crossovers indicate rising or falling crypto trends',
      'can 1 minute cryptocurrency momentum signals predict market direction'
    ],
    rationale: 'Aligns the 1-minute prediction engine with educational technical analysis queries (RSI, MACD, orderbook depth).'
  }
];

export const ALGORITHM_PROFILES: AlgorithmProfile[] = [
  {
    id: 'alg-sha256',
    slug: 'sha-256-bitcoin',
    algorithmName: 'SHA-256 (Secure Hash Algorithm 256-bit)',
    primaryCoins: ['Bitcoin (BTC)', 'Bitcoin Cash (BCH)'],
    hashFunctionStandard: 'NIST FIPS PUB 180-4 (Double SHA-256)',
    blockTimeTarget: '10 Minutes (600 seconds)',
    typicalHardwareClass: 'Application-Specific Integrated Circuits (ASIC, e.g., 3nm–5nm chips)',
    physicalPowerDrawWatts: 3500,
    networkConsensusType: 'Nakamoto Consensus (Proof-of-Work)',
    technicalSummary:
      'SHA-256 is a deterministic one-way cryptographic hash function standardized by NIST. Bitcoin applies SHA-256 twice (SHA256(SHA256(BlockHeader))) to an 80-byte block header containing the version, previous block hash, Merkle root, timestamp, difficulty bits, and a 32-bit nonce.',
    cryptographicMechanics:
      'Miners increment the 32-bit nonce (and extraNonce in the coinbase transaction) billions of times per second until the resulting 256-bit hash integer is numerically less than or equal to the network target defined by the difficulty adjustment algorithm (recalculated every 2,016 blocks).',
    educationalTakeaway:
      'Because SHA-256 uses simple bitwise Boolean operations (AND, OR, XOR, bit shifts) with minimal memory footprint, custom silicon ASICs outperform consumer CPUs by more than 1,000,000x. Hashforge Lab simulates the nonce search and difficulty adjustment loop in memory at 0 Watts.',
    authoritativeSource: {
      title: 'Bitcoin: A Peer-to-Peer Electronic Cash System & NIST FIPS 180-4',
      citation: 'Nakamoto, S. (2008) & National Institute of Standards and Technology (2015)',
      url: 'https://bitcoin.org/bitcoin.pdf'
    },
    lastVerified: '2026-11-15'
  },
  {
    id: 'alg-scrypt',
    slug: 'scrypt-litecoin-dogecoin',
    algorithmName: 'Scrypt (Memory-Hard Key Derivation Function)',
    primaryCoins: ['Litecoin (LTC)', 'Dogecoin (DOGE)'],
    hashFunctionStandard: 'IETF RFC 7914 ( Colin Percival Scrypt )',
    blockTimeTarget: '2.5 Minutes (LTC) / 1 Minute (DOGE Auxiliary PoW)',
    typicalHardwareClass: 'Merged-Mining Scrypt ASICs (AuxPoW)',
    physicalPowerDrawWatts: 3250,
    networkConsensusType: 'Auxiliary Proof-of-Work (AuxPoW Merged Mining)',
    technicalSummary:
      'Scrypt was engineered by Colin Percival to be memory-intensive by generating a large pseudo-random vector in RAM before performing SHA-256PBKDF2 mixing, originally intended to deter custom hardware dominance.',
    cryptographicMechanics:
      'Since 2014, Dogecoin and Litecoin utilize Auxiliary Proof-of-Work (AuxPoW), allowing miners to submit the same Scrypt computational proof simultaneously to both blockchains without doubling electricity consumption.',
    educationalTakeaway:
      'Merged mining demonstrates how two independent blockchains sharing an identical cryptographic hash function can pool security. In our simulator, selecting DOGE or LTC models high-frequency 1-minute to 2.5-minute block confirmations.',
    authoritativeSource: {
      title: 'IETF RFC 7914: The scrypt Password-Based Key Derivation Function',
      citation: 'Percival, C. & Josefsson, S. (2016), Internet Engineering Task Force',
      url: 'https://datatracker.ietf.org/doc/html/rfc7914'
    },
    lastVerified: '2026-11-15'
  },
  {
    id: 'alg-kheavyhash',
    slug: 'kheavyhash-kaspa-ghostdag',
    algorithmName: 'kHeavyHash (Matrix Multiplication over BlockDAG)',
    primaryCoins: ['Kaspa (KAS)'],
    hashFunctionStandard: 'cSHAKE256 + 64x64 4-bit Matrix Multiplication',
    blockTimeTarget: '1 Second to 10 Blocks Per Second (BPS)',
    typicalHardwareClass: 'High-Efficiency kHeavyHash ASICs & FPGA Nodes',
    physicalPowerDrawWatts: 1800,
    networkConsensusType: 'GHOSTDAG (PHANTOM BlockDAG Consensus)',
    technicalSummary:
      'Unlike linear blockchains that orphan parallel blocks, Kaspa uses GHOSTDAG to incorporate simultaneous blocks into a Directed Acyclic Graph (BlockDAG), ordering them deterministically via k-cluster coloring.',
    cryptographicMechanics:
      'kHeavyHash sandwiches a 64x64 matrix multiplication of 4-bit unsigned values between two cSHAKE256 (Keccak) passes, achieving high compute-to-memory efficiency suitable for rapid 1-second block intervals.',
    educationalTakeaway:
      'BlockDAG architecture solves the classic throughput-versus-security trade-off where fast block times normally cause high orphan rates.',
    authoritativeSource: {
      title: 'PHANTOM GHOSTDAG: A Scalable Generalization of Nakamoto Consensus',
      citation: 'Sompolinsky, Y., Wyborski, S., & Zohar, A. (IACR ePrint 2018/104)',
      url: 'https://eprint.iacr.org/2018/104.pdf'
    },
    lastVerified: '2026-11-15'
  },
  {
    id: 'alg-randomx',
    slug: 'randomx-monero-cpu',
    algorithmName: 'RandomX (Dynamic Virtual Machine CPU PoW)',
    primaryCoins: ['Monero (XMR)'],
    hashFunctionStandard: 'RandomX VM (AES, Blake2b, IEEE 754 Floating-Point)',
    blockTimeTarget: '2 Minutes (120 seconds)',
    typicalHardwareClass: 'General-Purpose Multi-Core CPUs (L3 Cache Optimized)',
    physicalPowerDrawWatts: 220,
    networkConsensusType: 'Egalitarian CPU Proof-of-Work',
    technicalSummary:
      'RandomX resists ASIC specialization by generating random executable programs in a custom virtual instruction set that exercises integer math, IEEE 754 floating-point branches, L3 cache scratchpads (2 MB per thread), and hardware AES instructions.',
    cryptographicMechanics:
      'Because every hash cycle executes a newly synthesized program requiring general-purpose CPU execution pipelines and 2 GB+ of system dataset memory, single-purpose ASICs cannot easily strip away control logic.',
    educationalTakeaway:
      'RandomX is the premier example of hardware-egalitarian Proof-of-Work, intentionally designed around general-purpose CPU architectures.',
    authoritativeSource: {
      title: 'RandomX Specification & Tevador Technical Documentation',
      citation: 'Monero Research Lab & Tevador et al. (Audited by Trail of Bits & Kudelski)',
      url: 'https://github.com/tevador/RandomX'
    },
    lastVerified: '2026-11-15'
  },
  {
    id: 'alg-eth-sol-ton',
    slug: 'modern-consensus-eth-sol-ton',
    algorithmName: 'Historical Ethash, Proof-of-History & PoW Givers',
    primaryCoins: ['Ethereum (ETH)', 'Solana (SOL)', 'Toncoin (TON)'],
    hashFunctionStandard: 'Keccak-256 DAG (Ethash) / SHA-256 VDF (Solana PoH)',
    blockTimeTarget: '12s (Ethereum) / 400ms (Solana) / 5s (TON)',
    typicalHardwareClass: 'Validator Nodes (Simulated as Legacy/Educational Mining)',
    physicalPowerDrawWatts: 450,
    networkConsensusType: 'Hybrid Educational Simulation (Legacy PoW + Validator Modeling)',
    technicalSummary:
      'Ethereum transitioned from DAG-based Ethash GPU mining to Proof-of-Stake (The Merge, Sept 2022), while Toncoin distributed its initial supply via smart-contract Proof-of-Work Givers, and Solana sequences transactions via a SHA-256 Verifiable Delay Function (Proof-of-History).',
    cryptographicMechanics:
      'In Hashforge Lab, these networks are modeled alongside classic PoW coins so students can compare block finality intervals (400ms to 12s), gas/fee dynamics, and historical Ethash DAG memory bandwidth against Bitcoin SHA-256.',
    educationalTakeaway:
      'Understanding why major Layer-1 networks use different consensus primitives (DAG memory hardness, VDF cryptographic clocks, or PoW distribution givers) is essential for blockchain literacy.',
    authoritativeSource: {
      title: 'Ethereum Yellow Paper & Solana Proof of History Specification',
      citation: 'Wood, G. (2014) & Yakovenko, A. (2018)',
      url: 'https://ethereum.github.io/yellowpaper/paper.pdf'
    },
    lastVerified: '2026-11-15'
  }
];

export const PILLAR_ARTICLES: PillarArticle[] = [
  {
    id: 'guide-pow-mechanics',
    slug: 'how-proof-of-work-crypto-mining-works',
    title: 'How Proof-of-Work (PoW) Crypto Mining Actually Works: Nonces, Difficulty & SHA-256',
    subtitle: 'A complete computer-science breakdown of block headers, target thresholds, and why network difficulty self-adjusts.',
    category: 'Pillar Guide',
    readTime: '7 min read',
    lastUpdated: '2026-11-15',
    lastVerified: '2026-11-15',
    author: {
      name: 'Dr. Marcus Vance, Ph.D.',
      role: 'Lead Cryptographic Systems Architect',
      credentials: 'Distributed Consensus & Applied Cryptography Researcher'
    },
    reviewer: {
      name: 'Elena Rostova, M.Sc.',
      role: 'Senior Blockchain Protocol Auditor'
    },
    summary:
      'Proof-of-Work does not solve arbitrary math puzzles; it performs a brute-force cryptographic search for a 32-bit Nonce that places a block header hash below a dynamically calibrated 256-bit target integer.',
    keyTakeaways: [
      'A Bitcoin block header is exactly 80 bytes and hashes via double SHA-256 into a 64-character hexadecimal string.',
      'Network difficulty adjusts every 2,016 blocks (~14 days) so that global block discovery averages 10 minutes regardless of how many miners join.',
      'Mining pools use "Share Difficulty" (a much easier target threshold) to verify that individual miners are contributing real hash attempts before a full network block is found.',
      'Browser-based educational simulation reproduces the exact statistical probability of share discovery and difficulty scaling without running high-wattage silicon.'
    ],
    sections: [
      {
        heading: '1. Inside the 80-Byte Block Header',
        body: 'Every Proof-of-Work block candidate contains six fields: Protocol Version (4 bytes), Previous Block Hash (32 bytes), Merkle Root of included transactions (32 bytes), Unix Timestamp (4 bytes), Difficulty Target Bits (4 bytes), and the Nonce (4 bytes). When any single bit changes in the Nonce, the avalanche effect of SHA-256 completely randomizes the resulting 256-bit output.'
      },
      {
        heading: '2. Target Thresholds vs. Network Difficulty',
        body: 'To be accepted by nodes, the numerical value of the 256-bit block hash must be smaller than the current Target. In hexadecimal notation, smaller numbers begin with a sequence of leading zeros (for example, 00000000000000000002a7c...). As total global hashrate rises, the protocol shrinks the target window, requiring exponentially more leading zeros.'
      },
      {
        heading: '3. Why Mining Pools Measure "Accepted Shares"',
        body: 'Because finding a full Bitcoin block solo can take years on a single rig, mining pools assign a lower-difficulty "Share Target". Whenever a rig finds a nonce that satisfies the pool threshold, the pool logs an Accepted Share ([SHARE ACCEPTED])—the exact mechanism modeled in the Hashforge Lab terminal.'
      }
    ],
    citations: [
      {
        label: 'Bitcoin Developer Reference — Block Header & Target nBits',
        reference: 'Bitcoin Core Documentation (bitcoin.org)',
        url: 'https://developer.bitcoin.org/reference/block_chain.html'
      },
      {
        label: 'NIST FIPS 180-4 Secure Hash Standard (SHS)',
        reference: 'U.S. Department of Commerce / NIST',
        url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final'
      }
    ],
    relatedSectionId: 'simulator'
  },
  {
    id: 'guide-comparison-hardware-cloud-sim',
    slug: 'physical-asic-vs-cloud-mining-vs-browser-simulation',
    title: 'Physical ASIC Mining vs. Cloud Mining Contracts vs. Educational Browser Simulation',
    subtitle: 'An objective financial and technical comparison of capital risk, electricity overhead, thermal load, and educational utility.',
    category: 'Technical Comparison',
    readTime: '6 min read',
    lastUpdated: '2026-11-15',
    lastVerified: '2026-11-15',
    author: {
      name: 'Elena Rostova, M.Sc.',
      role: 'Senior Blockchain Protocol Auditor',
      credentials: '10+ Years in Mining Infrastructure & Smart Contract Security'
    },
    reviewer: {
      name: 'Dr. Marcus Vance, Ph.D.',
      role: 'Lead Cryptographic Systems Architect'
    },
    summary:
      'Before spending capital on physical ASIC miners or signing opaque cloud-mining contracts, newcomers should evaluate residential kWh costs, network difficulty growth, and hardware depreciation.',
    keyTakeaways: [
      'A modern 3,500W ASIC miner running 24/7 consumes 2,520 kWh per month—costing $302/month at $0.12/kWh residential electricity rates.',
      'Many third-party "cloud mining" websites lock user funds behind maintenance fees and unverified remote data centers.',
      'Educational browser simulators like Hashforge Lab require $0 upfront investment, 0 Watts of additional power, and zero wallet permissions.'
    ],
    sections: [
      {
        heading: '1. The Reality of Residential ASIC & GPU Mining',
        body: 'Industrial Bitcoin mining operates at $0.03–$0.05 per kWh in hydro, flare-gas, or geothermal facilities. Running a 3,500-watt ASIC at home on a $0.14/kWh residential grid often results in electricity bills exceeding the value of mined coins, alongside 75–85 dB acoustic noise and continuous thermal exhaust.'
      },
      {
        heading: '2. Evaluating Cloud Mining Contract Risks',
        body: 'Cloud mining contracts sell fixed terahash allocations over 12–24 months. However, if network difficulty rises by 40% while coin price remains flat, daily payouts drop while fixed maintenance fees consume the remaining yield. Regulatory agencies frequently warn consumers to verify physical data-center proof before purchasing remote hash contracts.'
      },
      {
        heading: '3. Why Zero-Load Browser Simulation Exists',
        body: 'Hashforge Lab was built so students, developers, and crypto enthusiasts across 180+ countries can experiment with hashrate multipliers, overclocking trade-offs, share verification, and multi-coin yield math without risking capital or stressing their laptop or smartphone battery.'
      }
    ],
    citations: [
      {
        label: 'Cambridge Bitcoin Electricity Consumption Index (CBECI)',
        reference: 'University of Cambridge Judge Business School',
        url: 'https://ccaf.io/cbnsi/cbeci'
      }
    ],
    relatedSectionId: 'mining-calculator'
  },
  {
    id: 'guide-momentum-indicators',
    slug: 'understanding-rsi-ema-and-orderbook-depth-in-crypto',
    title: 'Understanding 1-Minute Crypto Momentum: How RSI(14), EMA Crossovers & Orderbook Walls Work',
    subtitle: 'How quantitative technical indicators evaluate short-term bullish and bearish micro-trends across top-liquidity digital assets.',
    category: 'Step-by-Step Tutorial',
    readTime: '5 min read',
    lastUpdated: '2026-11-15',
    lastVerified: '2026-11-15',
    author: {
      name: 'Arjun Mehta, CFA',
      role: 'Quantitative Market Microstructure Analyst',
      credentials: 'Orderbook Liquidity & Algorithmic Signal Research'
    },
    reviewer: {
      name: 'Elena Rostova, M.Sc.',
      role: 'Senior Blockchain Protocol Auditor'
    },
    summary:
      'Short-term 60-second market signals combine momentum oscillators (Relative Strength Index), trend-following moving averages (EMA), and bid/ask orderbook imbalance to classify micro-trend bias.',
    keyTakeaways: [
      'RSI (14) measures the velocity of recent price changes on a 0–100 scale; readings above 65 indicate strong buying momentum (or overbought extension), while readings below 35 reflect selling pressure.',
      'Orderbook Buy-Wall Percentage compares resting bid liquidity near spot price against ask resistance.',
      'No 1-minute technical indicator guarantees future price movement; signals must always be used for educational pattern recognition alongside strict risk awareness.'
    ],
    sections: [
      {
        heading: '1. Relative Strength Index (RSI 14) on Micro-Timeframes',
        body: 'Developed by J. Welles Wilder Jr., RSI calculates the ratio of average upward price closes to downward closes over 14 periods. On a 1-minute horizon, rapid shifts in RSI highlight sudden bursts of market-order volume.'
      },
      {
        heading: '2. Exponential Moving Average (EMA) & MACD Crosses',
        body: 'Unlike a Simple Moving Average (SMA), an Exponential Moving Average weights the most recent ticks more heavily. When a fast EMA crosses above a slower EMA (Bullish Cross), short-term momentum is accelerating upward.'
      },
      {
        heading: '3. Orderbook Depth & Support/Resistance Zones',
        body: 'Limit orderbooks consist of resting Bids (buyers) and Asks (sellers). When bid liquidity within 0.5% of spot price significantly outweighs ask liquidity, short-term downward slippage is cushioned—forming localized support.'
      }
    ],
    citations: [
      {
        label: 'New Concepts in Technical Trading Systems (RSI Formulation)',
        reference: 'Wilder, J. Welles (1978)',
        url: 'https://en.wikipedia.org/wiki/Relative_strength_index'
      }
    ],
    relatedSectionId: 'crypto-minute-predictions'
  }
];

export interface ContentFreshnessItem {
  pageOrModule: string;
  canonicalUrl: string;
  lastVerifiedDate: string;
  verificationCycle: string;
  metadataStatus: 'Complete' | 'Needs Review';
  schemaTypes: string[];
  factualVerificationNote: string;
}

export const CONTENT_FRESHNESS_QUEUE: ContentFreshnessItem[] = [
  {
    pageOrModule: 'Primary Simulator & Worldwide Landing Hub',
    canonicalUrl: 'https://www.hashforgelab.co.uk/',
    lastVerifiedDate: '2026-11-15',
    verificationCycle: 'Weekly Automated + Editorial Check',
    metadataStatus: 'Complete',
    schemaTypes: ['WebApplication', 'Organization', 'WebSite', 'BreadcrumbList'],
    factualVerificationNote: 'Verified 0W browser simulation disclosures, canonical www alignment, and removal of unverified aggregateRating schema.'
  },
  {
    pageOrModule: 'Interactive PoW Energy & Profitability Calculator',
    canonicalUrl: 'https://www.hashforgelab.co.uk/#mining-calculator',
    lastVerifiedDate: '2026-11-15',
    verificationCycle: 'Monthly Hardware Benchmark Sync',
    metadataStatus: 'Complete',
    schemaTypes: ['WebApplication', 'ItemList'],
    factualVerificationNote: 'Calibrated ASIC wattage (3,500W S21 class) and kWh cost formulas against standard electrical engineering formulas (Watts × 24 / 1000).'
  },
  {
    pageOrModule: 'Programmatic Consensus & Algorithm Research Hub',
    canonicalUrl: 'https://www.hashforgelab.co.uk/#algorithm-research-hub',
    lastVerifiedDate: '2026-11-15',
    verificationCycle: 'Quarterly Protocol Specification Audit',
    metadataStatus: 'Complete',
    schemaTypes: ['TechArticle', 'ItemList'],
    factualVerificationNote: 'Verified SHA-256 (NIST FIPS 180-4), Scrypt (RFC 7914), kHeavyHash (IACR 2018/104), and RandomX specifications.'
  },
  {
    pageOrModule: 'Pillar Technical Guides & Hardware Comparisons',
    canonicalUrl: 'https://www.hashforgelab.co.uk/#authority-guides',
    lastVerifiedDate: '2026-11-15',
    verificationCycle: 'Monthly Editorial Review',
    metadataStatus: 'Complete',
    schemaTypes: ['TechArticle', 'HowTo'],
    factualVerificationNote: 'Reviewed author credentials, external whitepaper citations, and risk disclosures on physical vs. cloud mining.'
  },
  {
    pageOrModule: 'AEO Frequently Asked Questions & Entity Graph',
    canonicalUrl: 'https://www.hashforgelab.co.uk/#faq-knowledge-base',
    lastVerifiedDate: '2026-11-15',
    verificationCycle: 'Bi-Weekly Search Intent Update',
    metadataStatus: 'Complete',
    schemaTypes: ['FAQPage'],
    factualVerificationNote: 'Synchronized on-page FAQ microdata with JSON-LD FAQPage graph and verified non-guaranteed prediction disclaimers.'
  }
];
