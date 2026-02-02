"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/lib/types";
import { formatDate, formatRWF, getCategoryLabel, getCategoryColor } from "@/lib/mock-data";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));
  const totalSold = event.ticketTypes.reduce((sum, t) => sum + t.sold, 0);
  const totalCapacity = event.ticketTypes.reduce((sum, t) => sum + t.quantity, 0);
  const soldOutPercentage = (totalSold / totalCapacity) * 100;
  const isAlmostSoldOut = soldOutPercentage > 80;

  return (
    <Link href={`/events/${event.id}`}>
      <Card
        className={`group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 ${
          featured ? "md:flex md:flex-row" : ""
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? "md:w-2/5 md:min-h-[280px]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              className={`${getCategoryColor(event.category)} border-0`}
            >
              {getCategoryLabel(event.category)}
            </Badge>
          </div>

          {/* Almost Sold Out */}
          {isAlmostSoldOut && (
            <div className="absolute right-3 top-3">
              <Badge variant="destructive" className="bg-destructive/90">
                Almost Sold Out
              </Badge>
            </div>
          )}

          {/* Date Overlay on Mobile */}
          <div className="absolute bottom-3 left-3 md:hidden">
            <div className="rounded-lg bg-background/90 backdrop-blur-sm px-3 py-2">
              <p className="text-xs font-medium text-accent">
                {formatDate(event.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent
          className={`flex flex-col gap-3 p-4 ${
            featured ? "md:flex-1 md:p-6" : ""
          }`}
        >
          {/* Date - Desktop */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-accent" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Title */}
          <h3
            className={`font-semibold leading-tight text-balance group-hover:text-accent transition-colors ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {event.title}
          </h3>

          {/* Description - Featured only */}
          {featured && (
            <p className="hidden md:block text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {event.shortDescription}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{event.venue.name}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>{totalSold.toLocaleString()} attending</span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-semibold text-accent">{formatRWF(lowestPrice)}</p>
            </div>
            <div className="rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              Get Tickets
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
