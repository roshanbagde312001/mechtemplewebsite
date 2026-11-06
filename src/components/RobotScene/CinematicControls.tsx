import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Video,
  ChevronDown,
  ChevronUp,
  Compass,
  Scroll,
  Film,
  Sparkles,
} from 'lucide-react';
import { ExperienceMode, CinematicPhase } from '../../types';
import { CINEMATIC_TOTAL_DURATION, CINEMATIC_PHASES } from './cinematicSequence';
import { audioService } from '../../services/audioService';

interface CinematicControlsProps {
  mode: ExperienceMode;
  onModeChange: (mode: ExperienceMode) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  currentPhase: CinematicPhase | null;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onSeek: (time: number) => void;
  isRecording: boolean;
  onRecord: () => void;
  onOpenReferenceImage: () => void;
}

export const CinematicControls: React.FC<CinematicControlsProps> = ({
  mode,
  onModeChange,
  isPlaying,
  onTogglePlay,
  currentTime,
  currentPhase,
  speed,
  onSpeedChange,
  onSeek,
  isRecording,
  onRecord,
  onOpenReferenceImage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(mode === 'scroll');
  const [isMuted, setIsMuted] = useState(audioService.getMuted());

  useEffect(() => {
    setIsCollapsed(mode === 'scroll');
  }, [mode]);

  const handleToggleAudio = () => {
    const unmuted = audioService.toggleMute();
    setIsMuted(!unmuted);
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs - s) * 10);
    return `${s.toString().padStart(2, '0')}.${ms}s`;
  };

  const progressPercent = (currentTime / CINEMATIC_TOTAL_DURATION) * 100;

  return (
    <aside
      aria-label="3D Viewport Controls"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-[min(920px,94vw)] transition-transform duration-300 pointer-events-auto"
    >
      {/* Collapse / Expand Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 border-t border-x border-white/10 rounded-t-xl backdrop-blur-xl transition-colors cursor-pointer shadow-lg"
          title="Toggle Controls Visibility (Cinema Mode)"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-rose-400" />
              <span>Show 3D Director Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
              <span>Hide Bar (Full View)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Control Dock */}
      {!isCollapsed && (
        <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 text-zinc-200">
          {/* Top Line: Mode Switchers & Phase Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            {/* Mode Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl backdrop-blur-md">
              <button
                onClick={() => onModeChange('cinematic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'cinematic'
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_15px_rgba(255,0,51,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>3D Video Tour</span>
              </button>

              <button
                onClick={() => onModeChange('scroll')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'scroll'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Scroll className="w-3.5 h-3.5" />
                <span>Scroll Flow</span>
              </button>

              <button
                onClick={() => onModeChange('free_crawl')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'free_crawl'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Free 3D Crawl</span>
              </button>
            </div>

            {/* Current Phase Badge & Description */}
            <div className="flex items-center gap-2 text-xs">
              {mode === 'cinematic' && currentPhase ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-rose-400 font-bold">
                    {formatTime(currentTime)} / {formatTime(CINEMATIC_TOTAL_DURATION)}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="font-semibold text-zinc-200 truncate max-w-[260px]">
                    {currentPhase.title}
                  </span>
                  {currentPhase.isPaused && (
                    <span className="px-2 py-0.5 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-800/80 rounded">
                      2s Pause
                    </span>
                  )}
                  {currentPhase.isInside && (
                    <span className="px-2 py-0.5 text-[11px] font-bold text-rose-300 bg-rose-950/80 border border-rose-800/80 rounded">
                      Inside Robot Crawl
                    </span>
                  )}
                </div>
              ) : mode === 'scroll' ? (
                <span className="text-zinc-400 font-medium">
                  Scroll the page to glide through chapters & inspect internal anatomy
                </span>
              ) : (
                <span className="text-zinc-400 font-medium">
                  Click & drag to rotate · Scroll to zoom inside temple aperture
                </span>
              )}
            </div>

            {/* Reference Image Inspector */}
            <button
              onClick={onOpenReferenceImage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Robot Blueprint</span>
            </button>
          </div>

          {/* Timeline Scrubber (Visible in Cinematic Mode) */}
          {mode === 'cinematic' && (
            <div className="pt-3 pb-2">
              <div className="relative w-full h-2.5 rounded-full overflow-hidden cursor-pointer bg-white/[0.08]">
                <input
                  type="range"
                  min="0"
                  max={CINEMATIC_TOTAL_DURATION}
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => onSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div
                  className="h-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(255,0,51,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Waypoint Phase Markers */}
              <div className="flex justify-between items-center text-[10px] mt-1 font-mono text-zinc-500">
                {CINEMATIC_PHASES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSeek(p.startTime)}
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                    title={p.title}
                  >
                    {p.id === 'pause_2s' ? '• 2s Pause' : p.id === 'dive_in_2s' ? '• 2s Dive' : p.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls Row: Playback, Speed, Record, Audio */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-2">
              {mode === 'cinematic' && (
                <>
                  <button
                    onClick={onTogglePlay}
                    className="p-2 text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-lg transition-colors cursor-pointer shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                    title={isPlaying ? 'Pause 3D Tour' : 'Play 3D Tour'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => onSeek(0)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Playback Speed selector */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs">
                    {[0.5, 1.0, 2.0].map((s) => (
                      <button
                        key={s}
                        onClick={() => onSpeedChange(s)}
                        className={`px-2 py-1 rounded font-mono font-semibold cursor-pointer transition-colors ${
                          speed === s
                            ? 'bg-white/20 text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Audio & Video Recording Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  !isMuted
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(255,0,51,0.3)]'
                    : 'bg-white/[0.04] text-zinc-400 border-white/10 hover:text-white'
                }`}
                title={isMuted ? 'Enable Web Audio Atmosphere' : 'Mute Audio'}
              >
                {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>

              {/* Record Video Button */}
              <button
                onClick={onRecord}
                disabled={isRecording}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-[0_0_20px_rgba(255,0,51,0.4)] border border-rose-400/40'
                }`}
                title="Record & download 3D cinematic video file (WebM)"
              >
                <Video className="w-4 h-4" />
                <span>{isRecording ? 'Capturing 3D Video...' : 'Record 3D Video'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
