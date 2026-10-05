import React, { useState } from 'react';
import { Clock, Eye, Bookmark, ArrowUpRight, Headphones } from 'lucide-react';
import { Article } from '../types/blog';

interface TechArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const TechArticleCard: React.FC<TechArticleCardProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between bg-white dark:bg-[#10121A] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-cyan-500/50 p-5 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-950/20">
      <div>
        {/* Visual Cover */}
        <div
          onClick={() => onReadArticle(article)}
          className="relative aspect-[16/10] w-full mb-4 overflow-hidden rounded-xl bg-slate-900 cursor-pointer"
        >
          {!imgError && article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.coverImageAlt}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-400 font-mono text-xs">
              {article.category}
            </div>
          )}

          {/* Overlay Tag Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 backdrop-blur-md text-slate-300 flex items-center gap-1">
            <Headphones className="w-3 h-3 text-cyan-400" />
            <span>{article.audioDuration}</span>
          </div>
        </div>

        {/* Date & Read time */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-500" />
            {article.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h2
          onClick={() => onReadArticle(article)}
          className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer leading-snug mb-2.5"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-sans mb-4">
          {article.excerpt}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 truncate pr-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
          />
          <div className="truncate">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate font-sans">
              {article.author.name}
            </p>
            <p className="text-[10px] text-slate-500 truncate font-mono">
              {article.author.org}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            aria-label={isBookmarked ? 'Remove from queue' : 'Save to queue'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onReadArticle(article)}
            aria-label={`Open dispatch: ${article.title}`}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
