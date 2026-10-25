/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MiningConsole } from './components/MiningConsole';
import { EducationalFaq } from './components/EducationalFaq';
import { ShareEarnModal } from './components/ShareEarnModal';
import { AuditStatusModal } from './components/AuditStatusModal';
import { VirtualHardwareHealth } from './components/VirtualHardwareHealth';
import { LiveMiningFeed } from './components/LiveMiningFeed';
import { GlobalMiningPayoutToast } from './components/GlobalMiningPayoutToast';
import { CryptoMinutePredictions } from './components/CryptoMinutePredictions';
import { Footer } from './components/Footer';
import { LANGUAGES, Language } from './data/languages';
import { ArrowLeft, Play, Zap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [isMiningView, setIsMiningView] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [onlineMiners, setOnlineMiners] = useState<number>(1284902);
  const [totalMinedUsd, setTotalMinedUsd] = useState<number>(4200000);

  // Read ?lang= URL search parameter for worldwide hreflang SEO support
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam) {
        const matched = LANGUAGES.find((l) => l.code.toLowerCase() === langParam.toLowerCase());
        if (matched) {
          setCurrentLang(matched);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Synchronize HTML document attributes for regional SEO & headless AI crawlers
  useEffect(() => {
    try {
      document.documentElement.lang = currentLang.code;
      if (currentLang.code === 'en') {
        document.title = 'Hashforge Lab – Free Crypto Mining Simulator | BTC ETH SOL';
      } else {
        document.title = `${currentLang.nativeName} - Hashforge Lab | Free Crypto Mining Simulator`;
      }

      // Update canonical tag dynamically for each language to ensure GSC indexes parameterized language URLs correctly
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      if (currentLang.code === 'en') {
        canonicalLink.setAttribute('href', 'https://hashforgelab.co.uk/');
      } else {
        canonicalLink.setAttribute('href', `https://hashforgelab.co.uk/?lang=${currentLang.code}`);
      }
    } catch {
      // ignore
    }
  }, [currentLang]);

  // Fluctuating real-time online miner counter
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineMiners((prev) => prev + Math.floor(Math.random() * 9 - 4));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleStartMining = () => {
    setIsMiningView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHero = () => {
    setIsMiningView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-white flex flex-col selection:bg-[#00ff88] selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={(lang) => {
          setCurrentLang(lang);
          // Update URL without full refresh for clean sharing and canonical state
          try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang.code);
            window.history.replaceState({}, '', url.toString());
          } catch {}
        }}
        isMining={isMiningView}
        totalUsd={24.85}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Live Mining Feed Worldwide Ticker */}
      <div className="pt-16">
        <LiveMiningFeed />
      </div>

      {/* Main View Area */}
      <main className="flex-grow">
        {!isMiningView ? (
          <div>
            <HeroSection
              currentLang={currentLang}
              onSelectLang={setCurrentLang}
              onStartMining={handleStartMining}
              onlineMiners={onlineMiners}
              totalMinedUsd={totalMinedUsd}
            />

            {/* SEO • GEO • AEO Live Audit Indicator Banner */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
              <div 
                onClick={() => setIsAuditModalOpen(true)}
                className="group cursor-pointer p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#00ff88]/10 via-[#00d4ff]/10 to-purple-500/10 border border-[#00ff88]/30 hover:border-[#00ff88]/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#00ff88]/20 flex items-center justify-center text-[#00ff88] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron font-bold text-xs text-white">
                        SEO, GEO &amp; AEO STATUS: ALL AUDITS PASSED
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00ff88] text-black">
                        100% HEALTH
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Standard ISO-3166 Geo, 42 Hreflangs, AEO Graph (WebApplication, FAQPage, HowTo), Robots.txt &amp; Sitemap verified.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-orbitron font-bold text-[#00ff88] group-hover:underline flex items-center gap-1">
                  VIEW AUDIT DETAILS →
                </span>
              </div>
            </div>

            {/* Quick-start embedded preview */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
              <div className="bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-[#00ff88]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                <div>
                  <span className="text-[#00ff88] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" /> ZERO HARDWARE LOAD GUARANTEE
                  </span>
                  <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
                    Ready to launch your virtual node?
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-lg">
                    Experience real-time SHA-256 block difficulty resolution, live share confirmation, and multi-coin simulated rewards.
                  </p>
                </div>

                <button
                  id="launch-node-cta"
                  onClick={handleStartMining}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-orbitron font-black text-sm tracking-wide shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.7)] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                >
                  ▶ LAUNCH CONSOLE
                </button>
              </div>
            </div>

            {/* Real-time 1-Minute Crypto Price Prediction Engine (Top 20 Coins) */}
            <CryptoMinutePredictions 
              onSelectCoinForMining={() => handleStartMining()} 
            />

            {/* Virtual Hardware Health Safety Showcase on Homepage */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
              <VirtualHardwareHealth isMining={false} />
            </div>

            <EducationalFaq />

          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {/* Back Button Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
              <button
                id="back-to-home-btn"
                onClick={handleBackToHero}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-orbitron font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#00ff88]" />
                <span>BACK TO OVERVIEW</span>
              </button>
            </div>

            <MiningConsole
              onOpenShareModal={() => setIsShareModalOpen(true)}
              soundEnabled={soundEnabled}
            />

            {/* Real-time 1-Minute Crypto Price Prediction Engine in Mining View */}
            <CryptoMinutePredictions />

            <EducationalFaq />
          </div>
        )}
      </main>

      {/* Share & Earn Monetag Modal */}
      <ShareEarnModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* SEO GEO AEO Audit Status Modal */}
      <AuditStatusModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        activeLanguageCode={currentLang.code}
      />

      {/* Real-time Global Mining Payout Notification */}
      <GlobalMiningPayoutToast />

      {/* Worldwide Footer */}
      <Footer
        onSelectLang={setCurrentLang}
        currentLang={currentLang}
      />

    </div>
  );
}
