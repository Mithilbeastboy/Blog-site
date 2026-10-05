import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Clock, Headphones } from 'lucide-react';
import { Article } from '../types/blog';

interface SavedQueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedQueueDrawer: React.FC<SavedQueueDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const totalMinutes = savedArticles.reduce((acc, curr) => acc + curr.readTime, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0E1017] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Reading Queue
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
                {savedArticles.length}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close saved queue"
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {savedArticles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400">
                <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                <p className="font-display text-base font-bold text-slate-700 dark:text-slate-300">
                  Queue is empty
                </p>
                <p className="text-xs text-slate-500 max-w-xs font-sans">
                  Bookmark dispatches using the bookmark icon on any card to access offline and sync your personal research docket.
                </p>
              </div>
            ) : (
              savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#141722] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-500">
                      {art.category}
                    </span>
                    <h3
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="font-display font-bold text-sm text-slate-900 dark:text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {art.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
                      <span>{art.author.name}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {art.readTime}m
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      title="Remove from queue"
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      title="Read dispatch"
                      className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedArticles.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-900/40">
              <span>Total Duration: ~{totalMinutes} mins</span>
              <button
                onClick={onClearAll}
                className="hover:text-rose-500 font-semibold cursor-pointer"
              >
                Clear Queue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
