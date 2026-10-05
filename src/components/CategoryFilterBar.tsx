import React from 'react';
import { Layers, ArrowUpDown, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: 'popular' | 'latest' | 'deep';
  onSortChange: (sort: 'popular' | 'latest' | 'deep') => void;
  totalCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  return (
    <div id="topics" className="py-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-150 cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white dark:bg-[#12141C] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-500 shrink-0">
          <span>{totalCount} Total Entries</span>
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#12141C] border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
            <select
              value={sortBy}
              aria-label="Sort articles by"
              onChange={(e) => onSortChange(e.target.value as 'popular' | 'latest' | 'deep')}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer pr-1"
            >
              <option value="popular" className="bg-white dark:bg-slate-900">Most Read</option>
              <option value="latest" className="bg-white dark:bg-slate-900">Latest Dispatches</option>
              <option value="deep" className="bg-white dark:bg-slate-900">Longform Inquiries</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
