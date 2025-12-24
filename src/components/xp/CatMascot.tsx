import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { playSound } from "./SoundManager";

const TIPS = [
  "Meow! I'm here to help~ Did you know Ramya loves learning new languages? 🌍",
  "Try clicking on the desktop icons to open windows! *purr*",
  "Check out the Flower Garden - you can plant your own flowers! 🌸",
  "Ramya is a Data Engineer who loves turning chaos into insights!",
  "The music player has some chill lo-fi beats~ 🎵",
  "Ramya's curious mind means she's always exploring new ideas! ✨",
  "Click the Start menu to see quick links to GitHub and LinkedIn!",
  "Drag the windows around - they're fully interactive! *meow*",
  "Ramya loves anime - ask her about her favorites! 🎌",
  "This portfolio was built with React and lots of love~ 💕",
  "Gaming is one of Ramya's favorite ways to unwind! 🎮",
  "Pro tip: You can minimize windows to the taskbar! *nyaa~*",
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
    <div className="fixed bottom-14 left-4 z-40 flex flex-col items-start gap-2">
      {/* Speech Bubble */}
      {tipVisible && currentTip && (
        <div className="animate-speech-bubble relative bg-card border-2 border-pink-200 rounded-2xl p-3 shadow-lg max-w-[250px]">
          <button
            onClick={dismissTip}
            className="absolute -top-2 -right-2 w-5 h-5 bg-pink-400 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm text-foreground">{currentTip}</p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-r-2 border-b-2 border-pink-200 transform rotate-45" />
        </div>
      )}

      {/* Cute Cat Mascot */}
      <button
        onClick={showRandomTip}
        className={`hover:scale-110 transition-transform cursor-pointer ${
          isExcited ? "animate-bounce" : "animate-mascot-idle"
        }`}
        title="Click for a tip!"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" className="drop-shadow-lg">
          {/* Body */}
          <ellipse cx="32" cy="48" rx="18" ry="14" fill="#FFB6C1" />
          
          {/* Head */}
          <circle cx="32" cy="28" r="20" fill="#FFB6C1" />
          
          {/* Ears */}
          <path d="M14 16 L18 28 L8 24 Z" fill="#FFB6C1" />
          <path d="M50 16 L46 28 L56 24 Z" fill="#FFB6C1" />
          <path d="M15 18 L18 26 L11 23 Z" fill="#FFC0CB" />
          <path d="M49 18 L46 26 L53 23 Z" fill="#FFC0CB" />
          
          {/* Face */}
          {/* Eyes */}
          <ellipse cx="24" cy="26" rx="4" ry="5" fill="#2D2D2D" />
          <ellipse cx="40" cy="26" rx="4" ry="5" fill="#2D2D2D" />
          
          {/* Eye shine */}
          <circle cx="25" cy="24" r="1.5" fill="#FFFFFF" />
          <circle cx="41" cy="24" r="1.5" fill="#FFFFFF" />
          
          {/* Nose */}
          <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FF69B4" />
          
          {/* Mouth */}
          <path d="M32 34 Q28 38 26 36" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
          <path d="M32 34 Q36 38 38 36" stroke="#2D2D2D" strokeWidth="1.5" fill="none" />
          
          {/* Whiskers */}
          <line x1="10" y1="30" x2="20" y2="32" stroke="#2D2D2D" strokeWidth="1" />
          <line x1="10" y1="34" x2="20" y2="34" stroke="#2D2D2D" strokeWidth="1" />
          <line x1="10" y1="38" x2="20" y2="36" stroke="#2D2D2D" strokeWidth="1" />
          <line x1="54" y1="30" x2="44" y2="32" stroke="#2D2D2D" strokeWidth="1" />
          <line x1="54" y1="34" x2="44" y2="34" stroke="#2D2D2D" strokeWidth="1" />
          <line x1="54" y1="38" x2="44" y2="36" stroke="#2D2D2D" strokeWidth="1" />
          
          {/* Blush */}
          <circle cx="18" cy="34" r="4" fill="#FF9999" opacity="0.5" />
          <circle cx="46" cy="34" r="4" fill="#FF9999" opacity="0.5" />
          
          {/* Paws */}
          <ellipse cx="22" cy="58" rx="6" ry="4" fill="#FFB6C1" />
          <ellipse cx="42" cy="58" rx="6" ry="4" fill="#FFB6C1" />
          
          {/* Tail */}
          <path d="M50 48 Q60 40 55 30" stroke="#FFB6C1" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
