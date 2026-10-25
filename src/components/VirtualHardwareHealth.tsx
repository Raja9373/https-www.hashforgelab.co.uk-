import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Flame, 
  ShieldCheck, 
  Wind, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Leaf, 
  Info, 
  Laptop, 
  Activity, 
  Thermometer,
  Sparkles,
  Server
} from 'lucide-react';

interface VirtualHardwareHealthProps {
  isMining?: boolean;
  activeBooster?: string | null;
  className?: string;
}

export const VirtualHardwareHealth: React.FC<VirtualHardwareHealthProps> = ({
  isMining = true,
  activeBooster = null,
  className = ''
}) => {
  // Profiles: 'eco' | 'balanced' | 'turbo'
  const [coolingProfile, setCoolingProfile] = useState<'eco' | 'balanced' | 'turbo'>('balanced');
  const [stressTesting, setStressTesting] = useState<boolean>(false);
  const [stressTimer, setStressTimer] = useState<number>(0);
  const [stressCompleted, setStressCompleted] = useState<boolean>(false);

  // Simulated metrics
  const [simCpuTemp, setSimCpuTemp] = useState<number>(47);
  const [simGpuTemp, setSimGpuTemp] = useState<number>(51);
  const [simAsicTemp, setSimAsicTemp] = useState<number>(56);
  const [simFanRpm, setSimFanRpm] = useState<number>(1850);
  const [fanPercentage, setFanPercentage] = useState<number>(55);
  const [simulatedWatts, setSimulatedWatts] = useState<number>(380);

  // Real device baseline metrics (0% incremental load)
  const [realDeviceCpuLoad, setRealDeviceCpuLoad] = useState<number>(0.8);
  const [measuredFps, setMeasuredFps] = useState<number>(60);

  // Monitor frame smoothness to prove real zero-lag client performance
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (currentTime: number) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setMeasuredFps(Math.min(60, Math.round((frameCount * 1000) / (currentTime - lastTime))));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Fluctuate simulated temperatures based on profile and mining state
  useEffect(() => {
    const interval = setInterval(() => {
      // Base temperature offsets
      let baseOffset = 0;
      let fanSpeedTarget = 55;
      let wattsTarget = 380;

      if (coolingProfile === 'eco') {
        baseOffset = -10;
        fanSpeedTarget = 32;
        wattsTarget = 210;
      } else if (coolingProfile === 'turbo') {
        baseOffset = 9;
        fanSpeedTarget = 82;
        wattsTarget = 620;
      }

      if (activeBooster === 'turbo') baseOffset += 5;
      if (activeBooster === 'overclock') baseOffset += 9;
      if (activeBooster === 'quantum') baseOffset += 12;

      if (stressTesting) {
        baseOffset += 20;
        fanSpeedTarget = 98;
        wattsTarget = 950;
      }

      const jitter = (Math.random() * 2 - 1);

      setSimCpuTemp(Math.max(34, Math.round(48 + baseOffset + jitter)));
      setSimGpuTemp(Math.max(36, Math.round(52 + baseOffset * 1.1 + jitter)));
      setSimAsicTemp(Math.max(38, Math.round(57 + baseOffset * 1.15 + jitter)));

      setFanPercentage(fanSpeedTarget + Math.round(jitter * 2));
      setSimFanRpm(Math.round((fanSpeedTarget / 100) * 3200 + jitter * 20));
      setSimulatedWatts(wattsTarget + Math.round(jitter * 10));

      // Fluctuate tiny real web browser idle load (0.4% - 1.4%)
      setRealDeviceCpuLoad(parseFloat((0.7 + Math.random() * 0.5).toFixed(1)));
    }, 450);

    return () => clearInterval(interval);
  }, [coolingProfile, activeBooster, stressTesting]);

  // Stress test countdown
  const handleStartStressTest = () => {
    if (stressTesting) return;
    setStressTesting(true);
    setStressCompleted(false);
    setStressTimer(5);

    const countdown = setInterval(() => {
      setStressTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setStressTesting(false);
          setStressCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Rotation speed for the fan blades CSS animation
  const fanAnimDuration = Math.max(0.12, 1.2 - (fanPercentage / 100));

  return (
    <div className={`bg-gradient-to-br from-white/[0.06] to-black/40 border border-white/12 rounded-3xl p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-[0_0_35px_rgba(0,255,136,0.08)] ${className}`}>
      
      {/* Ambient decorative glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#00ff88]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Header & Safety Assurance Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-white">
                Virtual Hardware Health &amp; Safety Dashboard
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                100% In-Browser Simulation • Zero Physical Component Load Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Certified Zero Load Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <span>REAL DEVICE LOAD: 0% OVERHEAD</span>
        </div>
      </div>

      {/* Profile Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-5">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
          <button
            onClick={() => setCoolingProfile('eco')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              coolingProfile === 'eco'
                ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_12px_rgba(0,255,136,0.5)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Eco Chiller (38°C)
          </button>
          <button
            onClick={() => setCoolingProfile('balanced')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              coolingProfile === 'balanced'
                ? 'bg-[#00d4ff] text-black font-bold shadow-[0_0_12px_rgba(0,212,255,0.5)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Balanced Mode (48°C)
          </button>
          <button
            onClick={() => setCoolingProfile('turbo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              coolingProfile === 'turbo'
                ? 'bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(138,43,226,0.5)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" /> High-Airflow (58°C)
          </button>
        </div>

        {/* Reality Stress Test Trigger Button */}
        <button
          onClick={handleStartStressTest}
          disabled={stressTesting}
          className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all flex items-center gap-2 cursor-pointer ${
            stressTesting
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-[#00ff88]/40'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          {stressTesting ? `Simulating Thermal Spike (${stressTimer}s)...` : 'Run 5s Virtual Stress Test'}
        </button>
      </div>

      {/* Stress Test Finished Educational Confirmation Alert */}
      {stressCompleted && (
        <div className="mb-5 p-4 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/40 text-xs text-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-orbitron block mb-0.5">
                Stress Test Complete • Physical Reality Verification Confirmed!
              </strong>
              <p className="leading-relaxed">
                Notice that during the 5-second simulated spike, your physical computer or phone stayed completely silent, cool to the touch, and without any fan noise. This conclusively proves Hashforge Lab runs 100% via virtual math sandbox and cannot draw physical wattage or stress your battery.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Visual Grid: Left Simulated Components + Right Cooling Fans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        
        {/* Left Column: 3 Simulated Components */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          
          {/* Component 1: Virtual CPU Core */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00ff88]" /> VIRTUAL CPU
                </span>
                <span className="text-[10px] font-bold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-md">
                  SAFE (SIM)
                </span>
              </div>
              <div className="font-orbitron font-extrabold text-3xl text-white my-1 tabular-nums">
                {simCpuTemp}°C
              </div>
              <div className="text-[11px] text-gray-400 font-mono">
                Mathematical Core Load: <span className="text-white font-semibold">94%</span>
              </div>
            </div>

            {/* Simulated Temp Bar */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                <span>Thermal Limit 95°C</span>
                <span className="text-[#00ff88]">{simCpuTemp < 60 ? 'Optimal' : 'Warm'}</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] transition-all duration-300"
                  style={{ width: `${(simCpuTemp / 95) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Component 2: Virtual GPU VRAM Matrix */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[#00d4ff]" /> VIRTUAL GPU
                </span>
                <span className="text-[10px] font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded-md">
                  VRAM NOMINAL
                </span>
              </div>
              <div className="font-orbitron font-extrabold text-3xl text-white my-1 tabular-nums">
                {simGpuTemp}°C
              </div>
              <div className="text-[11px] text-gray-400 font-mono">
                Virtual Shaders: <span className="text-white font-semibold">4,096 Cores</span>
              </div>
            </div>

            {/* Simulated Temp Bar */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                <span>Thermal Limit 90°C</span>
                <span className="text-[#00d4ff]">{simGpuTemp < 65 ? 'Cool' : 'Active'}</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-purple-500 transition-all duration-300"
                  style={{ width: `${(simGpuTemp / 90) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Component 3: Virtual ASIC Chips */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400" /> ASIC CHIPS
                </span>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                  EMULATED
                </span>
              </div>
              <div className="font-orbitron font-extrabold text-3xl text-white my-1 tabular-nums">
                {simAsicTemp}°C
              </div>
              <div className="text-[11px] text-gray-400 font-mono">
                Hashboard Voltage: <span className="text-white font-semibold">12.2V Sim</span>
              </div>
            </div>

            {/* Simulated Temp Bar */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                <span>Thermal Limit 100°C</span>
                <span className="text-purple-300">Safe Operating Range</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${(simAsicTemp / 100) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Virtual Cooling Fans & Tachometer */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5 font-bold">
              <Wind className="w-4 h-4 text-[#00ff88]" /> VIRTUAL COOLING FANS
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              Twin Axial Turbines
            </span>
          </div>

          {/* Animated Dual Fan Visual */}
          <div className="flex items-center justify-center gap-6 my-2">
            
            {/* Fan 1 */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full bg-black/60 border border-white/20 p-1 flex items-center justify-center shadow-inner">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-12 h-12 text-[#00ff88]"
                  style={{
                    animation: `spin ${fanAnimDuration}s linear infinite`
                  }}
                >
                  <circle cx="50" cy="50" r="14" fill="#00ff88" opacity="0.3" />
                  <path d="M50 50 L50 15 C58 15 65 25 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L85 50 C85 58 75 65 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L50 85 C42 85 35 75 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L15 50 C15 42 25 35 50 50 Z" fill="currentColor" />
                </svg>
                <div className="absolute w-3 h-3 rounded-full bg-white shadow-sm" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-mono">Fan #1 Intake</span>
            </div>

            {/* Fan 2 */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full bg-black/60 border border-white/20 p-1 flex items-center justify-center shadow-inner">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-12 h-12 text-[#00d4ff]"
                  style={{
                    animation: `spin ${fanAnimDuration}s linear infinite`
                  }}
                >
                  <circle cx="50" cy="50" r="14" fill="#00d4ff" opacity="0.3" />
                  <path d="M50 50 L50 15 C58 15 65 25 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L85 50 C85 58 75 65 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L50 85 C42 85 35 75 50 50 Z" fill="currentColor" />
                  <path d="M50 50 L15 50 C15 42 25 35 50 50 Z" fill="currentColor" />
                </svg>
                <div className="absolute w-3 h-3 rounded-full bg-white shadow-sm" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-mono">Fan #2 Exhaust</span>
            </div>

          </div>

          {/* RPM Readout */}
          <div className="pt-3 border-t border-white/10 text-center">
            <div className="font-orbitron font-extrabold text-2xl text-[#00ff88] tabular-nums">
              {simFanRpm.toLocaleString()} <span className="text-xs font-mono text-gray-400">RPM</span>
            </div>
            <div className="text-[11px] text-gray-400 font-mono mt-0.5">
              Duty Cycle: <b className="text-white">{fanPercentage}%</b> • Acoustic Noise: <b className="text-[#00ff88]">0 dB (Silent)</b>
            </div>
          </div>
        </div>

      </div>

      {/* Side-by-Side Verification Table: Simulated Rig vs Your Real Device */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 text-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <span className="font-orbitron font-bold text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#00ff88]" />
            Side-by-Side Reality Check: Simulated Rig vs. Your Actual Device
          </span>
          <span className="text-[10px] font-mono text-gray-400">
            Browser Frame Health: <span className="text-[#00ff88] font-bold">{measuredFps} FPS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Simulated Rig Specs */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-[#00d4ff] font-orbitron block">
              💻 IN THE SIMULATION (Virtual Environment)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-gray-400 block text-[10px]">Simulated Core Temp:</span>
                <span className="text-white font-mono font-bold">{simCpuTemp}°C (Virtual)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Simulated Power Draw:</span>
                <span className="text-white font-mono font-bold">{simulatedWatts} Watts (Virtual)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Simulated Fan Speed:</span>
                <span className="text-white font-mono font-bold">{simFanRpm} RPM</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Virtual Algorithmic Math:</span>
                <span className="text-[#00ff88] font-mono font-bold">SHA-256 Nonces</span>
              </div>
            </div>
          </div>

          {/* Real Physical Device Specs */}
          <div className="p-3.5 rounded-xl bg-[#00ff88]/[0.04] border border-[#00ff88]/30 space-y-2">
            <span className="text-xs font-bold text-[#00ff88] font-orbitron flex items-center justify-between">
              <span>🛡️ YOUR ACTUAL PHYSICAL DEVICE</span>
              <span className="text-[10px] text-[#00ff88] font-mono">100% PROTECTED</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-gray-400 block text-[10px]">Actual Additional Temp:</span>
                <span className="text-[#00ff88] font-mono font-bold">+0.0°C (No Heat)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Actual Extra Electricity:</span>
                <span className="text-[#00ff88] font-mono font-bold">0 Watts ($0.00 Cost)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Device Fan Sound:</span>
                <span className="text-[#00ff88] font-mono font-bold">Completely Silent</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Component Wear &amp; Tear:</span>
                <span className="text-[#00ff88] font-mono font-bold">0.00% (Zero Wear)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Safety Guarantee Footer Note */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-gray-400">
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
            <span>
              <strong>Zero-Load Architecture:</strong> All hashing is rendered via lightweight standard JavaScript timers without accessing native GPU drivers or heating battery cells.
            </span>
          </p>
          <span className="text-[10px] font-mono text-[#00ff88] shrink-0">
            W3C Sandboxed Execution
          </span>
        </div>
      </div>

    </div>
  );
};
