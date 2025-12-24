import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, X, Minus, ExternalLink } from "lucide-react";
import { playSound } from "./SoundManager";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("music-volume");
    return saved ? parseFloat(saved) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    localStorage.setItem("music-volume", volume.toString());
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playSound("click");
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => { setIsVisible(true); playSound("popup"); }}
        className="fixed bottom-14 right-4 z-40 bg-pink-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Music className="w-5 h-5" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-14 right-4 z-40 bg-card border-2 border-pink-200 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 flex items-center gap-2 px-3 py-2">
          <Music className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-medium">Lo-Fi Music</span>
          <button
            onClick={() => { setIsMinimized(false); playSound("click"); }}
            className="ml-2 w-5 h-5 bg-white/20 rounded flex items-center justify-center hover:bg-white/30"
          >
            <span className="text-white text-xs">▢</span>
          </button>
        </div>
        <div className="p-2 flex items-center gap-2">
          <button onClick={togglePlay} className="p-2 bg-pink-100 rounded-full hover:bg-pink-200">
            {isPlaying ? <Pause className="w-4 h-4 text-pink-600" /> : <Play className="w-4 h-4 text-pink-600" />}
          </button>
          {/* Visualizer bars */}
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-pink-400 rounded-full transition-all"
                style={{
                  height: isPlaying ? `${4 + Math.random() * 12}px` : "4px",
                  animation: isPlaying ? `music-bar 0.${3 + i}s ease-in-out infinite` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-14 right-4 z-40 bg-card border-2 border-pink-200 rounded-xl shadow-xl overflow-hidden w-80">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-white">
          <Music className="w-4 h-4" />
          <span className="text-sm font-semibold">Lo-Fi Music 🎧</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setIsMinimized(true); playSound("click"); }}
            className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-white/30"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button
            onClick={() => { setIsVisible(false); playSound("close"); }}
            className="w-6 h-6 bg-white/20 rounded flex items-center justify-center hover:bg-red-400"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        {/* YouTube Embed - Hidden but playing */}
        {isPlaying && (
          <iframe
            ref={iframeRef}
            className="hidden"
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/q0ff3e-A7DY?autoplay=1&loop=1&playlist=q0ff3e-A7DY${isMuted ? "&mute=1" : ""}`}
            allow="autoplay"
          />
        )}

        {/* Visualizer */}
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl p-4 mb-4 flex items-center justify-center h-20">
          <div className="flex items-end gap-1 h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full transition-all"
                style={{
                  height: isPlaying ? `${10 + Math.random() * 50}px` : "10px",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-4">
          <div className="font-semibold text-foreground">Lo-Fi Girl Radio ☕</div>
          <div className="text-sm text-muted-foreground">beats to relax/study to</div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button onClick={togglePlay} className="p-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg hover:scale-105 transition-transform">
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => { setIsMuted(!isMuted); playSound("click"); }} className="p-2 bg-pink-100 rounded-full hover:bg-pink-200">
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-600" /> : <Volume2 className="w-4 h-4 text-pink-600" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-400"
          />
        </div>

        {/* YouTube Link */}
        <a
          href="https://www.youtube.com/watch?v=q0ff3e-A7DY"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-pink-500 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Open in YouTube for best experience
        </a>
      </div>
    </div>
  );
};
