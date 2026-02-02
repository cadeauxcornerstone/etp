"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/events/search-bar";
import { CategoryFilter } from "@/components/events/category-filter";
import { EventCard } from "@/components/events/event-card";
import { mockEvents } from "@/lib/mock-data";
import { Ticket, TrendingUp, Shield, Zap } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-secondary/50 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            <Ticket className="h-4 w-4" />
            <span>Rwanda&apos;s Trusted Event Platform</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Discover Amazing Events in{" "}
            <span className="text-accent">Kigali</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Find and book tickets for concerts, festivals, conferences, and more.
            Your next unforgettable experience is just a click away.
          </p>
          <div className="mt-8">
            <Suspense fallback={null}>
              <SearchBar className="mx-auto max-w-xl" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Pay with MTN MoMo, Airtel Money, or card",
    },
    {
      icon: Zap,
      title: "Instant Tickets",
      description: "Get your QR tickets immediately",
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "No hidden fees, transparent pricing",
    },
  ];

  return (
    <section className="border-b border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-xl bg-background/50 p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();

  const filteredEvents = useMemo(() => {
    let events = mockEvents.filter((e) => e.isPublished);

    if (category && category !== "all") {
      events = events.filter((e) => e.category === category);
    }

    if (query) {
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.shortDescription.toLowerCase().includes(query) ||
          e.venue.name.toLowerCase().includes(query) ||
          e.organizerName.toLowerCase().includes(query)
      );
    }

    return events;
  }, [category, query]);

  const featuredEvents = filteredEvents.filter((e) => e.isFeatured);
  const upcomingEvents = filteredEvents.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>

        {/* Featured Events */}
        {featuredEvents.length > 0 && !query && (
          <div className="mt-10">
            <h2 className="mb-6 text-2xl font-bold">Featured Events</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {query
                ? `Search Results`
                : category && category !== "all"
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} Events`
                : "Upcoming Events"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length} event{filteredEvents.length !== 1 && "s"}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <Ticket className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No events found</h3>
              <p className="mt-2 text-muted-foreground">
                {query
                  ? `No events match "${query}". Try a different search.`
                  : "Check back soon for upcoming events in this category."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Suspense fallback={<div className="py-12" />}>
        <EventsSection />
      </Suspense>
    </>
  );
}
