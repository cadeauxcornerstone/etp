"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  QrCode,
  ChevronRight,
  Search,
} from "lucide-react";
import { mockTickets, formatDate, formatTime, formatRWF } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

function TicketCard({
  ticket,
  isPast = false,
}: {
  ticket: (typeof mockTickets)[0];
  isPast?: boolean;
}) {
  const statusColors = {
    valid: "bg-accent/20 text-accent",
    used: "bg-muted text-muted-foreground",
    expired: "bg-destructive/20 text-destructive",
    cancelled: "bg-destructive/20 text-destructive",
  };

  return (
    <Link href={`/my-tickets/${ticket.id}`}>
      <Card className={`group overflow-hidden transition-all hover:border-accent/50 ${isPast ? "opacity-75" : ""}`}>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Event Image */}
            <div className="relative h-40 sm:h-auto sm:w-40 shrink-0">
              <Image
                src={ticket.event.imageUrl || "/placeholder.svg"}
                alt={ticket.event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden sm:block" />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={statusColors[ticket.status]}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {ticket.ticketTypeName}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors truncate">
                    {ticket.event.title}
                  </h3>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>{formatDate(ticket.event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{formatTime(ticket.event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{ticket.event.venue.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <QrCode className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function MyTicketsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  const now = new Date();
  const upcomingTickets = mockTickets.filter(
    (t) => t.event.date > now && t.status !== "cancelled"
  );
  const pastTickets = mockTickets.filter(
    (t) => t.event.date <= now || t.status === "cancelled" || t.status === "used"
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Ticket className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Sign in to view your tickets</h1>
          <p className="mt-2 text-muted-foreground">
            Access your tickets, view QR codes, and get event details.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href="/auth/signin?redirect=/my-tickets">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <p className="mt-2 text-muted-foreground">
          Access and manage all your event tickets
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="gap-2">
            <Ticket className="h-4 w-4" />
            Upcoming ({upcomingTickets.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <Clock className="h-4 w-4" />
            Past ({pastTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTickets.length > 0 ? (
            upcomingTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No upcoming tickets</h3>
                <p className="mt-2 text-muted-foreground">
                  Browse events and get your tickets today!
                </p>
                <Button asChild className="mt-6">
                  <Link href="/">Explore Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTickets.length > 0 ? (
            pastTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} isPast />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No past tickets</h3>
                <p className="mt-2 text-muted-foreground">
                  Your attended events will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
