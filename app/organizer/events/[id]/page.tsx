"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Copy,
  MoreHorizontal,
  Search,
  Download,
  Users,
  Ticket,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockEvents, mockOrders, mockTickets } from "@/lib/mock-data";

export default function OrganizerEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = mockEvents.find((e) => e.id === id);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-semibold mb-2">Event not found</h2>
        <p className="text-muted-foreground mb-4">
          The event you're looking for doesn't exist.
        </p>
        <Link href="/organizer/events">
          <Button variant="outline">Back to Events</Button>
        </Link>
      </div>
    );
  }

  // Get orders and tickets for this event
  const eventOrders = mockOrders.filter((o) => o.eventId === id);
  const eventTickets = mockTickets.filter((t) => t.eventId === id);
  const checkedInCount = eventTickets.filter(
    (t) => t.status === "used"
  ).length;

  const totalRevenue = eventOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const soldTickets = eventTickets.length;
  const totalCapacity = event.ticketTiers.reduce((acc, t) => acc + t.quantity, 0);

  const copyEventLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/events/${id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredOrders = eventOrders.filter(
    (order) =>
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link href="/organizer/events">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold tracking-tight truncate">
                {event.title}
              </h1>
              <Badge
                variant="outline"
                className={
                  event.status === "published"
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : event.status === "draft"
                      ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      : "bg-muted text-muted-foreground"
                }
              >
                {event.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Created on {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/organizer/events/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Event
            </Button>
          </Link>
          <Link href={`/events/${id}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Public Page
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={copyEventLink}>
            <Copy className="mr-2 h-4 w-4" />
            {copiedLink ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Revenue (RWF)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Ticket className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {soldTickets}/{totalCapacity}
                </p>
                <p className="text-xs text-muted-foreground">Tickets Sold</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{checkedInCount}</p>
                <p className="text-xs text-muted-foreground">Checked In</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {totalCapacity > 0
                    ? Math.round((soldTickets / totalCapacity) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-muted-foreground">Sell-through Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Info & Tabs */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Event Details Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur lg:col-span-1">
          <CardContent className="pt-6 space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={event.coverImage || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{event.venue}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="text-sm font-medium mb-3">Ticket Tiers</h4>
              <div className="space-y-2">
                {event.ticketTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{tier.name}</span>
                    <span className="font-medium">
                      {tier.price === 0
                        ? "Free"
                        : `${tier.price.toLocaleString()} RWF`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders & Attendees Tabs */}
        <Card className="border-border/50 bg-card/50 backdrop-blur lg:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="w-full justify-start bg-secondary/50">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="orders" className="mt-0 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-secondary/50"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="rounded-lg border border-border/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableHead className="whitespace-nowrap">Order ID</TableHead>
                          <TableHead className="whitespace-nowrap">Customer</TableHead>
                          <TableHead className="whitespace-nowrap">Tickets</TableHead>
                          <TableHead className="whitespace-nowrap">Amount</TableHead>
                          <TableHead className="whitespace-nowrap">Status</TableHead>
                          <TableHead className="whitespace-nowrap">Date</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className="text-center py-8 text-muted-foreground"
                            >
                              No orders found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-mono text-xs whitespace-nowrap">
                                {order.id.slice(0, 8)}...
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <div>
                                  <p className="font-medium text-sm">
                                    {order.buyerName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {order.buyerEmail}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">{order.quantity}</TableCell>
                              <TableCell className="whitespace-nowrap">
                                {order.totalAmount.toLocaleString()} RWF
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(order.status)}
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Mail className="mr-2 h-4 w-4" />
                                      Resend Tickets
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Cancel Order
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attendees" className="mt-0 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search attendees..."
                      className="pl-9 bg-secondary/50"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export List
                  </Button>
                </div>

                <div className="rounded-lg border border-border/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                          <TableHead className="whitespace-nowrap">Ticket ID</TableHead>
                          <TableHead className="whitespace-nowrap">Attendee</TableHead>
                          <TableHead className="whitespace-nowrap">Tier</TableHead>
                          <TableHead className="whitespace-nowrap">Status</TableHead>
                          <TableHead className="whitespace-nowrap">Checked In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventTickets.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center py-8 text-muted-foreground"
                            >
                              No attendees yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          eventTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="font-mono text-xs whitespace-nowrap">
                                {ticket.id.slice(0, 8)}...
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <div>
                                  <p className="font-medium text-sm">
                                    {ticket.holderName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {ticket.holderEmail}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">{ticket.tierName}</TableCell>
                              <TableCell className="whitespace-nowrap">
                                <Badge
                                  variant="outline"
                                  className={
                                    ticket.status === "valid"
                                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                                      : ticket.status === "used"
                                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        : "bg-red-500/10 text-red-500 border-red-500/20"
                                  }
                                >
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                {ticket.status === "used" ? (
                                  <div className="flex items-center gap-1 text-green-500">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="text-xs">Yes</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    No
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
