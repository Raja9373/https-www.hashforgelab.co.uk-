import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Scale,
  Users,
  Mail,
  BookCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export type TrustTabId = 'about' | 'editorial' | 'privacy' | 'terms' | 'contact';

interface TrustGovernanceSectionProps {
  activeTab?: TrustTabId;
  onSelectTab?: (tab: TrustTabId) => void;
}

export const TrustGovernanceSection: React.FC<TrustGovernanceSectionProps> = ({
  activeTab: controlledTab,
  onSelectTab
}) => {
  const [internalTab, setInternalTab] = useState<TrustTabId>('about');
  const currentTab = controlledTab ?? internalTab;

  const handleTabChange = (tab: TrustTabId) => {
    setInternalTab(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <section
      id="trust-governance-center"
      aria-labelledby="trust-governance-heading"
      className="py-12 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>TRANSPARENCY, E-E-A-T GOVERNANCE &amp; LEGAL DISCLOSURES</span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-400">United Kingdom (GB) Jurisdiction</span>
            </div>
            <h2
              id="trust-governance-heading"
              className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight"
            >
              About Hashforge Lab, Editorial Policy &amp; Terms
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 max-w-3xl leading-relaxed">
              Full institutional transparency covering our educational simulation mandate, technical review standards, user privacy protections, and terms of service.
            </p>
          </div>

          {/* Segmented Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/50 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'about' as TrustTabId, label: 'About Us', icon: Users },
              { id: 'editorial' as TrustTabId, label: 'Editorial Policy', icon: BookCheck },
              { id: 'privacy' as TrustTabId, label: 'Privacy Policy', icon: ShieldCheck },
              { id: 'terms' as TrustTabId, label: 'Terms & Conditions', icon: Scale },
              { id: 'contact' as TrustTabId, label: 'Contact & Research', icon: Mail }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-orbitron font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#00ff88] text-black shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 text-xs sm:text-sm text-gray-300 leading-relaxed space-y-6">
          {currentTab === 'about' && (
            <div id="about-us" className="space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                About Hashforge Lab (www.hashforgelab.co.uk)
              </h3>
              <p>
                <strong>Hashforge Lab</strong> is an independent educational cryptocurrency mining simulation and blockchain research platform headquartered in London, United Kingdom. Our mission is to make Proof-of-Work (PoW) cryptography, difficulty adjustment mathematics, and digital asset market microstructure accessible to students, educators, and technology enthusiasts across 42 languages and 180+ countries—without financial risk, hardware wear, or environmental energy waste.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="font-orbitron text-xs text-[#00ff88] block mb-1">
                    1. Educational Simulation Mandate
                  </strong>
                  <p className="text-xs text-gray-300">
                    All hash rates, nonces, block heights, and multi-coin balances in the Mining Console are mathematical browser simulations designed to teach blockchain concepts at 0 Watts of physical PoW load.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="font-orbitron text-xs text-[#00d4ff] block mb-1">
                    2. Zero Hardware &amp; Wallet Risk
                  </strong>
                  <p className="text-xs text-gray-300">
                    We never execute background WebAssembly/WebGL cryptojacking scripts, never request private keys or seed phrases, and never sell speculative cloud-mining investment contracts.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <strong className="font-orbitron text-xs text-purple-300 block mb-1">
                    3. Research &amp; Technical Contributors
                  </strong>
                  <p className="text-xs text-gray-300">
                    Technical guides and calculators are authored and peer-reviewed by our engineering contributors: <strong>Dr. Marcus Vance, Ph.D.</strong> (Cryptographic Systems), <strong>Elena Rostova, M.Sc.</strong> (Protocol Auditing), and <strong>Arjun Mehta, CFA</strong> (Market Microstructure).
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'editorial' && (
            <div id="editorial-policy" className="space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                Editorial Policy, Fact-Checking &amp; Verification Standards
              </h3>
              <p>
                Every technical article, algorithm specification, and calculator formula published on Hashforge Lab adheres to a strict three-stage verification workflow:
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                  <span>
                    <strong>Primary Protocol Citations Only:</strong> Cryptographic parameters (such as SHA-256 80-byte headers, Scrypt RFC 7914 parameters, Kaspa GHOSTDAG k-clusters, and RandomX VM specifications) are verified directly against official NIST standards, IETF RFCs, and peer-reviewed whitepapers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Anti-Fabrication Policy:</strong> We do not publish unverified profitability promises, fabricated user review scores, or guaranteed price predictions. All 1-minute momentum indicators carry explicit disclosures that short-term technical oscillators (RSI, EMA, MACD) are educational and non-guaranteed.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                  <span>
                    <strong>Scheduled Content Freshness Audits:</strong> Every guide and interactive calculator displays its <code className="text-[#00d4ff]">Last Verified</code> timestamp and undergoes scheduled technical review when network parameters (such as block rewards or hardware efficiency benchmarks) change.
                  </span>
                </li>
              </ul>
            </div>
          )}

          {currentTab === 'privacy' && (
            <div id="privacy-policy" className="space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                Privacy Policy &amp; Data Protection (GDPR / UK GDPR Compliant)
              </h3>
              <p>
                <strong>Effective &amp; Last Updated: November 15, 2026.</strong> Hashforge Lab respects user privacy and minimizes data collection across all 180+ supported regions:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>1. No Account Registration or KYC Required:</strong> You can access the entire mining simulator, calculator, and research library without providing your name, email address, phone number, or cryptocurrency wallet address.
                </li>
                <li>
                  <strong>2. Local Browser State:</strong> Simulation preferences (selected language, audio mute state, and simulated rig settings) are held locally in your browser session.
                </li>
                <li>
                  <strong>3. Advertising &amp; Analytics Transparency:</strong> To keep Hashforge Lab 100% free for students worldwide, this website utilizes Google AdSense (<code className="text-gray-200">ca-pub-9048615701580913</code>) and Monetag monetization tags. Third-party ad partners may use standard cookies or web beacons to serve relevant advertisements in accordance with Google Publisher Policies and IAB TCF standards.
                </li>
              </ul>
            </div>
          )}

          {currentTab === 'terms' && (
            <div id="terms-and-conditions" className="space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                Terms and Conditions of Use &amp; Non-Financial Advice Disclaimer
              </h3>
              <p>
                By accessing <strong>https://www.hashforgelab.co.uk/</strong>, you acknowledge and agree to the following terms:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>1. Educational Simulation Purpose:</strong> Hashforge Lab is an interactive educational simulation platform. Simulated hash rates, virtual rigs, XP levels, and simulated coin balances represent educational telemetry unless explicitly participating in verified promotional referral/ad-share programs subject to minimum threshold ($10) and payment verification rules.
                </li>
                <li>
                  <strong>2. Not Financial or Investment Advice:</strong> Nothing on this website—including the 1-Minute Crypto Momentum &amp; Status tracker, RSI/MACD indicators, or electricity calculators—constitutes financial, investment, legal, or trading advice. Cryptocurrency markets are highly volatile.
                </li>
                <li>
                  <strong>3. Intellectual Property &amp; Fair Use:</strong> All original educational guides, custom simulation interfaces, and calculators are copyright © 2026 Hashforge Lab. Bitcoin, Ethereum, Solana, and other referenced protocol names are trademarks or open-source designations of their respective communities.
                </li>
              </ul>
            </div>
          )}

          {currentTab === 'contact' && (
            <div id="contact-us" className="space-y-4">
              <h3 className="font-orbitron font-bold text-lg text-white">
                Contact Us, Technical Corrections &amp; Academic Inquiries
              </h3>
              <p>
                We welcome technical feedback, bug reports, academic citations, and localization improvements across all 42 supported languages.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-gray-400 block mb-1">Editorial &amp; Research Desk:</span>
                  <strong className="text-[#00ff88]">research@hashforgelab.co.uk</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-gray-400 block mb-1">Technical Support &amp; SEO Audit:</span>
                  <strong className="text-[#00d4ff]">support@hashforgelab.co.uk</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-gray-400 block mb-1">Registered Location:</span>
                  <strong className="text-white">London, United Kingdom (ISO: GB)</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
