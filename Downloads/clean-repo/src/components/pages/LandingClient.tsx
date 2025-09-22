import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, Film, Zap, Search, TrendingUp } from "lucide-react"

export default function LandingClient() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleDiscoverMovies = () => {
    setIsLoading(true)
    navigate('/discover')
  }

  const handleEnterpriseDemo = () => {
    navigate('/content-performance')
  }

  const handleGetStarted = () => {
    navigate('/discover')
  }

  return (
    <div className="min-h-screen particle-bg">
      {/* Hero Section */}
      <header className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">
        <div className="text-center animate-fade-in">
          {/* Logo/Brand */}
          <div className="flex justify-center items-center mb-8">
            <div className="p-4 bg-gradient-button rounded-2xl shadow-glow animate-float">
              <Film className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black gradient-text glow-text mb-8 font-orbitron leading-tight">
            CineDiscover
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 font-inter">
            AI-Powered Movie Discovery & Entertainment Intelligence
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto font-light leading-relaxed font-inter">
            <span className="text-primary font-semibold">Discover your perfect movie</span> with emotional AI recommendations, or access professional-grade <span className="text-electric font-semibold">entertainment intelligence</span> for data-driven business decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              onClick={handleDiscoverMovies}
              disabled={isLoading}
              className="neon-button px-12 py-6 rounded-2xl font-bold text-xl shadow-glow hover:shadow-elevated transition-all duration-500 animate-slide-up font-inter"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-2" />
                  Discover Movies
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleEnterpriseDemo}
              className="px-12 py-6 bg-gradient-card backdrop-blur-md border border-border/60 text-foreground rounded-2xl font-bold text-xl shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up electric-accent font-inter"
            >
              <Brain className="w-6 h-6 mr-2" />
              Business Intelligence
            </Button>

            <Button 
              variant="outline"
              onClick={handleGetStarted}
              className="px-12 py-6 bg-gradient-electric text-foreground rounded-2xl font-bold text-xl shadow-glow hover:shadow-elevated transition-all duration-500 animate-slide-up font-inter"
            >
              <Search className="w-6 h-6 mr-2" />
              Explore All Features
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-black gradient-text glow-text mb-6 font-orbitron">
            Dual-Purpose AI Platform
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed font-inter">
            Personal movie discovery for consumers + Business intelligence for professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-card backdrop-blur-md border border-border/40 rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 animate-scale-in">
            <div className="mb-6">
              <div className="p-3 bg-gradient-button rounded-2xl w-fit shadow-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h4 className="text-2xl font-bold gradient-text mb-4 font-orbitron">Movie Discovery</h4>
            <p className="text-muted-foreground leading-relaxed font-inter">
              AI-powered emotional intelligence matching your perfect movie based on mood, themes, and preferences
            </p>
          </div>

          <div className="bg-gradient-card backdrop-blur-md border border-border/40 rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 animate-scale-in">
            <div className="mb-6">
              <div className="p-3 bg-gradient-electric rounded-2xl w-fit shadow-glow">
                <Brain className="w-8 h-8 text-foreground" />
              </div>
            </div>
            <h4 className="text-2xl font-bold gradient-text mb-4 font-orbitron">Content Performance</h4>
            <p className="text-muted-foreground leading-relaxed font-inter">
              Professional box office and streaming performance prediction for data-driven investment decisions
            </p>
          </div>

          <div className="bg-gradient-card backdrop-blur-md border border-border/40 rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 animate-scale-in">
            <div className="mb-6">
              <div className="p-3 bg-gradient-accent rounded-2xl w-fit shadow-glow">
                <TrendingUp className="w-8 h-8 text-foreground" />
              </div>
            </div>
            <h4 className="text-2xl font-bold gradient-text mb-4 font-orbitron">Trend Intelligence</h4>
            <p className="text-muted-foreground leading-relaxed font-inter">
              Real-time cultural moment detection and emerging theme analysis for strategic planning
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center animate-scale-in">
            <div className="text-5xl font-black gradient-text glow-text mb-2 font-orbitron">50M+</div>
            <p className="text-muted-foreground font-inter">Movies & Shows</p>
          </div>
          <div className="text-center animate-scale-in">
            <div className="text-5xl font-black gradient-text glow-text mb-2 font-orbitron">96.8%</div>
            <p className="text-muted-foreground font-inter">Recommendation Match</p>
          </div>
          <div className="text-center animate-scale-in">
            <div className="text-5xl font-black gradient-text glow-text mb-2 font-orbitron">247%</div>
            <p className="text-muted-foreground font-inter">Business ROI Increase</p>
          </div>
          <div className="text-center animate-scale-in">
            <div className="text-5xl font-black gradient-text glow-text mb-2 font-orbitron">2</div>
            <p className="text-muted-foreground font-inter">Platforms in One</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl border-t border-border/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Film className="w-8 h-8 text-primary mr-3" />
            <span className="text-2xl font-bold gradient-text font-orbitron">CineDiscover</span>
          </div>
          <div className="text-muted-foreground font-inter">
            Movie Discovery + Business Intelligence • <span className="text-primary font-semibold">Dual Purpose Platform</span>
          </div>
        </div>
      </footer>
    </div>
  )
}