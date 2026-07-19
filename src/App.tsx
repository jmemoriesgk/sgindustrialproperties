import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navigation from './sections/Navigation'
import Footer from './sections/Footer'
import Home from './pages/Home'
import Launches from './pages/Launches'
import BuildingLibrary from './pages/BuildingLibrary'
import BuildingDetail from './pages/BuildingDetail'
import About from './pages/About'
import Team from './pages/Team'
import AgentDetail from './pages/AgentDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ListingsPage from './pages/ListingsPage'
import ListingDetail from './pages/ListingDetail'
import ScrollToTop from './components/ScrollToTop'

const BUILD_VERSION = 'v6-listings-2026-07-14'
console.log('SG Industrial Properties', BUILD_VERSION)

function App() {
  useEffect(() => {
    // Register GSAP plugins on mount
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
      </main>
      <Footer />
    </div>
  )
}

export default App
