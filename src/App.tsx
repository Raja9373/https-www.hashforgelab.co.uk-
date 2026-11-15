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
import { MiningEnergyCalculator } from './components/MiningEnergyCalculator';
import { ContentAuthorityHub } from './components/ContentAuthorityHub';
import { TrustGovernanceSection, TrustTabId } from './components/TrustGovernanceSection';
import { Footer } from './components/Footer';
import { LANGUAGES, Language } from './data/languages';
import { ArrowLeft, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [isMiningView, setIsMiningView] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [onlineMiners, setOnlineMiners] = useState<number>(1284902);
  const [totalMinedUsd] = useState<number>(4200000);
  const [activeTrustTab, setActiveTrustTab] = useState<TrustTabId>('about');

  const [activeSectionParam, setActiveSectionParam] = useState<string | null>(null);

  // Read ?lang= and ?section= URL search parameters & hash route on initial load
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

      const sectionParam = params.get('section');
      if (sectionParam) {
        setActiveSectionParam(sectionParam);
        const sectionToDomId: Record<string, string> = {
          calculator: 'mining-calculator',
          algorithms: 'algorithm-research-hub',
          guides: 'authority-guides',
          predictions: 'crypto-minute-predictions',
          faq: 'faq-knowledge-base',
          'editorial-policy': 'trust-governance-center'
        };
        if (sectionParam === 'editorial-policy') {
          setActiveTrustTab('editorial');
        }
        const targetDomId = sectionToDomId[sectionParam];
        if (targetDomId) {
          setTimeout(() => {
            document.getElementById(targetDomId)?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }

      if (window.location.hash === '#simulator') {
        setIsMiningView(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Unified handler to switch language & sync URL query parameter
  const handleSelectLanguage = (lang: Language) => {
    setCurrentLang(lang);
    try {
      const url = new URL(window.location.href);
      if (lang.code === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang.code);
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  // Synchronize HTML document attributes & canonical URLs (strictly unified to https://www.hashforgelab.co.uk/)
  useEffect(() => {
    try {
      const bcp47Lang = currentLang.code === 'ng' ? 'en-NG' : currentLang.code;
      document.documentElement.lang = bcp47Lang;

      const sectionMetaMap: Record<string, { title: string; desc: string }> = {
        calculator: {
          title: 'Crypto Mining Electricity Cost & kWh Calculator | Hashforge Lab',
          desc: 'Calculate physical ASIC and GPU crypto mining electricity bills, kWh consumption, and thermal BTU output vs. 0W browser simulation.'
        },
        algorithms: {
          title: 'Proof-of-Work Algorithms: SHA-256, Scrypt, kHeavyHash & RandomX | Hashforge Lab',
          desc: 'Technical encyclopedia of cryptocurrency consensus and hashing algorithms: Bitcoin SHA-256, Dogecoin Scrypt, Kaspa GHOSTDAG, and Monero RandomX.'
        },
        guides: {
          title: 'How Proof-of-Work Mining Works: ASIC vs. Cloud vs. Browser Sim | Hashforge Lab',
          desc: 'Peer-reviewed blockchain guides explaining 80-byte block headers, nonces, difficulty adjustments, and hardware vs. cloud mining risks.'
        },
        predictions: {
          title: 'Top 20 Crypto 1-Minute Momentum Signals (RSI, EMA, Orderbook) | Hashforge Lab',
          desc: 'Real-time 60-second cryptocurrency technical momentum monitor tracking RSI(14), EMA crossovers, and orderbook buy walls across the top 20 coins.'
        },
        faq: {
          title: 'Crypto Mining Simulator FAQ & AEO Knowledge Base | Hashforge Lab',
          desc: 'Verified answers on zero-load browser mining safety, supported PoW algorithms, 1-minute technical indicators, and 42-language accessibility.'
        },
        'editorial-policy': {
          title: 'Editorial Policy, Fact-Checking & E-E-A-T Governance | Hashforge Lab',
          desc: 'Read the Hashforge Lab editorial standards, cryptographic whitepaper verification process, UK GDPR privacy policy, and terms of use.'
        }
      };

      let pageTitle = 'Hashforge Lab – Free Crypto Mining Simulator | BTC ETH SOL';
      let pageDesc =
        "World's #1 free crypto mining simulator. Mine Bitcoin, Ethereum & Solana with zero hardware load and 0 electricity bills. 42 languages, 100% safe.";
      let canonicalHref = 'https://www.hashforgelab.co.uk/';

      if (activeSectionParam && sectionMetaMap[activeSectionParam] && currentLang.code === 'en') {
        pageTitle = sectionMetaMap[activeSectionParam].title;
        pageDesc = sectionMetaMap[activeSectionParam].desc;
        canonicalHref = `https://www.hashforgelab.co.uk/?section=${activeSectionParam}`;
      } else if (currentLang.code !== 'en') {
        pageTitle = `${currentLang.nativeName} – Hashforge Lab | Free Crypto Mining Simulator`;
        canonicalHref = `https://www.hashforgelab.co.uk/?lang=${currentLang.code}`;
      }

      document.title = pageTitle;

      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', pageDesc);
      }

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalHref);

      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute('content', canonicalHref);
      }
    } catch {
      // ignore
    }
  }, [currentLang, activeSectionParam]);

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

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'simulator') {
      handleStartMining();
      return;
    }
    if (isMiningView) {
      setIsMiningView(false);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-white flex flex-col selection:bg-[#00ff88] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={handleSelectLanguage}
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

      {/* Semantic Breadcrumb Navigation Bar */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#050811] border-b border-white/10 py-2 px-4 sm:px-6 text-[11px] font-mono text-gray-400"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex flex-wrap items-center gap-1.5"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1"
            >
              <a
                itemProp="item"
                href="https://www.hashforgelab.co.uk/"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackToHero();
                }}
                className="text-gray-300 hover:text-[#00ff88] transition-colors"
              >
                <span itemProp="name">Hashforge Lab</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>

            <ChevronRight className="w-3 h-3 text-gray-600" />

            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1"
            >
              <a
                itemProp="item"
                href={isMiningView ? 'https://www.hashforgelab.co.uk/#simulator' : 'https://www.hashforgelab.co.uk/#mining-calculator'}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isMiningView) handleStartMining();
                }}
                className="text-[#00ff88] font-semibold hover:underline"
              >
                <span itemProp="name">
                  {isMiningView ? 'Worldwide Mining Console' : 'Overview & Research Portal'}
                </span>
              </a>
              <meta itemProp="position" content="2" />
            </li>

            {currentLang.code !== 'en' && (
              <>
                <ChevronRight className="w-3 h-3 text-gray-600" />
                <li className="text-[#00d4ff]">
                  {currentLang.flag} {currentLang.name} ({currentLang.code === 'ng' ? 'en-NG' : currentLang.code})
                </li>
              </>
            )}
          </ol>

          <div className="hidden md:flex items-center gap-3 text-[11px]">
            <a href="#mining-calculator" className="hover:text-white transition-colors">
              Calculator
            </a>
            <span aria-hidden="true">·</span>
            <a href="#algorithm-research-hub" className="hover:text-white transition-colors">
              Algorithms
            </a>
            <span aria-hidden="true">·</span>
            <a href="#authority-guides" className="hover:text-white transition-colors">
              Pillar Guides
            </a>
            <span aria-hidden="true">·</span>
            <a href="#trust-governance-center" className="hover:text-white transition-colors">
              Editorial Policy
            </a>
          </div>
        </div>
      </nav>

      {/* Main View Area */}
      <main className="flex-grow">
        {!isMiningView ? (
          <div>
            <HeroSection
              currentLang={currentLang}
              onSelectLang={handleSelectLanguage}
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
                        SEO, SEARCH INTENT &amp; GSC READINESS CENTER
                      </span>
                      <span className="text-[11px] font-mono text-[#00ff88] font-bold">
                        · 98/100 Internal Technical Score
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Canonical www unified, 42 BCP-47 Hreflangs, 3 XML Sitemaps, 5 Search Intent Clusters &amp; E-E-A-T Governance verified.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-orbitron font-bold text-[#00ff88] group-hover:underline flex items-center gap-1">
                  OPEN SEO COMMAND CENTER →
                </span>
              </div>
            </div>

            {/* Quick-start embedded simulator anchor */}
            <div id="simulator" className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
              <div className="bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-[#00ff88]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                <div>
                  <span className="text-[#00ff88] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" /> ZERO HARDWARE LOAD GUARANTEE
                  </span>
                  <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
                    Ready to launch your virtual mining node?
                  </h2>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-lg">
                    Experience real-time SHA-256 block difficulty resolution, live share confirmation, overclocking multipliers, and multi-coin simulated rewards.
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

            {/* Interactive PoW Mining Energy & Profitability Comparison Calculator */}
            <MiningEnergyCalculator onLaunchSimulator={handleStartMining} />

            {/* Real-time 1-Minute Crypto Price Prediction Engine (Top 20 Coins) */}
            <CryptoMinutePredictions onSelectCoinForMining={() => handleStartMining()} />

            {/* Programmatic Algorithm Research Hub & Pillar Guides */}
            <ContentAuthorityHub
              onLaunchSimulator={handleStartMining}
              onNavigateSection={handleNavigateSection}
            />

            {/* Virtual Hardware Health Safety Showcase on Homepage */}
            <div id="hardware-health" className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
              <VirtualHardwareHealth isMining={false} />
            </div>

            {/* AEO Structured FAQ Knowledge Base */}
            <EducationalFaq />

            {/* E-E-A-T Trust, Editorial Policy, Privacy Policy, Terms & Contact Center */}
            <TrustGovernanceSection
              activeTab={activeTrustTab}
              onSelectTab={setActiveTrustTab}
            />
          </div>
        ) : (
          <div id="simulator" className="animate-in fade-in duration-300">
            {/* Back Button Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
              <button
                id="back-to-home-btn"
                onClick={handleBackToHero}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-orbitron font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#00ff88]" />
                <span>BACK TO OVERVIEW &amp; RESEARCH GUIDES</span>
              </button>
            </div>

            <MiningConsole
              onOpenShareModal={() => setIsShareModalOpen(true)}
              soundEnabled={soundEnabled}
            />

            {/* Interactive PoW Mining Energy Calculator in Console View */}
            <MiningEnergyCalculator onLaunchSimulator={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

            {/* Real-time 1-Minute Crypto Price Prediction Engine in Mining View */}
            <CryptoMinutePredictions />

            <EducationalFaq />

            <TrustGovernanceSection
              activeTab={activeTrustTab}
              onSelectTab={setActiveTrustTab}
            />
          </div>
        )}
      </main>

      {/* Share & Earn Monetag Modal */}
      <ShareEarnModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* SEO, Search Intent & GSC Readiness Modal */}
      <AuditStatusModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        activeLanguageCode={currentLang.code}
      />

      {/* Real-time Global Mining Payout Notification */}
      <GlobalMiningPayoutToast />

      {/* Worldwide Footer */}
      <Footer
        onSelectLang={handleSelectLanguage}
        currentLang={currentLang}
        onSelectTrustTab={setActiveTrustTab}
        onStartMining={handleStartMining}
      />
    </div>
  );
}
