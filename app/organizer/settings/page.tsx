"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CreditCard,
  Bell,
  Shield,
  Upload,
  Save,
  Phone,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";

export default function OrganizerSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your organizer profile and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary/50 w-full justify-start flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="profile" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Organization Profile</CardTitle>
              <CardDescription>
                This information will be displayed publicly on your events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-24 h-24 rounded-xl bg-secondary/50 border-2 border-dashed border-border/50 flex items-center justify-center shrink-0">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Organization Logo</Label>
                  <p className="text-sm text-muted-foreground">
                    Upload a logo that represents your organization. PNG, JPG up to 2MB.
                  </p>
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name *</Label>
                  <Input
                    id="orgName"
                    placeholder="Your organization name"
                    defaultValue="Kigali Events Ltd"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <Select defaultValue="company">
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Description</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell attendees about your organization..."
                  rows={4}
                  defaultValue="We are a leading event organizer in Kigali, specializing in music festivals, corporate events, and cultural experiences."
                  className="bg-secondary/50 resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Contact Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@example.com"
                    defaultValue="events@kigalievents.rw"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+250 7XX XXX XXX"
                    defaultValue="+250 788 123 456"
                    className="bg-secondary/50"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    defaultValue="https://kigalievents.rw"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="City, Country"
                    defaultValue="Kigali, Rwanda"
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Payment Settings</CardTitle>
              <CardDescription>
                Configure how you receive payments from ticket sales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-accent">Mobile Money Connected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your MTN Mobile Money account ending in ***456 is connected for payouts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payout Method</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Payout Provider</Label>
                    <Select defaultValue="mtn">
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="+250 7XX XXX XXX"
                      defaultValue="+250 788 123 456"
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payout Schedule</h4>
                <Select defaultValue="weekly">
                  <SelectTrigger className="bg-secondary/50 max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly (Every Monday)</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  You will receive payouts every Monday for sales from the previous week.
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium mb-3">Recent Payouts</h4>
                <div className="space-y-2">
                  {[
                    { date: "Jan 27, 2026", amount: 450000, status: "completed" },
                    { date: "Jan 20, 2026", amount: 680000, status: "completed" },
                    { date: "Jan 13, 2026", amount: 320000, status: "completed" },
                  ].map((payout, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                    >
                      <div>
                        <p className="text-sm font-medium">{payout.date}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {payout.status}
                        </p>
                      </div>
                      <p className="font-medium">
                        {payout.amount.toLocaleString()} RWF
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                {[
                  {
                    id: "new-order",
                    label: "New ticket purchase",
                    description: "Get notified when someone buys a ticket",
                    defaultChecked: true,
                  },
                  {
                    id: "daily-summary",
                    label: "Daily sales summary",
                    description: "Receive a daily report of your sales",
                    defaultChecked: true,
                  },
                  {
                    id: "event-reminder",
                    label: "Event reminders",
                    description: "Get reminded before your events start",
                    defaultChecked: true,
                  },
                  {
                    id: "payout",
                    label: "Payout notifications",
                    description: "Get notified when payouts are processed",
                    defaultChecked: true,
                  },
                  {
                    id: "marketing",
                    label: "Marketing tips",
                    description: "Receive tips on promoting your events",
                    defaultChecked: false,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="font-medium">SMS Notifications</h4>
                {[
                  {
                    id: "sms-order",
                    label: "High-value orders",
                    description: "SMS for orders above 100,000 RWF",
                    defaultChecked: true,
                  },
                  {
                    id: "sms-event",
                    label: "Event day alerts",
                    description: "SMS reminder on event day",
                    defaultChecked: true,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="bg-secondary/50"
                    />
                  </div>
                  <Button variant="outline" className="w-fit bg-transparent">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a code via SMS when signing in
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="font-medium">Team Members</h4>
                <p className="text-sm text-muted-foreground">
                  Invite team members to help manage your events
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter email address"
                    className="bg-secondary/50 flex-1"
                  />
                  <Button variant="outline">Invite Member</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Delete Organization</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your organization and all events
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Organization
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
