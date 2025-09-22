// Enterprise Layout with Enhanced Professional Navigation
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ProfessionalNavigation } from '@/components/ProfessionalNavigation';
import { Zap, Activity } from 'lucide-react';

interface EnterpriseLayoutProps {
  children: React.ReactNode;
}

export function EnterpriseLayout({ children }: EnterpriseLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ProfessionalNavigation />
        
        <div className="flex-1 flex flex-col">
          {/* Enhanced Top Header */}
          <header className="h-16 bg-gradient-to-r from-background via-background to-muted/5 border-b border-border/20 backdrop-blur-md flex items-center px-6 gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
            <SidebarTrigger className="relative z-10 hover:bg-primary/10 transition-colors duration-300 animate-bounce-in" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1 bg-gradient-card text-electric border-primary/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Live Analytics
                </Badge>
                <Badge variant="outline" className="px-3 py-1 bg-gradient-card text-gold border-gold/30">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
            </div>
            <div className="text-sm text-muted-foreground relative z-10">
              Enterprise Intelligence Dashboard
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto relative particle-bg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_hsl(var(--primary))_0%,_transparent_50%),_radial-gradient(circle_at_80%_20%,_hsl(var(--electric))_0%,_transparent_50%)] opacity-[0.02] pointer-events-none"></div>
            <div className="relative z-10 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}