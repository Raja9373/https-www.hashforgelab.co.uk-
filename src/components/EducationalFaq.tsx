import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle, Zap, Globe, Cpu } from 'lucide-react';

export const EducationalFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Hashforge Lab Free Mining 100% safe for my phone & computer?',
      a: 'Yes, absolutely. Hashforge Lab is an educational browser simulation. Unlike real proof-of-work crypto miners that push your graphics card and CPU to 100% and generate high heat and electric bills, Hashforge Lab uses lightweight JavaScript rendering. It consumes virtually 0% excess energy and never damages your hardware.'
    },
    {
      q: 'Do I need to connect a crypto wallet or make an investment?',
      a: 'No! No cryptocurrency wallet, private key, registration, or credit card investment is ever required. You can start mining immediately in your browser for free.'
    },
    {
      q: 'How does the Monetization & Earning work?',
      a: 'The website is integrated with verified global advertising networks (such as Monetag). Web traffic and visitors from 180+ countries generate real ad revenues. By sharing hashforgelab.co.uk across social media and communities, you help drive worldwide visitors and earn CPM revenues.'
    },
    {
      q: 'Which cryptocurrencies can I simulate mining here?',
      a: 'You can simulate mining Bitcoin (BTC SHA-256), Ethereum (ETH Ethash), Solana (SOL), Dogecoin (DOGE Scrypt), Kaspa (KAS kHeavyHash), Toncoin (TON), Monero (XMR RandomX), and Litecoin (LTC).'
    },
    {
      q: 'Why does Hashforge Lab support 42 languages?',
      a: 'Cryptocurrency and decentralized technology are worldwide innovations. Hashforge Lab provides native localized interfaces in 42 languages across Europe, Asia, Latin America, the Middle East, and Africa to make blockchain education accessible to everyone.'
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30 mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> EDUCATIONAL KNOWLEDGE BASE
        </span>
        <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
              >
                <span className="font-orbitron text-sm sm:text-base font-bold text-white">
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#00ff88] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
