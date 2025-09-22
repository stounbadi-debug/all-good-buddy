import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <div className="container mx-auto px-4 sm:px-6 pt-8 max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card backdrop-blur-md border border-border p-1 rounded-2xl shadow-lg">
                <TabsTrigger 
                  value="discover" 
                  className="px-6 py-3 rounded-xl font-bold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="px-6 py-3 rounded-xl font-bold"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Recommendations
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="discover" className="space-y-8">
              <div className="py-20">
                <div className="text-center">
                  <div className="text-9xl mb-8">🎬</div>
                  <h1 className="text-5xl md:text-6xl font-black mb-6">
                    Welcome to CineDiscover
                  </h1>
                  <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                    Discover your perfect movie with AI-powered recommendations, intelligent search, and cinematic discovery tools.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="px-12 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-500">
                      Explore Trending Movies
                    </button>
                    <button className="px-12 py-4 bg-card border border-border text-foreground rounded-2xl font-bold text-lg hover:bg-accent transition-all duration-500">
                      ✨ Surprise Me!
                    </button>
                    <button 
                      onClick={() => setActiveTab("ai")}
                      className="px-12 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg hover:bg-secondary/90 transition-all duration-500"
                    >
                      Try AI Discovery
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-8">
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">AI Recommendations Coming Soon</h2>
                <p className="text-muted-foreground">Advanced AI movie discovery features are being prepared.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;