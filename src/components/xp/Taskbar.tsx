import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; title: string; icon?: React.ReactNode }[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
}

export const Taskbar = ({ openWindows, activeWindow, onWindowClick }: TaskbarProps) => {
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
      {startMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} />}
      <div className="xp-taskbar fixed bottom-0 left-0 right-0 h-12 flex items-center px-1 z-50">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="xp-start-button flex items-center gap-2 px-4 py-1 h-10 text-primary-foreground"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 flex items-center justify-center">
            <Menu className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold italic">start</span>
        </button>

        {/* Quick Launch Divider */}
        <div className="w-px h-8 bg-primary/30 mx-2" />

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-sm text-sm text-primary-foreground truncate max-w-[180px] transition-all ${
                activeWindow === window.id
                  ? "bg-primary/40 shadow-inner"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
            >
              {window.icon}
              <span className="truncate">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 px-3 bg-primary/20 h-full">
          <div className="flex items-center gap-1">
            {/* Volume icon placeholder */}
            <div className="w-4 h-4 text-primary-foreground/70">🔊</div>
          </div>
          <div className="text-primary-foreground text-sm font-medium">
            {formatTime(time)}
          </div>
        </div>
      </div>
    </>
  );
};
