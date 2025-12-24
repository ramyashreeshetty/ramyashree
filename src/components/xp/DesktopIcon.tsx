import { ReactNode } from "react";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export const DesktopIcon = ({ icon, label, onClick, selected }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className={`desktop-icon ${selected ? "selected" : ""}`}
    >
      <div className="w-12 h-12 flex items-center justify-center text-primary drop-shadow-lg">
        {icon}
      </div>
      <span className="text-xs text-center text-foreground font-medium drop-shadow-sm leading-tight">
        {label}
      </span>
    </button>
  );
};
