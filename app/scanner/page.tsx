"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Camera,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Keyboard,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockTickets, mockEvents } from "@/lib/mock-data";

type ScanResult = {
  status: "success" | "error" | "warning";
  title: string;
  message: string;
  ticketInfo?: {
    holderName: string;
    tierName: string;
    eventTitle: string;
  };
};

export default function ScannerPage() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera");
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scansToday, setScansToday] = useState(47);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Simulated camera activation
  useEffect(() => {
    if (scanMode === "camera" && !scanResult) {
      setCameraActive(true);
    } else {
      setCameraActive(false);
    }
  }, [scanMode, scanResult]);

  const simulateScan = (code?: string) => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate scanning delay
    setTimeout(() => {
      // Find ticket by QR code or use a random ticket for demo
      const ticketCode = code || `TKT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      const ticket = mockTickets.find(
        (t) => t.qrCode === ticketCode || t.id === ticketCode
      );

      if (ticket) {
        const event = mockEvents.find((e) => e.id === ticket.eventId);

        if (ticket.status === "used") {
          setScanResult({
            status: "warning",
            title: "Already Checked In",
            message: `This ticket was already scanned at ${new Date().toLocaleTimeString()}`,
            ticketInfo: {
              holderName: ticket.holderName,
              tierName: ticket.tierName,
              eventTitle: event?.title || "Unknown Event",
            },
          });
        } else if (ticket.status === "cancelled") {
          setScanResult({
            status: "error",
            title: "Invalid Ticket",
            message: "This ticket has been cancelled and is no longer valid.",
            ticketInfo: {
              holderName: ticket.holderName,
              tierName: ticket.tierName,
              eventTitle: event?.title || "Unknown Event",
            },
          });
        } else {
          // Valid ticket - mark as checked in
          setScanResult({
            status: "success",
            title: "Valid Ticket",
            message: "Attendee can enter the event.",
            ticketInfo: {
              holderName: ticket.holderName,
              tierName: ticket.tierName,
              eventTitle: event?.title || "Unknown Event",
            },
          });
          setScansToday((prev) => prev + 1);
        }
      } else {
        // Demo mode - randomly generate a result
        const random = Math.random();
        if (random > 0.3) {
          setScanResult({
            status: "success",
            title: "Valid Ticket",
            message: "Attendee can enter the event.",
            ticketInfo: {
              holderName: "John Doe",
              tierName: "VIP",
              eventTitle: "Kigali Jazz Festival 2026",
            },
          });
          setScansToday((prev) => prev + 1);
        } else if (random > 0.15) {
          setScanResult({
            status: "warning",
            title: "Already Checked In",
            message: "This ticket was already scanned at 2:45 PM",
            ticketInfo: {
              holderName: "Jane Smith",
              tierName: "Regular",
              eventTitle: "Kigali Jazz Festival 2026",
            },
          });
        } else {
          setScanResult({
            status: "error",
            title: "Invalid Ticket",
            message: "This ticket code was not found in the system.",
          });
        }
      }

      setIsScanning(false);
      setManualCode("");
    }, 800);
  };

  const resetScanner = () => {
    setScanResult(null);
    setManualCode("");
  };

  const getResultIcon = () => {
    switch (scanResult?.status) {
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-16 w-16 text-yellow-500" />;
      case "error":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return null;
    }
  };

  const getResultBgColor = () => {
    switch (scanResult?.status) {
      case "success":
        return "bg-green-500/10 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "error":
        return "bg-red-500/10 border-red-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Stats Bar */}
      <div className="px-4 py-3 bg-secondary/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Scans Today</p>
            <p className="text-xl font-semibold">{scansToday}</p>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Active
          </Badge>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-4 py-3 flex gap-2">
        <Button
          variant={scanMode === "camera" ? "default" : "outline"}
          className={cn(
            "flex-1 gap-2",
            scanMode === "camera" && "bg-accent text-accent-foreground hover:bg-accent/90"
          )}
          onClick={() => {
            setScanMode("camera");
            resetScanner();
          }}
        >
          <Camera className="h-4 w-4" />
          Camera
        </Button>
        <Button
          variant={scanMode === "manual" ? "default" : "outline"}
          className={cn(
            "flex-1 gap-2",
            scanMode === "manual" && "bg-accent text-accent-foreground hover:bg-accent/90"
          )}
          onClick={() => {
            setScanMode("manual");
            resetScanner();
          }}
        >
          <Keyboard className="h-4 w-4" />
          Manual
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        {scanResult ? (
          /* Result Display */
          <Card className={cn("flex-1 border", getResultBgColor())}>
            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
              {getResultIcon()}
              <h2 className="text-xl font-semibold mt-4">{scanResult.title}</h2>
              <p className="text-muted-foreground mt-2">{scanResult.message}</p>

              {scanResult.ticketInfo && (
                <div className="mt-6 w-full max-w-xs space-y-2 p-4 rounded-lg bg-background/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">
                      {scanResult.ticketInfo.holderName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ticket</span>
                    <span className="font-medium">
                      {scanResult.ticketInfo.tierName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-medium truncate max-w-[150px]">
                      {scanResult.ticketInfo.eventTitle}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={resetScanner}
                className="mt-6 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <RotateCcw className="h-4 w-4" />
                Scan Next Ticket
              </Button>
            </CardContent>
          </Card>
        ) : scanMode === "camera" ? (
          /* Camera Scanner */
          <Card className="flex-1 border-border/50 bg-card/50 overflow-hidden">
            <CardContent className="relative h-full p-0">
              {/* Camera Viewfinder */}
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                {cameraActive ? (
                  <div className="relative w-full h-full">
                    {/* Simulated camera view */}
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary/40" />

                    {/* Scan frame */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent" />

                        {/* Scanning line animation */}
                        <div className="absolute inset-x-4 top-1/2 h-0.5 bg-accent/50 animate-pulse" />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-8 inset-x-0 text-center">
                      <p className="text-sm text-muted-foreground">
                        Position the QR code within the frame
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">
                      Camera initializing...
                    </p>
                  </div>
                )}
              </div>

              {/* Demo Scan Button */}
              <div className="absolute bottom-4 inset-x-4">
                <Button
                  onClick={() => simulateScan()}
                  disabled={isScanning}
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <QrCode className="h-4 w-4" />
                  {isScanning ? "Scanning..." : "Simulate Scan (Demo)"}
                </Button>
              </div>

              {/* Hidden video element for actual camera */}
              <video
                ref={videoRef}
                className="hidden"
                autoPlay
                playsInline
                muted
              />
            </CardContent>
          </Card>
        ) : (
          /* Manual Entry */
          <Card className="flex-1 border-border/50 bg-card/50">
            <CardContent className="flex flex-col h-full p-6">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6">
                  <Keyboard className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Manual Entry</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Enter the ticket code printed on the ticket or shown on the attendee's phone
                </p>

                <div className="w-full max-w-sm space-y-4">
                  <Input
                    placeholder="Enter ticket code (e.g., TKT-ABC123)"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                    className="bg-secondary/50 text-center font-mono text-lg tracking-wider h-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && manualCode.trim()) {
                        simulateScan(manualCode);
                      }
                    }}
                  />
                  <Button
                    onClick={() => simulateScan(manualCode)}
                    disabled={!manualCode.trim() || isScanning}
                    className="w-full h-12 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    {isScanning ? "Verifying..." : "Verify Ticket"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
