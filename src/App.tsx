import { Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import Navigation from './sections/Navigation'
import Footer from './sections/Footer'
import ScrollToTop from './components/ScrollToTop'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Launches = lazy(() => import('./pages/Launches'))
const BuildingLibrary = lazy(() => import('./pages/BuildingLibrary'))
const BuildingDetail = lazy(() => import('./pages/BuildingDetail'))
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const AgentDetail = lazy(() => import('./pages/AgentDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ListingsPage = lazy(() => import('./pages/ListingsPage'))
const ListingDetail = lazy(() => import('./pages/ListingDetail'))

const BUILD_VERSION = 'v7-seo-speed-2026-07-20'
console.log('SG Industrial Properties', BUILD_VERSION)

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#4A3E3D' }} />
  </div>
)

function App() {
  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsapModule.gsap.registerPlugin(ScrollTrigger)
    }
    initGSAP()
  }, [])

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/properties" element={<BuildingLibrary />} />
            <Route path="/properties/:slug" element={<BuildingDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<AgentDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:slug" element={<ListingDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
