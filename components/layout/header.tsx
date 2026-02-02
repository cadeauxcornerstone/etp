"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import {
  Menu,
  X,
  User,
  Ticket,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const publicNavItems = [
  { label: "Events", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Organizers", href: "/organizer" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return "/auth/signin";
    switch (user.role) {
      case "organizer":
        return "/organizer/dashboard";
      case "admin":
        return "/admin";
      case "scanner":
        return "/scanner";
      default:
        return "/my-tickets";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Ticket className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Tikiti</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Location & Auth */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Kigali
              <ChevronDown className="h-3 w-3" />
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="max-w-[100px] truncate">
                      {user?.firstName}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col gap-1 p-2">
                    <p className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "attendee" && (
                    <DropdownMenuItem asChild>
                      <Link href="/my-tickets" className="gap-2">
                        <Ticket className="h-4 w-4" />
                        My Tickets
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Kigali, Rwanda</span>
                </div>

                <nav className="flex flex-col gap-4">
                  {publicNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border pt-6">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      {user?.role === "attendee" && (
                        <Link
                          href="/my-tickets"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <Ticket className="h-4 w-4" />
                          My Tickets
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild className="w-full">
                        <Link
                          href="/auth/signup"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link
                          href="/auth/signin"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
