"use client";

import Link from "next/link";
import Image from "next/image";
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
    /* 
       HEADER HEIGHT: set to h-32 (128px) 
       This is a very tall header specifically to support your vertical logo.
    */
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-32 flex items-center">
      <div className="container mx-auto px-4 h-full">
        <nav className="flex h-full items-center justify-between">
          
          {/* 
              LOGO SECTION 
              - py-4: adds padding top/bottom
              - scale-150: Increases the actual rendered size of the SVG by 50%
              - origin-left: ensures it stays pinned to the left while growing
          */}
          <Link href="/" className="relative flex items-center h-full py-4 overflow-visible">
            <div className="relative h-full w-32 flex items-center justify-center">
              <Image 
                src="/logo.svg" 
                alt="itike" 
                fill
                className="object-contain invert scale-150 origin-center"
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation - Centered vertically in the tall header */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-semibold transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Location & Auth - Right Aligned */}
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="max-w-[120px] truncate font-medium">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button className="px-6" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col gap-8 pt-10">
                <div className="flex items-center justify-center h-24">
                   <Link href="/" onClick={() => setMobileMenuOpen(false)} className="h-full">
                    <Image 
                      src="/logo.svg" 
                      alt="itike" 
                      width={100} 
                      height={100} 
                      className="h-full w-auto object-contain invert scale-125"
                    />
                  </Link>
                </div>

                <nav className="flex flex-col gap-6 items-center">
                  {publicNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-xl font-bold transition-colors",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border pt-8 flex flex-col gap-4">
                   <Button asChild className="w-full h-12 text-lg">
                      <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full h-12 text-lg bg-transparent">
                      <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}