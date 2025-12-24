import { useState, useEffect } from "react";
import { Flower, Flower2, Trash2 } from "lucide-react";

interface Flower {
  id: string;
  x: number;
  y: number;
  color: string;
  type: "tulip" | "rose" | "daisy";
  scale: number;
}

const FLOWER_COLORS = [
  "#FF6B9D", // Pink
  "#FF8A5B", // Orange
  "#FFE66D", // Yellow
  "#95E1D3", // Mint
  "#AA96DA", // Lavender
  "#FF6B6B", // Red
  "#74B9FF", // Blue
];

const FlowerSVG = ({ color, type }: { color: string; type: string }) => {
  if (type === "tulip") {
    return (
      <svg viewBox="0 0 40 60" className="w-full h-full">
        <path d="M20 60 L20 30" stroke="#228B22" strokeWidth="3" />
        <path d="M15 45 Q10 40 12 35" stroke="#228B22" strokeWidth="2" fill="none" />
        <ellipse cx="20" cy="18" rx="12" ry="18" fill={color} />
        <ellipse cx="12" cy="20" rx="6" ry="14" fill={color} opacity="0.8" />
        <ellipse cx="28" cy="20" rx="6" ry="14" fill={color} opacity="0.8" />
      </svg>
    );
  }
  if (type === "rose") {
    return (
      <svg viewBox="0 0 40 60" className="w-full h-full">
        <path d="M20 60 L20 35" stroke="#228B22" strokeWidth="3" />
        <path d="M20 50 Q25 45 30 48" stroke="#228B22" strokeWidth="2" fill="none" />
        <circle cx="20" cy="20" r="15" fill={color} />
        <circle cx="20" cy="20" r="10" fill={color} opacity="0.9" />
        <circle cx="20" cy="20" r="5" fill={color} opacity="0.8" />
        <circle cx="20" cy="20" r="2" fill="#FFE66D" />
      </svg>
    );
  }
  // Daisy
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <path d="M20 60 L20 30" stroke="#228B22" strokeWidth="3" />
      <path d="M20 45 Q12 42 10 45" stroke="#228B22" strokeWidth="2" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="20"
          cy="8"
          rx="4"
          ry="10"
          fill={color}
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6" fill="#FFE66D" />
    </svg>
  );
};

export const FlowerGarden = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedColor, setSelectedColor] = useState(FLOWER_COLORS[0]);
  const [selectedType, setSelectedType] = useState<"tulip" | "rose" | "daisy">("tulip");

  useEffect(() => {
    const saved = localStorage.getItem("flower-garden");
    if (saved) {
      setFlowers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flower-garden", JSON.stringify(flowers));
  }, [flowers]);

  const handleGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newFlower: Flower = {
      id: Date.now().toString(),
      x,
      y,
      color: selectedColor,
      type: selectedType,
      scale: 0.8 + Math.random() * 0.4,
    };

    setFlowers([...flowers, newFlower]);
  };

  const clearGarden = () => {
    setFlowers([]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Color:</span>
          <div className="flex gap-1">
            {FLOWER_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full transition-transform ${
                  selectedColor === color ? "ring-2 ring-primary ring-offset-2 scale-110" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Type:</span>
          <div className="flex gap-1">
            {(["tulip", "rose", "daisy"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 text-sm rounded capitalize transition-all ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={clearGarden}
          className="ml-auto flex items-center gap-1 px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Garden Area */}
      <div
        onClick={handleGardenClick}
        className="flex-1 relative rounded-lg cursor-crosshair overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #87CEEB 0%, #87CEEB 40%, #90EE90 40%, #228B22 100%)",
          minHeight: 300,
        }}
      >
        {/* Sun */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full shadow-lg" 
          style={{ boxShadow: "0 0 30px 10px rgba(255, 255, 0, 0.3)" }} 
        />

        {/* Clouds */}
        <div className="absolute top-6 left-8 w-16 h-8 bg-white rounded-full opacity-80" />
        <div className="absolute top-4 left-12 w-12 h-6 bg-white rounded-full opacity-80" />
        <div className="absolute top-10 left-20 w-20 h-8 bg-white rounded-full opacity-70" />

        {/* Instruction */}
        {flowers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/50 pointer-events-none">
            <div className="bg-card/80 px-4 py-2 rounded-lg flex items-center gap-2">
              <Flower2 className="w-5 h-5" />
              Click anywhere to plant a flower!
            </div>
          </div>
        )}

        {/* Flowers */}
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute animate-flower-grow"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              transform: `translate(-50%, -100%) scale(${flower.scale})`,
              width: 40,
              height: 60,
            }}
          >
            <div className="animate-flower-sway" style={{ animationDelay: `${Math.random() * 2}s` }}>
              <FlowerSVG color={flower.color} type={flower.type} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm text-muted-foreground text-center">
        🌸 {flowers.length} flower{flowers.length !== 1 ? "s" : ""} planted • Your garden is saved automatically!
      </div>
    </div>
  );
};
