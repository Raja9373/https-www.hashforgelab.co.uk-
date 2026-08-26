import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  TrendingUp, 
  MessageCircle, 
  Send, 
  Twitter, 
  Facebook, 
  ExternalLink,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface ShareEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareEarnModal: React.FC<ShareEarnModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [simVisitors, setSimVisitors] = useState<number>(5000);

  if (!isOpen) return null;

  const shareUrl = 'https://hashforgelab.co.uk';
  const shareText = '⚡ Mine Bitcoin, Ethereum & Solana for FREE with 0 hardware load! 42 languages, 180+ countries. Start free simulation now at Hashforge Lab:';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const estEarnings = ((simVisitors / 1000) * 8.5).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b1220] border border-[#00ff88]/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,255,136,0.3)] overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00ff88]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-2xl bg-[#00ff88]/15 text-[#00ff88] mb-3 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <DollarSign className="w-7 h-7" />
          </div>
          <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
            SHARE & EARN REAL $$$
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-sm mx-auto">
            This simulator is 100% free educational software. You earn real passive income through verified <strong className="text-[#00ff88]">Monetag Ads</strong>!
          </p>
        </div>

        {/* How Real Earnings Work */}
        <div className="bg-[#00ff88]/[0.06] border border-[#00ff88]/30 rounded-2xl p-4 mb-5 text-xs text-gray-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#00ff88] font-orbitron">
            <Sparkles className="w-4 h-4" /> HOW MONETIZATION WORKS:
          </div>
          <p className="leading-relaxed">
            Every user who visits <span className="text-[#00ff88] font-mono">hashforgelab.co.uk</span> views high-CPM ads verified by Monetag. You generate <strong>$5.00 to $10.00+ USD per 1,000 visitors</strong> worldwide!
          </p>
        </div>

        {/* Interactive Earnings Estimator */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
            <span>Estimated Visitors: <strong className="text-[#00d4ff] font-mono">{simVisitors.toLocaleString()}</strong></span>
            <span>Est. Earning: <strong className="text-[#00ff88] font-mono text-sm">${estEarnings} USD</strong></span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={simVisitors}
            onChange={(e) => setSimVisitors(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>1K ($8.50)</span>
            <span>25K ($212.50)</span>
            <span>50K ($425.00)</span>
          </div>
        </div>

        {/* Share Link Field */}
        <div className="mb-5">
          <label className="block text-xs font-mono text-gray-400 mb-1.5">
            YOUR OFFICIAL SHARE URL:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl font-mono text-xs text-white select-all focus:outline-none focus:border-[#00ff88]"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs flex items-center gap-1.5 transition-all ${
                copied 
                  ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.6)]' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Social Sharing Buttons */}
        <div>
          <span className="block text-xs font-mono text-gray-400 mb-2 text-center">
            SHARE ON SOCIAL MEDIA & GROUPS:
          </span>
          <div className="grid grid-cols-4 gap-2">
            
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition-all text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 mb-1" />
              <span className="text-[10px]">WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/30 text-[#0088cc] transition-all text-xs font-semibold"
            >
              <Send className="w-4 h-4 mb-1" />
              <span className="text-[10px]">Telegram</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-semibold"
            >
              <Twitter className="w-4 h-4 mb-1" />
              <span className="text-[10px]">X / Twitter</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 text-[#1877F2] transition-all text-xs font-semibold"
            >
              <Facebook className="w-4 h-4 mb-1" />
              <span className="text-[10px]">Facebook</span>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
};
