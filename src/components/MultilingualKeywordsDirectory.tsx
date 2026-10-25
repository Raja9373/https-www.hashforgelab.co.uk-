import React, { useState } from 'react';
import { Search, Globe2, Sparkles, Copy, Check, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { MULTILINGUAL_KEYWORDS, LanguageKeywords } from '../data/multilingualKeywords';
import { Language, LANGUAGES } from '../data/languages';

interface MultilingualKeywordsDirectoryProps {
  onSelectLanguage: (lang: Language) => void;
  currentLangCode: string;
}

export const MultilingualKeywordsDirectory: React.FC<MultilingualKeywordsDirectoryProps> = ({
  onSelectLanguage,
  currentLangCode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'asia' | 'europe' | 'americas' | 'africa'>('all');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleCopy = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleSelectLangByCode = (code: string) => {
    const matched = LANGUAGES.find((l) => l.code === code);
    if (matched) {
      onSelectLanguage(matched);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredItems = MULTILINGUAL_KEYWORDS.filter((item) => {
    const matchesQuery = 
      item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryQuery.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesQuery;
  });

  return (
    <section 
      id="global-keyword-directory"
      aria-label="Worldwide Multilingual Search Queries and Indexing Directory"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Header & Section Title */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30 mb-2">
          <Globe2 className="w-3.5 h-3.5" /> 42 LANGUAGES WORLDWIDE INDEX
        </span>
        <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
          Global Multilingual Keywords &amp; Search Queries
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl mx-auto">
          Comprehensive search indexing covering Google, Bing, Yandex, Baidu, and Naver queries across 180+ countries in their native scripts.
        </p>
      </div>

      {/* Search Input Filter */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords in any language (e.g. prediction, ऊपर, minería, تعدين)..."
            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 focus:border-[#00ff88] rounded-2xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner"
          />
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <span className="text-[10px] font-mono text-gray-500 mr-1">Trending:</span>
          {[
            { label: '⚡ 1-Min Prediction', query: 'prediction' },
            { label: '📈 Rising & Falling', query: 'rising' },
            { label: '₿ Bitcoin', query: 'bitcoin' },
            { label: '🇮🇳 हिन्दी प्रेडिक्शन', query: 'प्रेडिक्शन' },
            { label: '🇪🇸 Señales Minuto', query: 'minuto' }
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => setSearchTerm(searchTerm === tag.query ? '' : tag.query)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                searchTerm === tag.query
                  ? 'bg-[#00ff88] text-black font-bold'
                  : 'bg-white/[0.05] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {tag.label}
            </button>
          ))}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[10px] text-red-400 hover:underline font-mono ml-auto"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-500 mt-2 px-1 font-mono">
          <span>Showing {filteredItems.length} of 42 regional languages</span>
          <span>Click any query to switch &amp; test simulation</span>
        </div>
      </div>

      {/* Responsive Grid of 42 Languages & Keyword Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isCurrentActive = currentLangCode === item.code;

          return (
            <article 
              key={item.code}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-[#00ff88]/[0.08] border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div>
                {/* Language Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.flag}</span>
                    <div>
                      <h3 className="font-bold text-xs text-white leading-tight">
                        {item.language}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {item.nativeName} ({item.code.toUpperCase()})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectLangByCode(item.code)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      isCurrentActive
                        ? 'bg-[#00ff88] text-black shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {isCurrentActive ? 'ACTIVE' : 'SWITCH'}
                  </button>
                </div>

                {/* Primary Query Header */}
                <div className="my-2 p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[9px] font-mono text-[#00d4ff] uppercase block mb-0.5">
                    Primary Google Query
                  </span>
                  <div className="text-xs font-semibold text-white flex items-center justify-between gap-2">
                    <span className="truncate">{item.primaryQuery}</span>
                    <button
                      onClick={() => handleCopy(item.primaryQuery)}
                      title="Copy search query"
                      className="p-1 hover:text-[#00ff88] text-gray-400 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKeyword === item.primaryQuery ? (
                        <Check className="w-3.5 h-3.5 text-[#00ff88]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Keyword Pills List */}
                <div className="mt-2.5">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block mb-1">
                    Indexed Search Terms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleCopy(kw)}
                        title="Click to copy query"
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-[#00ff88]/15 hover:text-[#00ff88] border border-white/5 text-gray-300 transition-all cursor-pointer font-sans"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Note */}
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <span>Rank Ready</span>
                <span className="text-[#00ff88] hover:underline cursor-pointer" onClick={() => handleSelectLangByCode(item.code)}>
                  Open in {item.language} →
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-xs">
          No matching keywords found for "{searchTerm}".
        </div>
      )}

      {/* SEO & Indexing Summary Note */}
      <div className="mt-8 p-4 rounded-2xl bg-[#00ff88]/[0.03] border border-dashed border-[#00ff88]/30 text-xs text-gray-400 leading-relaxed text-center sm:text-left">
        <strong className="text-white font-mono block mb-1">
          📌 Automated Search Engine Indexing Information:
        </strong>
        Every language cluster above corresponds directly to localized <code className="text-[#00d4ff]">?lang=&lt;code&gt;</code> sitemap URLs and Schema.org rich snippets, facilitating organic high-relevance rank for international queries like <em>free bitcoin mining simulator</em> in English, Hindi (मुफ़्त बिटकॉइन माइनिंग), Spanish (minería criptomonedas gratis), Arabic (تعدين بيتكوين مجاني), and 38 other global tongues.
      </div>
    </section>
  );
};
