import { useState, useEffect } from "react";
import { Menu, RotateCcw } from "lucide-react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; title: string; icon?: React.ReactNode }[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onLogout?: () => void;
  onOpenWindow?: (id: string) => void;
}

export const Taskbar = ({ openWindows, activeWindow, onWindowClick, onLogout, onOpenWindow }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {startMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} onOpenWindow={onOpenWindow} />}
      <div className="xp-taskbar fixed bottom-0 left-0 right-0 h-11 flex items-center px-1 z-50">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="xp-start-button flex items-center gap-2 px-4 py-1 h-9 text-white"
        >
          <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 flex items-center justify-center">
            <Menu className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold italic text-sm">start</span>
        </button>

        {/* Quick Launch Divider */}
        <div className="w-px h-7 bg-white/20 mx-2" />

        {/* Logout/Restart button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded text-xs transition-colors"
            title="Log Out"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-7 bg-white/20 mx-1" />

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded text-sm text-white truncate max-w-[160px] transition-all ${
                activeWindow === window.id
                  ? "bg-white/25 shadow-inner"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {window.icon}
              <span className="truncate text-xs">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 px-3 bg-white/10 h-full">
          <div className="text-white text-xs font-medium">
            {formatTime(time)}
          </div>
        </div>
      </div>
    </>
  );
};
