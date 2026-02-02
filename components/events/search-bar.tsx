"use client";

import React from "react"

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ 
  className,
  placeholder = "Search events, artists, venues..." 
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [query, router, searchParams]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <form onSubmit={handleSearch} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border-border/50 bg-secondary pl-12 pr-24 text-base placeholder:text-muted-foreground focus-visible:ring-accent"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-16 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
