"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">Check your email</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The link will expire in 1 hour.
        </p>

        <div className="mt-8 space-y-4">
          <Button
            variant="outline"
            className="w-full h-12 bg-transparent"
            onClick={() => setIsSubmitted(false)}
          >
            Try a different email
          </Button>
          <Button asChild className="w-full h-12">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/auth/signin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>

      <div className="mb-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Mail className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">Forgot password?</h1>
        <p className="mt-2 text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
            autoComplete="email"
          />
        </div>

        <Button type="submit" className="w-full h-12 gap-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}
