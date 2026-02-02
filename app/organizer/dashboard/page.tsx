"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Ticket,
  Wallet,
  ArrowRight,
  Plus,
} from "lucide-react";
import { mockEvents, mockAnalytics, formatRWF, formatDate } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function OrganizerDashboardPage() {
  const { user } = useAuth();

  // Filter events for current organizer
  const organizerEvents = mockEvents.filter((e) => e.organizerId === "org-1");
  const upcomingEvents = organizerEvents.filter(
    (e) => e.date > new Date() && e.isPublished
  );

  const stats = [
    {
      label: "Total Revenue",
      value: formatRWF(mockAnalytics.totalRevenue),
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
    },
    {
      label: "Tickets Sold",
      value: mockAnalytics.totalTicketsSold.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: Ticket,
    },
    {
      label: "Total Attendees",
      value: mockAnalytics.totalAttendees.toLocaleString(),
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Active Events",
      value: upcomingEvents.length.toString(),
      change: "-2",
      trend: "down",
      icon: Calendar,
    },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName || "Organizer"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your events.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <stat.icon className="h-5 w-5 text-accent" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-accent" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Events */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/organizer/events" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event) => {
                    const totalSold = event.ticketTypes.reduce(
                      (sum, t) => sum + t.sold,
                      0
                    );
                    const totalCapacity = event.ticketTypes.reduce(
                      (sum, t) => sum + t.quantity,
                      0
                    );
                    const soldPercentage = Math.round(
                      (totalSold / totalCapacity) * 100
                    );

                    return (
                      <Link
                        key={event.id}
                        href={`/organizer/events/${event.id}`}
                        className="flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={event.imageUrl || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(event.date)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full"
                                style={{ width: `${soldPercentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {soldPercentage}% sold
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">
                            {totalSold.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">tickets</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-semibold">No upcoming events</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create your first event to get started
                  </p>
                  <Button asChild className="mt-4 gap-2">
                    <Link href="/organizer/events/new">
                      <Plus className="h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="secondary" className="w-full justify-start gap-2">
                <Link href="/organizer/events/new">
                  <Plus className="h-4 w-4" />
                  Create New Event
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start gap-2">
                <Link href="/organizer/analytics">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start gap-2">
                <Link href="/organizer/payouts">
                  <Wallet className="h-4 w-4" />
                  Request Payout
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="text-xl font-bold text-accent">
                    {formatRWF(8500000)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Pending</span>
                  <span>{formatRWF(3500000)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Processing</span>
                  <Badge variant="secondary">In Review</Badge>
                </div>
                <Button asChild className="w-full mt-2">
                  <Link href="/organizer/payouts">Request Payout</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
