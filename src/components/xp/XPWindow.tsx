import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface XPWindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  zIndex?: number;
  onFocus?: () => void;
}

export const XPWindow = ({
  title,
  icon,
  children,
  isOpen,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 500, height: 400 },
  zIndex = 10,
  onFocus,
}: XPWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState({ position, size });
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus?.();
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(prevState.position);
      setSize(prevState.size);
    } else {
      setPrevState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 });
    }
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="xp-window fixed bg-card animate-scale-in"
      style={{
        left: position.x,
        top: position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100vh - 48px)" : size.height,
        zIndex,
        minWidth: 300,
        minHeight: 200,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="xp-title-bar flex items-center justify-between px-2 py-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-primary-foreground">
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="text-sm font-semibold truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {onMinimize && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="xp-button w-6 h-5 flex items-center justify-center p-0"
            >
              <Minus className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="xp-button w-6 h-5 flex items-center justify-center p-0"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="xp-button w-6 h-5 flex items-center justify-center p-0 hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-xp-window-bg p-4 overflow-auto" style={{ height: "calc(100% - 28px)" }}>
        {children}
      </div>
    </div>
  );
};
