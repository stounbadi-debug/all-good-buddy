// Discovery Layout with dual-purpose navigation
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Film, Building2, ArrowLeft } from 'lucide-react';

export function DiscoverLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar for Discovery */}
      <div className="sticky top-0 z-40 backdrop-blur-md border-b border-border/40 bg-background/80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand & Navigation */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-button rounded-xl shadow-glow group-hover:shadow-elevated transition-all duration-300">
                  <Film className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-black gradient-text glow-text font-orbitron">
                  CineDiscover
                </h1>
              </Link>
              
              {/* Quick Nav */}
              <div className="hidden md:flex items-center gap-1 bg-gradient-card backdrop-blur-md border border-border/40 rounded-2xl p-1">
                <Link 
                  to="/discover"
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname === '/discover' 
                      ? 'bg-gradient-button text-primary-foreground shadow-glow' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  Discover Movies
                </Link>
                <Link 
                  to="/platform"
                  className="px-4 py-2 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                >
                  Business Tools
                </Link>
              </div>
            </div>

            {/* Business Access Button */}
            <div className="flex items-center gap-3">
              <Link to="/platform/content-performance">
                <Button variant="outline" className="bg-gradient-card backdrop-blur-md border-border/60 hover:border-primary/60">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Business Intelligence</span>
                  <span className="sm:hidden">Business</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
}