import { ReactNode } from "react";
import { playSound } from "./SoundManager";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

// Cute emoji icons for each type
const CUTE_ICONS: Record<string, string> = {
  "About Me": "🌸",
  "Projects": "📁",
  "Hobbies": "💖",
  "Experience": "✨",
  "Vision": "🔮",
  "Contact": "💌",
  "Flower Garden": "🌷",
};

export const DesktopIcon = ({ icon, label, onClick, selected }: DesktopIconProps) => {
  const handleClick = () => {
    playSound("click");
    onClick();
  };

  const cuteIcon = CUTE_ICONS[label];

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleClick}
      className={`desktop-icon group ${selected ? "selected" : ""}`}
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-lg group-hover:bg-white/30 group-hover:scale-110 transition-all">
        {cuteIcon ? (
          <span className="text-3xl">{cuteIcon}</span>
        ) : (
          <div className="text-pink-400 drop-shadow-lg">{icon}</div>
        )}
      </div>
      <span className="text-xs text-center text-white font-semibold drop-shadow-md leading-tight mt-1 px-1 py-0.5 rounded bg-black/20 backdrop-blur-sm">
        {label}
      </span>
    </button>
  );
};
