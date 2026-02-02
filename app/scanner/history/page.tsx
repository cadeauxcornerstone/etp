"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanRecord {
  id: string;
  ticketCode: string;
  holderName: string;
  tierName: string;
  status: "success" | "warning" | "error";
  message: string;
  timestamp: Date;
}

// Mock scan history
const mockScanHistory: ScanRecord[] = [
  {
    id: "1",
    ticketCode: "TKT-A1B2C3",
    holderName: "John Doe",
    tierName: "VIP",
    status: "success",
    message: "Valid ticket - Entry granted",
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "2",
    ticketCode: "TKT-D4E5F6",
    holderName: "Jane Smith",
    tierName: "Regular",
    status: "warning",
    message: "Already checked in",
    timestamp: new Date(Date.now() - 12 * 60000),
  },
  {
    id: "3",
    ticketCode: "TKT-G7H8I9",
    holderName: "Mike Johnson",
    tierName: "Early Bird",
    status: "success",
    message: "Valid ticket - Entry granted",
    timestamp: new Date(Date.now() - 18 * 60000),
  },
  {
    id: "4",
    ticketCode: "TKT-INVALID",
    holderName: "Unknown",
    tierName: "-",
    status: "error",
    message: "Invalid ticket code",
    timestamp: new Date(Date.now() - 25 * 60000),
  },
  {
    id: "5",
    ticketCode: "TKT-J1K2L3",
    holderName: "Sarah Williams",
    tierName: "VIP",
    status: "success",
    message: "Valid ticket - Entry granted",
    timestamp: new Date(Date.now() - 32 * 60000),
  },
  {
    id: "6",
    ticketCode: "TKT-M4N5O6",
    holderName: "David Brown",
    tierName: "Regular",
    status: "success",
    message: "Valid ticket - Entry granted",
    timestamp: new Date(Date.now() - 45 * 60000),
  },
  {
    id: "7",
    ticketCode: "TKT-P7Q8R9",
    holderName: "Emily Davis",
    tierName: "Regular",
    status: "warning",
    message: "Already checked in",
    timestamp: new Date(Date.now() - 58 * 60000),
  },
  {
    id: "8",
    ticketCode: "TKT-S1T2U3",
    holderName: "Chris Wilson",
    tierName: "Early Bird",
    status: "success",
    message: "Valid ticket - Entry granted",
    timestamp: new Date(Date.now() - 72 * 60000),
  },
];

export default function ScannerHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredHistory = mockScanHistory.filter((record) => {
    const matchesSearch =
      record.holderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.ticketCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            Valid
          </Badge>
        );
      case "warning":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          >
            Duplicate
          </Badge>
        );
      case "error":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 border-red-500/20"
          >
            Invalid
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Stats
  const successCount = mockScanHistory.filter(
    (r) => r.status === "success"
  ).length;
  const warningCount = mockScanHistory.filter(
    (r) => r.status === "warning"
  ).length;
  const errorCount = mockScanHistory.filter((r) => r.status === "error").length;

  return (
    <div className="flex flex-col h-full">
      {/* Stats */}
      <div className="px-4 py-3 grid grid-cols-3 gap-3 bg-secondary/30 border-b border-border/50">
        <div className="text-center">
          <p className="text-lg font-semibold text-green-500">{successCount}</p>
          <p className="text-xs text-muted-foreground">Valid</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-yellow-500">{warningCount}</p>
          <p className="text-xs text-muted-foreground">Duplicate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">{errorCount}</p>
          <p className="text-xs text-muted-foreground">Invalid</p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 space-y-3 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-secondary/50">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scans</SelectItem>
            <SelectItem value="success">Valid Only</SelectItem>
            <SelectItem value="warning">Duplicates</SelectItem>
            <SelectItem value="error">Invalid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-auto px-4 py-3">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No scan history found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((record) => (
              <Card
                key={record.id}
                className={cn(
                  "border-border/50 bg-card/50",
                  record.status === "success" && "border-l-2 border-l-green-500",
                  record.status === "warning" && "border-l-2 border-l-yellow-500",
                  record.status === "error" && "border-l-2 border-l-red-500"
                )}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {getStatusIcon(record.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">
                          {record.holderName}
                        </p>
                        {getStatusBadge(record.status)}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono mt-0.5">
                        {record.ticketCode}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {record.tierName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(record.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
