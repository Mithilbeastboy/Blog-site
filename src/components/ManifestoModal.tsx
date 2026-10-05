import React from 'react';
import { X, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#10121A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-500 font-bold">
              RADIX EDITORIAL CHARTER
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The Frontier Manifesto
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
          <p className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            "We are passing through the event horizon of technological convergence. The separation between silicon, biological computation, quantum state spaces, and physical robotics is dissolving."
          </p>

          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              1. Empirical Depth Over Synthetic Clickbait
            </h3>
            <p>
              RADIX does not write press release summaries. Every dispatch is grounded in primary experimental pre-prints, raw telemetry, physical hardware architectures, and verified peer replication.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              2. Open Weights, Open Protocols & Neurorights
            </h3>
            <p>
              We fiercely champion open-source model weights, transparent benchmarks, and uncompromised cognitive sovereignty. Technology must empower the human intellect, not corral it into walled proprietary silos.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              3. Global Distributed Peer Review
            </h3>
            <p>
              Our editorial guild comprises independent researchers from Zurich, Tokyo, Boston, Waterloo, and Pasadena. Dispatches are published without sponsor editorial intervention under non-commercial Creative Commons licensing.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400">EST. 2026 // DISPATCH v4.2</span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
