import { useState } from "react";

interface WelcomeScreenProps {
  onLogin: () => void;
}

export const WelcomeScreen = ({ onLogin }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    // Play click sound
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, hsl(220 60% 25%) 0%, hsl(210 70% 45%) 30%, hsl(200 70% 55%) 100%)",
      }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/30 to-transparent" />

      {/* Main Content */}
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        {/* Windows-style Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="text-6xl">🌸</div>
          <div className="text-center">
            <h1 className="font-display text-5xl font-bold text-primary-foreground tracking-tight">
              Ramya<span className="text-pink-300 text-3xl align-super">✨</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg font-medium mt-1">Data Engineer</p>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-primary-foreground/70 text-sm mb-4">
          To begin, click on Ramya to enter
        </p>

        {/* User Card */}
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="group flex items-center gap-4 bg-card/10 backdrop-blur-sm border-2 border-primary-foreground/20 rounded-xl p-4 pr-8 hover:bg-card/20 hover:border-primary-foreground/40 transition-all hover:scale-105 disabled:opacity-70"
        >
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-shadow">
            👩‍💻
          </div>
          <div className="text-left">
            <div className="text-xl font-bold text-primary-foreground">Ramya</div>
            <div className="text-sm text-primary-foreground/70">Data Engineer</div>
          </div>
          {isLoading && (
            <div className="ml-4 w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          )}
        </button>
      </div>

      {/* Bottom bar with message */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-t from-background/20 to-transparent">
        <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
          <span>🌸</span>
          <span>Welcome to my corner of the internet!</span>
        </div>
        <div className="text-primary-foreground/50 text-xs text-right">
          <div>After you log on, the system is yours to explore.</div>
          <div>Every detail has been designed with love. 💕</div>
        </div>
      </div>
    </div>
  );
};
