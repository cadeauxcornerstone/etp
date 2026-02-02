"use client";

import { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  Lock,
  Smartphone,
  CreditCard,
  Loader2,
  CheckCircle2,
  Ticket,
  AlertCircle,
} from "lucide-react";
import { mockEvents, formatDate, formatTime, formatRWF } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

type PaymentMethod = "momo" | "airtel" | "card";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const event = mockEvents.find((e) => e.id === eventId);

  // Parse ticket selection from URL
  const selectedTickets = useMemo(() => {
    try {
      const ticketData = searchParams.get("tickets");
      if (!ticketData) return {};
      return JSON.parse(decodeURIComponent(ticketData)) as Record<string, number>;
    } catch {
      return {};
    }
  }, [searchParams]);

  const [step, setStep] = useState<"details" | "payment" | "processing" | "success" | "failed">(
    isAuthenticated ? "details" : "details"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    momoNumber: "",
    airtelNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Button asChild className="mt-6">
          <Link href="/">Browse Events</Link>
        </Button>
      </div>
    );
  }

  // Calculate totals
  const orderItems = event.ticketTypes
    .filter((ticket) => selectedTickets[ticket.id] > 0)
    .map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      quantity: selectedTickets[ticket.id],
      price: ticket.price,
      subtotal: ticket.price * selectedTickets[ticket.id],
    }));

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
  const total = subtotal + serviceFee;
  const totalTickets = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalTickets === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">No tickets selected</h1>
        <p className="mt-2 text-muted-foreground">
          Please select tickets before proceeding to checkout.
        </p>
        <Button asChild className="mt-6">
          <Link href={`/events/${eventId}`}>Back to Event</Link>
        </Button>
      </div>
    );
  }

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "momo") {
      if (!formData.momoNumber.trim() || !/^07[8|9]\d{7}$/.test(formData.momoNumber)) {
        newErrors.momoNumber = "Invalid MTN number (078/079)";
      }
    } else if (paymentMethod === "airtel") {
      if (!formData.airtelNumber.trim() || !/^07[2|3]\d{7}$/.test(formData.airtelNumber)) {
        newErrors.airtelNumber = "Invalid Airtel number (072/073)";
      }
    } else if (paymentMethod === "card") {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Invalid card number";
      }
      if (!formData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Invalid expiry (MM/YY)";
      }
      if (!formData.cardCvv.trim() || !/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = "Invalid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === "details" && validateDetails()) {
      setStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setStep("processing");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate success (90% chance) or failure
    if (Math.random() > 0.1) {
      setStep("success");
    } else {
      setStep("failed");
    }
  };

  const handleRetry = () => {
    setStep("payment");
  };

  // Processing State
  if (step === "processing") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <Loader2 className="h-10 w-10 text-accent animate-spin" />
          </div>
          <h1 className="text-2xl font-bold">Processing Payment</h1>
          <p className="mt-2 text-muted-foreground">
            {paymentMethod === "momo" && "Check your phone for the MTN MoMo prompt..."}
            {paymentMethod === "airtel" && "Check your phone for the Airtel Money prompt..."}
            {paymentMethod === "card" && "Processing your card payment..."}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Please do not close this page
          </p>
        </div>
      </div>
    );
  }

  // Success State
  if (step === "success") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-2 text-muted-foreground">
            Your tickets have been confirmed. Check your email for details.
          </p>

          <Card className="mt-8 text-left">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.date)} at {formatTime(event.date)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-muted-foreground">{formatRWF(item.subtotal)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold pt-2 border-t border-border">
                  <span>Total Paid</span>
                  <span className="text-accent">{formatRWF(total)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 text-sm">
                <p className="font-medium">Order #TKT-{Date.now().toString(36).toUpperCase()}</p>
                <p className="text-muted-foreground">
                  Confirmation sent to {formData.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/my-tickets">
                <Ticket className="h-5 w-5" />
                View My Tickets
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Browse More Events</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Failed State
  if (step === "failed") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold">Payment Failed</h1>
          <p className="mt-2 text-muted-foreground">
            We couldn&apos;t process your payment. Please try again or use a different payment method.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button onClick={handleRetry} size="lg">
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/events/${eventId}`}>Back to Event</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 md:pb-12">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => (step === "payment" ? setStep("details") : router.back())}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                Step {step === "details" ? "1" : "2"} of 2
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Secure
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="flex gap-2">
              <div className={`h-1 flex-1 rounded-full ${step === "details" || step === "payment" ? "bg-accent" : "bg-secondary"}`} />
              <div className={`h-1 flex-1 rounded-full ${step === "payment" ? "bg-accent" : "bg-secondary"}`} />
            </div>

            {step === "details" && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                        }
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Tickets will be sent to this email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="0788123456"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                    className="space-y-3"
                  >
                    <Label
                      htmlFor="momo"
                      className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "momo"
                          ? "border-accent bg-accent/10"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <RadioGroupItem value="momo" id="momo" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                        <Smartphone className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">MTN Mobile Money</p>
                        <p className="text-sm text-muted-foreground">Pay with MoMo</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="airtel"
                      className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "airtel"
                          ? "border-accent bg-accent/10"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <RadioGroupItem value="airtel" id="airtel" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                        <Smartphone className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Airtel Money</p>
                        <p className="text-sm text-muted-foreground">Pay with Airtel Money</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="card"
                      className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "card"
                          ? "border-accent bg-accent/10"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                        <CreditCard className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                      </div>
                    </Label>
                  </RadioGroup>

                  <Separator />

                  {paymentMethod === "momo" && (
                    <div className="space-y-2">
                      <Label htmlFor="momoNumber">MTN MoMo Number</Label>
                      <Input
                        id="momoNumber"
                        type="tel"
                        value={formData.momoNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, momoNumber: e.target.value }))
                        }
                        placeholder="078XXXXXXX or 079XXXXXXX"
                        className={errors.momoNumber ? "border-destructive" : ""}
                      />
                      {errors.momoNumber && (
                        <p className="text-xs text-destructive">{errors.momoNumber}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        You&apos;ll receive a prompt to confirm the payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === "airtel" && (
                    <div className="space-y-2">
                      <Label htmlFor="airtelNumber">Airtel Money Number</Label>
                      <Input
                        id="airtelNumber"
                        type="tel"
                        value={formData.airtelNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, airtelNumber: e.target.value }))
                        }
                        placeholder="072XXXXXXX or 073XXXXXXX"
                        className={errors.airtelNumber ? "border-destructive" : ""}
                      />
                      {errors.airtelNumber && (
                        <p className="text-xs text-destructive">{errors.airtelNumber}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        You&apos;ll receive a prompt to confirm the payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                            const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                            setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                          }}
                          placeholder="1234 5678 9012 3456"
                          className={errors.cardNumber ? "border-destructive" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-destructive">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + "/" + value.slice(2, 4);
                              }
                              setFormData((prev) => ({ ...prev, cardExpiry: value }));
                            }}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={errors.cardExpiry ? "border-destructive" : ""}
                          />
                          {errors.cardExpiry && (
                            <p className="text-xs text-destructive">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            type="password"
                            value={formData.cardCvv}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cardCvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                              }))
                            }
                            placeholder="123"
                            maxLength={4}
                            className={errors.cardCvv ? "border-destructive" : ""}
                          />
                          {errors.cardCvv && (
                            <p className="text-xs text-destructive">{errors.cardCvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Info */}
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{event.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.venue.name}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Items */}
                <div className="space-y-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{formatRWF(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatRWF(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee (5%)</span>
                    <span>{formatRWF(serviceFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-accent">{formatRWF(total)}</span>
                  </div>
                </div>

                {/* Desktop Button */}
                <Button
                  onClick={step === "details" ? handleContinue : handlePayment}
                  className="w-full hidden lg:flex gap-2"
                  size="lg"
                >
                  {step === "details" ? (
                    "Continue to Payment"
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Pay {formatRWF(total)}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{totalTickets} tickets</p>
            <p className="text-xl font-bold">{formatRWF(total)}</p>
          </div>
          <Button
            onClick={step === "details" ? handleContinue : handlePayment}
            className="gap-2"
            size="lg"
          >
            {step === "details" ? (
              "Continue"
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
