import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'New Launches', path: '/launches' },
  { label: 'All Industrial Properties Info', path: '/properties' },
  { label: 'About', path: '/about' },
  { label: 'Our Team', path: '/team' },
  { label: 'Blog', path: '/blog' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 80,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : '0 1px 8px rgba(0,0,0,0.05)',
        }}
      >
        <div className="max-w-[1128px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/SGIG_HighRes_Print.png"
              alt="SG Industrial Properties Logo"
              className="h-10 w-auto"
              style={{ filter: 'none' }}
            />
            <span
              className="font-sans text-lg font-semibold tracking-wide hidden sm:inline"
              style={{ color: '#1C1A17' }}
            >
              SG INDUSTRIAL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-sans text-sm font-medium transition-colors duration-200 hover:text-[#4A3E3D]"
                style={{
                  color:
                    location.pathname === item.path
                      ? '#4A3E3D'
                      : '#1C1A17',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze text-sm py-3 px-6"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: '#1C1A17' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'rgba(23,23,28,0.98)' }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-serif text-2xl font-medium transition-colors hover:text-[#4A3E3D]"
              style={{
                color: location.pathname === item.path ? '#4A3E3D' : '#fff',
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bronze mt-4"
          >
            Enquire Now
          </a>
        </div>
      )}
    </>
  )
}
