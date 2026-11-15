import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  FileText,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import {
  ALGORITHM_PROFILES,
  PILLAR_ARTICLES,
  AlgorithmProfile,
  PillarArticle
} from '../data/seoAuthorityData';

interface ContentAuthorityHubProps {
  onLaunchSimulator: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ContentAuthorityHub: React.FC<ContentAuthorityHubProps> = ({
  onLaunchSimulator,
  onNavigateSection
}) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmProfile>(ALGORITHM_PROFILES[0]);
  const [selectedArticle, setSelectedArticle] = useState<PillarArticle>(PILLAR_ARTICLES[0]);

  return (
    <div className="space-y-14 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* PART 1: PROGRAMMATIC SEO — CRYPTOGRAPHIC ALGORITHM & CONSENSUS RESEARCH HUB */}
      <section
        id="algorithm-research-hub"
        aria-labelledby="algorithm-hub-heading"
        className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00d4ff] mb-2">
              <Cpu className="w-4 h-4" />
              <span>CRYPTOGRAPHIC CONSENSUS &amp; HASHING SPECIFICATIONS</span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-400">NIST / IETF / IACR Whitepaper Referenced</span>
            </div>
            <h2
              id="algorithm-hub-heading"
              className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight"
            >
              Proof-of-Work &amp; Consensus Algorithm Encyclopedia
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 max-w-3xl leading-relaxed">
              Explore the mathematical specifications, block intervals, memory-hardness architectures, and hardware profiles for the blockchain networks simulated in Hashforge Lab.
            </p>
          </div>

          <div className="text-xs font-mono text-gray-400 shrink-0">
            Technical Review: <time dateTime={selectedAlgo.lastVerified} className="text-white font-semibold">{selectedAlgo.lastVerified}</time>
          </div>
        </div>

        {/* Algorithm Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist" aria-label="Cryptographic Algorithms">
          {ALGORITHM_PROFILES.map((algo) => {
            const isSelected = selectedAlgo.id === algo.id;
            return (
              <button
                key={algo.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedAlgo(algo)}
                className={`px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#00d4ff] text-black shadow-[0_0_15px_rgba(0,212,255,0.35)]'
                    : 'bg-black/50 text-gray-300 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {algo.algorithmName.split(' (')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Algorithm Deep Technical Profile */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
              <span className="text-[#00ff88] font-bold">{selectedAlgo.networkConsensusType}</span>
              <span aria-hidden="true">·</span>
              <span>Standard: {selectedAlgo.hashFunctionStandard}</span>
            </div>

            <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white">
              {selectedAlgo.algorithmName}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {selectedAlgo.technicalSummary}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <h4 className="font-orbitron font-bold text-xs text-[#00d4ff]">
                Cryptographic Hash &amp; Nonce Mechanics
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedAlgo.cryptographicMechanics}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#00ff88]/[0.05] border border-[#00ff88]/25 space-y-1.5">
              <h4 className="font-orbitron font-bold text-xs text-[#00ff88]">
                Educational Simulation Takeaway
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed">
                {selectedAlgo.educationalTakeaway}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="space-y-3">
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
                Protocol Benchmark Specifications
              </h4>

              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-400">Primary Networks:</dt>
                  <dd className="font-mono font-bold text-white text-right">
                    {selectedAlgo.primaryCoins.join(', ')}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-400">Target Block Interval:</dt>
                  <dd className="font-mono text-[#00ff88] text-right">
                    {selectedAlgo.blockTimeTarget}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-400">Physical Hardware Class:</dt>
                  <dd className="font-mono text-gray-200 text-right">
                    {selectedAlgo.typicalHardwareClass}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-400">Typical Physical Power Draw:</dt>
                  <dd className="font-mono text-orange-300 tabular-nums text-right">
                    ~{selectedAlgo.physicalPowerDrawWatts.toLocaleString()} Watts (vs. 0W Sim)
                  </dd>
                </div>
              </dl>

