"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  Download,
  Share2,
  Info,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { mockTickets, formatDate, formatTime, formatRWF } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { QRCodeSVG } from "qrcode.react";

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [showFullQR, setShowFullQR] = useState(false);

  const ticket = mockTickets.find((t) => t.id === id);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Sign in to view this ticket</h1>
        <Button asChild className="mt-6">
          <Link href={`/auth/signin?redirect=/my-tickets/${id}`}>Sign In</Link>
        </Button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Ticket not found</h1>
        <p className="mt-2 text-muted-foreground">
          The ticket you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/my-tickets">View All Tickets</Link>
        </Button>
      </div>
    );
  }

  const statusConfig = {
    valid: {
      color: "bg-accent/20 text-accent",
      icon: CheckCircle2,
      label: "Valid",
      description: "This ticket is ready to be scanned at the event.",
    },
    used: {
      color: "bg-muted text-muted-foreground",
      icon: CheckCircle2,
      label: "Used",
      description: "This ticket has already been scanned.",
    },
    expired: {
      color: "bg-destructive/20 text-destructive",
      icon: XCircle,
      label: "Expired",
      description: "This ticket has expired and can no longer be used.",
    },
    cancelled: {
      color: "bg-destructive/20 text-destructive",
      icon: AlertCircle,
      label: "Cancelled",
      description: "This ticket has been cancelled.",
    },
  };

  const status = statusConfig[ticket.status];
  const StatusIcon = status.icon;

  return (
    <>
      {/* Full Screen QR Modal */}
      {showFullQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
          onClick={() => setShowFullQR(false)}
        >
          <div className="text-center">
            <div className="bg-foreground p-6 rounded-2xl inline-block">
              <QRCodeSVG
                value={ticket.qrCode}
                size={280}
                level="H"
                includeMargin={false}
                className="rounded-lg"
              />
            </div>
            <p className="mt-4 text-lg font-mono font-bold">{ticket.qrCode}</p>
            <p className="mt-2 text-muted-foreground">Tap anywhere to close</p>
          </div>
        </div>
      )}

      <div className="min-h-screen pb-32 md:pb-12">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex-1">
                <h1 className="font-semibold">Ticket Details</h1>
              </div>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            {/* Ticket Card */}
            <Card className="overflow-hidden">
              {/* Event Image */}
              <div className="relative h-48">
                <Image
                  src={ticket.event.imageUrl || "/placeholder.svg"}
                  alt={ticket.event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className={`${status.color} gap-1`}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Event Info */}
                <div>
                  <p className="text-sm text-accent font-medium">
                    {ticket.ticketTypeName}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">{ticket.event.title}</h2>
                  <p className="mt-2 text-muted-foreground">
                    by {ticket.event.organizerName}
                  </p>
                </div>

                {/* Date, Time, Location */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{formatDate(ticket.event.date)}</p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {formatTime(ticket.event.date)}
                        {ticket.event.endDate && ` - ${formatTime(ticket.event.endDate)}`}
                      </p>
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{ticket.event.venue.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.event.venue.address}, {ticket.event.venue.city}
                      </p>
                    </div>
                    {ticket.event.venue.mapUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={ticket.event.venue.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* QR Code */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Show this QR code at the entrance
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowFullQR(true)}
                    className="inline-block rounded-2xl bg-foreground p-4 transition-transform hover:scale-105"
                  >
                    <QRCodeSVG
                      value={ticket.qrCode}
                      size={180}
                      level="H"
                      includeMargin={false}
                      className="rounded-lg"
                    />
                  </button>
                  <p className="mt-4 font-mono text-sm font-bold text-muted-foreground">
                    {ticket.qrCode}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Tap QR code to enlarge
                  </p>
                </div>

                <Separator />

                {/* Order Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Order Details</h3>
                  <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ticket Type</span>
                      <span>{ticket.ticketTypeName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price Paid</span>
                      <span>{formatRWF(ticket.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Purchase Date</span>
                      <span>{formatDate(ticket.purchaseDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ticket ID</span>
                      <span className="font-mono">{ticket.id}</span>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Ticket Status: {status.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {status.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Entry Instructions */}
                <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
                  <h4 className="font-semibold text-accent">Entry Instructions</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>- Arrive at least 30 minutes before the event starts</li>
                    <li>- Have your QR code ready for scanning</li>
                    <li>- Bring a valid ID for verification if required</li>
                    <li>- This ticket is non-transferable</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Desktop */}
            <div className="mt-6 hidden md:flex gap-4">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download Ticket
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/events/${ticket.eventId}`}>View Event Details</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-4 md:hidden">
          <div className="container mx-auto flex gap-3">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => setShowFullQR(true)} className="flex-1">
              Show QR Code
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
