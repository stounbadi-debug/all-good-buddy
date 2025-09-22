import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Index from '@/pages/Index'
import Landing from '@/pages/Landing'
import NotFound from '@/pages/NotFound'
import TrendIntelligence from '@/pages/TrendIntelligence'
import ContentPerformance from '@/pages/ContentPerformance'
import CreatorTools from '@/pages/CreatorTools'
import StudioAnalytics from '@/pages/StudioAnalytics'
import DualNavigation from '@/components/DualNavigation'

function App() {
  return (
    <>
      <DualNavigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Index />} />
        <Route path="/trend-intelligence" element={<TrendIntelligence />} />
        <Route path="/content-performance" element={<ContentPerformance />} />
        <Route path="/creator-tools" element={<CreatorTools />} />
        <Route path="/studio-analytics" element={<StudioAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App