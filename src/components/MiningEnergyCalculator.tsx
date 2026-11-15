import React, { useState } from 'react';
import { Calculator, Zap, Flame, DollarSign, Cpu, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HardwarePreset {
  id: string;
  name: string;
  algorithm: string;
  coinSymbol: string;
  watts: number;
  hashrateLabel: string;
  noiseDb: number;
  hardwareCostUsd: number;
}

const HARDWARE_PRESETS: HardwarePreset[] = [
  {
    id: 'antminer-s21',
    name: 'Bitmain Antminer S21 (SHA-256 ASIC)',
    algorithm: 'SHA-256',
    coinSymbol: 'BTC',
    watts: 3500,
    hashrateLabel: '200 TH/s',
    noiseDb: 76,
    hardwareCostUsd: 4200
  },
  {
    id: 'antminer-l7',
    name: 'Bitmain Antminer L7 (Scrypt AuxPoW)',
    algorithm: 'Scrypt',
    coinSymbol: 'DOGE / LTC',
    watts: 3260,
    hashrateLabel: '9.5 GH/s',
    noiseDb: 75,
    hardwareCostUsd: 4800
  },
  {
    id: 'iceriver-ks5',
    name: 'Bitmain Antminer KS5 (kHeavyHash)',
    algorithm: 'kHeavyHash',
    coinSymbol: 'KAS',
    watts: 3000,
    hashrateLabel: '20 TH/s',
    noiseDb: 75,
    hardwareCostUsd: 3900
  },
  {
    id: 'octa-gpu-rig',
    name: '8x RTX 4090 Open-Frame GPU Rig',
    algorithm: 'Multi-Algo / KawPow',
    coinSymbol: 'ETH (Hist.) / RVN',
    watts: 2800,
    hashrateLabel: '960 MH/s',
    noiseDb: 68,
    hardwareCostUsd: 14500
  },
  {
    id: 'epyc-cpu-node',
    name: 'Dual-Socket Server CPU Rig (RandomX)',
    algorithm: 'RandomX',
    coinSymbol: 'XMR',
    watts: 480,
    hashrateLabel: '85 KH/s',
    noiseDb: 58,
    hardwareCostUsd: 3100
  }
];

interface MiningEnergyCalculatorProps {
  onLaunchSimulator: () => void;
}

export const MiningEnergyCalculator: React.FC<MiningEnergyCalculatorProps> = ({
  onLaunchSimulator
}) => {
  const [selectedPreset, setSelectedPreset] = useState<HardwarePreset>(HARDWARE_PRESETS[0]);
  const [kwhRate, setKwhRate] = useState<number>(0.14);
  const [hoursPerDay, setHoursPerDay] = useState<number>(24);
  const [rigCount, setRigCount] = useState<number>(1);

  const totalWatts = selectedPreset.watts * rigCount;
  const dailyKwh = (totalWatts * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const yearlyKwh = dailyKwh * 365;

  const dailyCostUsd = dailyKwh * kwhRate;
  const monthlyCostUsd = monthlyKwh * kwhRate;
  const yearlyCostUsd = yearlyKwh * kwhRate;

  // Thermal output: 1 Watt ≈ 3.41214 BTU/hr
  const btuPerHour = Math.round(totalWatts * 3.41214);
  // Upfront hardware outlay
  const totalHardwareOutlay = selectedPreset.hardwareCostUsd * rigCount;

  return (
    <section
      id="mining-calculator"
      aria-labelledby="calculator-heading"
      className="py-12 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="bg-gradient-to-b from-white/[0.05] to-black/70 border border-white/12 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88] mb-2">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE POW ELECTRICITY &amp; HARDWARE OVERHEAD CALCULATOR</span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-400">Verified Formula: (Watts × Hours ÷ 1,000) × $/kWh</span>
            </div>
            <h2
              id="calculator-heading"
              className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight"
            >
              Physical Mining Cost vs. Zero-Load Browser Simulation
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 max-w-3xl leading-relaxed">
              Calculate exact residential electricity costs, thermal heat dissipation (BTU/hr), and upfront hardware capital required by physical ASIC/GPU rigs compared to practicing Proof-of-Work mechanics in Hashforge Lab at 0 Watts.
            </p>
          </div>

          <div className="text-xs font-mono text-gray-400 shrink-0">
            Last Verified: <time dateTime="2026-11-15" className="text-white font-semibold">Nov 15, 2026</time>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls: Hardware & Grid Parameters */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label
                htmlFor="preset-select"
                className="block font-orbitron text-xs font-bold text-gray-200 mb-2"
              >
                1. Select Reference Physical Mining Hardware:
              </label>
              <div className="space-y-2">
                {HARDWARE_PRESETS.map((preset) => {
                  const active = selectedPreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPreset(preset)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        active
                          ? 'bg-[#00ff88]/12 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.18)]'
                          : 'bg-black/40 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">
                          {preset.name}
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                          Algo: <span className="text-[#00d4ff]">{preset.algorithm}</span> · Coin: <span className="text-white">{preset.coinSymbol}</span> · Speed: {preset.hashrateLabel}
                        </div>
                      </div>
                      <div className="text-right font-mono shrink-0">
                        <span className="text-xs font-bold text-orange-400 block tabular-nums">
                          {preset.watts.toLocaleString()} W
                        </span>
                        <span className="text-[10px] text-gray-400 tabular-nums">
                          ~${preset.hardwareCostUsd.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders for kWh Rate, Hours, and Rig Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="kwh-rate-input" className="text-gray-300 font-medium">
                    Electricity Rate
                  </label>
                  <span className="font-mono font-bold text-[#00ff88] tabular-nums">
                    ${kwhRate.toFixed(2)}/kWh
                  </span>
                </div>
                <input
                  id="kwh-rate-input"
                  type="range"
                  min="0.03"
                  max="0.40"
                  step="0.01"
                  value={kwhRate}
                  onChange={(e) => setKwhRate(parseFloat(e.target.value))}
                  className="w-full accent-[#00ff88] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>$0.03 (Industrial)</span>
                  <span>$0.40 (Peak EU/UK)</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="hours-input" className="text-gray-300 font-medium">
                    Daily Runtime
                  </label>
                  <span className="font-mono font-bold text-[#00d4ff] tabular-nums">
                    {hoursPerDay} hrs/day
                  </span>
                </div>
                <input
                  id="hours-input"
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value, 10))}
                  className="w-full accent-[#00d4ff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>1 hr</span>
                  <span>24 hrs (24/7)</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor="rigs-input" className="text-gray-300 font-medium">
                    Number of Rigs
                  </label>
                  <span className="font-mono font-bold text-purple-300 tabular-nums">
                    {rigCount} {rigCount === 1 ? 'Unit' : 'Units'}
                  </span>
                </div>
                <input
                  id="rigs-input"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={rigCount}
                  onChange={(e) => setRigCount(parseInt(e.target.value, 10))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>1 Rig</span>
                  <span>10 Rigs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Results: Side-by-Side Comparison & Savings */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Physical Hardware Overhead Card */}
              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-orbitron font-bold text-red-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    PHYSICAL RIG OVERHEAD
                  </span>
                  <span className="text-[11px] font-mono text-red-400 tabular-nums">
                    {totalWatts.toLocaleString()} Watts
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Electricity Bill:</span>
                    <strong className="font-mono text-white tabular-nums">
                      ${dailyCostUsd.toFixed(2)} ({dailyKwh.toFixed(1)} kWh)
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Electricity Bill:</span>
                    <strong className="font-mono text-red-300 tabular-nums">
                      ${monthlyCostUsd.toFixed(2)} ({monthlyKwh.toFixed(0)} kWh)
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Electricity Bill:</span>
                    <strong className="font-mono text-red-400 text-sm tabular-nums">
                      ${yearlyCostUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Upfront Hardware CapEx:</span>
                    <strong className="font-mono text-gray-200 tabular-nums">
                      ${totalHardwareOutlay.toLocaleString()} USD
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thermal Heat Output:</span>
                    <strong className="font-mono text-orange-300 tabular-nums">
                      {btuPerHour.toLocaleString()} BTU/hr ({selectedPreset.noiseDb} dB)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Hashforge Lab Educational Simulation Card */}
              <div className="bg-[#00ff88]/[0.06] border border-[#00ff88]/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-orbitron font-bold text-[#00ff88] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    HASHFORGE LAB SIMULATOR
                  </span>
                  <span className="text-[11px] font-mono text-[#00ff88] tabular-nums">
                    0 Watts
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Daily Electricity Bill:</span>
                    <strong className="font-mono text-[#00ff88] tabular-nums">$0.00 (0.0 kWh)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monthly Electricity Bill:</span>
                    <strong className="font-mono text-[#00ff88] tabular-nums">$0.00 (0 kWh)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Annual Savings vs Physical:</span>
                    <strong className="font-mono text-[#00ff88] text-sm tabular-nums">
                      +${(yearlyCostUsd + totalHardwareOutlay).toLocaleString('en-US', { maximumFractionDigits: 0 })} Saved
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hardware CapEx Required:</span>
                    <strong className="font-mono text-[#00ff88] tabular-nums">$0 (In-Browser)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Thermal &amp; Acoustic Load:</span>
                    <strong className="font-mono text-[#00d4ff] tabular-nums">0 BTU/hr (Silent)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Insight & Contextual Internal Link */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-white block mb-0.5">
                  Engineering Takeaway for {selectedPreset.name}:
                </strong>
                Running {rigCount} unit(s) at ${kwhRate.toFixed(2)}/kWh consumes{' '}
                <span className="text-orange-300 font-mono font-semibold">{yearlyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh/year</span>.
                Test {selectedPreset.algorithm} difficulty and share confirmation in our virtual console with zero thermal stress.
              </div>

              <button
                type="button"
                onClick={onLaunchSimulator}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-orbitron font-bold text-xs whitespace-nowrap shrink-0 cursor-pointer hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <span>Simulate {selectedPreset.coinSymbol}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
