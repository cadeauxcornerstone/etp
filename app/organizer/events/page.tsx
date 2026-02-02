"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Users,
  Ticket,
  MapPin,
} from "lucide-react";
import { mockEvents, formatDate, formatRWF } from "@/lib/mock-data";

export default function OrganizerEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const organizerEvents = mockEvents.filter((e) => e.organizerId === "org-1");

  const filteredEvents = organizerEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "published") return matchesSearch && event.isPublished;
    if (activeTab === "draft") return matchesSearch && !event.isPublished;
    if (activeTab === "past")
      return matchesSearch && event.date < new Date();

    return matchesSearch;
  });

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and monitor your events
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/organizer/events/new">
            <Plus className="h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const totalSold = event.ticketTypes.reduce((sum, t) => sum + t.sold, 0);
            const totalCapacity = event.ticketTypes.reduce(
              (sum, t) => sum + t.quantity,
              0
            );
            const totalRevenue = event.ticketTypes.reduce(
              (sum, t) => sum + t.sold * t.price,
              0
            );
            const soldPercentage = Math.round((totalSold / totalCapacity) * 100);
            const isPast = event.date < new Date();

            return (
              <Card key={event.id} className={isPast ? "opacity-75" : ""}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative h-48 md:h-auto md:w-48 shrink-0">
                      <Image
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={event.isPublished ? "default" : "secondary"}
                              className={
                                event.isPublished
                                  ? "bg-accent/20 text-accent"
                                  : ""
                              }
                            >
                              {event.isPublished ? "Published" : "Draft"}
                            </Badge>
                            {isPast && (
                              <Badge variant="secondary">Past</Badge>
                            )}
                            {event.isFeatured && (
                              <Badge variant="outline">Featured</Badge>
                            )}
                          </div>

                          <Link
                            href={`/organizer/events/${event.id}`}
                            className="hover:text-accent transition-colors"
                          >
                            <h3 className="text-xl font-semibold truncate">
                              {event.title}
                            </h3>
                          </Link>

                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.venue.name}
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/events/${event.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Public Page
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/organizer/events/${event.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Event
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Stats */}
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-secondary/50 p-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Ticket className="h-4 w-4" />
                            <span className="text-xs">Tickets Sold</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold">
                            {totalSold.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{totalCapacity.toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="text-xs">Sold %</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold">
                            {soldPercentage}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-xs">Revenue</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-accent">
                            {formatRWF(totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No events found</h3>
            <p className="mt-2 text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Create your first event to get started"}
            </p>
            {!searchQuery && (
              <Button asChild className="mt-6 gap-2">
                <Link href="/organizer/events/new">
                  <Plus className="h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
