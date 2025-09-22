import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Brain, BarChart3, TrendingUp, Users, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DualNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isConsumerRoute = location.pathname === '/' || location.pathname === '/discover';
  
  const consumerLinks = [
    { href: '/', label: 'Home', icon: Film },
    { href: '/discover', label: 'Discover Movies', icon: Sparkles },
  ];

  const businessLinks = [
    { href: '/trend-intelligence', label: 'Trend Intelligence', icon: TrendingUp },
    { href: '/content-performance', label: 'Content Performance', icon: BarChart3 },
    { href: '/creator-tools', label: 'Creator Tools', icon: Brain },
    { href: '/studio-analytics', label: 'Studio Analytics', icon: Users },
  ];

  const toggleMode = () => {
    if (isConsumerRoute) {
      navigate('/trend-intelligence');
    } else {
      navigate('/discover');
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="p-2 rounded-xl bg-primary shadow-lg">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-foreground font-bold">CineDiscover</h1>
              <p className="text-xs text-muted-foreground -mt-1">
                {isConsumerRoute ? 'Movie Discovery Platform' : 'Professional Intelligence'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
              {(isConsumerRoute ? consumerLinks : businessLinks).map((link) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <Badge variant={isConsumerRoute ? "default" : "outline"} className="text-xs">
                {isConsumerRoute ? "Consumer" : "Business"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMode}
                className="bg-background/50 backdrop-blur-md border-border/60 hover:bg-primary/10 hover:border-primary/60"
              >
                {isConsumerRoute ? (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Business
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 mr-2" />
                    Consumer
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <div className="space-y-2">
              {(isConsumerRoute ? consumerLinks : businessLinks).map((link) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="border-t border-border/40 pt-3 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleMode();
                    setIsOpen(false);
                  }}
                  className="w-full justify-start bg-background/50 backdrop-blur-md border-border/60"
                >
                  {isConsumerRoute ? (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Switch to Business Mode
                    </>
                  ) : (
                    <>
                      <Film className="w-4 h-4 mr-2" />
                      Switch to Consumer Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DualNavigation;