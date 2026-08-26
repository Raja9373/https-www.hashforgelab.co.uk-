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
import { Footer } from './components/Footer';
import { LANGUAGES, Language } from './data/languages';
import { ArrowLeft, Play, Zap } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [isMiningView, setIsMiningView] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
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
          // Update URL without full refresh for clean sharing
          try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang.code);
            window.history.replaceState({}, '', url.toString());
          } catch {}
        }}
        isMining={isMiningView}
        totalUsd={24.85}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

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

            <EducationalFaq />
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {/* Back Button Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-2">
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

            <EducationalFaq />
          </div>
        )}
      </main>

      {/* Share & Earn Monetag Modal */}
      <ShareEarnModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Worldwide Footer */}
      <Footer
        onSelectLang={setCurrentLang}
        currentLang={currentLang}
      />

    </div>
  );
}
