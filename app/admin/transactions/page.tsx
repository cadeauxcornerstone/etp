"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  RefreshCw,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock transactions data
const mockTransactions = [
  {
    id: "TXN-001",
    orderId: "ORD-001",
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    eventTitle: "Kigali Jazz Festival 2026",
    amount: 75000,
    platformFee: 3750,
    paymentMethod: "MTN MoMo",
    status: "completed",
    createdAt: "2026-01-28T14:30:00",
  },
  {
    id: "TXN-002",
    orderId: "ORD-002",
    buyerName: "Jane Smith",
    buyerEmail: "jane@example.com",
    eventTitle: "Tech Summit 2026",
    amount: 50000,
    platformFee: 2500,
    paymentMethod: "Airtel Money",
    status: "completed",
    createdAt: "2026-01-28T12:15:00",
  },
  {
    id: "TXN-003",
    orderId: "ORD-003",
    buyerName: "Mike Johnson",
    buyerEmail: "mike@example.com",
    eventTitle: "Food & Wine Expo",
    amount: 25000,
    platformFee: 1250,
    paymentMethod: "MTN MoMo",
    status: "pending",
    createdAt: "2026-01-28T11:45:00",
  },
  {
    id: "TXN-004",
    orderId: "ORD-004",
    buyerName: "Sarah Williams",
    buyerEmail: "sarah@example.com",
    eventTitle: "Kigali Jazz Festival 2026",
    amount: 150000,
    platformFee: 7500,
    paymentMethod: "Visa",
    status: "completed",
    createdAt: "2026-01-27T18:20:00",
  },
  {
    id: "TXN-005",
    orderId: "ORD-005",
    buyerName: "David Brown",
    buyerEmail: "david@example.com",
    eventTitle: "Art Exhibition",
    amount: 10000,
    platformFee: 500,
    paymentMethod: "MTN MoMo",
    status: "failed",
    createdAt: "2026-01-27T16:30:00",
  },
  {
    id: "TXN-006",
    orderId: "ORD-006",
    buyerName: "Emily Davis",
    buyerEmail: "emily@example.com",
    eventTitle: "Sports Gala 2026",
    amount: 35000,
    platformFee: 1750,
    paymentMethod: "Airtel Money",
    status: "refunded",
    createdAt: "2026-01-27T14:10:00",
  },
];

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || txn.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" ||
      txn.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = mockTransactions
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalFees = mockTransactions
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + t.platformFee, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          >
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 border-red-500/20"
          >
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
          >
            Refunded
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Monitor all payment transactions
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-semibold mt-1">
                  {totalRevenue.toLocaleString()} RWF
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+15.3%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Fees</p>
                <p className="text-2xl font-semibold mt-1">
                  {totalFees.toLocaleString()} RWF
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12.8%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-semibold mt-1">94.2%</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-semibold mt-1">
              {mockTransactions.filter((t) => t.status === "pending").length}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-500">-5 from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px] bg-secondary/50">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-full sm:w-[150px] bg-secondary/50">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="mtn">MTN MoMo</SelectItem>
            <SelectItem value="airtel">Airtel Money</SelectItem>
            <SelectItem value="visa">Visa/Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                <TableHead className="whitespace-nowrap">Customer</TableHead>
                <TableHead className="whitespace-nowrap">Event</TableHead>
                <TableHead className="whitespace-nowrap">Amount</TableHead>
                <TableHead className="whitespace-nowrap">Fee</TableHead>
                <TableHead className="whitespace-nowrap">Method</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Date</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {txn.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div>
                        <p className="font-medium text-sm">{txn.buyerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {txn.buyerEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-sm truncate max-w-[150px]">
                        {txn.eventTitle}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {txn.amount.toLocaleString()} RWF
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {txn.platformFee.toLocaleString()} RWF
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {txn.paymentMethod}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getStatusBadge(txn.status)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(txn.createdAt).toLocaleDateString()}
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {txn.status === "pending" && (
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
                          {txn.status === "completed" && (
                            <DropdownMenuItem className="text-destructive">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
