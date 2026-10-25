import React, { useState } from 'react';
import { Globe, Zap, Volume2, VolumeX, Share2, Award, ChevronDown, ShieldCheck, Clock } from 'lucide-react';
import { LANGUAGES, Language } from '../data/languages';

interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isMining: boolean;
  totalUsd: number;
  onOpenShareModal: () => void;
  onOpenAuditModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  isMining,
  totalUsd,
  onOpenShareModal,
  onOpenAuditModal,
  soundEnabled,
  onToggleSound
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLangs = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060a14]/90 backdrop-blur-md border-b border-[#00ff88]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group text-decoration-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] via-[#00d4ff] to-[#8a2be2] p-[1.5px] shadow-[0_0_15px_rgba(0,255,136,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,136,0.7)] transition-all duration-300">
              <div className="w-full h-full bg-[#060a14] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00ff88] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
                HASHFORGE <span className="text-[#00ff88] drop-shadow-[0_0_8px_#00ff88]">LAB</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-tight -mt-1">
                hashforgelab.co.uk
              </span>
            </div>
          </a>

          {/* 1-Minute Predictions & Audit Nav Badges */}
          <div className="hidden lg:flex items-center gap-2 ml-3">
            <a
              href="#crypto-minute-predictions"
              title="Top 20 Crypto 1-Minute Price Predictions & Status"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>1M PREDICTIONS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            </a>

            <button
              onClick={onOpenAuditModal}
              title="View SEO • GEO • AEO Audit Verification"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 shadow-[0_0_10px_rgba(0,255,136,0.2)] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>SEO • GEO • AEO: 100%</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Simulated Balance Pill */}
          {isMining && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs">
              <span className="text-gray-400">Earned:</span>
              <span className="font-mono font-bold text-[#00ff88] text-sm">
                ${totalUsd.toFixed(4)}
              </span>
            </div>
          )}

          {/* Audit trigger on mobile/tablet */}
          <button
            onClick={onOpenAuditModal}
            className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.05] border border-[#00ff88]/30 text-[#00ff88] text-xs font-mono font-semibold"
            title="SEO • GEO • AEO Audit"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px]">AUDIT</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Mining SFX' : 'Enable Mining SFX'}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00ff88]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Share & Earn Button */}
          <button
            id="share-btn"
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(0,255,136,0.35)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] hover:scale-105 transition-all duration-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SHARE &amp; EARN</span>
            <span className="sm:hidden">SHARE</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="lang-dropdown-trigger"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="mr-0.5">{currentLang.flag}</span>
              <span className="hidden md:inline">{currentLang.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div 
                id="lang-dropdown-menu"
                className="absolute right-0 mt-2 w-72 max-h-96 overflow-hidden flex flex-col bg-[#0b1220] border border-[#00ff88]/30 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="p-3 border-b border-white/10 bg-[#070c17]">
                  <div className="text-xs font-bold font-orbitron text-gray-300 mb-1.5 flex items-center justify-between">
                    <span>42 WORLDWIDE LANGUAGES</span>
                    <span className="text-[#00ff88] text-[10px]">180+ Countries</span>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search language or country..."
                    className="w-full px-3 py-1.5 text-xs bg-black/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff88]"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto max-h-64 p-1.5 divide-y divide-white/5">
                  {filteredLangs.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs transition-colors ${
                        currentLang.code === lang.code
                          ? 'bg-[#00ff88]/15 text-[#00ff88] font-bold border border-[#00ff88]/30'
                          : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <p className="font-medium leading-none">{lang.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{lang.nativeName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">{lang.code}</span>
                    </button>
                  ))}
                  {filteredLangs.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No language found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
