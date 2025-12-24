import { useEffect, useMemo, useRef, useState } from "react";
import { Flower2, Sparkles, Trash2 } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { playSound } from "./SoundManager";

interface FlowerData {
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

const LIFE_QUOTES = [
  "Bloom where you are planted 🌸",
  "Every flower is a soul blossoming in nature 🌷",
  "Like flowers, we can choose to bloom 🌻",
  "Be like a flower, survive the rain but use it to grow 🌺",
  "Where flowers bloom, so does hope 💐",
  "A flower does not think of competing with the flower next to it 🌼",
  "Let your dreams blossom 🌹",
  "Happiness held is the seed; happiness shared is the flower 🌸",
  "Every flower must grow through dirt 🌱",
  "You belong among the wildflowers 🌾",
  "In a field of roses, be a wildflower 🌿",
  "Plant seeds of happiness, hope, success, and love 💕",
];

const FlowerSVG = ({ color, type }: { color: string; type: string }) => {
  if (type === "tulip") {
    return (
      <svg viewBox="0 0 40 60" className="w-full h-full" aria-hidden="true">
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
      <svg viewBox="0 0 40 60" className="w-full h-full" aria-hidden="true">
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
    <svg viewBox="0 0 40 60" className="w-full h-full" aria-hidden="true">
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
  const supabaseRef = useRef<SupabaseClient<Database> | null>(null);
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [selectedColor, setSelectedColor] = useState(FLOWER_COLORS[0]);
  const [selectedType, setSelectedType] = useState<"tulip" | "rose" | "daisy">("tulip");
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | null>(null);

  const quote = useMemo(() => {
    return LIFE_QUOTES[Math.floor(Math.random() * LIFE_QUOTES.length)];
  }, []);

  useEffect(() => {
    let mounted = true;
    let channelCleanup: (() => void) | null = null;

    (async () => {
      try {
        const mod = await import("@/integrations/supabase/client");
        if (!mounted) return;

        supabaseRef.current = mod.supabase;

        const { data, error } = await mod.supabase
          .from("flowers")
          .select("*")
          .order("created_at", { ascending: true });

        if (!mounted) return;

        if (error) {
          setBackendError("Could not load the garden right now.");
        } else if (data) {
          setFlowers(
            data.map((f) => ({
              id: f.id,
              x: Number(f.x),
              y: Number(f.y),
              color: f.color,
              type: f.type as "tulip" | "rose" | "daisy",
              scale: Number(f.scale),
            }))
          );
        }

        const channel = mod.supabase
          .channel("flowers-realtime")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "flowers" },
            (payload) => {
              const newFlower = payload.new as Database["public"]["Tables"]["flowers"]["Row"];
              setFlowers((prev) => {
                if (prev.some((f) => f.id === newFlower.id)) return prev;
                return [
                  ...prev,
                  {
                    id: newFlower.id,
                    x: Number(newFlower.x),
                    y: Number(newFlower.y),
                    color: newFlower.color,
                    type: newFlower.type as "tulip" | "rose" | "daisy",
                    scale: Number(newFlower.scale),
                  },
                ];
              });
            }
          )
          .on(
            "postgres_changes",
            { event: "DELETE", schema: "public", table: "flowers" },
            async () => {
              // Refetch on delete
              const { data: fresh } = await mod.supabase
                .from("flowers")
                .select("*")
                .order("created_at", { ascending: true });

              if (!mounted || !fresh) return;

              setFlowers(
                fresh.map((f) => ({
                  id: f.id,
                  x: Number(f.x),
                  y: Number(f.y),
                  color: f.color,
                  type: f.type as "tulip" | "rose" | "daisy",
                  scale: Number(f.scale),
                }))
              );
            }
          )
          .subscribe();

        channelCleanup = () => {
          mod.supabase.removeChannel(channel);
        };

        setIsLoading(false);
      } catch {
        if (!mounted) return;
        // If env vars were removed in a hosting environment, the client init can fail.
        setBackendError(
          "Backend configuration is missing. If you redeployed elsewhere, add the required environment variables back."
        );
        setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
      channelCleanup?.();
    };
  }, []);

  const handleGardenClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const supabase = supabaseRef.current;
    if (!supabase) {
      setBackendError(
        "The garden backend isn't available right now. Please refresh after backend variables are restored."
      );
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const scale = 0.8 + Math.random() * 0.4;

    const { error } = await supabase.from("flowers").insert({
      x,
      y,
      color: selectedColor,
      type: selectedType,
      scale,
    });

    if (error) {
      setBackendError("Could not plant a flower right now.");
      return;
    }

    playSound("success");
    setCurrentQuote(LIFE_QUOTES[Math.floor(Math.random() * LIFE_QUOTES.length)]);
    setTimeout(() => setCurrentQuote(null), 4000);
  };

  const clearGarden = () => {
    // Note: Clear is disabled for shared garden - only owner should clear
    playSound("click");
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading garden...</div>
      </div>
    );
  }

  if (backendError) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
          <Flower2 className="h-4 w-4" />
          Garden unavailable
        </div>
        <p className="max-w-md text-sm text-muted-foreground">{backendError}</p>
        <p className="max-w-md text-xs text-muted-foreground">
          Tip: in Lovable Cloud this is auto-managed; if you redeployed outside Lovable, ensure your host has the same VITE_ env vars.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="xp-button"
          type="button"
        >
          Reload
        </button>
        <p className="max-w-md text-xs text-muted-foreground">Quote of the day: {quote}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {currentQuote && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <div className="bg-card/95 backdrop-blur-sm border-2 border-pink-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-foreground">{currentQuote}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-pink-50 dark:bg-pink-950/20 rounded-xl border border-pink-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Color:</span>
          <div className="flex gap-1">
            {FLOWER_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  playSound("click");
                }}
                className={`w-6 h-6 rounded-full transition-transform ${
                  selectedColor === color ? "ring-2 ring-pink-400 ring-offset-2 scale-110" : ""
                }`}
                style={{ backgroundColor: color }}
                type="button"
                aria-label={`Select flower color ${color}`}
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
                onClick={() => {
                  setSelectedType(type);
                  playSound("click");
                }}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-all ${
                  selectedType === type ? "bg-pink-400 text-white" : "bg-secondary hover:bg-pink-100"
                }`}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={clearGarden}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
          type="button"
          title="Clear (disabled)"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>

      <div
        onClick={handleGardenClick}
        className="flex-1 relative rounded-xl cursor-crosshair overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #98FB98 40%, #228B22 100%)",
          minHeight: 280,
        }}
        role="button"
        tabIndex={0}
        aria-label="Flower garden canvas (click to plant a flower)"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // For keyboard users, plant in the center
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const fakeEvent = {
              ...e,
              currentTarget: target,
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            } as unknown as React.MouseEvent<HTMLDivElement>;
            void handleGardenClick(fakeEvent);
          }
        }}
      >
        <div
          className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full shadow-lg"
          style={{ boxShadow: "0 0 30px 10px rgba(255, 255, 0, 0.3)" }}
        />

        <div className="absolute top-6 left-8 w-16 h-8 bg-white rounded-full opacity-80" />
        <div className="absolute top-4 left-12 w-12 h-6 bg-white rounded-full opacity-80" />
        <div className="absolute top-10 left-20 w-20 h-8 bg-white rounded-full opacity-70" />

        {flowers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/50 pointer-events-none">
            <div className="bg-card/90 px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg">
              <Flower2 className="w-5 h-5 text-pink-400" />
              <span>Click anywhere to plant a flower!</span>
            </div>
          </div>
        )}

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
        🌸 {flowers.length} flower{flowers.length !== 1 ? "s" : ""} planted by visitors • Plant yours!
      </div>
    </div>
  );
};
