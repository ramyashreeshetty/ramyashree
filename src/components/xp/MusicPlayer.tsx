import { useState, useRef, useEffect } from "react";
import { Play, Pause, Heart } from "lucide-react";
import { playSound } from "./SoundManager";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const TRACKS = [
  { id: "fjOeJssZX_Q", name: "music - beats" },
  { id: "ZRtdQ81jPUQ", name: "music - beats" },
  { id: "3eytpBOkOFA", name: "music - beats" },
];

export const MusicPlayer = ({ autoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [position, setPosition] = useState({ x: window.innerWidth - 280, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [liked, setLiked] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 260, e.clientX - dragOffset.current.x)),
          y: Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragOffset.current.y)),
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playSound("click");
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    playSound("click");
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    playSound("click");
  };

  const currentVideoId = TRACKS[currentTrack].id;
  const currentTrackName = TRACKS[currentTrack].name;

  return (
    <div
      className="fixed z-40 select-none"
      style={{ left: position.x, top: position.y }}
    >
      {/* Hidden YouTube iframe for audio */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          key={currentVideoId}
          className="hidden"
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&loop=1&playlist=${currentVideoId}${isMuted ? "&mute=1" : ""}`}
          allow="autoplay"
        />
      )}

      {/* Cute Pixel Music Player */}
      <div className="relative">
        {/* Decorative clouds */}
        <div className="absolute -top-2 -left-3 z-10">
          <svg width="45" height="28" viewBox="0 0 45 28" fill="none">
            {/* Pink heart/cloud */}
            <rect x="8" y="12" width="4" height="4" fill="#F8B4D9"/>
            <rect x="12" y="8" width="4" height="4" fill="#F8B4D9"/>
            <rect x="16" y="12" width="4" height="4" fill="#F8B4D9"/>
            <rect x="8" y="16" width="4" height="4" fill="#F8B4D9"/>
            <rect x="12" y="16" width="4" height="4" fill="#F8B4D9"/>
            <rect x="16" y="16" width="4" height="4" fill="#F8B4D9"/>
            <rect x="12" y="20" width="4" height="4" fill="#F8B4D9"/>
            {/* Microphone */}
            <rect x="10" y="10" width="6" height="10" fill="#E879A9" rx="2"/>
            <rect x="12" y="6" width="2" height="4" fill="#E879A9"/>
            {/* Blue cloud */}
            <rect x="28" y="8" width="4" height="4" fill="#A5D8FF"/>
            <rect x="32" y="4" width="8" height="4" fill="#A5D8FF"/>
            <rect x="32" y="8" width="8" height="4" fill="#A5D8FF"/>
            <rect x="36" y="12" width="4" height="4" fill="#A5D8FF"/>
          </svg>
        </div>

        {/* Main player body */}
        <div 
          className="bg-white rounded-xl border-2 border-slate-700 shadow-lg overflow-hidden w-56 cursor-move"
          onMouseDown={handleMouseDown}
        >
          {/* Title bar */}
          <div className="bg-gradient-to-r from-violet-200 to-violet-300 px-3 py-1.5 flex items-center justify-between border-b border-slate-400">
            <span className="text-xs font-semibold text-slate-600 truncate">♪ {currentTrackName}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-pink-400"/>
              <div className="w-2 h-2 rounded-full bg-rose-500"/>
            </div>
          </div>

          {/* Progress bar area */}
          <div className="px-3 py-2 bg-violet-50">
            <div className="h-2 bg-violet-200 rounded-full overflow-hidden border border-violet-300">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300"
                style={{ width: isPlaying ? "45%" : "0%" }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="px-3 py-2 bg-white flex items-center justify-between">
            {/* Volume icon */}
            <button 
              onClick={() => { setIsMuted(!isMuted); playSound("click"); }}
              className="p-1 hover:bg-violet-100 rounded transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="5" width="3" height="6" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
                <rect x="5" y="3" width="2" height="10" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
                <rect x="9" y="4" width="1" height="2" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
                <rect x="9" y="10" width="1" height="2" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
                <rect x="11" y="2" width="1" height="2" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
                <rect x="11" y="12" width="1" height="2" fill={isMuted ? "#CBD5E1" : "#64748B"}/>
              </svg>
            </button>

            {/* Prev */}
            <button 
              onClick={prevTrack}
              className="p-1 hover:bg-violet-100 rounded transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="3" width="2" height="8" fill="#374151"/>
                <path d="M12 3L6 7L12 11V3Z" fill="#374151"/>
              </svg>
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border-2 border-slate-700 bg-white hover:bg-violet-50 flex items-center justify-center transition-colors shadow-md"
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-4 bg-slate-700 rounded-sm"/>
                  <div className="w-1.5 h-4 bg-slate-700 rounded-sm"/>
                </div>
              ) : (
                <Play className="w-4 h-4 text-slate-700 ml-0.5" fill="#374151"/>
              )}
            </button>

            {/* Next */}
            <button 
              onClick={nextTrack}
              className="p-1 hover:bg-violet-100 rounded transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="10" y="3" width="2" height="8" fill="#374151"/>
                <path d="M2 3L8 7L2 11V3Z" fill="#374151"/>
              </svg>
            </button>

            {/* Heart/Like */}
            <button 
              onClick={() => { setLiked(!liked); playSound("click"); }}
              className="p-1 hover:bg-pink-100 rounded transition-colors"
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${liked ? "text-pink-500 fill-pink-500" : "text-slate-400"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
