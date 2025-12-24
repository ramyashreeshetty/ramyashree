import { useState } from "react";
import { User, FolderOpen, Heart, Briefcase, Telescope, Mail, Flower2 } from "lucide-react";
import { DesktopIcon } from "@/components/xp/DesktopIcon";
import { XPWindow } from "@/components/xp/XPWindow";
import { Taskbar } from "@/components/xp/Taskbar";
import { MusicPlayer } from "@/components/xp/MusicPlayer";
import { CatMascot } from "@/components/xp/CatMascot";
import { FlowerGarden } from "@/components/xp/FlowerGarden";
import { WelcomeScreen } from "@/components/xp/WelcomeScreen";
import { AboutSection, ProjectsSection, HobbiesSection, ExperienceSection, VisionSection, ContactSection } from "@/components/xp/ContentSections";
import { playSound } from "@/components/xp/SoundManager";
import xpWallpaper from "@/assets/xp-wallpaper.jpg";

type WindowId = "about" | "projects" | "hobbies" | "experience" | "vision" | "contact" | "garden";

interface WindowConfig {
  id: WindowId;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const WINDOWS: WindowConfig[] = [
  { id: "about", title: "About Me", icon: <User className="w-4 h-4" />, content: <AboutSection />, position: { x: 120, y: 60 }, size: { width: 500, height: 420 } },
  { id: "projects", title: "Projects", icon: <FolderOpen className="w-4 h-4" />, content: <ProjectsSection />, position: { x: 180, y: 80 }, size: { width: 480, height: 400 } },
  { id: "hobbies", title: "Hobbies", icon: <Heart className="w-4 h-4" />, content: <HobbiesSection />, position: { x: 240, y: 100 }, size: { width: 420, height: 380 } },
  { id: "experience", title: "Experience", icon: <Briefcase className="w-4 h-4" />, content: <ExperienceSection />, position: { x: 160, y: 70 }, size: { width: 520, height: 380 } },
  { id: "vision", title: "Vision", icon: <Telescope className="w-4 h-4" />, content: <VisionSection />, position: { x: 200, y: 90 }, size: { width: 440, height: 350 } },
  { id: "contact", title: "Contact", icon: <Mail className="w-4 h-4" />, content: <ContactSection />, position: { x: 280, y: 110 }, size: { width: 400, height: 420 } },
  { id: "garden", title: "Flower Garden", icon: <Flower2 className="w-4 h-4" />, content: <FlowerGarden />, position: { x: 150, y: 30 }, size: { width: 550, height: 480 } },
];

const DESKTOP_ICONS = [
  { id: "about" as WindowId, icon: <User className="w-10 h-10" />, label: "About Me" },
  { id: "projects" as WindowId, icon: <FolderOpen className="w-10 h-10" />, label: "Projects" },
  { id: "hobbies" as WindowId, icon: <Heart className="w-10 h-10" />, label: "Hobbies" },
  { id: "experience" as WindowId, icon: <Briefcase className="w-10 h-10" />, label: "Experience" },
  { id: "vision" as WindowId, icon: <Telescope className="w-10 h-10" />, label: "Vision" },
  { id: "contact" as WindowId, icon: <Mail className="w-10 h-10" />, label: "Contact" },
  { id: "garden" as WindowId, icon: <Flower2 className="w-10 h-10" />, label: "Flower Garden" },
];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [openWindows, setOpenWindows] = useState<WindowId[]>(["garden"]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>("garden");
  const [windowOrder, setWindowOrder] = useState<WindowId[]>(["garden"]);

  const handleLogin = () => {
    setShowWelcome(false);
    playSound("success");
    // Music will auto-play on login
  };

  const handleLogout = () => {
    setShowWelcome(true);
    setOpenWindows(["garden"]);
    setActiveWindow("garden");
    setWindowOrder(["garden"]);
  };

  const openWindow = (id: WindowId) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      playSound("popup");
    }
    setActiveWindow(id);
    setWindowOrder([...windowOrder.filter(w => w !== id), id]);
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    setWindowOrder(windowOrder.filter(w => w !== id));
    playSound("close");
    if (activeWindow === id) {
      setActiveWindow(windowOrder[windowOrder.length - 2] || null);
    }
  };

  const focusWindow = (id: WindowId) => {
    setActiveWindow(id);
    setWindowOrder([...windowOrder.filter(w => w !== id), id]);
  };

  if (showWelcome) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  return (
    <div 
      className="min-h-screen pb-12 overflow-hidden"
      style={{
        backgroundImage: `url(${xpWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop Icons - properly spaced */}
      <div className="p-4 flex flex-col gap-3 w-fit">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
            selected={activeWindow === icon.id}
          />
        ))}
      </div>

      {/* Windows */}
      {WINDOWS.map((window) => (
        <XPWindow
          key={window.id}
          title={window.title}
          icon={window.icon}
          isOpen={openWindows.includes(window.id)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          initialPosition={window.position}
          initialSize={window.size}
          zIndex={10 + windowOrder.indexOf(window.id)}
        >
          {window.content}
        </XPWindow>
      ))}

      {/* Music Player - auto-plays and movable */}
      <MusicPlayer autoPlay={true} />

      {/* Cat Mascot - positioned on right side to not interfere with icons */}
      <CatMascot />

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map(id => {
          const w = WINDOWS.find(win => win.id === id)!;
          return { id, title: w.title, icon: w.icon };
        })}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;
