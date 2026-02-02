"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Music,
  Trophy,
  Palette,
  UtensilsCrossed,
  Briefcase,
  Cpu,
  Users,
  PartyPopper,
  LayoutGrid,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Events", icon: LayoutGrid },
  { id: "music", label: "Music", icon: Music },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "arts", label: "Arts", icon: Palette },
  { id: "food", label: "Food & Drink", icon: UtensilsCrossed },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "tech", label: "Technology", icon: Cpu },
  { id: "community", label: "Community", icon: Users },
  { id: "nightlife", label: "Nightlife", icon: PartyPopper },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-2 min-w-max">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
