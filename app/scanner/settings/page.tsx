"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Volume2,
  Vibrate,
  Sun,
  Camera,
  Wifi,
  RefreshCw,
  Info,
} from "lucide-react";

export default function ScannerSettingsPage() {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    autoFocus: true,
    flashlight: false,
    offlineMode: false,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-4 py-6 space-y-6">
        {/* Scanner Settings */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5 text-accent" />
              Scanner Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="sound" className="font-medium">
                    Sound Effects
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Play sound on scan
                  </p>
                </div>
              </div>
              <Switch
                id="sound"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) =>
                  updateSetting("soundEnabled", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Vibrate className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="vibration" className="font-medium">
                    Vibration
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Vibrate on scan
                  </p>
                </div>
              </div>
              <Switch
                id="vibration"
                checked={settings.vibrationEnabled}
                onCheckedChange={(checked) =>
                  updateSetting("vibrationEnabled", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="autofocus" className="font-medium">
                    Auto Focus
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Continuous autofocus
                  </p>
                </div>
              </div>
              <Switch
                id="autofocus"
                checked={settings.autoFocus}
                onCheckedChange={(checked) =>
                  updateSetting("autoFocus", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="flash" className="font-medium">
                    Flashlight
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Use flash for low light
                  </p>
                </div>
              </div>
              <Switch
                id="flash"
                checked={settings.flashlight}
                onCheckedChange={(checked) =>
                  updateSetting("flashlight", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="h-5 w-5 text-accent" />
              Network
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="offline" className="font-medium">
                    Offline Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Scan without internet
                  </p>
                </div>
              </div>
              <Switch
                id="offline"
                checked={settings.offlineMode}
                onCheckedChange={(checked) =>
                  updateSetting("offlineMode", checked)
                }
              />
            </div>

            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Last synced
                </span>
                <span className="text-sm font-medium">2 minutes ago</span>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Sync Ticket Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Selection */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Camera Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="back">
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="back">Back Camera</SelectItem>
                <SelectItem value="front">Front Camera</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" />
              App Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Scanner ID</span>
              <span className="font-mono text-xs">SCN-001</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Device</span>
              <span className="font-medium">Web Browser</span>
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <div className="pb-4">
          <Button variant="outline" className="w-full bg-transparent">
            Need Help? Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
