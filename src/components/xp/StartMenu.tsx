import { User, FolderOpen, Briefcase, Heart, Telescope, Mail, Github, Linkedin, X } from "lucide-react";

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const menuItems = [
    { icon: <User className="w-8 h-8" />, label: "About Me", description: "Learn about Ramyashree" },
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
      <div className="relative bg-white rounded-tr-xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header - classic XP blue header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-400">
          <div className="w-12 h-12 rounded-md bg-white p-0.5 shadow-md">
            <div className="w-full h-full rounded-sm bg-gradient-to-br from-rose-200 to-violet-200 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                {/* Simple cute face */}
                <circle cx="14" cy="14" r="12" fill="#FEE2E2"/>
                <circle cx="10" cy="12" r="2" fill="#374151"/>
                <circle cx="18" cy="12" r="2" fill="#374151"/>
                <path d="M10 18 Q14 21 18 18" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="text-white">
            <div className="font-bold text-lg">Ramyashree</div>
            <div className="text-sm text-blue-100">Data Engineer</div>
          </div>
        </div>

        <div className="flex">
          {/* Left Panel - Programs */}
          <div className="w-56 bg-white p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={onClose}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors text-left group"
              >
                <div className="text-blue-500 group-hover:text-blue-600 transition-colors">{item.icon}</div>
                <div>
                  <div className="font-medium text-slate-700">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel - Quick Links */}
          <div className="w-48 bg-blue-50 p-2 border-l border-blue-100">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-2 px-2">
              Quick Links
            </div>
            <a
              href="https://github.com/ramyashreeshetty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-100 text-slate-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ramyashree-shetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-100 text-slate-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <div className="border-t border-blue-200 my-2" />
            <button
              onClick={onClose}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
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
