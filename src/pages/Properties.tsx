import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Calendar,
  Ruler,
  Truck,
  ArrowUpFromLine,
  Train,
  MapPin,
  ArrowUp,
  Shield,
  ChevronDown,
  Phone,
  MessageCircle,
  CheckCircle,
  Check,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── Property Hero ─────────── */
function PropertyHero() {
  return (
    <section
      className="relative w-full flex items-end"
      style={{ height: '70vh', minHeight: 400 }}
    >
      <img
        src="/images/polaris-exterior.jpg"
        alt="Polaris at Woodlands B2 Heavy Industrial Factory exterior with 40ft container ramp access"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(23,23,28,0.9) 0%, rgba(23,23,28,0.4) 50%, transparent 100%)',
        }}
      />
      <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-12">
        <span
          className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: '#4A3E3D', color: '#17171C' }}
        >
          B2 Heavy Industrial
        </span>
        <h1 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-1px' }}>
          Polaris @ Woodlands
        </h1>
        <p className="font-sans text-base mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Woodlands Avenue 12, Singapore
        </p>

        {/* Key Specs */}
        <div className="flex flex-wrap gap-6 mb-6">
          {[
            { icon: Calendar, text: '30-Year Tenure' },
            { icon: Ruler, text: '1,600-100,000 sqft' },
            { icon: Truck, text: '40ft Container Access' },
            { icon: ArrowUp, text: '6m Ceiling Height' },
          ].map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <spec.icon size={18} color="#4A3E3D" />
              <span className="font-sans text-sm text-white">{spec.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="#enquiry" className="btn-bronze">Enquire Now</a>
          <button className="btn-outline">Download Floor Plan</button>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Breadcrumb ─────────── */
function Breadcrumb() {
  return (
    <nav className="max-w-[1128px] mx-auto px-6 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-sans text-sm" style={{ color: '#9797A3' }}>
        <li><Link to="/" className="hover:text-[#4A3E3D] transition-colors">Home</Link></li>
        <li>/</li>
        <li><Link to="/properties" className="hover:text-[#4A3E3D] transition-colors">Properties</Link></li>
        <li>/</li>
        <li style={{ color: '#17171C' }}>Polaris @ Woodlands</li>
      </ol>

      {/* Structured data breadcrumb */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sgindustrialproperties.com" },
          { "@type": "ListItem", "position": 2, "name": "Properties", "item": "https://sgindustrialproperties.com/properties" },
          { "@type": "ListItem", "position": 3, "name": "Polaris @ Woodlands", "item": "https://sgindustrialproperties.com/properties/polaris-woodlands" }
        ]
      })}} />
    </nav>
  )
}

