import React from "react"
import Link from "next/link";
import { Ticket } from "lucide-react";
import { AuthProvider } from "@/lib/auth-context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-card border-r border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Ticket className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Tikiti</span>
            </Link>

            {/* Content */}
            <div className="max-w-md">
              <h1 className="text-4xl font-bold leading-tight text-balance">
                Discover amazing events in Kigali
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Join thousands of event-goers discovering concerts, festivals,
                conferences and more across Rwanda.
              </p>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-accent">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">1000+</p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">100%</p>
                  <p className="text-sm text-muted-foreground">Secure</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Tikiti. Rwanda&apos;s trusted event platform.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Ticket className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">Tikiti</span>
            </Link>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
