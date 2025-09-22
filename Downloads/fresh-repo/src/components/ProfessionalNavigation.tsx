// Professional Enterprise Navigation
// Sidebar navigation for entertainment industry platform

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Film,
  Brain,
  DollarSign,
  Calendar,
  Settings,
  Database,
  Shield,
  Star,
  FileText,
  Search
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Movie Discovery',
    items: [
      { title: 'Discover Movies', url: '/discover', icon: Search, badge: 'AI' },
    ]
  },
  {
    label: 'Business Intelligence',
    items: [
      { title: 'Content Performance', url: '/platform/content-performance', icon: BarChart3, badge: 'ROI' },
      { title: 'Trend Intelligence', url: '/platform/trend-intelligence', icon: TrendingUp, badge: 'Live' },
      { title: 'Creator Tools', url: '/platform/creator-tools', icon: Users },
      { title: 'Studio Analytics', url: '/platform/studio-analytics', icon: DollarSign, badge: 'Pro' },
    ]
  }
];

export function ProfessionalNavigation() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold border-r-2 border-primary shadow-lg transition-all duration-300 animate-fade-in" 
      : "hover:bg-gradient-to-r hover:from-muted/50 hover:to-transparent text-muted-foreground hover:text-foreground transition-all duration-300 hover:transform hover:translate-x-1";

  return (
    <Sidebar className={!open ? "w-16" : "w-72 backdrop-blur-md"} collapsible="icon">
      <div className="p-4 border-b border-border/20 bg-gradient-to-r from-background to-muted/10">
        {open && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20 shadow-lg animate-float">
              <Film className="w-6 h-6 text-primary animate-pulse-glow" />
            </div>
            <div className="animate-slide-in-left delay-200">
              <h2 className="font-bold text-lg gradient-text">CineDiscover</h2>
              <p className="text-xs text-muted-foreground">Dual-Purpose AI Platform</p>
            </div>
          </div>
        )}
        {!open && (
          <div className="flex justify-center animate-bounce-in">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20 shadow-lg animate-float">
              <Film className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </div>

      <SidebarContent className="bg-gradient-to-b from-transparent to-muted/5">
        {navigationItems.map((section, sectionIndex) => (
          <SidebarGroup key={section.label} className="animate-slide-up" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
            {open && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2 animate-fade-in delay-300">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.title} className="animate-scale-in" style={{ animationDelay: `${(sectionIndex * 100) + (itemIndex * 50)}ms` }}>
                    <SidebarMenuButton asChild className="group">
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavClassName}
                      >
                        <item.icon className={`h-5 w-5 ${!open ? 'mx-auto' : 'mr-3'} group-hover:animate-pulse transition-all duration-300 ${isActive(item.url) ? 'text-primary drop-shadow-md' : ''}`} />
                        {open && (
                          <div className="flex items-center justify-between flex-1 animate-slide-in-left delay-100">
                            <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-300">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 animate-pulse-glow">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Enhanced Enterprise Badge */}
      {open && (
        <div className="p-4 border-t border-border/20 animate-slide-up delay-500">
          <div className="p-3 bg-gradient-to-r from-primary/10 via-primary/5 to-electric/5 rounded-xl border border-primary/20 shadow-lg backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Star className="h-4 w-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-semibold gradient-text">Enterprise Ready</span>
            </div>
            <p className="text-xs text-muted-foreground relative z-10">
              Personal discovery + Professional intelligence
            </p>
          </div>
        </div>
      )}
    </Sidebar>
  );
}