/* ─────────── Property Details ─────────── */
function PropertyDetails() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-section', {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const features = [
    { icon: ArrowUpFromLine, text: 'Heavy floor loading (20kN/sqm)' },
    { icon: Truck, text: 'Ramp-up container access' },
    { icon: ArrowUp, text: 'Loading bay on every level' },
    { icon: Train, text: 'Near Woodlands MRT' },
    { icon: MapPin, text: 'BKE/SLE expressway access' },
    { icon: Ruler, text: 'High ceiling up to 6m' },
    { icon: Ruler, text: 'Flexible sizes 1,600-100,000sqft' },
    { icon: Shield, text: '24/7 security & access' },
  ]

  const specs = [
    { label: 'Tenure', value: '30 years' },
    { label: 'Zoning', value: 'B2 Heavy Industrial' },
    { label: 'Expected TOP', value: '2025' },
    { label: 'Unit Sizes', value: '1,600 - 100,000 sqft' },
    { label: 'Ceiling Height', value: 'Up to 6.0m' },
    { label: 'Floor Loading', value: '20 kN/sqm' },
    { label: 'Container Access', value: '40ft ramp-up' },
    { label: 'Power Supply', value: 'Up to 800A' },
    { label: 'Lift Provision', value: 'Cargo lifts' },
    { label: 'Car Park', value: 'Available' },
  ]

  const distances = [
    'Woodlands MRT Station - 5 min walk',
    'BKE Expressway - 2 min drive',
    'SLE Expressway - 3 min drive',
    'Woodlands Checkpoint - 8 min drive',
    'Causeway Point - 5 min drive',
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5E8' }} className="pb-24">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-3 space-y-12">
            {/* Overview */}
            <div className="detail-section">
              <p className="mono-label mb-3">OVERVIEW</p>
              <h2 className="font-serif text-3xl font-medium mb-4" style={{ color: '#17171C' }}>About This Property</h2>
              <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#28282A' }}>
                <p>
                  Polaris @ Woodlands is a brand new B2 heavy industrial development strategically located along Woodlands Avenue 12. This purpose-built factory complex offers direct 40-foot container ramp access on every level, making it ideal for logistics, manufacturing, and heavy industrial operations.
                </p>
                <p>
                  With ceiling heights of up to 6 meters and heavy floor loading capacity of 20kN/sqm, Polaris accommodates a wide range of industrial trades. The development features flexible unit sizes from 1,600 sqft to 100,000 sqft, catering to SMEs and large enterprises alike.
                </p>
                <p>
                  The property is situated within minutes walk to the nearest MRT station and enjoys excellent connectivity via BKE and SLE expressways. The 30-year tenure provides long-term security for owner-occupiers and investors looking for industrial property in Singapore's fast-growing northern corridor.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="detail-section">
              <p className="mono-label mb-3">KEY FEATURES</p>
              <h2 className="font-serif text-3xl font-medium mb-4" style={{ color: '#17171C' }}>Built for Industry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-lg p-4"
                    style={{ border: '1px solid #DEDEE0' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}
                    >
                      <f.icon size={16} color="#4A3E3D" />
                    </div>
                    <span className="font-sans text-sm" style={{ color: '#28282A' }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            <div className="detail-section">
              <p className="mono-label mb-3">SPECIFICATIONS</p>
              <h2 className="font-serif text-3xl font-medium mb-4" style={{ color: '#17171C' }}>Technical Details</h2>
              <div className="overflow-hidden rounded-lg" style={{ border: '1px solid #DEDEE0' }}>
                <table className="w-full">
                  <tbody>
                    {specs.map((s, i) => (
                      <tr
                        key={i}
                        style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F7F5E8' }}
                      >
                        <td className="font-sans text-sm font-medium p-4" style={{ color: '#17171C', width: '40%' }}>
                          {s.label}
                        </td>
                        <td className="font-sans text-sm p-4" style={{ color: '#28282A' }}>
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Location */}
            <div className="detail-section">
              <p className="mono-label mb-3">LOCATION</p>
              <h2 className="font-serif text-3xl font-medium mb-4" style={{ color: '#17171C' }}>Prime Woodlands Location</h2>
              <div
                className="rounded-xl overflow-hidden mb-6 flex items-center justify-center"
                style={{ height: 300, backgroundColor: '#DEDEE0' }}
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'rgba(246,180,107,0.2)' }}
                  >
                    <MapPin size={28} color="#4A3E3D" />
                  </div>
                  <p className="font-sans text-sm" style={{ color: '#9797A3' }}>
                    Woodlands Avenue 12, Singapore
                  </p>
                  <p className="font-sans text-xs mt-1" style={{ color: '#9797A3' }}>
                    Near BKE/SLE Expressways & Woodlands MRT
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {distances.map((d, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} color="#4A3E3D" />
                    <span className="font-sans text-sm" style={{ color: '#28282A' }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Accordion */}
            <div className="detail-section">
              <p className="mono-label mb-3">FREQUENTLY ASKED QUESTIONS</p>
              <h2 className="font-serif text-3xl font-medium mb-4" style={{ color: '#17171C' }}>Common Questions</h2>
              <FAQAccordion />
            </div>

            {/* Property Listing Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": "Polaris @ Woodlands - B2 Heavy Industrial Factory",
              "url": "https://sgindustrialproperties.com/properties/polaris-woodlands",
              "description": "Brand new B2 heavy industrial factory at Woodlands Avenue 12 with 40ft container access, 6m ceiling height, and 30-year tenure. Sizes from 1,600 to 100,000 sqft.",
              "image": "https://sgindustrialproperties.com/images/polaris-exterior.jpg",
              "datePosted": "2024-01-01",
              "mainEntity": {
                "@type": "RealEstateAgent",
                "name": "SG Industrial Properties",
                "telephone": "+65-9768-7722"
              }
            })}} />
          </div>

          {/* Right Column - Sticky Contact Card */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28" id="enquiry">
              <ContactCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── FAQ Accordion ─────────── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What is B2 zoning and what trades are allowed?',
      a: 'B2 (Business 2) zoning permits heavy industrial use including manufacturing, warehousing, logistics, engineering workshops, and production facilities involving machinery. Light trades such as offices and showrooms are also permitted as ancillary use up to 60% of the floor area.',
    },
    {
      q: 'Can foreigners buy industrial property in Singapore?',
      a: 'Yes, foreigners can purchase industrial properties in Singapore without restrictions, unlike residential properties. Both strata-titled units and entire buildings are available to foreign buyers.',
    },
    {
      q: 'What financing options are available?',
      a: 'Commercial/industrial property loans typically cover up to 80-90% of the property value with tenures of up to 25-30 years. We can connect you with banks offering competitive rates for industrial property purchases.',
    },
    {
      q: 'What are the maintenance fees?',
      a: 'Maintenance fees vary by development but typically range from $0.30 to $0.80 psf per month for strata-titled industrial properties. These cover building maintenance, security, cleaning, and common area utilities.',
    },
    {
      q: 'How long does the purchase process take?',
      a: 'The typical timeline from offer to completion is 8-12 weeks. This includes option fee (1%), exercise of option, loan approval, valuation, and final completion at the lawyer\'s office.',
    },
  ]

  return (
    <div>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border-b cursor-pointer"
          style={{ borderColor: '#DEDEE0' }}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="flex items-center justify-between py-5">
            <h4 className="font-sans text-base font-medium pr-4" style={{ color: '#17171C' }}>
              {faq.q}
            </h4>
            <ChevronDown
              size={20}
              style={{
                color: '#9797A3',
                transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
              }}
            />
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: openIndex === i ? 300 : 0,
              opacity: openIndex === i ? 1 : 0,
            }}
          >
            <p className="font-sans text-sm pb-5 leading-relaxed" style={{ color: '#28282A' }}>
              {faq.a}
            </p>
          </div>
        </div>
      ))}

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </div>
  )
}

