import { useState } from "react";
import { Settings, Key, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const APISettings = () => {
  const [tmdbKey, setTmdbKey] = useState("036c205f43b82d159d2f14d54e074b23");
  const [geminiKey, setGeminiKey] = useState("AIzaSyCuEpBRbqp64DWdy1QaSUxGPichrgny_uk");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // Store in localStorage for persistence (optional)
    localStorage.setItem('tmdb_api_key', tmdbKey);
    localStorage.setItem('gemini_api_key', geminiKey);
    setIsOpen(false);
  };

  const testAPIConnection = async (service: 'tmdb' | 'gemini') => {
    // Simple connection test
    try {
      if (service === 'tmdb') {
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`);
        return response.ok;
      } else {
        // For Gemini, we can't easily test without making a request, so we just validate the key format
        return geminiKey.startsWith('AIza') && geminiKey.length > 20;
      }
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Configuration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                TMDB API Key
                <Badge variant="outline" className="text-xs">
                  <Check className="w-3 h-3 mr-1 text-green-500" />
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Your TMDB API Key"
                  value={tmdbKey}
                  onChange={(e) => setTmdbKey(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Get your free API key from{" "}
                  <a 
                    href="https://www.themoviedb.org/settings/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    TMDB
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Gemini AI API Key
                <Badge variant="outline" className="text-xs">
                  <Check className="w-3 h-3 mr-1 text-green-500" />
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Your Gemini API Key"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from{" "}
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default APISettings;