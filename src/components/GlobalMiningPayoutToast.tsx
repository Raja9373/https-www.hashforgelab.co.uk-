import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, DollarSign, ExternalLink, ShieldCheck } from 'lucide-react';

export interface PayoutToastData {
  id: string;
  flag: string;
  name: string;
  location: string;
  amount: number;
  method: 'PayPal' | 'Google Pay (UPI)';
  timeAgo: string;
}

const MOCK_PAYOUTS: Omit<PayoutToastData, 'id' | 'timeAgo'>[] = [
  { flag: '🇮🇳', name: 'Rahul S.', location: 'Delhi, India', amount: 14.50, method: 'Google Pay (UPI)' },
  { flag: '🇺🇸', name: 'Michael B.', location: 'California, USA', amount: 28.00, method: 'PayPal' },
  { flag: '🇧🇷', name: 'Lucas M.', location: 'São Paulo, Brazil', amount: 10.00, method: 'PayPal' },
  { flag: '🇩🇪', name: 'Lukas K.', location: 'Munich, Germany', amount: 19.20, method: 'PayPal' },
  { flag: '🇬🇧', name: 'Oliver T.', location: 'Manchester, UK', amount: 12.50, method: 'PayPal' },
  { flag: '🇳🇬', name: 'Adebayo O.', location: 'Lagos, Nigeria', amount: 15.00, method: 'PayPal' },
  { flag: '🇯🇵', name: 'Kenji T.', location: 'Tokyo, Japan', amount: 22.00, method: 'PayPal' },
  { flag: '🇪🇸', name: 'Carlos R.', location: 'Barcelona, Spain', amount: 11.80, method: 'PayPal' },
  { flag: '🇫🇷', name: 'Antoine D.', location: 'Paris, France', amount: 16.40, method: 'PayPal' },
  { flag: '🇮🇳', name: 'Priya P.', location: 'Bengaluru, India', amount: 18.00, method: 'Google Pay (UPI)' },
  { flag: '🇨🇦', name: 'Liam W.', location: 'Toronto, Canada', amount: 25.00, method: 'PayPal' },
  { flag: '🇦🇪', name: 'Tariq A.', location: 'Dubai, UAE', amount: 32.50, method: 'PayPal' },
  { flag: '🇦🇺', name: 'Jack H.', location: 'Melbourne, Australia', amount: 14.00, method: 'PayPal' },
  { flag: '🇮🇩', name: 'Budi S.', location: 'Jakarta, Indonesia', amount: 10.50, method: 'PayPal' },
  { flag: '🇲🇽', name: 'Mateo G.', location: 'Guadalajara, Mexico', amount: 13.20, method: 'PayPal' },
  { flag: '🇹🇷', name: 'Emre Y.', location: 'Istanbul, Turkey', amount: 17.50, method: 'PayPal' }
];

export const GlobalMiningPayoutToast: React.FC = () => {
  const [currentPayout, setCurrentPayout] = useState<PayoutToastData | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPermanentlyDismissed, setIsPermanentlyDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isPermanentlyDismissed) return;

    // Show initial notification after 4 seconds of page visit
    const initialTimeout = setTimeout(() => {
      triggerNextPayout();
    }, 4000);

    return () => clearTimeout(initialTimeout);
  }, [isPermanentlyDismissed]);

  const triggerNextPayout = () => {
    if (isPermanentlyDismissed) return;

    const randomItem = MOCK_PAYOUTS[Math.floor(Math.random() * MOCK_PAYOUTS.length)];
    const freshPayout: PayoutToastData = {
      id: `payout-${Date.now()}`,
      ...randomItem,
      timeAgo: 'Just now'
    };

    setCurrentPayout(freshPayout);
    setIsVisible(true);
  };

  // Timer to automatically hide toast after 4.5 seconds, then schedule next one after 7-12 seconds
  useEffect(() => {
    if (!isVisible || isHovered || isPermanentlyDismissed) return;

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);

      // Schedule next payout after random interval between 7s and 12s
      const nextInterval = Math.floor(Math.random() * 5000 + 7000);
      const nextTimeout = setTimeout(() => {
        triggerNextPayout();
      }, nextInterval);

      return () => clearTimeout(nextTimeout);
    }, 4500);

    return () => clearTimeout(hideTimeout);
  }, [isVisible, isHovered, isPermanentlyDismissed]);

  if (isPermanentlyDismissed || !currentPayout) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm w-full transition-all duration-300 transform pointer-events-auto select-none ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-[#0b1220]/95 hover:bg-[#0e172a] border border-[#00ff88]/30 hover:border-[#00ff88]/60 rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all">
        
        {/* Subtle accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-75" />

        <div className="flex items-start justify-between gap-3">
          
          {/* Success Check Icon + Country Flag */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              <CheckCircle2 className="w-5 h-5 text-[#00ff88]" />
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 leading-none mb-1">
              <span className="text-sm">{currentPayout.flag}</span>
              <span className="font-bold text-xs text-white truncate">
                {currentPayout.name}
              </span>
              <span className="text-[10px] text-gray-400 font-mono truncate">
                ({currentPayout.location.split(',')[0]})
              </span>
            </div>

            <p className="text-xs text-gray-200 font-medium leading-snug">
              Successfully withdrew{' '}
              <strong className="text-[#00ff88] font-mono font-bold text-sm">
                ${currentPayout.amount.toFixed(2)}
              </strong>
            </p>

            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400 font-mono">
              <span className="inline-flex items-center gap-1 text-[#00d4ff]">
                <ShieldCheck className="w-3 h-3" />
                {currentPayout.method}
              </span>
              <span>•</span>
              <span className="text-gray-400">{currentPayout.timeAgo}</span>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsVisible(false)}
            title="Dismiss notification"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss payout notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </aside>
  );
};
