import { User, FolderOpen, Briefcase, Heart, Telescope, Mail, Github, Linkedin, X } from "lucide-react";

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const menuItems = [
    { icon: <User className="w-8 h-8" />, label: "About Me", description: "Learn about Ramya" },
    { icon: <FolderOpen className="w-8 h-8" />, label: "Projects", description: "View my work" },
    { icon: <Heart className="w-8 h-8" />, label: "Hobbies", description: "What I love" },
    { icon: <Briefcase className="w-8 h-8" />, label: "Experience", description: "My journey" },
    { icon: <Telescope className="w-8 h-8" />, label: "Vision", description: "Goals & dreams" },
    { icon: <Mail className="w-8 h-8" />, label: "Contact", description: "Get in touch" },
  ];

  return (
    <div className="fixed bottom-12 left-0 z-50 animate-fade-in" onClick={(e) => e.stopPropagation()}>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-b from-primary to-primary/80 rounded-tr-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/90 to-primary border-b border-primary-foreground/20">
          <div className="w-12 h-12 rounded-md bg-white p-0.5">
            <div className="w-full h-full rounded-sm bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center text-xl">
              👩‍💻
            </div>
          </div>
          <div className="text-primary-foreground">
            <div className="font-bold">Ramyashree</div>
            <div className="text-sm opacity-80">Data Engineer</div>
          </div>
        </div>

        <div className="flex">
          {/* Left Panel - Programs */}
          <div className="w-56 bg-card p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={onClose}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-primary/10 transition-colors text-left"
              >
                <div className="text-primary">{item.icon}</div>
                <div>
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel - Quick Links */}
          <div className="w-48 bg-primary/10 p-2 border-l border-border">
            <div className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-2">
              Quick Links
            </div>
            <a
              href="https://github.com/ramya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/10 text-foreground"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ramya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/10 text-foreground"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <div className="border-t border-border my-2" />
            <button
              onClick={onClose}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-destructive/10 text-destructive"
            >
              <X className="w-5 h-5" />
              <span>Close Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