/* ─────────── Contact Card ─────────── */
function ContactCard() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8" style={{ border: '1px solid #DEDEE0' }}>
      <h3 className="font-serif text-xl font-medium mb-1" style={{ color: '#17171C' }}>
        Enquire About This Property
      </h3>
      <p className="font-mono text-xs mb-6" style={{ color: '#9797A3' }}>
        Ref: POLARIS-WDL-2024
      </p>

      {submitted ? (
        <div className="text-center py-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}
          >
            <Check size={28} color="#4A3E3D" />
          </div>
          <h4 className="font-serif text-lg font-medium mb-2" style={{ color: '#17171C' }}>
            Thank You!
          </h4>
          <p className="font-sans text-sm" style={{ color: '#9797A3' }}>
            We'll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your full name"
            required
            className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all"
            style={{ border: '1px solid #DEDEE0' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all"
            style={{ border: '1px solid #DEDEE0' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
          />
          <input
            type="tel"
            placeholder="+65 XXXX XXXX"
            required
            className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all"
            style={{ border: '1px solid #DEDEE0' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
          />
          <input
            type="text"
            placeholder="Company name (optional)"
            className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all"
            style={{ border: '1px solid #DEDEE0' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
          />
          <textarea
            placeholder="Tell us about your requirements..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none transition-all resize-none"
            style={{ border: '1px solid #DEDEE0' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
          />
          <button type="submit" className="btn-bronze w-full text-center">
            Send Enquiry
          </button>
        </form>
      )}

      <div className="mt-6 pt-6" style={{ borderTop: '1px solid #DEDEE0' }}>
        <p className="font-sans text-xs mb-3 text-center" style={{ color: '#9797A3' }}>
          Or contact us directly:
        </p>
        <a
          href="tel:+6597687722"
          className="flex items-center justify-center gap-2 font-sans text-sm font-medium mb-3 py-3 rounded-lg transition-colors"
          style={{ backgroundColor: 'rgba(246,180,107,0.1)', color: '#17171C' }}
        >
          <Phone size={16} /> +65 9768 7722
        </a>
        <div className="flex gap-3">
          <a
            href="https://wa.me/message/7EESXSAYAH2II1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 font-sans text-xs py-3 rounded-lg text-white"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a
            href="https://whatsapp.com/channel/0029Va0J0Mj3QxSASaTLPF0C"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 font-sans text-xs py-3 rounded-lg"
            style={{ border: '1px solid #DEDEE0', color: '#17171C' }}
          >
            <MessageCircle size={14} /> Channel
          </a>
        </div>
        <a
          href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 font-sans text-sm font-medium py-3 rounded-lg mt-3"
          style={{ backgroundColor: '#4A3E3D', color: '#17171C' }}
        >
          <Phone size={14} /> Submit Enquiry Form
        </a>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {['Free Consultation', 'No Obligation', 'Fast Response'].map((badge) => (
          <div key={badge} className="flex items-center gap-1">
            <Check size={10} color="#5DC489" />
            <span className="font-mono text-[10px]" style={{ color: '#9797A3' }}>{badge}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────── Related Properties ─────────── */
function RelatedProperties() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.related-card', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const properties = [
    { title: 'T99 @ Tampines', tag: 'B2 Terrace', tenure: '30yr', image: '/images/warehouse-aerial.jpg', alt: 'T99 at Tampines B2 terrace factory' },
    { title: 'Northpoint Bizhub', tag: 'B1 Ramp-Up', tenure: '60yr', image: '/images/woodlands-industrial.jpg', alt: 'Northpoint Bizhub B1 ramp-up factory' },
    { title: 'Win5 @ Yishun', tag: 'B1 Ramp-Up', tenure: '30yr', image: '/images/industrial-interior.jpg', alt: 'Win5 at Yishun B1 industrial unit' },
  ]

  return (
    <section ref={sectionRef} className="py-20" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1128px] mx-auto px-6">
        <h2 className="font-serif text-3xl font-medium mb-8" style={{ color: '#17171C' }}>
          Similar Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {properties.map((p, i) => (
            <div
              key={i}
              className="related-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ border: '1px solid #DEDEE0' }}
            >
              <div className="h-48 overflow-hidden">
                <img src={p.image} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <span
                  className="inline-block font-sans text-xs font-semibold px-3 py-1 rounded-full mb-2"
                  style={{ backgroundColor: 'rgba(246,180,107,0.15)', color: '#17171C' }}
                >
                  {p.tag}
                </span>
                <h3 className="font-serif text-lg font-medium" style={{ color: '#17171C' }}>{p.title}</h3>
                <p className="font-mono text-xs mt-1" style={{ color: '#9797A3' }}>{p.tenure} tenure</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Properties Page ─────────── */
export default function Properties() {
  return (
    <>
      <Helmet>
        <title>Polaris @ Woodlands | B2 Heavy Industrial Factory For Sale & Rent | No ABSD | SG Industrial Properties</title>
        <meta name="description" content="Polaris @ Woodlands - B2 heavy industrial factory for sale and for rent in Singapore with No ABSD. 40ft container access, 6m ceiling, 30-year tenure. Sizes 1,600-100,000 sqft. Near Woodlands MRT. SG Industrial Properties & Group. Enquire now with James Goh R002565A." />
        <meta name="keywords" content="polaris woodlands, b2 heavy industrial factory for sale, industrial property for sale, industrial property for rent, warehouse for sale singapore, factory for rent, no absd, sg industrial properties, sg industrial group, james goh r002565a, woodlands industrial, b2 factory singapore, 40ft container access, ramp up factory, industrial new launch, tuas industrial, jurong factory" />
        <link rel="canonical" href="https://sgindustrialproperties.com/properties/polaris-woodlands" />
        <meta property="og:title" content="Polaris @ Woodlands | B2 Heavy Industrial Factory For Sale & Rent | No ABSD | SG Industrial Properties" />
        <meta property="og:description" content="B2 heavy industrial factory for sale and for rent with No ABSD at Woodlands, Singapore. 40ft container access, 30-year tenure. Contact SG Industrial Properties & Group." />
        <meta property="og:url" content="https://sgindustrialproperties.com/properties/polaris-woodlands" />
        <meta property="og:type" content="realestate.listing" />
      </Helmet>

      <PropertyHero />
      <Breadcrumb />
      <PropertyDetails />
      <RelatedProperties />
    </>
  )
}
