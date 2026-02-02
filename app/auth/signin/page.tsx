"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      router.push(redirectTo);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email or Phone</Label>
          <Input
            id="email"
            type="text"
            placeholder="you@example.com or 0788xxxxxx"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="h-12"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="h-12 pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 gap-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-accent hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>

      {/* Demo Accounts */}
      <div className="mt-8 rounded-xl bg-secondary/50 p-4">
        <p className="text-sm font-medium mb-3">Demo Accounts (any password works):</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Attendee: jean.mugabo@email.com</p>
          <p>Organizer: marie@eventspro.rw</p>
          <p>Admin: admin@tikiti.rw</p>
          <p>Scanner: eric.scanner@eventspro.rw</p>
        </div>
      </div>
    </div>
  );
}
