"use client";

import React from "react"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Loader2, CheckCircle2, Mail } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Accept any 6-digit code for demo
    setIsVerified(true);
    setIsVerifying(false);

    // Redirect after showing success
    setTimeout(() => {
      if (user?.role === "organizer") {
        router.push("/organizer/dashboard");
      } else {
        router.push("/");
      }
    }, 2000);
  };

  const handleResend = async () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  if (isVerified) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">Email Verified!</h1>
        <p className="mt-2 text-muted-foreground">
          Your account has been verified successfully.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Redirecting you now...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Mail className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="mt-2 text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">
            {user?.email || "your email"}
          </span>
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-destructive/10 p-3 text-sm text-destructive text-center">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="h-14 w-12 text-center text-xl font-bold sm:h-16 sm:w-14"
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        disabled={isVerifying || otp.join("").length !== 6}
        className="mt-8 w-full h-12 gap-2"
      >
        {isVerifying ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Email"
        )}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-accent hover:underline font-medium"
          >
            Resend
          </button>
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        For demo purposes, enter any 6 digits to verify.
      </p>
    </div>
  );
}
