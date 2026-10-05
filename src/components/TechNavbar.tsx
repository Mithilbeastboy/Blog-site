import React from 'react';
import { Search, Bookmark, Sun, Moon, Radio, Sparkles } from 'lucide-react';

interface TechNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onOpenManifesto: () => void;
  activeView: 'home' | 'article';
}

export const TechNavbar: React.FC<TechNavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  bookmarksCount,
  onOpenBookmarks,
  onNavigateHome,
  onOpenSearch,
  onOpenManifesto,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0A0B0E]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-display font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                RADIX
              </span>
            </div>
          </button>

          {/* Live indicator badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-[11px] font-mono font-medium text-blue-600 dark:text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>DISPATCH v4.2</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={onNavigateHome}
            className={`hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1 ${
              activeView === 'home' ? 'text-blue-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            Dispatches
          </button>
          <a
            href="#topics"
            onClick={(e) => {
              if (activeView === 'article') {
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
          >
            Domains
          </a>
          <button
            onClick={onOpenManifesto}
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
          >
            Manifesto
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button with Cmd+K badge */}
          <button
            onClick={onOpenSearch}
            aria-label="Search dispatches"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search intelligence...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Reading Queue / Saved Articles */}
          <button
            onClick={onOpenBookmarks}
            aria-label="View saved articles"
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
            <span className="hidden md:inline">Queue</span>
            {bookmarksCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 rounded-full">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