              <div className="pt-3 border-t border-white/10 text-xs">
                <span className="text-gray-400 block mb-1">Primary Authoritative Reference:</span>
                <a
                  href={selectedAlgo.authoritativeSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00d4ff] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>{selectedAlgo.authoritativeSource.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <span className="block text-[11px] text-gray-500 font-mono mt-0.5">
                  {selectedAlgo.authoritativeSource.citation}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onLaunchSimulator}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#00ff88] text-black font-orbitron font-bold text-xs cursor-pointer hover:brightness-110 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Simulate {selectedAlgo.primaryCoins[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('mining-calculator')}
                className="py-2.5 px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono text-gray-200 cursor-pointer whitespace-nowrap"
              >
                Compare kWh Cost
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* PART 2: PILLAR ARTICLES, TECHNICAL TUTORIALS & HARDWARE COMPARISONS */}
      <section
        id="authority-guides"
        aria-labelledby="authority-guides-heading"
        className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00ff88] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>PEER-REVIEWED BLOCKCHAIN EDUCATION &amp; RESEARCH LIBRARY</span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-400">E-E-A-T Verified</span>
            </div>
            <h2
              id="authority-guides-heading"
              className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-tight"
            >
              In-Depth Crypto Mining Guides &amp; Architecture Comparisons
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 max-w-3xl leading-relaxed">
              Comprehensive technical documentation written and reviewed by cryptographic systems researchers to help students and analysts understand Proof-of-Work mechanics, energy economics, and market microstructure.
            </p>
          </div>
        </div>

        {/* Article Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PILLAR_ARTICLES.map((article) => {
            const isSelected = selectedArticle.id === article.id;
            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedArticle(article)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#00ff88]/10 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.15)]'
                    : 'bg-black/40 border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 mb-2">
                    <span className="text-[#00ff88] font-bold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-orbitron font-bold text-sm text-white leading-snug mb-2">
                    {article.title}
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-gray-400 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span>By {article.author.name}</span>
                  <span className="text-[#00d4ff]">{isSelected ? 'Reading ↓' : 'Read Guide →'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Full Pillar Article Reader */}
        <article
          itemScope
          itemType="https://schema.org/TechArticle"
          className="bg-black/60 border border-white/12 rounded-2xl p-6 sm:p-8 space-y-6"
        >
          <header className="border-b border-white/10 pb-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
              <span className="text-[#00ff88] font-bold">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>
                Last Updated: <time itemProp="dateModified" dateTime={selectedArticle.lastUpdated} className="text-white">{selectedArticle.lastUpdated}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Fact-Checked: <time dateTime={selectedArticle.lastVerified} className="text-[#00d4ff]">{selectedArticle.lastVerified}</time>
              </span>
            </div>

            <h3 itemProp="headline" className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
              {selectedArticle.title}
            </h3>

            <p itemProp="description" className="text-sm text-gray-300 leading-relaxed">
              {selectedArticle.subtitle}
            </p>

            {/* Author & Reviewer E-E-A-T Attribution Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-gray-300">
              <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                <UserCheck className="w-4 h-4 text-[#00ff88]" />
                <span>
                  Author: <strong itemProp="name" className="text-white">{selectedArticle.author.name}</strong> ({selectedArticle.author.role})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00d4ff]" />
                <span>
                  Reviewed by: <strong className="text-white">{selectedArticle.reviewer.name}</strong> ({selectedArticle.reviewer.role})
                </span>
              </div>
            </div>
          </header>

          {/* Key Takeaways Box */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <h4 className="font-orbitron font-bold text-xs text-[#00ff88] uppercase tracking-wider mb-3">
              Executive Summary &amp; Key Technical Takeaways
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-200">
              {selectedArticle.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Sections */}
          <div itemProp="articleBody" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedArticle.sections.map((sec, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-2">
                <h4 className="font-orbitron font-bold text-sm text-white">
                  {sec.heading}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Objective Comparison Table: Physical ASIC vs Cloud Mining vs Educational Browser Simulation */}
          <div className="pt-4">
            <h4 className="font-orbitron font-bold text-sm text-white mb-3">
              Comparison Matrix: Physical ASIC Hardware vs. Cloud Mining Contracts vs. Hashforge Lab Simulation
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/[0.06] text-gray-200 font-orbitron border-b border-white/10">
                    <th className="p-3.5">Evaluation Metric</th>
                    <th className="p-3.5">Physical ASIC / GPU Rig</th>
                    <th className="p-3.5">3rd-Party Cloud Mining Contract</th>
                    <th className="p-3.5 text-[#00ff88]">Hashforge Lab Browser Simulator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-gray-300 font-mono">
                  <tr className="bg-black/40">
                    <td className="p-3.5 font-sans font-semibold text-white">Upfront Capital Cost</td>
                    <td className="p-3.5 tabular-nums">$3,000 – $14,500+ per unit</td>
                    <td className="p-3.5 tabular-nums">$250 – $5,000 locked contract</td>
                    <td className="p-3.5 text-[#00ff88] font-bold tabular-nums">$0.00 (100% Free)</td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="p-3.5 font-sans font-semibold text-white">Electricity Consumption</td>
                    <td className="p-3.5 tabular-nums">480W – 3,500W continuous</td>
                    <td className="p-3.5">Deducted via daily maintenance fees</td>
                    <td className="p-3.5 text-[#00ff88] font-bold tabular-nums">0 Watts incremental PoW load</td>
                  </tr>
                  <tr className="bg-black/40">
                    <td className="p-3.5 font-sans font-semibold text-white">Device Thermal &amp; Acoustic Load</td>
                    <td className="p-3.5 tabular-nums">75+ dB fan noise / 11,900 BTU/hr</td>
                    <td className="p-3.5">Remote data center (unverified)</td>
                    <td className="p-3.5 text-[#00ff88] font-bold">Silent · Safe on mobile &amp; laptops</td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="p-3.5 font-sans font-semibold text-white">Wallet / Private Key Risk</td>
                    <td className="p-3.5">Self-custody wallet setup required</td>
                    <td className="p-3.5 text-orange-300">High counterparty &amp; lockup risk</td>
                    <td className="p-3.5 text-[#00ff88] font-bold">Zero wallet or private key required</td>
                  </tr>
                  <tr className="bg-black/40">
                    <td className="p-3.5 font-sans font-semibold text-white">Primary Purpose</td>
                    <td className="p-3.5">Industrial block production</td>
                    <td className="p-3.5">Speculative hash rental</td>
                    <td className="p-3.5 text-[#00ff88] font-bold">Interactive blockchain &amp; PoW education</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Authoritative Citations & Contextual Internal Links Footer */}
          <footer className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <span className="text-gray-400 font-mono block">Primary Technical References &amp; Citations:</span>
              <div className="flex flex-wrap items-center gap-4">
                {selectedArticle.citations.map((cit, i) => (
                  <a
                    key={i}
                    href={cit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] hover:underline inline-flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{cit.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onNavigateSection(selectedArticle.relatedSectionId)}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-orbitron font-bold text-white cursor-pointer transition-colors"
              >
                Explore Related Tool →
              </button>
              <button
                type="button"
                onClick={onLaunchSimulator}
                className="px-4 py-2 rounded-xl bg-[#00ff88] text-black text-xs font-orbitron font-bold cursor-pointer hover:brightness-110 transition-all"
              >
                Open Mining Console
              </button>
            </div>
          </footer>
        </article>
      </section>
    </div>
  );
};
