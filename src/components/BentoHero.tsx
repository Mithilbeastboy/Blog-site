import React from 'react';
import { Clock, Eye, Headphones, Bookmark, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Article } from '../types/blog';

interface BentoHeroProps {
  featuredArticle: Article;
  trendingArticles: Article[];
  onReadArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({
  featuredArticle,
  trendingArticles,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="pt-6 pb-10 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Featured Story (8 Cols) */}
          <div className="lg:col-span-8 group relative bg-white dark:bg-[#10121A] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
            {/* Image Banner */}
            <div
              onClick={() => onReadArticle(featuredArticle)}
              className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer"
            >
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.coverImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue-600 text-white shadow-lg">
                  COVER STORY
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {featuredArticle.category}
                </span>
              </div>

              {/* Bottom stats inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {featuredArticle.readTime} min read
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    {featuredArticle.views} views
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">{featuredArticle.date}</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h1
                  onClick={() => onReadArticle(featuredArticle)}
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer leading-[1.2]"
                  style={{ textWrap: 'balance' }}
                >
                  {featuredArticle.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {featuredArticle.subtitle}
                </p>
              </div>

              {/* Author & Action Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                      {featuredArticle.author.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {featuredArticle.author.role} · {featuredArticle.author.org}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onReadArticle(featuredArticle)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 text-xs font-mono font-medium border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Listen ({featuredArticle.audioDuration})</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark(featuredArticle.id)}
                    aria-label="Bookmark article"
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      isBookmarked(featuredArticle.id)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onReadArticle(featuredArticle)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-400 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer group/btn"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail: Trending Deep Reads (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <span>TRENDING DISPATCHES</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">REAL-TIME RANK</span>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {trendingArticles.slice(0, 2).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => onReadArticle(art)}
                  className="group p-5 bg-white dark:bg-[#10121A] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between flex-1 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-slate-400">{art.category}</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-sans">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <div className="flex items-center gap-2">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[11px] truncate max-w-[120px]">{art.author.name}</span>
                    </div>
                    <span>{art.readTime} min read</span>
                  </div>
                </div>
              ))}

              {/* Research Grant Spotlight */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/20 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-mono font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CALL FOR FIELD MONOGRAPHS</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-sans">
                  The RADIX Research Fund is allocating $250k in open-access peer bounties for breakthrough experimental replication data in Q4 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
