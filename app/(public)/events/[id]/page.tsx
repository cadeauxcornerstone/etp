"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Heart,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Building2,
  ExternalLink,
} from "lucide-react";
import { mockEvents, formatDate, formatTime, formatRWF, getCategoryLabel, getCategoryColor } from "@/lib/mock-data";
import type { TicketType } from "@/lib/types";

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  selectedTickets: Record<string, number>;
  onQuantityChange: (ticketId: string, quantity: number) => void;
}

function TicketSelection({ ticketTypes, selectedTickets, onQuantityChange }: TicketSelectionProps) {
  return (
    <div className="space-y-3">
      {ticketTypes.map((ticket) => {
        const available = ticket.quantity - ticket.sold;
        const isSoldOut = available <= 0;
        const quantity = selectedTickets[ticket.id] || 0;

        return (
          <div
            key={ticket.id}
            className={`rounded-xl border p-4 transition-colors ${
              quantity > 0
                ? "border-accent bg-accent/5"
                : "border-border bg-card"
            } ${isSoldOut ? "opacity-60" : ""}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{ticket.name}</h4>
                  {isSoldOut && (
                    <Badge variant="secondary" className="text-xs">
                      Sold Out
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ticket.description}
                </p>
                <p className="mt-2 text-lg font-bold text-accent">
                  {formatRWF(ticket.price)}
                </p>
                {!isSoldOut && (
                  <p className="text-xs text-muted-foreground">
                    {available} tickets left
                  </p>
                )}
              </div>

              {!isSoldOut && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-transparent"
                    onClick={() =>
                      onQuantityChange(ticket.id, Math.max(0, quantity - 1))
                    }
                    disabled={quantity === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-transparent"
                    onClick={() =>
                      onQuantityChange(
                        ticket.id,
                        Math.min(ticket.maxPerOrder, quantity + 1, available)
                      )
                    }
                    disabled={quantity >= Math.min(ticket.maxPerOrder, available)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function EventDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const event = mockEvents.find((e) => e.id === id);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState(false);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2 text-muted-foreground">
          The event you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Browse Events</Link>
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };

  const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  const totalPrice = event.ticketTypes.reduce((sum, ticket) => {
    return sum + (selectedTickets[ticket.id] || 0) * ticket.price;
  }, 0);

  const handleCheckout = () => {
    if (totalTickets === 0) return;
    const ticketData = encodeURIComponent(JSON.stringify(selectedTickets));
    router.push(`/checkout/${event.id}?tickets=${ticketData}`);
  };

  const totalSold = event.ticketTypes.reduce((sum, t) => sum + t.sold, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute left-4 top-4 z-10">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-32 md:pb-12">
        <div className="relative -mt-24 md:-mt-32">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/95 backdrop-blur">
                <CardContent className="p-6 md:p-8">
                  {/* Category & Date */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={`${getCategoryColor(event.category)} border-0`}
                    >
                      {getCategoryLabel(event.category)}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(event.date)}</span>
                      {event.endDate && <span>- {formatTime(event.endDate)}</span>}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="mt-4 text-3xl font-bold text-balance md:text-4xl">
                    {event.title}
                  </h1>

                  {/* Organizer */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Organized by</p>
                      <p className="font-medium">{event.organizerName}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-semibold">{event.venue.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.venue.address}, {event.venue.city}
                        </p>
                        {event.venue.mapUrl && (
                          <a
                            href={event.venue.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                          >
                            View on map
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{totalSold.toLocaleString()} people attending</span>
                  </div>

                  {/* Description */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold">About This Event</h2>
                    <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                      {event.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Selection - Sidebar on Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="border-border/50 bg-card">
                  <CardHeader>
                    <CardTitle>Select Tickets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TicketSelection
                      ticketTypes={event.ticketTypes}
                      selectedTickets={selectedTickets}
                      onQuantityChange={handleQuantityChange}
                    />

                    {totalTickets > 0 && (
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {totalTickets} ticket{totalTickets !== 1 && "s"}
                          </span>
                          <span className="text-xl font-bold">
                            {formatRWF(totalPrice)}
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCheckout}
                      disabled={totalTickets === 0}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {totalTickets > 0 ? "Continue to Checkout" : "Select Tickets"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Ticket Selection - Mobile */}
          <div className="mt-8 lg:hidden">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <TicketSelection
                  ticketTypes={event.ticketTypes}
                  selectedTickets={selectedTickets}
                  onQuantityChange={handleQuantityChange}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {totalTickets > 0 ? (
            <>
              <div>
                <p className="text-sm text-muted-foreground">
                  {totalTickets} ticket{totalTickets !== 1 && "s"}
                </p>
                <p className="text-xl font-bold">{formatRWF(totalPrice)}</p>
              </div>
              <Button onClick={handleCheckout} className="gap-2" size="lg">
                <ShoppingCart className="h-5 w-5" />
                Checkout
              </Button>
            </>
          ) : (
            <>
              <div>
                <p className="text-lg font-semibold">
                  From {formatRWF(Math.min(...event.ticketTypes.map((t) => t.price)))}
                </p>
              </div>
              <Button disabled size="lg">
                Select Tickets Above
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
