import React from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface ImageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusTemple: () => void;
  onFocusInside: () => void;
}

export const ImageComparisonModal: React.FC<ImageComparisonModalProps> = ({
  isOpen,
  onClose,
  onFocusTemple,
  onFocusInside,
}) => {
  if (!isOpen) return null;

  const imagePath = '/assets/aistudio/robot_1d8edd71.jpeg';

  const anatomicalPins = [
    {
      title: 'Translucent Glass Cowl & Ruby Rims',
      desc: 'High-index optical glass shell catching intense crimson rim lights across aerodynamic contours.',
      coords: 'Cranial Crest & Cowl',
      action: onFocusTemple,
      btnLabel: 'View Glass Cowl in 3D',
    },
    {
      title: 'Acoustic Temple Disc & Loop Tube',
      desc: 'Concentric stepped chrome rotor, glowing ruby diode, and signature loop tube running under the chin.',
      coords: 'Left Temple Housing',
      action: onFocusTemple,
      btnLabel: 'Focus on Temple Disc',
    },
    {
      title: 'Internal Biomechanical Neural Core',
      desc: 'Microscopic crawl chamber with pulsing ruby synaptic crystal, data buses, and particle motes.',
      coords: 'Inner Cranial Matrix',
      action: onFocusInside,
      btnLabel: 'Dive Inside in 3D',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-zinc-950/80 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Concept Blueprint · Translucent Obsidian & Ruby Mech
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Showcase Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
            <img
              src={imagePath}
              alt="Obsidian Glass Cybernetic Robot Reference"
              className="w-full h-auto max-h-[520px] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-xl text-xs text-zinc-300 flex items-center justify-between">
              <span>Source: Uploaded Concept Reference</span>
              <span className="text-rose-400 font-mono font-bold">K/V — SYSTEM</span>
            </div>
          </div>

          {/* Blueprint Details & Interactive 3D Links */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-mono">
                3D HIGH-FIDELITY TRANSLATION
              </span>
              <h4 className="text-xl font-bold text-white mt-1 mb-2">
                Liquid Obsidian, Translucent Glass & Ruby Lasers
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                The 3D model features the multi-layer transmissive glass visor cowl, the signature
                loop tube arching under the chin, intense crimson rim lights, and the concentric temple
                acoustic rotor disc from your reference.
              </p>
            </div>

            <div className="space-y-3.5">
              {anatomicalPins.map((pin, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{pin.title}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{pin.coords}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{pin.desc}</p>
                  <button
                    onClick={() => {
                      pin.action();
                      onClose();
                    }}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 pt-1 cursor-pointer transition-colors"
                  >
                    <span>{pin.btnLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(255,0,51,0.4)] border border-rose-400/40"
              >
                Return to 3D Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
