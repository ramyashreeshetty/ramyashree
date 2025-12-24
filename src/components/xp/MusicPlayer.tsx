import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, X, Minus } from "lucide-react";

// Using royalty-free lo-fi tracks from a reliable CDN
const PLAYLIST = [
  { 
    title: "Chill Vibes", 
    artist: "Lo-Fi Dreams",
    // Using a sample audio for demo - in production, replace with actual tracks
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
  },
  { 
    title: "Rainy Day", 
    artist: "Ambient Waves",
    src: "https://www.soundjay.com/nature/sounds/rain-01.mp3"
  },
  { 
    title: "Study Session", 
    artist: "Focus Beats",
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3"
  },
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("music-volume");
    return saved ? parseFloat(saved) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem("music-volume", volume.toString());
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact first
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-14 right-4 z-40 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Music className="w-5 h-5" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-14 right-4 z-40 xp-window p-0 w-auto">
        <div className="xp-title-bar flex items-center gap-2 px-2 py-1">
          <Music className="w-4 h-4 text-primary-foreground" />
          <span className="text-xs text-primary-foreground">Music</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="xp-button w-5 h-4 p-0 flex items-center justify-center ml-2"
          >
            <span className="text-xs">▢</span>
          </button>
        </div>
        <div className="bg-xp-window-bg p-2 flex items-center gap-2">
          <button onClick={togglePlay} className="xp-button p-1">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          {/* Visualizer bars */}
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full transition-all"
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
    <div className="fixed bottom-14 right-4 z-40 xp-window w-72">
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrack].src}
        onEnded={nextTrack}
        loop={false}
      />

      {/* Title Bar */}
      <div className="xp-title-bar flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Music className="w-4 h-4" />
          <span className="text-sm font-semibold">Music Player</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="xp-button w-5 h-4 p-0 flex items-center justify-center"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="xp-button w-5 h-4 p-0 flex items-center justify-center hover:bg-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-secondary to-muted p-3">
        {/* Visualizer */}
        <div className="bg-foreground/90 rounded p-2 mb-3 flex items-center justify-center h-16">
          <div className="flex items-end gap-1 h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-accent to-primary rounded-full transition-all"
                style={{
                  height: isPlaying ? `${10 + Math.random() * 40}px` : "10px",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-3">
          <div className="font-semibold text-foreground truncate">
            {PLAYLIST[currentTrack].title}
          </div>
          <div className="text-sm text-muted-foreground">
            {PLAYLIST[currentTrack].artist}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button onClick={prevTrack} className="xp-button p-2">
            <SkipBack className="w-4 h-4" />
          </button>
          <button onClick={togglePlay} className="xp-button p-3">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={nextTrack} className="xp-button p-2">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMuted(!isMuted)} className="xp-button p-1">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
