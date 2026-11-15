import React from 'react';
import { Zap } from 'lucide-react';
import { LANGUAGES, Language } from '../data/languages';
import { TrustTabId } from './TrustGovernanceSection';

interface FooterProps {
  onSelectLang: (lang: Language) => void;
  currentLang: Language;
  onSelectTrustTab?: (tab: TrustTabId) => void;
  onStartMining?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectLang,
  currentLang,
  onSelectTrustTab,
  onStartMining
}) => {
  const handleTrustNav = (tab: TrustTabId) => {
    if (onSelectTrustTab) onSelectTrustTab(tab);
    const el = document.getElementById('trust-governance-center');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#04070e] pt-12 pb-10 px-4 sm:px-6 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto">
        {/* Top Brand & Multi-Column Internal Linking Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-white/10">
          {/* Column 1-2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center text-black font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-orbitron font-extrabold text-base text-white tracking-wider">
                HASHFORGE <span className="text-[#00ff88]">LAB</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-md">
              World&apos;s #1 Free Educational Crypto Mining Simulator &amp; Proof-of-Work Research Platform. Practice SHA-256, Scrypt, kHeavyHash, and RandomX difficulty calculations in 42 languages at 0 Watts of physical hardware load.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-300">
              <span>100% Safe Browser Simulation</span>
              <span aria-hidden="true">·</span>
              <span>0W Electric Cost</span>
              <span aria-hidden="true">·</span>
              <span>London, UK (ISO: GB)</span>
            </div>
          </div>

          {/* Column 3: Interactive Tools & Simulators */}
          <div>
            <h3 className="font-orbitron font-bold text-white text-xs uppercase tracking-wider mb-3">
              Simulation &amp; Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#simulator"
                  onClick={(e) => {
                    if (onStartMining) {
                      e.preventDefault();
                      onStartMining();
                    }
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  Worldwide Mining Console
                </a>
              </li>
              <li>
                <a href="#mining-calculator" className="hover:text-[#00ff88] transition-colors">
                  PoW Electricity &amp; kWh Calculator
                </a>
              </li>
              <li>
                <a href="#crypto-minute-predictions" className="hover:text-[#00ff88] transition-colors">
                  1-Minute Crypto Momentum Tracker
                </a>
              </li>
              <li>
                <a href="#hardware-health" className="hover:text-[#00ff88] transition-colors">
                  Virtual Hardware Health (0% Load)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Pillar Guides & Algorithm Specs */}
          <div>
            <h3 className="font-orbitron font-bold text-white text-xs uppercase tracking-wider mb-3">
              Research &amp; Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#algorithm-research-hub" className="hover:text-[#00d4ff] transition-colors">
                  SHA-256 &amp; PoW Encyclopedia
                </a>
              </li>
              <li>
                <a href="#authority-guides" className="hover:text-[#00d4ff] transition-colors">
                  How Proof-of-Work Nonces Work
                </a>
              </li>
              <li>
                <a href="#authority-guides" className="hover:text-[#00d4ff] transition-colors">
                  ASIC vs. Cloud vs. Browser Sim
                </a>
              </li>
              <li>
                <a href="#faq-knowledge-base" className="hover:text-[#00d4ff] transition-colors">
                  Frequently Asked Questions (AEO)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: E-E-A-T Trust, Legal & Sitemaps */}
          <div>
            <h3 className="font-orbitron font-bold text-white text-xs uppercase tracking-wider mb-3">
              Trust &amp; Governance
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTrustNav('about');
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  About Hashforge Lab
                </a>
              </li>
              <li>
                <a
                  href="#editorial-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTrustNav('editorial');
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  Editorial &amp; Fact-Check Policy
                </a>
              </li>
              <li>
                <a
                  href="#privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTrustNav('privacy');
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  Privacy Policy (UK GDPR)
                </a>
              </li>
              <li>
                <a
                  href="#terms-and-conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTrustNav('terms');
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  Terms &amp; Risk Disclosures
                </a>
              </li>
              <li>
                <a
                  href="#contact-us"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTrustNav('contact');
                  }}
                  className="hover:text-[#00ff88] transition-colors"
                >
                  Contact Research Desk
                </a>
              </li>
              <li>
                <a
                  href="/sitemap-index.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white font-mono text-[11px]"
                >
                  XML Sitemap Index ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 42 Languages Crawlable Hreflang Sitemap Links */}
        <div id="supported-languages-sitemap" className="py-6 border-b border-white/10">
          <span className="block font-orbitron font-bold text-gray-300 text-xs mb-3 text-center md:text-left">
            Supported Worldwide Languages (Crawlable Hreflang Directory):
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 text-[11px]">
            {LANGUAGES.map((l) => {
              const hrefUrl = l.code === 'en' ? '/' : `/?lang=${l.code}`;
              return (
                <a
                  key={l.code}
                  href={hrefUrl}
                  hrefLang={l.code === 'ng' ? 'en-NG' : l.code}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectLang(l);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`hover:text-[#00ff88] transition-colors ${
                    currentLang.code === l.code ? 'text-[#00ff88] font-bold underline' : 'text-gray-400'
                  }`}
                >
                  {l.flag} {l.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright & Educational Disclosure */}
        <div className="pt-6 text-center space-y-2 leading-relaxed">
          <p className="font-mono text-gray-300">
            © 2026 www.hashforgelab.co.uk - Free Crypto Mining Simulator Worldwide - Educational Purpose Only - 42 Languages - 180+ Countries
          </p>
          <p className="text-[11px] text-gray-400">
            Bitcoin (SHA-256) Simulation · Ethereum &amp; Solana Consensus Modeling · Scrypt Dogecoin &amp; Litecoin · Kaspa kHeavyHash BlockDAG · Monero RandomX
          </p>
          <p className="text-[10px] text-gray-500 max-w-4xl mx-auto">
            Disclaimer: Hashforge Lab is an educational browser-based cryptocurrency simulator and technical research portal designed for learning blockchain mechanics. It does not perform physical hardware Proof-of-Work mining on your device, does not solicit investments, and does not provide financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
