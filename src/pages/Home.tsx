import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Phone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────── Hero Section ────────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-mono', { opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-title-line', { opacity: 0, y: 30, duration: 0.8, delay: 0.5, stagger: 0.15, ease: 'power3.out' })
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 1.0, ease: 'power3.out' })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, delay: 1.3, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-end justify-center overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh', backgroundColor: '#FDFBF7' }}
    >
      {/* Animated Particle Background */}
      <ParticleCanvas />

      {/* Warm Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(253,251,247,0.3) 0%, rgba(247,245,240,0.8) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        ref={titleRef}
        className="relative text-center pb-20 px-6"
        style={{ zIndex: 2, maxWidth: 800 }}
      >
        {/* SEO h1 (visually hidden but accessible to search engines) */}
        <h1 className="sr-only">
          New Launch Industrial Properties Singapore | SG Industrial Properties & Group | B2 Factory & Warehouse For Sale & Rent | No ABSD | James Goh R002565A | Gate+ CT Gold Generations@Tannery Gourmet Xchange
        </h1>

        <p className="hero-mono mono-label mb-4" style={{ color: '#8A827A', letterSpacing: '3px' }}>
          SINGAPORE INDUSTRIAL PROPERTY INVESTMENT
        </p>

        <div className="overflow-hidden">
          <div className="hero-title-line font-serif font-semibold" style={{ color: '#1C1A17', fontSize: 'clamp(40px, 8vw, 96px)', letterSpacing: '-2px', lineHeight: 1.1 }}>
            SG INDUSTRIAL
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="hero-title-line font-serif font-semibold" style={{ color: '#1C1A17', fontSize: 'clamp(40px, 8vw, 96px)', letterSpacing: '-2px', lineHeight: 1.1 }}>
            PROPERTIES
          </div>
        </div>

        <p className="hero-subtitle font-sans mt-6 mx-auto" style={{ color: '#6B6560', fontSize: 18, maxWidth: 600, lineHeight: 1.6 }}>
          Discover premium industrial spaces, B2 factories, warehouses, and business parks across Singapore's key industrial districts.
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link to="/launches" className="btn-primary flex items-center gap-2">
            View New Launches <ArrowRight size={16} />
          </Link>
          <a href="tel:+6597687722" className="flex items-center gap-2 font-sans text-sm font-medium px-8 py-3.5 rounded-lg transition-all duration-200" style={{ border: '1px solid #1C1A17', color: '#1C1A17', backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1C1A17'; e.currentTarget.style.color = '#FDFBF7'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1C1A17'; }}>
            <Phone size={16} /> +65 9768 7722
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div
            className="w-px mx-auto"
            style={{
              height: 40,
              backgroundColor: 'rgba(74,62,61,0.3)',
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}

/* ────────────────────── Particle Canvas (Simplified for performance) ────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Array<{
      x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number; alpha: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(800, Math.floor((canvas.width * canvas.height) / 2000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          z: Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.1,
          vz: 0,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
        })
      }
    }

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += dx * 0.0001
          p.vy += dy * 0.0001
        }

        // Wrap
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(138, 130, 122, ${p.alpha * 0.6})`)
        gradient.addColorStop(0.5, `rgba(168, 158, 148, ${p.alpha * 0.3})`)
        gradient.addColorStop(1, 'rgba(138, 130, 122, 0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

/* ────────────────────── Dissolve Strip ────────────────────── */
function DissolveStrip() {
  return <div className="dissolve-strip" />
}

/* ────────────────────── Featured Launches Section ────────────────────── */
function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-header > *', {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo('.featured-launch-card',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.featured-launches-grid', start: 'top 95%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const launches = [
    {
      name: 'SPACE@18',
      location: '18 Lorong Ampas',
      tag: 'B1 Freehold',
      badge: 'NEW LAUNCH',
      badgeColor: '#8E69B6',
      image: '/images/space-18-hero.jpg',
      alt: 'SPACE@18 at 18 Lorong Ampas 6-storey freehold B1 clean industrial glass facade',
      specs: '46+1 Units | Freehold | TOP Dec 2026',
    },
    {
      name: 'Space Nova',
      location: '21 New Industrial Road',
      tag: 'B1 Freehold',
      badge: 'NEW LAUNCH',
      badgeColor: '#6390B5',
      image: '/images/space-nova-hero.jpg',
      alt: 'Space Nova at 21 New Industrial Road 7-storey freehold B1 clean industrial',
      specs: '47 Units | Freehold | Sky Terrace',
    },
    {
      name: 'Gate+',
      location: '@ Tukang, Jurong',
      tag: 'B2 Ramp-Up Factory',
      badge: 'NEW LAUNCH',
      badgeColor: '#4A3E3D',
      image: '/images/gate-plus-hero.jpg',
      alt: 'Gate Plus at Tukang Jurong B2 multi-user ramp-up industrial factory',
      specs: '265 Units | 33-Yr Tenure | TOP 2029',
    },
    {
      name: 'CT Gold',
      location: 'Macpherson',
      tag: 'B1/B2 Mixed-Use',
      badge: '100% FULLY SOLD',
      badgeColor: '#C45D8C',
      image: '/images/ct-gold-hero.jpg',
      alt: 'CT Gold at Macpherson modern glass facade industrial commercial building',
      specs: 'Glass Facade | Ground F&B | Helical Parking',
    },
    {
      name: 'Generations@Tannery',
      location: '71 Tannery Lane',
      tag: 'B1 Industrial',
      badge: 'FREEHOLD',
      badgeColor: '#78B0B5',
      image: '/images/generations-tannery-hero.png',
      alt: 'Generations at Tannery 12-storey freehold B1 industrial development',
      specs: '64 Units | Freehold | Near Mattar MRT',
    },
    {
      name: 'Gourmet Xchange',
      location: '@ 1 Kallang Way',
      tag: 'B2 Food Hub',
      badge: 'RIVERFRONT',
      badgeColor: '#5DC489',
      image: '/images/gourmet-xchange-hero.jpg',
      alt: 'Gourmet Xchange Kallang Way food hub with heritage terrace block',
      specs: '272 Units | Green Mark Platinum | Heritage',
    },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5F0' }} className="pt-16 lg:pt-24 pb-8 lg:pb-12">
      <div className="max-w-[1128px] mx-auto px-6">
        {/* Header */}
        <div className="featured-header text-center mb-12">
          <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>NEW INDUSTRIAL & COMMERCIAL LAUNCHES</p>
          <h2 className="section-heading">Featured Launches</h2>
          <p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 640 }}>
            Discover Singapore's newest industrial and commercial property launches. From multi-user ramp-up factories to food hubs, heritage-adaptive mixed-use developments, and freehold B1 industrial — register your interest for priority unit selection.
          </p>
        </div>

        {/* 6 Project Cards */}
        <div className="featured-launches-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {launches.map((p, i) => (
            <Link
              key={i}
              to="/launches"
              className="featured-launch-card group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{ border: '1px solid #E8E4DC', backgroundColor: '#FFFFFF' }}
            >
              <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#E8E4DC' }}>
                <img
                  src={p.image}
                  alt={p.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span
                  className="absolute top-3 left-3 font-sans text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide"
                  style={{ backgroundColor: p.badgeColor, color: '#fff' }}
                >
                  {p.badge}
                </span>
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase mb-1" style={{ color: '#6B6560' }}>{p.tag}</p>
                <h3 className="font-serif text-lg font-medium mb-0.5" style={{ color: '#1C1A17' }}>{p.name}</h3>
                <p className="font-sans text-xs mb-2" style={{ color: '#6B6560' }}>{p.location}</p>
                <p className="font-mono text-[10px]" style={{ color: '#6B6560' }}>{p.specs}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Generations Hero Banner */}
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ backgroundColor: '#1C1A17' }}>
          <img
            src="/images/generations-hero.png"
            alt="Generations at Tannery - Premium freehold B1 industrial development in Singapore"
            className="w-full h-auto object-cover block"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/launches"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All New Industrial / Commercial Launches <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Services Section ────────────────────── */
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-row', {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const services = [
    {
      label: 'FOR BUYERS',
      title: 'Find Your Ideal Industrial Space',
      body: "Whether you're expanding operations or making your first industrial investment, we match you with properties that fit your business needs — from light B1 workshops to heavy B2 factories with container access. Our database covers 500+ industrial properties across all major Singapore districts.",
      cta: 'Contact Us',
      image: '/images/singapore-skyline.jpg',
      alt: 'Singapore industrial district skyline at dusk',
      reverse: false,
    },
    {
      label: 'FOR SELLERS',
      title: 'Maximize Your Property Value',
      body: "Tap into our database of over 1,000 corporate clients and investors actively seeking industrial properties in Singapore. We handle valuation, marketing, viewings, and negotiation to get you the best price for your B1 or B2 industrial property, warehouse, or factory.",
      cta: 'Contact Us',
      image: '/images/woodlands-industrial.jpg',
      alt: 'Modern industrial buildings in Woodlands Singapore',
      reverse: true,
    },
    {
      label: 'FOR TENANTS',
      title: 'Flexible Lease Solutions',
      body: "From short-term warehousing to long-term factory leases, we connect tenants with landlords across Singapore's key industrial zones — Tuas, Jurong, Woodlands, Changi, Paya Lebar, and Kaki Bukit. We negotiate the best rental terms for your business.",
      cta: 'Contact Us',
      image: '/images/jurong-industrial.jpg',
      alt: 'Aerial view of Jurong industrial area Singapore',
      reverse: false,
    },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5F0' }}>
      {services.map((s, i) => (
        <div
          key={i}
          className="service-row"
          style={{ borderBottom: '1px solid #E8E4DC' }}
        >
          <div className="max-w-[1128px] mx-auto px-6 py-16 lg:py-20">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${s.reverse ? 'lg:flex-row-reverse' : ''}`}>
              {s.reverse ? (
                <>
                  <div className="order-2 lg:order-1">
                    <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>{s.label}</p>
                    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-4" style={{ color: '#1C1A17' }}>{s.title}</h3>
                    <p className="font-sans text-base leading-relaxed mb-6" style={{ color: '#4A4540', maxWidth: 440 }}>{s.body}</p>
                    <a
                      href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {s.cta} <ArrowRight size={14} />
                    </a>
                  </div>
                  <div className="order-1 lg:order-2 overflow-hidden rounded-xl">
                    <img src={s.image} alt={s.alt} className="w-full h-72 lg:h-80 object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                </>
              ) : (
                <>
                  <div className="overflow-hidden rounded-xl">
                    <img src={s.image} alt={s.alt} className="w-full h-72 lg:h-80 object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  <div>
                    <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>{s.label}</p>
                    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-4" style={{ color: '#1C1A17' }}>{s.title}</h3>
                    <p className="font-sans text-base leading-relaxed mb-6" style={{ color: '#4A4540', maxWidth: 440 }}>{s.body}</p>
                    <a
                      href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {s.cta} <ArrowRight size={14} />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ────────────────────── Statistics Bar ────────────────────── */
function StatisticsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [500, 1000, 500, 15]
      const prefixes = ['', '', 'S$', '']
      const suffixes = ['+', '+', 'M+', '+']

      statsRef.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: targets[i],
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = `${prefixes[i]}${Math.round(obj.val)}${suffixes[i]}`
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stats = [
    { label: 'Industrial Properties Listed' },
    { label: 'Corporate Clients Served' },
    { label: 'Transaction Value' },
    { label: 'Years Experience' },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#1C1A17' }} className="py-16 lg:py-20">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <span
                ref={(el) => { statsRef.current[i] = el }}
                className="font-serif font-semibold block mb-2"
                style={{ color: '#4A3E3D', fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                0
              </span>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: '#6B6560' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Testimonials Section ────────────────────── */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials-list', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const testimonials = [
    {
      quote: 'SG Industrial helped us secure a 5,000 sqft B1 factory in Yishun within 3 weeks. Their knowledge of industrial zoning and container access requirements saved us months of research.',
      name: 'Grexx Tan',
      role: 'PG Storage Systems',
    },
    {
      quote: 'We sold our Premier@kaki Bukit warehouse within 1 month instead of our expectation of 3 months. The team\'s network of serious buyers made all the difference.',
      name: 'Liew Kok Wei',
      role: 'Hao Feng Air-Con Engineering',
    },
    {
      quote: 'As an experienced industrial property buyer, I appreciated their frankness and rational investment insights in analysing the current investment market environment. Highly recommended.',
      name: 'Elson Tan',
      role: 'Property Investor',
    },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5F0' }} className="py-24">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Sticky Heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>CLIENT SUCCESS</p>
            <h2 className="section-heading mb-4">Trusted by Industrial Property Investors</h2>
            <p className="font-sans text-base" style={{ color: '#4A4540' }}>
              Hear from business owners and investors who found their ideal industrial spaces through our platform.
            </p>
          </div>

          {/* Right: Testimonials */}
          <div className="testimonials-list space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card bg-white rounded-xl p-8"
                style={{ border: '1px solid #E8E4DC' }}
              >
                <p className="font-serif text-lg italic leading-relaxed mb-6" style={{ color: '#4A4540' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-base font-semibold" style={{ color: '#1C1A17' }}>{t.name}</p>
                  <p className="font-mono text-xs" style={{ color: '#6B6560' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Visible SEO Content Section ────────────────────── */
function VisibleSEOContent() {
  return (
    <section style={{ backgroundColor: '#F7F5F0' }} className="py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="font-serif text-3xl font-medium mb-6" style={{ color: '#1C1A17' }}>
          Singapore Industrial Property Guide — New Launch, For Sale & For Rent with No ABSD
        </h2>
        <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
          <p>
            <strong>SG Industrial Properties</strong> and <strong>SG Industrial Group</strong> are Singapore's leading industrial property specialists, focusing exclusively on industrial new launch and industrial new project developments, B1 and B2 factories, warehouses, and business parks for sale and for rent across all major industrial districts. Led by <strong>James Goh (CEA R002565A)</strong>, our team of 21 CEA registered industrial specialists has facilitated over S$500 million in transactions since 2009.
          </p>
          <p>
            One of the biggest advantages of investing in Singapore industrial property is that there is <strong>No ABSD (Additional Buyer's Stamp Duty)</strong>. Unlike residential property, industrial properties including B2 heavy industrial factories, B1 light industrial units, warehouses, ramp-up factories, terrace factories, and business parks are completely exempt from ABSD. This makes industrial property an extremely attractive investment for both local and foreign buyers seeking strong rental yields and capital appreciation.
          </p>
          <p>
            Our featured <strong>industrial new launch</strong> projects include <strong>SPACE@18</strong> at 18 Lorong Ampas — a 6-storey freehold B1 clean industrial with 46 units, full-height glass facade, and TOP Dec 2026; <strong>Space Nova</strong> at 21 New Industrial Road — a 7-storey freehold B1 clean industrial with 47 units, ramp-up access, communal sky terrace, and 4 EV charging lots; <strong>Gate+ at Tukang Jurong</strong> — a 10-storey B2 multi-user ramp-up factory with 265 production units and Green Mark Platinum certification; <strong>CT Gold</strong> — a striking B1/B2 mixed-use development with glass facade and helical parking (now 100% fully sold); <strong>Generations@Tannery</strong> at 71 Tannery Lane — a rare 12-storey freehold B1 industrial development with 54 units and 5 canteens near Mattar MRT; and <strong>Gourmet Xchange</strong> at 1 Kallang Way — Singapore's largest strata-titled B2 food hub with 272 units and heritage terrace architecture.
          </p>
          <p>
            Whether you are looking for industrial property for sale or industrial property for rent, our team covers all key districts including Tuas, Jurong, Woodlands, Changi, Paya Lebar, Kaki Bukit, and Ubi. Our CEA registered industrial specialists include Caroline Chan (R046614C), Alvin Lim (R042513G), Amanda Chuah (R056404H), David Yong (R056841H), Greenie Choo (R023447A), Jimmy Ng (R009588I), John Suar (R009496C), Ken Ng (R024280F), Lee Geok Chew (R023491I), Maverick Cheng (R016259D), Moon Lai (R062936J), Paul Tan (R024959B), Shaun Quai (R073861I), Simon Tham (R023257F), SK Lee (R065066G), Stella Ng (R016155E), Sunny Chua (R052568I), Teressa Tang (R019925J), and Theresa Tan (R052724Z).
          </p>
          <p>
            Contact SG Industrial Properties today at <strong>+65 9768 7722</strong> or <strong>+65 8688 2929</strong> for a free consultation on industrial property for sale and for rent in Singapore with No ABSD.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Contact CTA Section ────────────────────── */
function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#1C1A17' }} className="py-24">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <div className="cta-content">
          <p className="mono-label mb-4" style={{ color: '#4A3E3D' }}>GET STARTED</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-white mb-4">
            Ready to Find Your Industrial Space?
          </h2>
          <p className="font-sans text-base mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Contact our team for a free consultation. We'll understand your needs and match you with the best industrial properties in Singapore.
          </p>
          <p className="font-serif text-2xl mb-8" style={{ color: '#4A3E3D' }}>
            +65 9768 7722 / 8688 2929
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/launches" className="btn-bronze">
              View New Launches
            </Link>
            <a
              href="https://whatsapp.com/channel/0029Va0J0Mj3QxSASaTLPF0C"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Join WhatsApp Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Home Page ────────────────────── */
export default function Home() {
  const allAgents = [
    { name: 'James Goh', cea: 'R002565A' },
    { name: 'Caroline Chan', cea: 'R046614C' },
    { name: 'Alvin Lim', cea: 'R042513G' },
    { name: 'Amanda Chuah', cea: 'R056404H' },
    { name: 'David Yong', cea: 'R056841H' },
    { name: 'Freddy Choo', cea: '' },
    { name: 'Greenie Choo', cea: 'R023447A' },
    { name: 'Jimmy Ng', cea: 'R009588I' },
    { name: 'John Suar', cea: 'R009496C' },
    { name: 'Ken Ng', cea: 'R024280F' },
    { name: 'Lee Geok Chew', cea: 'R023491I' },
    { name: 'Maverick Cheng', cea: 'R016259D' },
    { name: 'Moon Lai', cea: 'R062936J' },
    { name: 'Paul Tan', cea: 'R024959B' },
    { name: 'Shaun Quai', cea: 'R073861I' },
    { name: 'Simon Tham', cea: 'R023257F' },
    { name: 'SK Lee', cea: 'R065066G' },
    { name: 'Stella Ng', cea: 'R016155E' },
    { name: 'Sunny Chua', cea: 'R052568I' },
    { name: 'Teressa Tang', cea: 'R019925J' },
    { name: 'Theresa Tan', cea: 'R052724Z' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is there ABSD when buying industrial property in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, there is NO Additional Buyer\'s Stamp Duty (ABSD) when purchasing industrial property in Singapore. Unlike residential property, industrial properties such as B1 and B2 factories, warehouses, and business parks are exempt from ABSD. This makes industrial property a highly attractive investment option with No ABSD for both Singapore citizens and foreigners.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the latest industrial new launches in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The latest industrial new launches in Singapore include SPACE@18 at 18 Lorong Ampas (B1 freehold, 46+1 units, TOP Dec 2026), Space Nova at 21 New Industrial Road (B1 freehold, 47 units), Gate+ at Tukang Jurong (B2 ramp-up factory, 265 units, TOP Jan 2029), CT Gold (B1/B2 mixed-use, 100% fully sold), Generations@Tannery at 71 Tannery Lane (B1 freehold, 54 units + 5 canteens), and Gourmet Xchange at 1 Kallang Way (B2 food hub, 272 units). All industrial properties come with No ABSD.',
        },
      },
      {
        '@type': 'Question',
        name: 'What industrial properties are for sale and for rent in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SG Industrial Properties & SG Industrial Group offer industrial properties for sale and for rent across Singapore including B1 and B2 factories, warehouses, ramp-up units, terrace factories, and business parks. Popular districts include Tuas, Jurong, Woodlands, Changi, Paya Lebar, Kaki Bukit, and Ubi. All purchases enjoy No ABSD.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is James Goh from SG Industrial Properties?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'James Goh (CEA R002565A) is the Team Leader and Industrial Specialist at SG Industrial Properties & SG Industrial Group. With 15+ years of experience, he has facilitated over S$500 million in Singapore industrial property transactions and leads a team of 20 CEA registered industrial specialists.',
        },
      },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SG Industrial Properties',
    alternateName: 'SG Industrial Group',
    url: 'https://sgindustrialproperties.com',
    telephone: '+65-9768-7722',
    email: 'sgindustrialspaces@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SG',
      addressLocality: 'Singapore',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Sa 09:00-18:00',
  }

  return (
    <>
      <Helmet>
        <title>New Launch Industrial Properties Singapore | SG Industrial Properties & Group | B2 Factory & Warehouse For Sale & Rent | No ABSD | James Goh R002565A</title>
        <meta name="description" content="SG Industrial Properties & SG Industrial Group specialise in industrial new launch and industrial new project Singapore. Find B2 factory, warehouse, B1 industrial unit for sale & rent with No ABSD. Featured launches: SPACE@18 at Lorong Ampas, Space Nova at New Industrial Road, Gate+, CT Gold at Macpherson, Generations@Tannery, Gourmet Xchange. Led by James Goh R002565A with 20 CEA registered industrial specialists. Call +65 9768 7722." />
        <meta name="keywords" content="new launch, industrial new launch, industrial new project, sg industrial properties, sg industrial group, industrial properties, for rent, for sale, no absd, james goh r002565a, space 18, space18 lorong ampas, space nova, space nova new industrial road, gate+, ct gold, ct gold macpherson, generations@tannery, gourmet xchange, b1 clean industrial, b2 factory singapore, warehouse for sale, b1 industrial unit, lorong ampas industrial, new industrial road, tuas industrial property, jurong factory, woodlands industrial, macpherson industrial, changi warehouse, singapore industrial real estate, industrial property investment, caroline chan r046614c, alvin lim r042513g, amanda chuah r056404h, david yong r056841h, greenie choo r023447a, jimmy ng r009588i, john suar r009496c, ken ng r024280f, lee geok chew r023491i, maverick cheng r016259d, moon lai r062936j, paul tan r024959b, shaun quai r073861i, simon tham r023257f, sk lee r065066g, stella ng r016155e, sunny chua r052568i, teressa tang r019925j, theresa tan r052724z, industrial property agent singapore, cea registered property agent, industrial property consultant singapore, b2 heavy industrial, ramp up factory, terrace factory, business park singapore, industrial space for rent, factory for sale singapore" />
        <link rel="canonical" href="https://sgindustrialproperties.com" />
        <meta property="og:title" content="New Launch Industrial Properties Singapore | SG Industrial Properties & Group | For Sale & Rent | No ABSD" />
        <meta property="og:description" content="SG Industrial Properties & SG Industrial Group specialise in industrial new launch Singapore. B2 factory, warehouse, B1 industrial unit for sale & rent with No ABSD. Featured: SPACE@18, Space Nova, Gate+, CT Gold, Generations@Tannery, Gourmet Xchange. Led by James Goh R002565A." />
        <meta property="og:url" content="https://sgindustrialproperties.com" />
        <meta property="og:image" content="https://sgindustrialproperties.com/images/gate-plus-hero.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <DissolveStrip />
      <FeaturedSection />
      <ServicesSection />
      <StatisticsBar />
      <TestimonialsSection />
      <VisibleSEOContent />
      <ContactCTA />

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* LocalBusiness Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Person Schema for all agents on homepage */}
      {allAgents.map((agent, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: agent.name,
          identifier: agent.cea || undefined,
          jobTitle: agent.cea ? `CEA Registered Industrial Specialist (${agent.cea})` : 'Industrial Specialist',
          worksFor: {
            '@type': 'RealEstateAgent',
            name: 'SG Industrial Properties',
            alternateName: 'SG Industrial Group',
            url: 'https://sgindustrialproperties.com',
            telephone: '+65-9768-7722',
          },
          url: `https://sgindustrialproperties.com/team#agent-${agent.name.toLowerCase().replace(/\s+/g, '-')}`,
          description: `${agent.name} is an Industrial Specialist at SG Industrial Properties & SG Industrial Group, specialising in Singapore industrial property for sale and rent including B1 and B2 factories, warehouses, and business parks with No ABSD.`,
        }) }} />
      ))}
    </>
  )
}
