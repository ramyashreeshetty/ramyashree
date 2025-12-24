import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { playSound } from "./SoundManager";

const TIPS = [
  "Meow~ Did you know Ramyashree loves learning new languages?",
  "Try clicking on the desktop icons to open windows!",
  "Check out the Flower Garden - you can plant your own flowers!",
  "Ramyashree is a Data Engineer who loves turning chaos into insights!",
  "The music player has some chill lo-fi beats~",
  "Curious minds are always exploring new ideas!",
  "Click the Start menu to see quick links!",
  "Drag the windows around - they're fully interactive!",
  "Ramyashree loves anime - ask her about her favorites!",
  "This portfolio was built with React and lots of love~",
  "Gaming is a favorite way to unwind!",
  "Pro tip: You can minimize windows to the taskbar!",
];

export const CatMascot = () => {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [tipVisible, setTipVisible] = useState(false);
  const [isExcited, setIsExcited] = useState(false);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showRandomTip();
    }, 3000);

    const interval = setInterval(() => {
      showRandomTip();
    }, 50000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const showRandomTip = () => {
    const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setCurrentTip(tip);
    setTipVisible(true);
    setIsExcited(true);
    playSound("popup");

    setTimeout(() => setIsExcited(false), 1000);
    setTimeout(() => setTipVisible(false), 8000);
  };

  const dismissTip = () => {
    setTipVisible(false);
    playSound("click");
  };

  return (
    <div className="fixed bottom-16 right-4 z-40 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      {tipVisible && currentTip && (
        <div className="animate-speech-bubble relative bg-card border border-border rounded-xl p-3 shadow-lg max-w-[220px]">
          <button
            onClick={dismissTip}
            className="absolute -top-2 -right-2 w-5 h-5 bg-muted-foreground/60 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm text-foreground">{currentTip}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border transform rotate-45" />
        </div>
      )}

      {/* Lucky Cat Mascot - inspired by maneki-neko */}
      <button
        onClick={showRandomTip}
        className={`hover:scale-105 transition-transform cursor-pointer ${
          isExcited ? "animate-bounce" : "animate-mascot-idle"
        }`}
        title="Click for a tip!"
      >
        <svg width="56" height="56" viewBox="0 0 64 64" className="drop-shadow-lg">
          {/* Body */}
          <ellipse cx="32" cy="48" rx="16" ry="12" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
          
          {/* Head */}
          <circle cx="32" cy="28" r="18" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
          
          {/* Ears */}
          <path d="M16 18 L20 28 L12 24 Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
          <path d="M48 18 L44 28 L52 24 Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
          {/* Inner ears */}
          <path d="M17 20 L19 26 L14 23 Z" fill="#3B5998" />
          <path d="M47 20 L45 26 L50 23 Z" fill="#3B5998" />
          
          {/* Spots */}
          <circle cx="22" cy="24" r="5" fill="#3B5998" opacity="0.8" />
          <circle cx="42" cy="40" r="4" fill="#3B5998" opacity="0.6" />
          
          {/* Closed happy eyes */}
          <path d="M24 26 Q26 24 28 26" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M36 26 Q38 24 40 26" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Nose */}
          <ellipse cx="32" cy="31" rx="2" ry="1.5" fill="#E8A0A0" />
          
          {/* Mouth */}
          <path d="M32 32 Q29 35 27 33" stroke="#333" strokeWidth="1.2" fill="none" />
          <path d="M32 32 Q35 35 37 33" stroke="#333" strokeWidth="1.2" fill="none" />
          
          {/* Whiskers - subtle */}
          <line x1="14" y1="30" x2="22" y2="31" stroke="#CCC" strokeWidth="0.8" />
          <line x1="14" y1="33" x2="22" y2="33" stroke="#CCC" strokeWidth="0.8" />
          <line x1="50" y1="30" x2="42" y2="31" stroke="#CCC" strokeWidth="0.8" />
          <line x1="50" y1="33" x2="42" y2="33" stroke="#CCC" strokeWidth="0.8" />
          
          {/* Blush */}
          <circle cx="22" cy="33" r="3" fill="#F8BABA" opacity="0.5" />
          <circle cx="42" cy="33" r="3" fill="#F8BABA" opacity="0.5" />
          
          {/* Collar */}
          <ellipse cx="32" cy="42" rx="10" ry="3" fill="#C62828" />
          
          {/* Bell */}
          <circle cx="32" cy="45" r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
          <circle cx="32" cy="45" r="1" fill="#B8860B" />
          
          {/* Paws */}
          <ellipse cx="24" cy="56" rx="5" ry="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="0.8" />
          <ellipse cx="40" cy="56" rx="5" ry="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="0.8" />
          
          {/* Tail */}
          <path d="M48 48 Q55 42 52 34" stroke="#F5F5F5" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="52" cy="36" r="3" fill="#3B5998" opacity="0.6" />
        </svg>
      </button>
    </div>
  );
};
