import React from 'react';
import { Zap, Globe, Shield, Heart } from 'lucide-react';
import { LANGUAGES, Language } from '../data/languages';

interface FooterProps {
  onSelectLang: (lang: Language) => void;
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectLang, currentLang }) => {
  return (
    <footer className="border-t border-white/10 bg-[#04070e] pt-12 pb-10 px-4 sm:px-6 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto">
        
        {/* Brand & Slogan */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center text-black font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-orbitron font-extrabold text-base text-white tracking-wider">
                HASHFORGE <span className="text-[#00ff88]">LAB</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs max-w-md">
              World's #1 Free Educational Crypto Mining Simulator • 42 Worldwide Languages • 180+ Countries
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 font-mono text-[11px]">
              🔒 100% Safe Simulation
            </span>
            <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 font-mono text-[11px]">
              ⚡ Zero Electric Cost
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono text-[11px]">
              🌍 42 Languages SEO
            </span>
          </div>
        </div>

        {/* 42 Languages Footer Sitemap Links */}
        <div className="py-6 border-b border-white/10">
          <span className="block font-orbitron font-bold text-gray-300 text-xs mb-3 text-center md:text-left">
            🌐 Supported Worldwide Languages (Hreflang Sitemap):
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 text-[11px]">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onSelectLang(l);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:text-[#00ff88] transition-colors ${
                  currentLang.code === l.code ? 'text-[#00ff88] font-bold' : 'text-gray-400'
                }`}
              >
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Required User Template Copyright & SEO statement */}
        <div className="pt-6 text-center space-y-2 leading-relaxed">
          <p className="font-mono text-gray-300">
            © 2026 hashforgelab.co.uk - Free Crypto Mining Simulator Worldwide - Educational Purpose Only - 42 Languages - 180+ Countries - SEO Optimized
          </p>
          <p className="text-[11px] text-gray-400">
            Free Bitcoin Mining • Free Ethereum Mining • Free Solana Mining • No Hardware Mining • Browser Mining Free • Dogecoin Simulator • Kaspa Simulator
          </p>
          <p className="text-[10px] text-gray-500 font-mono">
            Trending Regional Queries: फ्री बिटकॉइन माइनिंग • Minería Criptomonedas Gratis • تعدين بيتكوين مجاني • Minage Crypto Gratuit • Kostenloses Krypto Mining • Бесплатный Майнинг • 無料暗号資産マイニング • 免费比特币挖矿 • Ücretsiz Kripto Madenciliği • Đào Coin Miễn Phí • Mining Kripto Gratis
          </p>
          <p className="text-[10px] text-gray-600">
            Disclaimer: Hashforge Lab is an educational browser-based cryptocurrency simulator designed for learning blockchain mechanics. It does not perform actual hardware proof-of-work mining on your physical device.
          </p>
        </div>

      </div>
    </footer>
  );
};
