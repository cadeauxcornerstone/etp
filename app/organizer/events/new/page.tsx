"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Calendar,
  MapPin,
  Tag,
  Ticket,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  maxPerOrder: number;
}

const categories = [
  "Music",
  "Business",
  "Sports",
  "Arts & Culture",
  "Food & Drink",
  "Technology",
  "Health & Wellness",
  "Education",
];

const locations = [
  "Kigali",
  "Musanze",
  "Rubavu",
  "Huye",
  "Nyagatare",
  "Muhanga",
  "Rusizi",
  "Karongi",
];

export default function NewEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    {
      id: "1",
      name: "General Admission",
      price: 0,
      quantity: 100,
      description: "",
      maxPerOrder: 10,
    },
  ]);
  const [isFreeEvent, setIsFreeEvent] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    venue: "",
    address: "",
    city: "Kigali",
    coverImage: "",
  });

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      quantity: 50,
      description: "",
      maxPerOrder: 10,
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const removeTicketTier = (id: string) => {
    if (ticketTiers.length > 1) {
      setTicketTiers(ticketTiers.filter((tier) => tier.id !== id));
    }
  };

  const updateTicketTier = (
    id: string,
    field: keyof TicketTier,
    value: string | number
  ) => {
    setTicketTiers(
      ticketTiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/organizer/events");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/organizer/events">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create New Event
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details to create your event
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isSubmitting ? "Creating..." : "Publish Event"}
          </Button>
        </div>
      </div>

      <form className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-accent" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-secondary/50 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-accent" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="bg-secondary/50"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-accent" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue Name *</Label>
                <Input
                  id="venue"
                  placeholder="e.g., Kigali Convention Centre"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="Enter street address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                >
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Ticket className="h-5 w-5 text-accent" />
                  Ticket Tiers
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Label htmlFor="free-event" className="text-sm">
                    Free Event
                  </Label>
                  <Switch
                    id="free-event"
                    checked={isFreeEvent}
                    onCheckedChange={setIsFreeEvent}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticketTiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className="rounded-lg border border-border/50 bg-secondary/30 p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Tier {index + 1}
                    </span>
                    {ticketTiers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeTicketTier(tier.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tier Name *</Label>
                      <Input
                        placeholder="e.g., VIP, Regular"
                        value={tier.name}
                        onChange={(e) =>
                          updateTicketTier(tier.id, "name", e.target.value)
                        }
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (RWF) *</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={isFreeEvent ? 0 : tier.price}
                        onChange={(e) =>
                          updateTicketTier(
                            tier.id,
                            "price",
                            parseInt(e.target.value) || 0
                          )
                        }
                        disabled={isFreeEvent}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity Available *</Label>
                      <Input
                        type="number"
                        min="1"
                        placeholder="100"
                        value={tier.quantity}
                        onChange={(e) =>
                          updateTicketTier(
                            tier.id,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Per Order</Label>
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        placeholder="10"
                        value={tier.maxPerOrder}
                        onChange={(e) =>
                          updateTicketTier(
                            tier.id,
                            "maxPerOrder",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe what's included with this ticket..."
                      rows={2}
                      value={tier.description}
                      onChange={(e) =>
                        updateTicketTier(tier.id, "description", e.target.value)
                      }
                      className="bg-background/50 resize-none"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed bg-transparent"
                onClick={addTicketTier}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Ticket Tier
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="h-5 w-5 text-accent" />
                Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-lg border-2 border-dashed border-border/50 bg-secondary/30 flex items-center justify-center hover:border-accent/50 transition-colors cursor-pointer group">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Summary */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Event Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Capacity</span>
                <span className="font-medium">
                  {ticketTiers.reduce((acc, tier) => acc + tier.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ticket Tiers</span>
                <span className="font-medium">{ticketTiers.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price Range</span>
                <span className="font-medium">
                  {isFreeEvent
                    ? "Free"
                    : `${Math.min(...ticketTiers.map((t) => t.price)).toLocaleString()} - ${Math.max(...ticketTiers.map((t) => t.price)).toLocaleString()} RWF`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <h4 className="font-medium text-accent mb-2">Tips for Success</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Use a high-quality cover image
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Write a detailed description
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Set competitive ticket prices
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Promote on social media
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
