"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Ticket,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 1200000 },
  { day: "Tue", revenue: 980000 },
  { day: "Wed", revenue: 1450000 },
  { day: "Thu", revenue: 1680000 },
  { day: "Fri", revenue: 2100000 },
  { day: "Sat", revenue: 2850000 },
  { day: "Sun", revenue: 2200000 },
];

const recentActivities = [
  {
    type: "event",
    message: "New event 'Tech Summit 2026' created",
    time: "5 min ago",
    user: "Kigali Events Ltd",
  },
  {
    type: "user",
    message: "New organizer registered",
    time: "12 min ago",
    user: "Rwanda Events Co",
  },
  {
    type: "ticket",
    message: "50 tickets sold for Jazz Festival",
    time: "25 min ago",
    user: "System",
  },
  {
    type: "payout",
    message: "Payout of 450,000 RWF processed",
    time: "1 hour ago",
    user: "Music Africa",
  },
  {
    type: "event",
    message: "Event 'Food & Wine Expo' published",
    time: "2 hours ago",
    user: "Taste Rwanda",
  },
];

const pendingApprovals = [
  {
    id: "1",
    name: "Kigali Comedy Night",
    organizer: "Laugh Rwanda",
    date: "Feb 15, 2026",
    type: "event",
  },
  {
    id: "2",
    name: "Rwanda Arts Hub",
    email: "info@artsrw.com",
    date: "Jan 30, 2026",
    type: "organizer",
  },
  {
    id: "3",
    name: "Sports Gala 2026",
    organizer: "Sports Rwanda",
    date: "Mar 5, 2026",
    type: "event",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">45.2M RWF</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+18.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tickets Sold</p>
                <p className="text-2xl font-semibold mt-1">12,847</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12.5%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Ticket className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-semibold mt-1">8,432</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+8.7%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Events</p>
                <p className="text-2xl font-semibold mt-1">156</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-500">-3.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-orange-500/10">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Activity Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="border-border/50 bg-card/50 backdrop-blur lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Weekly Revenue</CardTitle>
            <Link
              href="/admin/analytics"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View Details
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [
                      `${value.toLocaleString()} RWF`,
                      "Revenue",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {pendingApprovals.length}
            </Badge>
          </div>
          <Link
            href="/admin/events?status=pending"
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      item.type === "event"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    }
                  >
                    {item.type}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "event" ? item.organizer : item.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-muted-foreground">
                    {item.date}
                  </span>
                  <Link href={`/admin/${item.type === "event" ? "events" : "organizers"}/${item.id}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent/10"
                    >
                      Review
                    </Badge>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
