"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { mockPayouts, formatRWF, formatDate } from "@/lib/mock-data";

export default function PayoutsPage() {
  const [isRequesting, setIsRequesting] = useState(false);

  // Calculate mock stats
  const availableBalance = 8500000;
  const pendingAmount = mockPayouts
    .filter((p) => p.status === "processing" || p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalWithdrawn = mockPayouts
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleRequestPayout = async () => {
    setIsRequesting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRequesting(false);
    alert("Payout request submitted successfully!");
  };

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
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
          >
            Processing
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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payouts</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your earnings and withdrawals
          </p>
        </div>
        <Button
          onClick={handleRequestPayout}
          disabled={isRequesting}
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isRequesting ? (
            "Processing..."
          ) : (
            <>
              <Wallet className="h-4 w-4" />
              Request Payout
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatRWF(availableBalance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to withdraw
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRWF(pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Processing or pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawn
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRWF(totalWithdrawn)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime earnings paid out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payout History</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {mockPayouts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Completed On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-mono text-xs">
                      {payout.id.toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatRWF(payout.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payout.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(payout.requestedAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payout.completedAt
                        ? formatDate(payout.completedAt)
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
              <p>No payout history found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}