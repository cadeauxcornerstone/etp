"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/types";
import { Eye, EyeOff, Loader2, ArrowRight, User, Building2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "attendee" as UserRole,
  });

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^0\d{9}$/.test(formData.phone)) {
      setError("Phone must be 10 digits starting with 0");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateStep2()) return;

    const success = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
    });

    if (success) {
      router.push("/auth/verify");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="mt-2 text-muted-foreground">
          {step === 1
            ? "Enter your details to get started"
            : "Set your password and account type"}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex gap-2">
        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-accent" : "bg-secondary"}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-accent" : "bg-secondary"}`} />
      </div>

      <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  className="h-12"
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Mugabo"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  className="h-12"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="h-12"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0788123456"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="h-12"
                autoComplete="tel"
              />
              <p className="text-xs text-muted-foreground">10 digits starting with 0</p>
            </div>

            <Button type="submit" className="w-full h-12 gap-2">
              Continue
              <ArrowRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="h-12 pr-12"
                  autoComplete="new-password"
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
              <p className="text-xs text-muted-foreground">At least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                className="h-12"
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-3">
              <Label>I want to</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value as UserRole }))
                }
                className="grid gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="attendee"
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                    formData.role === "attendee"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <RadioGroupItem value="attendee" id="attendee" />
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Attend Events</p>
                    <p className="text-xs text-muted-foreground">Buy tickets</p>
                  </div>
                </Label>
                <Label
                  htmlFor="organizer"
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                    formData.role === "organizer"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <RadioGroupItem value="organizer" id="organizer" />
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Organize Events</p>
                    <p className="text-xs text-muted-foreground">Sell tickets</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 h-12 gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
