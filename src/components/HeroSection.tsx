import React from 'react';
import { Play, ShieldCheck, Cpu, Flame, CheckCircle, Globe2 } from 'lucide-react';
import { Language, LANGUAGES } from '../data/languages';

interface HeroSectionProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onStartMining: () => void;
  onlineMiners: number;
  totalMinedUsd: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onSelectLang,
  onStartMining,
  onlineMiners,
  totalMinedUsd
}) => {
  return (
    <section className="relative pt-10 sm:pt-14 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#060a14] via-[#081124] to-[#060a14]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00ff88]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#00d4ff]/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        
        {/* Top Notification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.15)] mb-6 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
          <span className="text-xs font-mono font-bold tracking-wide text-gray-200">
            NETWORK ACTIVE • <span className="text-[#00ff88]">180+ COUNTRIES CONNECTED</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-orbitron text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
          World's Most Advanced <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#8a2be2] drop-shadow-[0_0_35px_rgba(0,255,136,0.5)]">
            FREE Mining Lab
          </span>
        </h1>

        {/* Slogan in Selected Language */}
        <div className="mb-4">
          <p className="text-sm sm:text-base font-semibold text-[#00d4ff] flex items-center justify-center gap-2">
            <span>{currentLang.flag}</span>
            <span>{currentLang.slogan}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-6">
          ⚡ Free Bitcoin Mining Simulator • Free Ethereum Mining • Free Solana Mining • No hardware. No electricity bill. 100% safe educational simulation. Mine BTC, ETH, SOL & 12+ coins. Trusted in 180+ countries.
          <br />
          <strong className="text-[#00ff88] font-semibold">
            hashforgelab.co.uk is now LIVE & MONETIZED Worldwide!
          </strong>
        </p>

        {/* 42 Languages Quick Selector Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-2 font-mono">
            <Globe2 className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>42 GLOBAL LOCALIZATIONS (CLICK TO SWITCH):</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {LANGUAGES.slice(0, 14).map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  currentLang.code === lang.code
                    ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_15px_rgba(0,255,136,0.6)] scale-105'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white border border-white/10 hover:border-[#00ff88]/40'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </button>
            ))}
            <button
              onClick={() => {
                const el = document.getElementById('lang-dropdown-trigger');
                el?.click();
              }}
              className="px-3 py-1.5 rounded-full text-xs bg-white/[0.06] hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 font-semibold"
            >
              +28 more languages...
            </button>
          </div>
        </div>

        {/* Live Network Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          <div className="bg-white/[0.05] border border-white/10 hover:border-[#00ff88]/30 rounded-2xl p-5 backdrop-blur-lg transition-all">
            <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-[#00ff88] block mb-1">
              {onlineMiners.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-medium">Miners Online Worldwide</span>
          </div>

          <div className="bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 rounded-2xl p-5 backdrop-blur-lg transition-all">
            <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-[#00d4ff] block mb-1">
              ${(totalMinedUsd + 4200000).toLocaleString(undefined, { maximumFractionDigits: 0 })}+
            </span>
            <span className="text-xs text-gray-400 font-medium">Simulated Mined Free</span>
          </div>

          <div className="bg-white/[0.05] border border-white/10 hover:border-[#8a2be2]/30 rounded-2xl p-5 backdrop-blur-lg transition-all">
            <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white flex items-center justify-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#00ff88] animate-ping" />
              LIVE
            </span>
            <span className="text-xs text-gray-400 font-medium">hashforgelab.co.uk UK</span>
          </div>
        </div>

        {/* Big Start Button */}
        <div className="mb-6 flex flex-col items-center">
          <button
            id="start-mining-hero-btn"
            onClick={onStartMining}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-orbitron font-black text-lg sm:text-xl text-black bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#00ff88] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_40px_rgba(0,255,136,0.5)] hover:shadow-[0_0_65px_rgba(0,255,136,0.85)] hover:scale-105 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-black group-hover:translate-x-1 transition-transform" />
            <span>START FREE MINING NOW</span>
          </button>
          
          <p className="mt-3 text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1 text-[#00ff88]">
              <CheckCircle className="w-3.5 h-3.5" /> No wallet needed
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#00d4ff]">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Zero Investment
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-purple-300">
              <Cpu className="w-3.5 h-3.5" /> 0% Hardware Load
            </span>
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8 text-left">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <div className="text-[#00ff88] font-bold text-xs font-orbitron mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> 100% IN-BROWSER
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Simulation runs smoothly without burning CPU or consuming device battery.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <div className="text-[#00d4ff] font-bold text-xs font-orbitron mb-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> 12+ TOP COINS
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Simulate Bitcoin (SHA-256), Ethereum, Solana, Doge, Kaspa, Ton & LTC.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <div className="text-purple-400 font-bold text-xs font-orbitron mb-1 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4" /> 42 LANGUAGES
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Localized for over 180 countries across Europe, Asia, Americas & Africa.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <div className="text-yellow-400 font-bold text-xs font-orbitron mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ZERO RISK
            </div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Purely educational simulator. Safe for students, beginners & enthusiasts.
            </p>
          </div>
        </div>

        {/* SEO Multilingual Keywords Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#00ff88]/[0.04] border border-dashed border-[#00ff88]/30 max-w-4xl mx-auto text-xs text-gray-400 text-left leading-relaxed">
          <div className="flex items-center justify-between mb-1">
            <strong className="text-white font-mono">
              🔍 Worldwide Google &amp; AI Popular Searches (42 Languages):
            </strong>
            <a href="#global-keyword-directory" className="text-[#00ff88] font-mono text-[11px] hover:underline">
              View All 42 Languages →
            </a>
          </div>
          <p className="text-[11px] text-gray-300 leading-normal">
            <strong>English:</strong> free crypto mining, bitcoin mining simulator, mine ethereum free online, solana mining simulator, browser mining free, no hardware mining • 
            <strong className="text-[#00ff88]"> हिन्दी:</strong> फ्री बिटकॉइन माइनिंग, मुफ्त क्रिप्टो माइनिंग सिम्युलेटर, बिना पैसे लगाए बिटकॉइन माइनिंग • 
            <strong className="text-[#00d4ff]"> Español:</strong> minería de criptomonedas gratis, simulador mineria bitcoin gratis, minar ethereum sin hardware • 
            <strong className="text-purple-300"> العربية:</strong> تعدين بيتكوين مجاني, محاكي تعدين العملات الرقمية مجانا, تعدين ايثريوم بدون اجهزة • 
            <strong className="text-yellow-300"> Français:</strong> minage crypto gratuit, simulateur minage bitcoin gratuit • 
            <strong className="text-orange-300"> Deutsch:</strong> kostenloses krypto mining, bitcoin mining simulator kostenlos • 
            <strong className="text-pink-300"> Русский:</strong> бесплатный майнинг криптовалют, симулятор майнинга биткоин • 
            <strong className="text-teal-300"> 日本語:</strong> 無料暗号資産マイニング, ビットコインマイニングシミュレーター • 
            <strong className="text-emerald-300"> 简体中文:</strong> 免费加密货币挖矿, 免费比特币挖矿模拟器, 无需硬件挖矿 • 
            <strong className="text-cyan-300"> Türkçe:</strong> ücretsiz kripto madencilik simülatörü.
          </p>
        </div>

      </div>
    </section>
  );
};
