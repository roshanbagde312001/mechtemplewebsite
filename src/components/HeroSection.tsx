import React from 'react';
import { Play, Sparkles, ArrowDown, Compass } from 'lucide-react';

interface HeroSectionProps {
  onStartCinematic: () => void;
  onOpenReferenceImage: () => void;
  onScrollToStory: () => void;
  onEnableFreeCrawl: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCinematic,
  onOpenReferenceImage,
  onScrollToStory,
  onEnableFreeCrawl,
}) => {
  return (
    <section
      id="overview"
      className="relative min-h-[92vh] flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16"
    >
      {/* Left Column Container (Leaves right 50% open for the 3D Robot) */}
      <div className="max-w-xl lg:max-w-2xl z-10">
        {/* Glassmorphic Kicker Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#ff0033]" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-rose-400 uppercase">
            [ 001.004 ] · OBSIDIAN CYBERNETICS
          </span>
        </div>

        {/* Primary Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-white mb-6 [text-wrap:balance]">
          The clarity your business{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400">
            has been missing
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="text-xl sm:text-2xl font-semibold text-zinc-200 leading-snug mb-6 [text-wrap:balance]">
          Empowering visionaries to shape tomorrow’s digital landscapes
        </p>

        {/* Glassmorphic Description Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] mb-8 max-w-lg">
          <p className="text-sm leading-relaxed text-zinc-300">
            Crafted with crystalline glass armor, intense crimson rim reflections, and an intricate internal
            neural core. Watch the 3D camera zoom into the temple disc, pause for 2 seconds, and crawl straight through
            the internal biomechanical corridors.
          </p>
        </div>

        {/* Glassmorphic Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onStartCinematic}
            className="group flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 rounded-xl transition-all cursor-pointer shadow-[0_0_28px_rgba(255,0,51,0.4)] border border-rose-400/40 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Play 3D Video (Zoom · Pause · Crawl)</span>
          </button>

          <button
            onClick={onEnableFreeCrawl}
            className="flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/15 text-zinc-200 hover:text-white transition-all cursor-pointer shadow-lg active:scale-[0.98]"
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>Free 3D Crawl</span>
          </button>

          <button
            onClick={onOpenReferenceImage}
            className="flex items-center gap-1.5 px-3.5 py-3.5 text-xs sm:text-sm font-medium rounded-xl bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Blueprint</span>
          </button>
        </div>

        {/* Scroll helper */}
        <button
          onClick={onScrollToStory}
          className="group inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <span>Scroll down for chapter-by-chapter flow</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
