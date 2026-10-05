import React, { useState } from 'react';
import { ArrowUp, Mail, CheckCircle2, Terminal, Radio } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface TechFooterProps {
  onSelectCategory: (category: string) => void;
  onOpenManifesto: () => void;
}

export const TechFooter: React.FC<TechFooterProps> = ({
  onSelectCategory,
  onOpenManifesto,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#08090D] text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-lg shadow-md shadow-blue-500/20">
                R
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                RADIX
              </span>
            </div>
            <p className="text-sm font-sans leading-relaxed text-slate-500 dark:text-slate-400">
              Chronicling breakthrough advances in neural interfaces, quantum systems, synthetic biology, and physical foundation models.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div>ISSN 2999-4180 · Zurich & Tokyo</div>
              <div>Open Research Peer-Review Index</div>
            </div>
          </div>

          {/* Research Domains */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              Domains
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Journal links */}
          <div className="md:col-span-2 space-y-3 font-mono">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              Protocol
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={onOpenManifesto}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  The Manifesto
                </button>
              </li>
              <li>
                <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">
                  Data Replications
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">
                  API & RSS Feeds
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              The RADIX Dispatch
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Curated technical monographs, audio briefings, and frontier lab pre-prints delivered every Tuesday.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-mono font-medium border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Subscription confirmed. Dispatch key active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@lab.org"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-mono font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Join 48,000+ Researchers
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© 2026 RADIX Journal. Published under CC BY-NC-SA 4.0 Open Science License.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
