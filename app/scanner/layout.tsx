"use client";

import React from "react"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QrCode, History, Settings, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { mockEvents } from "@/lib/mock-data";

const navItems = [
  { href: "/scanner", label: "Scan", icon: QrCode },
  { href: "/scanner/history", label: "History", icon: History },
  { href: "/scanner/settings", label: "Settings", icon: Settings },
];

export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  // Get published events only
  const publishedEvents = mockEvents.filter((e) => e.status === "published");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin?redirect=/scanner");
    }
    if (!isLoading && user && user.role !== "staff" && user.role !== "organizer" && user.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (publishedEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(publishedEvents[0].id);
    }
  }, [publishedEvents, selectedEvent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/scanner" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <QrCode className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-semibold text-lg">Scanner</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-secondary text-xs">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {user.role}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Event Selector */}
        <div className="px-4 pb-3">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="bg-secondary/50">
              <SelectValue placeholder="Select event to scan" />
            </SelectTrigger>
            <SelectContent>
              {publishedEvents.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  <div className="flex flex-col items-start">
                    <span className="truncate max-w-[200px]">{event.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/scanner" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
