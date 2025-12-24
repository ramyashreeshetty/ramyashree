import { playSound } from "./SoundManager";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

// Pixel-art style SVG icons
const PixelIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "About Me":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="10" y="4" width="12" height="12" rx="6" fill="#89CFF0" />
          <rect x="12" y="8" width="3" height="2" fill="#2D2D2D" />
          <rect x="17" y="8" width="3" height="2" fill="#2D2D2D" />
          <rect x="14" y="12" width="4" height="1" fill="#2D2D2D" />
          <rect x="8" y="16" width="16" height="12" rx="2" fill="#89CFF0" />
          <rect x="12" y="20" width="8" height="4" fill="#B8E0F0" />
        </svg>
      );
    case "Projects":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="4" y="8" width="24" height="18" rx="2" fill="#F4D03F" />
          <rect x="4" y="6" width="12" height="4" rx="1" fill="#F4D03F" />
          <rect x="6" y="12" width="20" height="12" fill="#FFF8DC" />
          <rect x="8" y="14" width="6" height="2" fill="#DDD" />
          <rect x="8" y="18" width="10" height="2" fill="#DDD" />
        </svg>
      );
    case "Hobbies":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <path d="M16 28 L6 18 Q2 14 6 10 Q10 6 16 12 Q22 6 26 10 Q30 14 26 18 Z" fill="#FFB6C1" />
          <path d="M16 24 L9 17 Q6 14 9 11 Q12 8 16 13 Q20 8 23 11 Q26 14 23 17 Z" fill="#FFC0CB" />
        </svg>
      );
    case "Experience":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="6" y="10" width="20" height="16" rx="2" fill="#A0522D" />
          <rect x="12" y="6" width="8" height="6" rx="1" fill="#8B4513" />
          <rect x="8" y="12" width="16" height="12" fill="#D2B48C" />
          <rect x="14" y="14" width="4" height="3" fill="#A0522D" />
        </svg>
      );
    case "Vision":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <circle cx="16" cy="16" r="10" fill="#E6E6FA" stroke="#9370DB" strokeWidth="2" />
          <circle cx="16" cy="16" r="6" fill="#DDA0DD" />
          <circle cx="16" cy="16" r="3" fill="#9370DB" />
          <circle cx="14" cy="14" r="1" fill="white" />
        </svg>
      );
    case "Contact":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="4" y="8" width="24" height="16" rx="2" fill="#87CEEB" />
          <path d="M4 10 L16 18 L28 10" stroke="#5F9EA0" strokeWidth="2" fill="none" />
          <rect x="6" y="12" width="20" height="10" fill="#B0E0E6" />
        </svg>
      );
    case "Flower Garden":
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="14" y="18" width="4" height="10" fill="#228B22" />
          <circle cx="16" cy="12" r="6" fill="#FFB6C1" />
          <circle cx="12" cy="10" r="3" fill="#FFC0CB" />
          <circle cx="20" cy="10" r="3" fill="#FFC0CB" />
          <circle cx="12" cy="14" r="3" fill="#FFC0CB" />
          <circle cx="20" cy="14" r="3" fill="#FFC0CB" />
          <circle cx="16" cy="12" r="2" fill="#FFD700" />
        </svg>
      );
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" className="drop-shadow">
          <rect x="6" y="6" width="20" height="20" rx="2" fill="#B0C4DE" />
          <rect x="8" y="8" width="16" height="16" fill="#E6E6FA" />
        </svg>
      );
  }
};

export const DesktopIcon = ({ label, onClick, selected }: DesktopIconProps) => {
  const handleClick = () => {
    playSound("click");
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleClick}
      className={`desktop-icon group ${selected ? "selected" : ""}`}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <PixelIcon type={label} />
      </div>
      <span className="text-[11px] text-center text-white font-medium drop-shadow-md leading-tight px-1">
        {label}
      </span>
    </button>
  );
};
