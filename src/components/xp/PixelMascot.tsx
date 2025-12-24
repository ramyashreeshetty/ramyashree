import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TIPS = [
  "Hi! I'm Byte! Did you know Ramya loves learning new languages? 🌍",
  "Try double-clicking on the desktop icons to open windows!",
  "Check out the Flower Garden - you can plant your own flowers! 🌸",
  "Ramya is a Data Engineer who loves turning chaos into insights!",
  "The music player has some chill beats to code by! 🎵",
  "Did you know? Ramya's ADHD brain means she's always exploring new ideas!",
  "Click the Start menu to see quick links to GitHub and LinkedIn!",
  "Drag the windows around - they're fully interactive!",
  "Ramya loves anime - ask her about her favorites! 🎌",
  "This portfolio was built with React and lots of ☕",
  "Gaming is one of Ramya's favorite ways to unwind! 🎮",
  "Pro tip: You can minimize windows to the taskbar!",
];

export const PixelMascot = () => {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [tipVisible, setTipVisible] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    // Show first tip after 3 seconds
    const initialTimer = setTimeout(() => {
      showRandomTip();
    }, 3000);

    // Then show tips every 45-60 seconds
    const interval = setInterval(() => {
      showRandomTip();
    }, 45000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const showRandomTip = () => {
    const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setCurrentTip(tip);
    setTipVisible(true);
    setIsWaving(true);

    // Stop waving after animation
    setTimeout(() => setIsWaving(false), 1000);

    // Auto-hide after 8 seconds
    setTimeout(() => setTipVisible(false), 8000);
  };

  const dismissTip = () => {
    setTipVisible(false);
  };

  return (
    <div className="fixed bottom-14 left-4 z-40 flex flex-col items-start gap-2">
      {/* Speech Bubble */}
      {tipVisible && currentTip && (
        <div className="animate-speech-bubble relative bg-card border-2 border-border rounded-lg p-3 shadow-lg max-w-[250px]">
          <button
            onClick={dismissTip}
            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm text-foreground">{currentTip}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-r-2 border-b-2 border-border transform rotate-45" />
        </div>
      )}

      {/* Pixel Art Robot Mascot */}
      <button
        onClick={showRandomTip}
        className={`animate-mascot-idle hover:scale-110 transition-transform cursor-pointer ${
          isWaving ? "animate-bounce" : ""
        }`}
        title="Click for a tip!"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" className="drop-shadow-lg">
          {/* Body */}
          <rect x="16" y="32" width="32" height="24" fill="#4FC3F7" rx="4" />
          
          {/* Head */}
          <rect x="12" y="8" width="40" height="28" fill="#4FC3F7" rx="4" />
          
          {/* Antenna */}
          <rect x="30" y="0" width="4" height="12" fill="#90A4AE" />
          <circle cx="32" cy="0" r="4" fill="#FF5252" />
          
          {/* Eyes */}
          <rect x="18" y="16" width="10" height="10" fill="#1A1A2E" rx="2" />
          <rect x="36" y="16" width="10" height="10" fill="#1A1A2E" rx="2" />
          
          {/* Eye shine */}
          <rect x="24" y="18" width="3" height="3" fill="#FFFFFF" />
          <rect x="42" y="18" width="3" height="3" fill="#FFFFFF" />
          
          {/* Mouth */}
          <rect x="24" y="30" width="16" height="4" fill="#1A1A2E" rx="2" />
          
          {/* Cheeks */}
          <circle cx="14" cy="26" r="4" fill="#FF8A80" opacity="0.6" />
          <circle cx="50" cy="26" r="4" fill="#FF8A80" opacity="0.6" />
          
          {/* Arms */}
          <rect x="4" y="36" width="12" height="6" fill="#4FC3F7" rx="2" />
          <rect x="48" y="36" width="12" height="6" fill="#4FC3F7" rx="2" />
          
          {/* Hands */}
          <circle cx="4" cy="39" r="4" fill="#FFE082" />
          <circle cx="60" cy="39" r="4" fill="#FFE082" />
          
          {/* Legs */}
          <rect x="20" y="56" width="8" height="8" fill="#4FC3F7" rx="2" />
          <rect x="36" y="56" width="8" height="8" fill="#4FC3F7" rx="2" />
          
          {/* Feet */}
          <rect x="18" y="62" width="12" height="4" fill="#1A1A2E" rx="2" />
          <rect x="34" y="62" width="12" height="4" fill="#1A1A2E" rx="2" />
          
          {/* Belly button/light */}
          <circle cx="32" cy="44" r="4" fill="#81D4FA" />
          <circle cx="32" cy="44" r="2" fill="#E3F2FD" />
        </svg>
      </button>

      {/* Name tag */}
      <div className="text-xs text-muted-foreground font-medium -mt-1 ml-4">
        Byte 🤖
      </div>
    </div>
  );
};
