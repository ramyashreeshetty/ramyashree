import { useState } from "react";
import { RotateCcw } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.png";

interface WelcomeScreenProps {
  onLogin: () => void;
}

export const WelcomeScreen = ({ onLogin }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
    
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex"
      style={{
        background: "linear-gradient(180deg, hsl(210 65% 50%) 0%, hsl(210 60% 55%) 50%, hsl(210 55% 60%) 100%)",
      }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(210_70%_35%)] to-transparent" />

      {/* Left side - Logo and instructions */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Windows-style Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {/* XP-style flag logo */}
          <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
            <path d="M10 20 Q20 15 35 18 Q40 35 38 45 Q20 48 10 42 Z" fill="#FF5722" />
            <path d="M42 18 Q55 12 70 18 Q72 35 70 45 Q55 42 42 45 Z" fill="#4CAF50" />
            <path d="M10 48 Q20 52 38 50 Q40 60 38 70 Q20 75 10 68 Z" fill="#2196F3" />
            <path d="M42 50 Q55 48 70 50 Q72 65 70 72 Q55 78 42 70 Z" fill="#FFC107" />
          </svg>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Ramyashree<span className="text-2xl align-super opacity-80">XP</span>
            </h1>
            <p className="text-white/80 text-lg font-medium mt-1">Data Engineer</p>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-white/70 text-sm mb-6">
          To begin, click on Ramyashree to log in
        </p>
      </div>

      {/* Right side - User profile card */}
      <div className="flex-1 flex items-center justify-start pl-8">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="group flex items-center gap-4 hover:scale-105 transition-transform disabled:opacity-70"
        >
          {/* Profile picture with border */}
          <div className="w-20 h-20 rounded-md bg-white p-1 shadow-lg overflow-hidden">
            <img 
              src={profileAvatar} 
              alt="Ramyashree" 
              className="w-full h-full rounded-sm object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold text-white">Ramyashree</div>
            <div className="text-sm text-white/70">Data Engineer</div>
            {isLoading && (
              <div className="mt-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
          </div>
        </button>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-t from-[hsl(210_70%_35%)] to-transparent">
        {/* Restart button */}
        <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
          <RotateCcw className="w-4 h-4" />
          <span>Restart Ramyashree XP</span>
        </button>
        
        {/* Right side text */}
        <div className="text-white/60 text-xs text-right">
          <div>After you log on, the system is yours to explore.</div>
          <div>Every detail has been designed with a purpose.</div>
        </div>
      </div>
    </div>
  );
};
