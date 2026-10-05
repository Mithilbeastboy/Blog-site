import React, { useState } from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import { BREAKING_TICKER } from '../data/articles';

interface BreakingTickerProps {
  onSelectTag?: (tag: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onSelectTag }) => {
  const [index, setIndex] = useState(0);

  const current = BREAKING_TICKER[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % BREAKING_TICKER.length);
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>RADAR</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <span className="font-mono text-[11px] text-blue-400 font-semibold shrink-0">
              [{current.tag}]
            </span>
            <span className="truncate text-slate-300 font-sans">
              {current.text}
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span>Next Alert ({index + 1}/{BREAKING_TICKER.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
