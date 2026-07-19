import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Award,
  Users,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Phone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── About Hero ─────────── */
function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-content > *', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center"
      style={{ backgroundColor: '#F7F5F0', minHeight: '60vh' }}
    >
      <div className="about-hero-content text-center px-6 max-w-[900px] py-24">
        <p className="mono-label mb-4">ABOUT US</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-medium mb-6" style={{ color: '#1C1A17', letterSpacing: '-1px' }}>
          Creating Wealth Through Singapore Industrial Property Investments
        </h1>
        <p className="font-sans text-lg leading-relaxed" style={{ color: '#4A4540' }}>
          SG Industrial Properties is a leading industrial property consultancy in Singapore, specializing in B1 and B2 industrial spaces, warehouses, and business parks. With over 15 years of experience, we've facilitated more than S$500 million in transactions for over 1,000 corporate clients.
        </p>
      </div>
    </section>
  )
}

/* ─────────── Company Story ─────────── */
function CompanyStory() {
  return (
    <section className="py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/singapore-skyline.jpg"
              alt="Singapore industrial district skyline at dusk"
              className="w-full h-80 lg:h-96 object-cover"
              loading="lazy"
            />
          </div>
          <div className="story-content">
            <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>OUR STORY</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-4" style={{ color: '#1C1A17' }}>
              15 Years of Industrial Property Excellence
            </h2>
            <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
              <p>
                Founded in 2009, SG Industrial Properties began with a simple mission: to help businesses find the perfect industrial space in Singapore. What started as a small consultancy has grown into one of Singapore's most trusted industrial property platforms.
              </p>
              <p>
                Our deep understanding of Singapore's industrial landscape — from the rapidly developing Tuas mega-port area to the established Jurong and Woodlands estates — allows us to provide unmatched expertise to our clients.
              </p>
              <p>
                We believe in creating long-term value for our clients, whether they're first-time buyers, seasoned investors, or businesses looking to expand their operations. Our approach combines market intelligence, negotiation expertise, and personalized service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Why Choose Us ─────────── */
function WhyChooseUs() {
  const values = [
    {
      icon: Award,
      title: 'Deep Market Expertise',
      body: "15+ years specializing exclusively in Singapore industrial property. We understand zoning regulations, URA guidelines, and district-specific market dynamics.",
      color: '#4A3E3D',
    },
    {
      icon: Users,
      title: 'Extensive Network',
      body: 'Access to 1,000+ corporate clients and off-market listings. Our relationships with developers, landlords, and fellow agents give you first access to prime properties.',
      color: '#C45D8C',
    },
    {
      icon: ClipboardCheck,
      title: 'End-to-End Service',
      body: "From property search and viewings to negotiation, financing advice, and legal completion — we guide you through every step of the transaction process.",
      color: '#78B0B5',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      body: 'S$500M+ in transactions facilitated. Our clients consistently achieve above-market prices for sales and below-market rates for purchases and rentals.',
      color: '#6390B5',
    },
  ]

  return (
    <section style={{ backgroundColor: '#F7F5F0' }} className="py-24">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">WHY US</p>
          <h2 className="section-heading">Why Choose SG Industrial Properties</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="value-card bg-white rounded-xl p-8 transition-all duration-200 hover:-translate-y-1"
              style={{ border: '1px solid #E8E4DC' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${v.color}15` }}
              >
                <v.icon size={24} color={v.color} />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3" style={{ color: '#1C1A17' }}>{v.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#4A4540' }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Team Section ─────────── */
function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-team-card', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const previewTeam = [
    { name: 'James Goh', role: 'Team Leader | Industrial Specialist', cea: 'R002565A', image: '/images/team-james-new.jpg', slug: 'james-goh-r002565a' },
    { name: 'Caroline Chan', role: 'Industrial Specialist', cea: 'R046614C', image: '/images/Caroline-Chan-R046614C.jpg', slug: '' },
    { name: 'Alvin Lim', role: 'Industrial Specialist', cea: 'R042513G', image: '/images/Alvin-Lim-R042513G.jpg', slug: '' },
    { name: 'Amanda Chuah', role: 'Industrial Specialist', cea: 'R056404H', image: '/images/Amanda-Chuah-R056404H.jpg', slug: '' },
    { name: 'David Yong', role: 'Industrial Specialist', cea: 'R056841H', image: '/images/David-Yong-R056841H.jpg', slug: '' },
    { name: 'Greenie Choo', role: 'Industrial Specialist', cea: 'R023447A', image: '/images/Greenie-Choo-R023447A.jpg', slug: '' },
    { name: 'Paul Tan', role: 'Industrial Specialist', cea: 'R024959B', image: '/images/Paul-Tan-R024959B.jpg', slug: '' },
  ]

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">OUR TEAM</p>
          <h2 className="section-heading">Meet Our Property Experts</h2>
          <p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 600 }}>
            A dedicated team of 20 CEA registered industrial specialists led by James Goh (R002565A). Every specialist is fully licensed and focuses exclusively on Singapore industrial and commercial real estate.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {previewTeam.map((m, i) => (
            <Link to={m.slug ? `/team/${m.slug}` : '/team'} key={i} className="about-team-card text-center group cursor-pointer">
              <div className="relative mx-auto mb-4 overflow-hidden rounded-xl" style={{ width: '100%', aspectRatio: '1/1' }}>
                <img
                  src={m.image}
                  alt={`${m.name} CEA ${m.cea} ${m.role} Singapore Industrial Property SG Industrial Properties`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-sans text-base font-semibold" style={{ color: '#1C1A17' }}>{m.name}</h3>
              <p className="font-mono text-xs mt-0.5" style={{ color: '#4A3E3D' }}>CEA {m.cea}</p>
              <p className="font-sans text-xs mt-0.5" style={{ color: '#6B6560' }}>{m.role}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/team"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All 20 CEA Registered Specialists <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── SEO Content Block ─────────── */
function SEOContent() {
  return (
    <section style={{ backgroundColor: '#F7F5F0' }} className="py-24">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="font-serif text-3xl font-medium mb-6" style={{ color: '#1C1A17' }}>
          Investing in Singapore Industrial Property: A Complete Guide
        </h2>
        <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
          <p>
            Singapore's industrial property market offers compelling investment opportunities for both local and foreign investors. With the government's commitment to maintaining Singapore's position as a global logistics and manufacturing hub, demand for quality industrial spaces continues to grow across key districts including Tuas, Jurong, Woodlands, Changi, and Paya Lebar.
          </p>
          <p>
            B2 heavy industrial properties in growth corridors like Tuas and Woodlands have shown strong capital appreciation, driven by infrastructure developments including the Tuas Mega Port and Thomson-East Coast MRT line. Meanwhile, B1 light industrial units in established estates like Jurong and Paya Lebar offer stable rental yields of 4-6% annually.
          </p>
          <p>
            Foreign investors can purchase industrial property in Singapore without the restrictions that apply to residential property. This accessibility, combined with Singapore's stable political environment, strong legal framework, and strategic location in Southeast Asia, makes industrial property an attractive asset class for international portfolios.
          </p>
          <p>
            When evaluating industrial property investments, key factors to consider include remaining lease tenure, floor loading capacity, ceiling height, container access, proximity to MRT stations and expressways, and the industrial zoning (B1 vs B2). Properties with 30-60 year tenure in well-connected districts typically offer the best balance of affordability and long-term value.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/properties" className="font-sans text-sm font-medium flex items-center gap-1" style={{ color: '#4A3E3D' }}>
            Browse our property portfolio <ArrowRight size={14} />
          </Link>
          <Link to="/launches" className="font-sans text-sm font-medium flex items-center gap-1" style={{ color: '#4A3E3D' }}>
            View industrial property directory <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Contact CTA ─────────── */
function ContactCTA() {
  return (
    <section style={{ backgroundColor: '#1C1A17' }} className="py-20">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl text-white font-medium mb-4">
          Let's Discuss Your Property Needs
        </h2>
        <p className="font-sans text-base mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Whether you're buying, selling, or renting industrial property in Singapore, our team is ready to help you achieve your goals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="tel:+6597687722" className="btn-bronze flex items-center gap-2">
            <Phone size={16} /> Contact Us
          </a>
          <Link to="/launches" className="btn-outline">
            View New Launches
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── About Page ─────────── */
export default function About() {
  return (
    <>
      <Helmet>
        <title>About SG Industrial Properties & Group | James Goh R002565A & 20 CEA Registered Industrial Specialists | For Sale & Rent | No ABSD</title>
        <meta name="description" content="SG Industrial Properties & SG Industrial Group has 15+ years experience in Singapore industrial property. Led by James Goh (R002565A) with 20 CEA registered industrial specialists. 500+ properties, 1000+ clients, S$500M+ in transactions. Specialising in B1/B2 factories and warehouses for sale and rent with No ABSD. Featured new launches: Gate+, CT Gold, Generations@Tannery, Gourmet Xchange." />
        <meta name="keywords" content="sg industrial properties, sg industrial group, james goh r002565a, singapore industrial property, b1 b2 factory, warehouse for sale, warehouse for rent, cea registered property agent, industrial property consultant singapore, property agent singapore, industrial real estate, new launch, industrial new launch, no absd, for sale, for rent, gate+, ct gold, generations@tannery, gourmet xchange, caroline chan r046614c, alvin lim r042513g, amanda chuah r056404h, david yong r056841h, greenie choo r023447a, jimmy ng r009588i, john suar r009496c, ken ng r024280f, lee geok chew r023491i, maverick cheng r016259d, moon lai r062936j, paul tan r024959b, shaun quai r073861i, simon tham r023257f, sk lee r065066g, stella ng r016155e, sunny chua r052568i, teressa tang r019925j, theresa tan r052724z, industrial property investment, tuas industrial, jurong factory, woodlands industrial" />
        <link rel="canonical" href="https://sgindustrialproperties.com/about" />
        <meta property="og:title" content="About SG Industrial Properties & Group | James Goh & CEA Registered Agents | No ABSD" />
        <meta property="og:description" content="15+ years experience in Singapore industrial property. Led by James Goh (R002565A) with 20 CEA registered industrial specialists. Industrial property for sale and rent with No ABSD." />
        <meta property="og:url" content="https://sgindustrialproperties.com/about" />
      </Helmet>

      <AboutHero />
      <CompanyStory />
      <WhyChooseUs />
      <TeamSection />
      <SEOContent />
      <ContactCTA />
    </>
  )
}
